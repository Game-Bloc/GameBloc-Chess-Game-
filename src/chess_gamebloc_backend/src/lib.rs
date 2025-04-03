
use candid::{CandidType, Principal};
use ethers_core::k256::elliptic_curve::PublicKey;
use ethers_core::k256::Secp256k1;
use ic_cdk::api::call::CallResult;
// use evm_rpc_canister_types::RpcService;
use serde::Serialize;
use std::cell::{Cell, RefCell};
use std::collections::BTreeMap;
use ic_cdk::{api::call::ManualReply, init, query, update, post_upgrade};
use candid::Nat; // Import Nat type from candid
use ethers_core::types::{ FeeHistory}; // Import BlockTag and FeeHistory from ethers_core

// for cronos stunt

mod evm_signer;
mod conversion;
mod fees;
use ic_cdk::api::management_canister::ecdsa::{
    ecdsa_public_key, EcdsaCurve, EcdsaKeyId, EcdsaPublicKeyArgument,
};
use ethers_core::abi::ethereum_types::{Address, U256};
use ethers_core::utils::keccak256;
use ethers_core::k256::elliptic_curve::sec1::ToEncodedPoint;
use ethers_core::types::{Eip1559TransactionRequest, NameOrAddress, U64};
use evm_rpc_canister_types::{EvmRpcCanister, RpcServices};

// Ensure RpcServices implements Clone
#[derive(Clone)]
enum RpcServices {
    Custom { chainId: u64, services: Vec<String> },
    EthSepolia(String),
    BaseMainnet(String),
    OptimismMainnet(String),
    ArbitrumOne(String),
    EthMainnet(String),
}
use evm_signer::SignedTransaction;
// use crate::evm_signer::SignedTransaction;
use crate::{
    evm_signer::sign_eip1559_transaction,
    fees::{estimate_transaction_fees, FeeEstimates},
};

pub trait IntoChainId {
    fn chain_id(&self) -> U64;
}
// for cronos stunt


use tanton::tools::Searcher;
// websocket
use handlers::{on_close, on_message, on_open, AppMessage};
use ic_websocket_cdk::{
    CanisterWsCloseArguments, CanisterWsCloseResult, CanisterWsGetMessagesArguments,
    CanisterWsGetMessagesResult, CanisterWsMessageArguments, CanisterWsMessageResult,
    CanisterWsOpenArguments, CanisterWsOpenResult, WsHandlers, WsInitParams,
};
// websocket

// from the ic-cdk on icp 

// mod getrandom_fail;
mod handlers;

type GameStore = BTreeMap<String, GameInternal>; // from cdk-chess
type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, Profile>; // the 'profile' here, is it the same with the struct name
// static PROFILE_STORE: RefCell<HashMap<Principal, Profile>> = RefCell::new(HashMap::new());

#[derive(Clone, Debug, Default, candid::CandidType, candid::Deserialize, Serialize)]
struct Profile {
    pub name: String,
    pub description: String,
    // pub keywords: Vec<String>,
    pub count: u8,
    // pub gamesWon: u64,
    pub age : u8,
    pub principal : String,
    // number-of-games-played, rating,
    // pub userName: String,
}

// from the rust chess ic-cdk
#[derive(Clone, Debug, Default, CandidType, Serialize)]
pub struct Game {
    pub fen: String,
}

pub struct GameInternal {
    pub board: tanton::Board,
}
// from the rust chess ic-cdk

// for the cronos evm stunt

#[derive(CandidType, Serialize, Debug)]
struct PublicKeyReply {
    pub public_key_hex: String,
}

enum EcdsaKeyIds {
    #[allow(unused)]
    TestKeyLocalDevelopment,
    #[allow(unused)]
    TestKey1,
    #[allow(unused)]
    ProductionKey1,
}

impl EcdsaKeyIds {
    fn to_key_id(&self) -> EcdsaKeyId {
        EcdsaKeyId {
            curve: EcdsaCurve::Secp256k1,
            name: match self {
                Self::TestKeyLocalDevelopment => "dfx_test_key",
                Self::TestKey1 => "test_key_1",
                Self::ProductionKey1 => "key_1",
            }
            .to_string(),
        }
    }
}

pub struct TransferArgs {
    pub value: U256,
    pub to: Option<NameOrAddress>,
    pub gas: Option<U256>,
}

pub type TransactionHash = String;

// for the cronos evm stunt

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default(); // is it the same IdStore above we are calling here also
    // for the counter function trial
    static COUNTER: RefCell<candid::Nat> = RefCell::new(candid::Nat::from(0u8));
    static OWNER: Cell<Principal> = Cell::new(Principal::from_slice(&[]));
    // for the cdk-chess
    static STORE: RefCell<GameStore> = RefCell::default();
}


#[query(name = "getPlayerProfile", manual_reply = true)]
fn player_info() -> ManualReply<Profile> {
    let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        if let Some(profile) = profile_store.borrow().get(&id) {
            ManualReply::one(profile.clone())
        } else {
            // this will return a default or error profile if no profile exists for the caller
            ManualReply::one(Profile::default())
        }
    })
}


// #[update(name = "setProfile", manual_reply = true)]
#[query]
fn whoami() -> Principal {
   ic_cdk::api::caller()
}

#[query(manual_reply = true)]
fn get(name:String) -> ManualReply<Profile> {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            let profile_store = profile_store.borrow();
            if let Some(profile) = id_store.borrow().get(&name).and_then(|id| profile_store.get(id)) {
                ManualReply::one(profile)
            } else {
                ManualReply::one(Profile::default())
            }
        })
    })
}


#[update]
fn update_player_profile(
    age: u8,
    principal: String,
    name: String,
    count: u8,
    description: String,
) -> Profile {
    let caller_principal = Principal::from_text(&principal)
        .unwrap_or_else(|_| ic_cdk::api::caller());

    ic_cdk::println!("Caller Principal: {:?}", caller_principal);
    ic_cdk::println!(
        "Received data: age={}, principal={}, name={}, count={}, description={}",
        age, principal, name, count, description
    );

    let profile = Profile {
        name,
        description,
        count,
        age,
        principal: caller_principal.to_text(),
    };

    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(caller_principal, profile.clone());
    });

    profile
}


#[query(manual_reply = true)]
fn search(text: String) -> ManualReply<Option<Profile>> {
    let text = text.to_lowercase();
    PROFILE_STORE.with(|profile_store| {
        for (_, p) in profile_store.borrow().iter() {
            if p.name.to_lowercase().contains(&text) || p.description.to_lowercase().contains(&text) {
                return ManualReply::one(Some(p));
            }
        }
        ManualReply::one(None::<Profile>)
    })
}

#[query(manual_reply = true)]
fn get_player(text: String) -> ManualReply<Option<Profile>> {
    let text = text.to_lowercase();
    PROFILE_STORE.with(|profile_store| {
        for (_, p) in profile_store.borrow().iter() {
            if p.name.to_lowercase().contains(&text) || p.description.to_lowercase().contains(&text) {
                return ManualReply::one(Some(p));
            }
        }
        ManualReply::one(None::<Profile>)
    })
}

#[update]
fn inc() {
    COUNTER.with(|counter| *counter.borrow_mut() += 1u64);
}

#[query(manual_reply = true)]
fn read() -> ManualReply<candid::Nat> { // I understand that the 'ManualReply is used for only query-type of functions'
    COUNTER.with(|counter| ManualReply::one(counter))
}

#[update]
fn write (input: candid::Nat) {
    COUNTER.with(|counter| *counter.borrow_mut() = input)
}

#[update(hidden = true)]
fn update_hidden() {

}

#[query(hidden = true)]
fn query_hidden() {}

// cdk-chess

#[update]
fn new(name: String, white: bool) {
    STORE.with(|game_store| {
        game_store.borrow_mut().insert(
            name.clone(),
            GameInternal {
                board: tanton::Board::start_pos(),
            },
        );
    });

    // If the user is playing black;
    if !white {
        ai_move(name);
    }
}

#[update(name = "move")]
fn uci_move(name: String, m: String) -> bool {
    let should_move = STORE.with(|game_store| {
        let mut game_store = game_store.borrow_mut();
        let game = game_store
            .get_mut(&name)
            .unwrap_or_else(|| panic!("Game {} does not exist.", name));

        // If the move is valid, also apply the next move using AI.
        game.board.apply_uci_move(&m)
    });
    if should_move {
        ai_move(name);
    }
    should_move
}

#[update(name = "aiMove")]
fn ai_move(name: String) {
    STORE.with(|game_store| {
        let mut game_store = game_store.borrow_mut();
        let game = game_store
            .get_mut(&name)
            .unwrap_or_else(|| panic!("Game {} does not exist.", name));

        let b = game.board.shallow_clone();
        let m = tanton::bots::MiniMaxSearcher::best_move(b, 3);

        game.board.apply_move(m);
    });
}

#[query(name = "getFen")]
fn get_fen(name: String) -> Option<String> {
    STORE.with(|game_store| game_store.borrow().get(&name).map(|game| game.board.fen()))
}

// cdk-chess

// integrating websocket 

#[init]
fn init() {
    let handlers = WsHandlers {
        on_open: Some(on_open),
        on_message: Some(on_message),
        on_close: Some(on_close),
    };

    let params = WsInitParams::new(handlers);

    ic_websocket_cdk::init(params);
}

#[post_upgrade]
fn post_upgrade() {
    init();
}

// method called by the client to open a WS connection to the canister (relayed by the WS Gateway)
#[update]
fn ws_open(args: CanisterWsOpenArguments) -> CanisterWsOpenResult {
    ic_websocket_cdk::ws_open(args)
}

// method called by the Ws Gateway when closing the IcWebSocket connection for a client
#[update]
fn ws_close(args: CanisterWsCloseArguments) -> CanisterWsCloseResult {
    ic_websocket_cdk::ws_close(args)
}

// method called by the client to send a message to the canister (relayed by the WS Gateway)
#[update]
fn ws_message(
    args: CanisterWsMessageArguments,
    msg_type: Option<AppMessage>,
) -> CanisterWsMessageResult {
    ic_websocket_cdk::ws_message(args, msg_type)
}

// method called by the WS Gateway to get messages for all the clients it serves
#[query]
fn ws_get_messages(args: CanisterWsGetMessagesArguments) -> CanisterWsGetMessagesResult {
    ic_websocket_cdk::ws_get_messages(args)
}

// integrating websocket 

// for cronos evm integration

// #[update]
// async fn public_key() -> Result<PublicKeyReply, String> {
//     let request = EcdsaPublicKeyArgument {
//         canister_id: None,
//         derivation_path: vec![],
//         key_id: EcdsaKeyIds::TestKeyLocalDevelopment.to_key_id(),
//     };

//     let (response,) = ecdsa_public_key(request)
//         .await
//         .map_err(|e| format!("ecdsa_public_key failed {}", e.1))?;

//     Ok(PublicKeyReply {
//         public_key_hex: hex::encode(response.public_key),
//     })
// }

// #[query]
// pub fn pubkey_bytes_to_address(pubkey_bytes: Vec<u8>) -> String {
//     use ethers_core::k256::elliptic_curve::sec1::ToEncodedPoint;
//     use ethers_core::k256::PublicKey;

//     let key =
//         PublicKey::from_sec1_bytes(&pubkey_bytes).expect("failed to parse the public key as SEC1");
//     let point = key.to_encoded_point(false);
//     // we re-encode the key to the decompressed representation.
//     let point_bytes = point.as_bytes();
//     assert_eq!(point_bytes[0], 0x04);

//     let hash = keccak256(&point_bytes[1..]);

//     ethers_core::utils::to_checksum(&Address::from_slice(&hash[12..32]), None)
// }

#[query]
pub fn pubkey_bytes_to_address(pubkey_bytes: Vec<u8>) -> String {
    
    let key = PublicKey::<Secp256k1>::from_sec1_bytes(&pubkey_bytes).expect("Failed to parse the public key as SEC1");

   
    let point = key.to_encoded_point(false);
    let point_bytes = point.as_bytes();

    assert_eq!(point_bytes[0], 0x04, "Public key is not uncompressed");

    let hash = keccak256(&point_bytes[1..]);

    
    ethers_core::utils::to_checksum(&Address::from_slice(&hash[12..32]), None)
}

#[update]
async fn public_key() -> Result<String, String> {
    let request = EcdsaPublicKeyArgument {
        canister_id: None,
        derivation_path: vec![],
        key_id: EcdsaKeyIds::TestKeyLocalDevelopment.to_key_id(),
    };
    // you can access the rpc provider from your canister directly through the assitance of the evm rpc canister deployed on the project
    // the rpc provider was used mainly in the ic-alloy.
    
    let (response,) = ecdsa_public_key(request).await.map_err(|e| format!("ecdsa_public_key failed {}", e.1))?;

    
    let eth_address = pubkey_bytes_to_address(response.public_key);

    Ok(eth_address)
}

// pub fn pubkey_bytes_address(pubkey_bytes: &[u8]) -> String {
//     let key = PublicKey::from_sec1_bytes(pubkey_bytes).expect("Failed to load pub key");
//     let point = key.to_encoded_point(false);
//     let point_bytes = point.as_bytes();
//     assert_eq!(point_bytes[0], 0x04, "Public key is not uncomppressed");
//     let hash = keccak256(&point_bytes[1..]);
//     ethers_core::utils::to_checksum(&Address::from_slice(&hash[12..32]), None);
// }

// this is the function to send_raw_transaction
// #[update]
pub async fn send_raw_transaction(
    tx: SignedTransaction,
    rpc_services: RpcServices,
    evm_rpc: EvmRpcCanister,
) -> CallResult<TransactionHash> {
    let cycles = 10_000_000_000;

    match evm_rpc.eth_send_raw_transaction(rpc_services, None, tx.tx_hex, cycles).await{
        Ok((_res,)) => {
            ic_cdk::println!("Transaction hash: {}", tx.tx_hash);
            Ok(tx.tx_hash)
        }
        Err(e) => Err((ic_cdk::api::call::RejectionCode::Unknown, format!("Error: {:?}", e))),
    }
}
///////////////

// this is the function for the transfer eth 
// #[update]
pub async fn transfer_eth(
    transfer_args: TransferArgs,
    rpc_services: RpcServices,
    key_id: EcdsaKeyId,
    derivation_path: Vec<Vec<u8>>,
    nonce: U256,
    evm_rpc: EvmRpcCanister,
) -> CallResult<TransactionHash> {
    // use the user provided gas_limit or fallback to default 210000
    let gas = transfer_args.gas.unwrap_or(U256::from(21000));
    // estimate the transaction fees by calling eth_feeHistory
    let FeeEstimates {
        max_fee_per_gas,
        max_priority_fee_per_gas,
    } = estimate_transaction_fees(9, rpc_services.into(), evm_rpc.into()).await;
    // assemble the EIP 1559 transaction to be signed with t-ECDSA

    match rpc_services {
        RpcServices::Custom { chainId, services: _ } => {

                let tx = Eip1559TransactionRequest {
                    from: None,
                    to: transfer_args.to,
                    value: Some(transfer_args.value),
                    max_fee_per_gas: Some(max_fee_per_gas),
                    max_priority_fee_per_gas: Some(max_priority_fee_per_gas),
                    gas: Some(gas),
                    nonce: Some(nonce),
                    chain_id: Some(chainId.into()),
                    data: Default::default(),
                    access_list: Default::default(),
                };
                let tx = sign_eip1559_transaction(tx, key_id, derivation_path).await;
        
                send_raw_transaction(tx.clone(), rpc_services.clone(), evm_rpc).await
            }
        RpcServices::EthSepolia(_) => todo!(),
        RpcServices::BaseMainnet(_) => todo!(),
        RpcServices::OptimismMainnet(_) => todo!(),
        RpcServices::ArbitrumOne(_) => todo!(),
        RpcServices::EthMainnet(_) => todo!(),
    }



}

// for cronos evm integration

ic_cdk::export_candid!();

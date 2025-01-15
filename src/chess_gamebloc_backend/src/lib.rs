
use candid::{CandidType, Principal};
use ic_cdk::{api::call::ManualReply, init, query, update, post_upgrade, print, api::time};
use serde::Serialize;
use std::cell::{Cell, RefCell};
use std::collections::BTreeMap;
// use ic_cdk::export::Principal;
// use ic_cdk_macros::update;
// use std::cell::RefCell;
// use std::collections::HashMap;
// from the ic-cdk on icp 

use tanton::tools::Searcher;
// websocket
use handlers::{on_close, on_message, on_open, AppMessage};
use ic_websocket_cdk::{
    WsHandlers, WsInitParams, CanisterWsCloseArguments, CanisterWsCloseResult, CanisterWsGetMessagesArguments,
    CanisterWsGetMessagesResult, CanisterWsMessageArguments, CanisterWsMessageResult,
    CanisterWsOpenArguments, CanisterWsOpenResult, send, OnCloseCallbackArgs, OnMessageCallbackArgs, OnOpenCallbackArgs, ClientPrincipal
};
// websocket

// from the ic-cdk on icp 

mod getrandom_fail;
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

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default(); // is it the same IdStore above we are calling here also
    // for the counter function trial
    static COUNTER: RefCell<candid::Nat> = RefCell::new(candid::Nat::from(0u8));
    static OWNER: Cell<Principal> = Cell::new(Principal::from_slice(&[]));
    // for the cdk-chess
    static STORE: RefCell<GameStore> = RefCell::default();
}

// #[query(name = "getPlayerProfile", manual_reply = true)]
// fn player_info() -> ManualReply<String> {
//     let id = ic_cdk::api::caller();
//     PROFILE_STORE.with(| profile_store | {
//         if let Some(profile) = profile_store.borrow().get(&id) {
//             ManualReply::one(profile.clone())
//         } else {
//             ManualReply::one(Profile::default())
//         }
//     })
// }

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

// #[update]
// fn update_player_profile(age: u8, principal: String, name: String, count: u8, description: String) -> String {
//     let principal_id = ic_cdk::api::caller();
//     ic_cdk::println!("Caller Principal: {:?}", principal_id);
//     ID_STORE.with(|id_store| {
//         id_store.borrow_mut().insert(name.clone(), principal_id);
//     });
//     PROFILE_STORE.with(|profile_store| {
//         profile_store.borrow_mut().insert(principal_id, Profile {
//             name,
//             description,
//             count,
//             age,
//             principal,
//         });
//     });
//     "Player Profile Created Successfully".to_string()
// }

// #[update]
// fn update_player_profile(
//     age: u8,
//     principal: String,
//     name: String,
//     count: u8,
//     description: String,
// ) -> String {
//     let caller_principal = Principal::from_text(&principal)
//         .unwrap_or_else(|_| ic_cdk::api::caller());

//     ic_cdk::println!("Caller Principal: {:?}", caller_principal);
//     ic_cdk::println!(
//         "Received data: age={}, principal={}, name={}, count={}, description={}",
//         age, principal, name, count, description
//     );

//     PROFILE_STORE.with(|profile_store| {
//         profile_store.borrow_mut().insert(
//             caller_principal,
//             Profile {
//                 name,
//                 description,
//                 count,
//                 age,
//                 principal,
//             },
//         );
//     });

//     format!("Player profile updated successfully for principal: {}", caller_principal.to_text())
// }

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



// #[query]
// fn source (name: String, description: String, count: u8, age: u8, principal: String, description:String) 
// ic_cdk::println!("Storing profile: {:?}", Profile {
//     name,
//     description,
//     count,
//     age,
//     principal,
// });


// #[update] // this is the adjusted update_player_profile fn
// fn update_player_profile(age: u8, principal: String, name: String, count: u8, description: String) -> String {
//     let principal_id = ic_cdk::api::caller();
//     ic_cdk::println!("Caller Principal: {:?}", principal_id);
//     ID_STORE.with(|id_store| {
//         id_store.borrow_mut().insert(name.clone(), principal_id);
//     });
//     PROFILE_STORE.with(|profile_store| {
//         profile_store.borrow_mut().insert(principal_id, Profile {
//             name,
//             description,
//             count,
//             age,
//             principal,
//         });
//     });
//     "Player Profile Created Successfully".to_string()
// }

#[query(manual_reply = true)]
fn search(text: String) -> ManualReply<Option<Profile>> {
    let text = text.to_lowercase();
    PROFILE_STORE.with(|profile_store| {
        for (_, p) in profile_store.borrow().iter() {
            if p.name.to_lowercase().contains(&text) || p.description.to_lowercase().contains(&text) {
                return ManualReply::one(Some(p));
            }

            // for x in p.keywords.iter() {
            //     if x.to_lowercase() == text {
            //         return ManualReply::one(Some(p));
            //     }
            // }
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

            // for x in p.keywords.iter() {
            //     if x.to_lowercase() == text {
            //         return ManualReply::one(Some(p));
            //     }
            // }
        }
        ManualReply::one(None::<Profile>)
    })
}

// #[update]
// fn store_username(name: String, player_name: Profile, description: String) {
//     let principal_id = ic_cdk::api::caller();
//     PROFILE_STORE.with(|profile_store| {
//         profile_store.borrow_mut().insert(
//             player_name.name.clone(),
//             Profile {
//                 name,
//                 description,
//             },
//         );
//     });
// }

// for the counter functions
// #[init] // the 'init' function is used when I want a function to run before main
// fn init() {
//     OWNER.with(|owner| owner.set(ic_cdk::api::caller()));
// }

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
fn initialise() { // I changed the fn name from 'init' to 'initialise'
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
    initialise(); // I changed the keyword here to 'initialise' from the original keyword 'init'
}

// this is the function for users to open the w_s 
#[update]
fn ws_open(args: CanisterWsOpenArguments) -> CanisterWsOpenResult {
    ic_websocket_cdk::ws_open(args)
}

// function to close the w_s connection
#[update]
fn ws_close (args: CanisterWsCloseArguments) -> CanisterWsCloseResult {
    ic_websocket_cdk::ws_close(args)
}

//function clients used to send or relay messages
#[update]
fn ws_message(args: CanisterWsMessageArguments, msg_type: Option<AppMessage>) -> CanisterWsMessageResult {
    ic_websocket_cdk::ws_message(args, msg_type)
}


// this function get messages across for all clients
#[query]
fn ws_get_messages(args: CanisterWsGetMessagesArguments) -> CanisterWsGetMessagesResult {
    ic_websocket_cdk::ws_get_messages(args)
}


// integrating websocket 

ic_cdk::export_candid!();

// This is from the chess.did file that was removed incase of error
// ws_close : (CanisterWsCloseArguments) -> (Result); // the returns here are not the same as supposed
// ws_get_messages : (CanisterWsGetMessagesArguments) -> (Result_1) query;
// ws_message : (CanisterWsMessageArguments, opt AppMessage) -> (Result);
// ws_open : (CanisterWsOpenArguments) -> (Result);








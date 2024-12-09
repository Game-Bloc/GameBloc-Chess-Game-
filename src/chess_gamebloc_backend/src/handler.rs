use candid::{CandidType, encode_one, decode_one};
use ic_cdk::{print, api::time};
use serde::{Deserialize, Serialize};
use ic_websocket_cdk::{
    send, ClientPrincipal, OnCloseCallbackArgs, OnMessageCallbackArgs,OnOpenCallbackArgs
};

// application message section
#[derive(CandidType, Clone, Debug, Deserialize, Serialize, Eq, PartialEq )]
pub struct AppMessage {
    pub text: String,
}
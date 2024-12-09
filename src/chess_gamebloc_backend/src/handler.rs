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

impl AppMessage {
    fn candid_serialize (&self) -> Vec<u8> {
        encode_one(&self).unwrap();
    }
}

pub fn on_open(args: OnMessageCallbackArgs) {
    let msg = AppMessage {
        text: String("ping")
    };
    send_app_message(args.client_principal, new_msg)
}

pub fn on_message ( args: OnMessageCallbackArgs ) {
    let app_msg: AppMessage = decode_one(&args.message).unwrap();
    let new_msg = AppMessage {
        text: String::from("ping"),
    };
}






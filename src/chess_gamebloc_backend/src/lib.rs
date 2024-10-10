
use candid::Principal;
use ic_cdk::{api::call::ManualReply, init, query, update};
use serde::Serialize;
use std::cell::{Cell, RefCell};
use std::collections::BTreeMap;
// use ic_principal::Principal;


type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, Profile>; // the 'profile' here, is it the same with the struct name

#[derive(Clone, Debug, Default, candid::CandidType, candid::Deserialize, Serialize)]
struct Profile {
    pub name: String,
    pub description: String,
    // pub keywords: Vec<String>,
    pub count: u8,
    pub gamesWon: u64,
    pub age : u8,
    pub principal : String,
    // number-of-games-played, rating,
    pub userName: String,
}

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default(); // is it the same IdStore above we are calling here also
    // for the counter function trial
    static COUNTER: RefCell<candid::Nat> = RefCell::new(candid::Nat::from(0u8));
    static OWNER: Cell<Principal> = Cell::new(Principal::from_slice(&[]));
}

#[query(name = "getSelf", manual_reply = true)]
fn get_self() -> ManualReply<Profile> {
    let id = ic_cdk::api::caller();
    PROFILE_STORE.with(| profile_store | {
        if let Some(profile) = profile_store.borrow().get(&id) {
            ManualReply::one(profile)
        } else {
            ManualReply::one(Profile::default())
        }
    })
}

#[update(name = "setProfile", manual_reply = true)]

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
fn update(profile: Profile) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store.borrow_mut().insert(profile.name.clone(), principal_id);
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    })
} // I honestly don't knw what this code does... now I do :)

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

// for the counter functions
#[init] // the 'init' function is used when I want a function to run before main
fn init() {
    OWNER.with(|owner| owner.set(ic_cdk::api::caller()));
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

ic_cdk::export_candid!();








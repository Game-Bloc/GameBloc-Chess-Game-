cargo build --release --target wasm32-unknown-unknown --package chess
candid-extractor target/wasm32-unknown-unknown/release/chess.wasm > src/chess_gamebloc_backend/chess.did

dfx deploy

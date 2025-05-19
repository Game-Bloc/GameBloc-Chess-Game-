## ICP X EVM INTEGRATION DOCUMENTATION

I got this error 
`implementation of `ArgumentDecoder` is not general enough
`(&[u8],)` must implement `ArgumentDecoder<'0>`, for any lifetime `'0`...
...but it actually implements `ArgumentDecoder<'1>`, for some specific lifetime `'1``

while writing the ` pubkey_bytes_to_address` function that serves the purpose of converting my canister public key to an evm address
what really arose the issue is the fact that I was confused of knowing which function type the function will be, either #[query] or #[update]. I havent fixed it yet tho, I will update this while I fix that. 
NB : i used #[query] at the point in time

Yeah, I fixed it by changing the type from [u8] to Vec<u8> and I borrowed the...


* i got this error 'the wasm*-unknown-unknown targets are not supported by default, you may need to enable the "js" feature.'
--- the issue was with the `getRandom` dependency which does not include the "js" feature initially, but has been updated.
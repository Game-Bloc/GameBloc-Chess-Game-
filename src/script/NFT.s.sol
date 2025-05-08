// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../foundry/NFT.sol"; // Adjust path to your contract

contract ArenaverseNFTScript is Script {
    function run() external {
        // Get private key from env variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // If you need to deploy (uncomment and adjust parameters)
        /*
        ArenaverseNFT nft = new ArenaverseNFT(
            "ArenaverseNFT",
            "ARENA",
            "ipfs://QmYourBaseURI/"
        );
        console.log("Contract deployed at:", address(nft));
        */

        // If contract is already deployed (replace with your address)
        ArenaverseNFT nft = ArenaverseNFT(0xYourContractAddressHere);

        // Example interactions:
        // 1. Mint NFTs
        nft.mint(deployerAddress, 1);
        console.log("Minted 1 NFT to", deployerAddress);

        // 2. Change cost
        // nft.setCost(0.15 ether);
        // console.log("Updated mint cost to 0.15 ETH");

        // 3. Withdraw funds
        // nft.withdraw();
        // console.log("Withdrawn contract balance");

        // 4. Pause/unpause
        // nft.pause(true);
        // console.log("Contract paused");

        // 5. Get token URI example
        // uint256 tokenId = 1;
        // string memory uri = nft.tokenURI(tokenId);
        // console.log("Token URI for ID", tokenId, ":", uri);

        // Stop broadcasting
        vm.stopBroadcast();
    }
}

// to get the baseURI - you need to get the canisterId then the localhost of you
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

// We inherit the contract we imported, this means we'll have access to the inherited contract's methods.
contract MyNFT is ERC721URIStorage {

    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // We need to pass the name of our NFTs token and its symbol.
    constructor() ERC721 ("SquareNFT", "SQUARE") {
        console.log("This is my NFT contract. Woah!");
    }

    // A function our user will hit to get their NFT.
    function mintToken() public {

        // Get the current tokenId, this starts at 0.
        uint newItemId = _tokenIds.current();

        // Actually mint the NFT to sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        // Set the NFTs data.
        _setTokenURI(newItemId, 'data:application/json;base64,ewogICAgIm5hbWUiOiAiQ29TaWduMTgiLAogICAgImRlc2NyaXB0aW9uIjogJ09uZSBvZiB0aGUgTkZUcyBvZiBhbGwgb25saW5lIGFsaWFzZXMgb2YgIkNvU2lnbjE4IicsCiAgICAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpOCtDaUFnUEhSbGVIUWdlRDBpTlRBbElpQjVQU0kxTUNVaUlHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTSnRhV1JrYkdVaUlIUmxlSFF0WVc1amFHOXlQU0p0YVdSa2JHVWlJSE4wZVd4bFBTSm1hV3hzT2lObVptWTdabTl1ZEMxbVlXMXBiSGs2YzJWeWFXWTdabTl1ZEMxemFYcGxPakUwY0hnaVBrTnZVMmxuYmpFNFBDOTBaWGgwUGdvOEwzTjJaejRLIgp9');

        console.log('An NFT w/ ID %s has been minted to %s', newItemId, msg.sender);

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

    }

}
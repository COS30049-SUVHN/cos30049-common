// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the IERC721 interface from OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract InteractBAYC {
    // Declare an immutable IERC721 variable for the BAYC contract
    IERC721 public immutable BAYC;

    // Constructor to initialize the BAYC address
    // REQUIRES: ERC721Token contract has been deployed to the local test net at the specified address
    constructor(address _erc721Address ) {
        BAYC = IERC721(_erc721Address);  // BAYC contract address on local test net
    }

    // Call BAYC's balanceOf() to query the balance of an address
    function balanceOfBAYC(address owner) external view returns (uint256 balance) {
        return BAYC.balanceOf(owner);
    }

    // Safe transfer by calling BAYC's safeTransferFrom() through the interface
    function safeTransferFromBAYC(address from, address to, uint256 tokenId) external {
        BAYC.safeTransferFrom(from, to, tokenId);
    }
}

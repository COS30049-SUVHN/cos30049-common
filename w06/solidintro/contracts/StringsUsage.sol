// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract StringsUsage {
    // Use the Strings library from OpenZeppelin for uint256 types
    using Strings for uint256;

    // Function to demonstrate converting a uint256 to a string
    function numberToString(uint256 number) public pure returns (string memory) {
        return number.toString();
    }

    // Function to generate a tokenURI by appending a uint256 tokenId to a given base URI
    function tokenURI(string memory baseURI, uint256 tokenId) public pure returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    // Function to demonstrate converting a uint256 to a hexadecimal string
    function numberToHexString(uint256 number) public pure returns (string memory) {
        return number.toHexString();
    }
}

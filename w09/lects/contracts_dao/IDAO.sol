// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDAO {
  function withdraw() external;

  function deposit() external payable;

  // Function that returns the name of the contract
  function contractName() external pure returns (string memory);
}
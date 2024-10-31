// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

interface IStorage {
  function fun() external;

  function getStateVariable() external view returns (uint);

  function getArrayData() external view returns (uint[]);
}
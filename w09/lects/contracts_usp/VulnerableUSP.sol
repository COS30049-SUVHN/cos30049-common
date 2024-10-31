// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.4.24;

import "./IStorage.sol";

// Contract to demonstrate uninitialized storage pointer bug
contract VulnerableUSP is IStorage {
    // Storage variable at location 0
    uint stateVariable;
    // Storage variable at location 1
    uint[] arrayData;
    // Function which has an uninitialized storage variable
    function fun() public {
        // Storage variable which points to location 0 (sharing same location as stateVariable)
        uint[] x;
        // Modifies value at location 0
        x.push(0);
        // Modifies value at location 1
        arrayData = x;
    }

    // Requires in Solidity 0.4.x
    // Explicit getter functions for stateVariable and arrayData
    function getStateVariable() public view returns (uint) {
        return stateVariable;
    }

    function getArrayData() public view returns (uint[]) {
        return arrayData;
    }
}

// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.4.24;

import "./IStorage.sol";

// Contract to demonstrate uninitialized storage pointer bug
contract SecuredUSP is IStorage {
    // Storage variable at location 0
    uint stateVariable;
    // Storage variable at location 1
    uint[] arrayData;
    
    // Function with `x` declared in memory to avoid uninitialized storage pointer issue
    function fun() public {
        uint[1] memory x;
        x[0] = 0;       // Modify the in-memory array without affecting storage

        // Copy contents of `x` to `arrayData` by pushing elements individually
        delete arrayData;  // Clear existing data
        for (uint i = 0; i < x.length; i++) {
            arrayData.push(x[i]);
        }
        // arrayData = x;
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

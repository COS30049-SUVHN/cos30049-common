// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import Hardhat's console library
import "hardhat/console.sol";

contract MyContract {
    event MyEvent(uint256 indexed value);

    function doSomething(uint256 _value) external {
      // do something (omitted)

      console.log("Emiting MyEvent with value: ", _value);

      emit MyEvent(_value);
    }
}

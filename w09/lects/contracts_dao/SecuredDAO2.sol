// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IDAO.sol";
// Import Hardhat's console library
import "hardhat/console.sol";

contract SecuredDAO2 is IDAO {
    // Implements the contractName function from IDAO
    function contractName() public pure override returns (string memory) {
        return "SecuredDAO2";
    }
    /* 
     maintains a mapping of investor addresses and ETH balances.      
     */
    mapping(address => uint) public balances;

    bool internal locked;

    modifier noReentrancy() {
      require(!locked, "No reentrancy");
      locked = true;
      _;
      locked = false;
    }

    /* Deposit function:
     requires a minimum contribution of 1 ETH, and once 
     contribution is received, it increments the investor's balance
     */
    function deposit() external payable {
        require(msg.value >= 1 ether, "Minimum deposit is 1 ETH");
        balances[msg.sender] += msg.value;
    }

    /*
     Withdraw function with FIX for reentrancy vulnerability:
     - fortified with noReentrancy modifier
     */
    function withdraw() external noReentrancy {
        console.log("SecuredDAO2#withdraw()");

        uint balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        // Vulnerable line: sends Ether before setting balance to zero
        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0; // Updates balance after sending
    }

    // Check contract balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

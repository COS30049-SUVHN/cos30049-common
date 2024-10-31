// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IDAO.sol";

contract SecuredDAO is IDAO {
    // Implements the contractName function from IDAO
    function contractName() external pure override returns (string memory) {
        return "SecuredDAO";
    }

    /* 
     maintains a mapping of investor addresses and ETH balances.      
     */
    mapping(address => uint) public balances;

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
     - resets their balance to zero BEFORE sending the withdrawn ETH to the investor 
     */
    function withdraw() external {
        uint balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        balances[msg.sender] = 0; // Updates balance BEFORE sending

        // Vulnerable line: sends Ether before setting balance to zero
        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");

        // moved to BEFORE:
        // balances[msg.sender] = 0; // Updates balance after sending
    }

    // Check contract balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

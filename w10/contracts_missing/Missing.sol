// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

contract Missing {
    address private owner;
    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }
    // The name of the constructor should be Missing
    // Anyone can call the IamMissing once the contract is deployed
    function IamMissing() public {
        owner = msg.sender;
    }

    function withdraw() public onlyowner {
        owner.transfer(this.balance);
    }

    // Function to explicitly deposit funds into the contract
    function deposit() public payable {}

    // Fallback function to receive Ether
    // function () public payable {}

    // Function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

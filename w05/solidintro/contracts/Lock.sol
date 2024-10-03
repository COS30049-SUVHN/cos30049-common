// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

/* 
  Overview:
  This contract is useful in cases where funds need to be secured for a certain period of time, such as escrow, delayed payments, or simple savings mechanisms.

  - Purpose: The Lock.sol contract is designed to hold funds for a specific period of time and only allow the contract owner to withdraw the funds after a specified time has passed.
  - Unlock Mechanism: The contract ensures that funds cannot be withdrawn until the unlock time, providing a basic time-locking mechanism for funds.
  

  Flow of the Contract:
  (1) Deploying the Contract:
      - When the contract is deployed, an unlockTime is provided, and the contract owner can send some Ether to the contract at deployment.
      - The contract will hold the Ether in its balance, and it will be locked until the specified unlockTime.
  (2) Withdraw Process:
      - After the unlock time has passed (according to the block timestamp), the owner can call the withdraw() function.
      - If the unlock time has not yet passed, or if someone other than the owner tries to withdraw, the transaction will fail due to the require statements.
 */
contract Lock {
    /* unlockTime: This is a uint variable that stores the UNIX timestamp representing the time after which funds can be withdrawn. It is set during the contract deployment. */
    uint public unlockTime;
    
    /* owner: This is the address of the person who deployed the contract and sent Ether to it. The owner is the only one allowed to withdraw the funds once the unlock time is reached. */
    address payable public owner;

    /* Withdrawal: This event is emitted whenever a withdrawal is made from the contract. It logs the amount of Ether withdrawn and the timestamp of the withdrawal. */
    event Withdrawal(uint amount, uint when);

    /* The constructor is called when the contract is deployed. It accepts an _unlockTime parameter (a UNIX timestamp) and does the following:
      - Ensures that the _unlockTime is in the future (require(block.timestamp < _unlockTime)).
      - Sets the unlockTime to the provided _unlockTime.
      - Sets the owner to the address that deploys the contract (msg.sender).
        
      The payable keyword indicates that the constructor can receive Ether, meaning you can send ETH to the contract during deployment. The Ether value is set automatically by EVM into this contract's balance.
    */
    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /* The withdraw() function allows the owner to withdraw the contract's balance. However, there are two conditions that must be met:
      (1) Condition 1: The current block timestamp must be equal to or greater than the unlockTime. This ensures the funds are locked until the specified unlock time.
      (2) Condition 2: The caller of the function (msg.sender) must be the contract owner (the person who deployed the contract).
      If both conditions are satisfied:
        - The contract emits the Withdrawal event to record the withdrawal action.
        - The contract transfers its entire balance to the owner's address (owner.transfer(address(this).balance)). */
    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        // balance is built-in property of a contract
        owner.transfer(address(this).balance);
    }
}

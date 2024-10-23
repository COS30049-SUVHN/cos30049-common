// SPDX-License-Identifier: MIT
// version 0.8.x has automatic overflow check!
  // pragma solidity ^0.8.0;
// version 0.7.x does NOT have automatic overflow check!
pragma solidity ^0.7.6;

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    /* DANGER: integer overflow */
    function increaseLockTime(uint _secondsToIncrease) public {
        // integer overflow => LHS exceed MAX uint => lockTime[msg.sender] > 1 week (limit)
        /* unchecked { // v0.8.0: needs to "unchecked" to have the effect
          lockTime[msg.sender] += _secondsToIncrease;
        } */

       /* version < 0.8.0: does not have the automatic overflow check */
       lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(
            block.timestamp > lockTime[msg.sender],
            "Lock time not expired"
        );

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

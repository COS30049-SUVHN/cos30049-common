// Import the Hardhat runtime environment
const { ethers }  = require("hardhat");

async function main() {
    // Get the contract address (replace with actual deployed address)
    const contractAddress = "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650";

    // Get the contract factory and attach it to the deployed contract
    const Contract = await ethers.getContractFactory("Attack");
    const contract = await Contract.attach(contractAddress);

    // Get the list of available accounts (for testing)
    const [owner, account1] = await ethers.getSigners();

    console.log("Invoking Attack code...");
    const result = await contract.externalFunction(owner.address); 
    console.log(`External function invoked: ${result.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

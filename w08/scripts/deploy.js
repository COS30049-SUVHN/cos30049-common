// Import the Hardhat runtime environment
const hre = require("hardhat");

async function main() {
    // Step 1: Get the contract name from the command line argument
    // const contractName = process.argv[2];  // The contract name is the third argument in the command line (index 2)
    const contractName = process.env.Contract;  // Get the contract name from environment variables

    // Check if the contract name was provided
    if (!contractName) {
        console.error("Error: No contract name provided.");
        console.error("Usage: Contract=<ContractName> npx hardhat run scripts/deploy.js --network localhost");
        process.exit(1);
    }

    // Step 2: Compile and deploy the contract
    try {
        console.log(`Deploying contract: ${contractName}`);

        // Step 3: Get the contract factory (based on the provided contract name)
        const Contract = await hre.ethers.getContractFactory(contractName);

        // Step 4: Deploy the contract
        const contractInstance = await Contract.deploy();

        // Wait for the deployment to finish
        console.log("Waiting for deployment...");
        await contractInstance.waitForDeployment();

        // Step 5: Output the contract's address
        console.log(`${contractName} deployed to:`, contractInstance.target);
    } catch (error) {
        console.error(`Error: Failed to deploy contract ${contractName}`, error);
        process.exit(1);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

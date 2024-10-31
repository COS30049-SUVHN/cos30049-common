const hre = require("hardhat");

/* A generic deploy function that deploys the specified contract 
    to a target address (if specified)
 */
async function deploy(contractName, deployAddress) {
  console.log(`Deploying contract: ${contractName}`);

  // Get the contract factory
  const ContractFactory = await hre.ethers.getContractFactory(contractName);

  // Deploy the contract with or without the deployAddress argument
  let contract;
  if (deployAddress) {
      contract = await ContractFactory.deploy(deployAddress);
      console.log(`Deploying ${contractName} (at ${deployAddress})`);
  } else {
      contract = await ContractFactory.deploy();
      console.log(`Deploying ${contractName}...`);
  }
 
  // Wait for the contract deployment to complete
  await contract.waitForDeployment();

  // Log the deployed contract address
  const contractAddr = contract.target;
  console.log(`${contractName} deployed at: ${contractAddr}`);

  return contractAddr;
}

// Main function that retrieves 2 contract name arguments and calls deploy
async function main() {
  const contract = "MyContract";

  const addr = await deploy(contract);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

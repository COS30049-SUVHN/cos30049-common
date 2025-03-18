const hre = require("hardhat");
const fs = require('fs');

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
  const contract = process.env.Contract;
  const contractAttacker = process.env.ContractAttacker;

  if (!contract || !contractAttacker) {
    console.error("Error: Two contract names required.");
    console.error("Usage: Contract=<ContractName> ContractAttacker=<AttackerContractName> npx hardhat run scripts/deployTwo.js --network localhost");
    process.exit(1);
  }

  const contractAddr = await deploy(contract);

  const attackerAddr = await deploy(contractAttacker, contractAddr);

  // Step 3: Save deployed addresses to a JSON file for use in invoke.js
  const addresses = {
    contractAddress: contractAddr,
    attackerAddress: attackerAddr
  };
  const fileName = "deployedAddresses_"+contract+".json";
  fs.writeFileSync(fileName, JSON.stringify(addresses, null, 2));
  console.log(`Deployment addresses saved to ${fileName}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// export for reuse
module.exports = { deploy };

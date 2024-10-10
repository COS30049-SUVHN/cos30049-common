async function main() {
  // Get the contract factory for SolidityAdvanced
  const SolidityAdvanced = await ethers.getContractFactory("SolidityAdvanced");

  // Deploy the contract
  const solidityAdvanced = await SolidityAdvanced.deploy();

  // Wait for the contract to be mined
  console.log("Waiting for deployment...");
  await solidityAdvanced.waitForDeployment();

  console.log("SolidityAdvanced contract deployed to:", solidityAdvanced.target);  // For Ethers v6, use `target` instead of `address`
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

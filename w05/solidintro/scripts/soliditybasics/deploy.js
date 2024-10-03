async function main() {
  // Get the contract factory for SolidityBasics
  const SolidityBasics = await ethers.getContractFactory("SolidityBasics");

  // Deploy the contract
  const solidityBasics = await SolidityBasics.deploy();

  // Wait for the contract to be mined
  console.log("Waiting for deployment...");
  await solidityBasics.waitForDeployment();

  console.log("SolidityBasics contract deployed to:", solidityBasics.target);  // For Ethers v6, use `target` instead of `address`
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

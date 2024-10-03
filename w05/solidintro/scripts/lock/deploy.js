async function main() {
  const [deployer] = await ethers.getSigners();  // Get the deployer account
  console.log("Deploying contracts with the account:", deployer.address);

  const unlockTime = Math.floor(Date.now() / 1000) + 60;  // Set unlock time to 1 minute in the future
  const value = ethers.parseUnits("1", "ether");  // Send 1 ETH during deployment

  const Lock = await ethers.getContractFactory("Lock");  // Get contract factory
  const lock = await Lock.deploy(unlockTime, { value });  // Deploy contract with unlock time and ETH

  console.log("Waiting for deployment...");
  await lock.waitForDeployment();

  console.log("Lock contract deployed to:", lock.target);
  console.log("Unlock time:", unlockTime);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

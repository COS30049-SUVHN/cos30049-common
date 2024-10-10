async function main() {


  const StringsUsage = await hre.ethers.getContractFactory("StringsUsage");
  const contract = await StringsUsage.deploy();

  console.log("Waiting for deployment...");
  // await helloWorld.deployed();
  await contract.waitForDeployment();

  console.log("StringsUsage contract deployed to:", contract.target);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

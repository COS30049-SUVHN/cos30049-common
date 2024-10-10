async function main() {
  const [deployer] = await ethers.getSigners();

 // @requires: erc721token contract has been deployed to the specified address
 const erc721Address = "0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9"; // Address from previous deployment
 
 const InteractBAYC = await ethers.getContractFactory("InteractBAYC");
  const interactBAYC = await InteractBAYC.deploy(erc721Address);

 // Wait for the contract to be mined
 console.log("Waiting for deployment...");
 await interactBAYC.waitForDeployment();

  console.log("interactBAYC deployed to:", interactBAYC.target);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

async function main() {
  const ERC721Token = await ethers.getContractFactory("ERC721Token");
  const erc721 = await ERC721Token.deploy();

  // Wait for the contract to be mined
  // await erc721.deployed();
  console.log("Waiting for deployment...");
  await erc721.waitForDeployment();

  console.log("ERC721 Token deployed to:", erc721.target);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

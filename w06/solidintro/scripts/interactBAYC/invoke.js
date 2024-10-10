async function main() {
  const [owner, user1, user2] = await ethers.getSigners(); // Get test accounts

  // Address of the deployed InteractBAYC contract (replace with your actual deployed address)
  const interactBAYCAddress = "0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B";

  // Attach the deployed InteractBAYC contract
  const InteractBAYC = await ethers.getContractFactory("InteractBAYC");
  const interactBAYC = await InteractBAYC.attach(interactBAYCAddress);

  // Address of the deployed ERC721 token contract (replace with your actual ERC721 address)
  const erc721Address = "0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9";

  // Attach the deployed ERC721 token contract for minting
  const ERC721Token = await ethers.getContractFactory("ERC721Token");
  const erc721 = await ERC721Token.attach(erc721Address);

  // Mint a new token to user1 (ERC721 mint function)
  const tokenId = 1;
  let tx = await erc721.connect(owner).mint(user1.address, tokenId);
  await tx.wait();
  console.log(`Minted token ${tokenId} to user1: ${user1.address}`);

  // Query user1's BAYC balance (should be 1 after minting)
  let balance = await interactBAYC.balanceOfBAYC(user1.address);
  console.log(`Balance of user1: ${balance.toString()}`);

  // Safe transfer tokenId 1 from user1 to user2
  tx = await erc721.connect(user1).approve(interactBAYCAddress, tokenId);  // Approve InteractBAYC to transfer the token
  await tx.wait();
  console.log(`Approved InteractBAYC to transfer token ${tokenId}`);

  tx = await interactBAYC.safeTransferFromBAYC(user1.address, user2.address, tokenId);
  await tx.wait();
  console.log(`Transferred token ${tokenId} from user1 to user2`);

  // Query user2's BAYC balance (should be 1 after the transfer)
  balance = await interactBAYC.balanceOfBAYC(user2.address);
  console.log(`Balance of user2: ${balance.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });

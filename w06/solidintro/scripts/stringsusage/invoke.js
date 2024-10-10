async function main() {
  const [deployer] = await ethers.getSigners();  // Get the deployer account

  // Address of the deployed StringsUsage contract (replace with your actual deployed address)
  const stringsUsageAddress = "0x19cEcCd6942ad38562Ee10bAfd44776ceB67e923";

  // Attach the deployed contract
  const StringsUsage = await ethers.getContractFactory("StringsUsage");
  const stringsUsage = await StringsUsage.attach(stringsUsageAddress);

  // Example 1: Call numberToString
  const number = 123;
  const numberAsString = await stringsUsage.numberToString(number);
  console.log(`Number ${number} as string: ${numberAsString}`);

  // Example 2: Call tokenURI with a base URI and token ID
  const baseURI = 
  // a well-known public token URI is from CryptoKitties, one of the first and most popular NFT (ERC721) projects
  "https://api.cryptokitties.co/kitties/1"
  // example test uri
  // "https://example.com/token/";
  const tokenId = 1;
  const tokenURI = await stringsUsage.tokenURI(baseURI, tokenId);
  console.log(`Generated tokenURI: ${tokenURI}`);

  // Example 3: Call numberToHexString
  const hexNumber = 255;
  const hexString = await stringsUsage.numberToHexString(hexNumber);
  console.log(`Number ${hexNumber} as hexadecimal string: ${hexString}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });

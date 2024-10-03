async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace this with your deployed contract's address
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = HelloWorld.attach(contractAddress);

  const greeting = await helloWorld.greet();
  console.log("Greeting from the contract:", greeting);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

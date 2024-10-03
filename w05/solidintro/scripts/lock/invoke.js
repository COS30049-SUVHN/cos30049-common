async function main() {
  const [deployer] = await ethers.getSigners();  // Get the deployer account

  // Replace with your contract's deployed address
  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";  

  const Lock = await ethers.getContractFactory("Lock");
  const lock = Lock.attach(contractAddress);  // Attach to deployed contract

  // Check the unlock time and block timestamp
  const unlockTime = await lock.unlockTime();
  console.log("Contract unlock time:", unlockTime.toString());
  console.log("Current block timestamp:", Math.floor(Date.now() / 1000));

  try {
      const tx = await lock.withdraw();  // Attempt to withdraw
      await tx.wait();  // Wait for transaction to be mined
      console.log("Withdrawal successful!");
  } catch (error) {
      console.error("Error during withdrawal:", error);
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

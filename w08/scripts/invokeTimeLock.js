// Import the Hardhat runtime environment
const { ethers }  = require("hardhat");

async function main() {
    // Get the contract address (replace with actual deployed address)
    const contractAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";

    // Get the contract factory and attach it to the deployed contract
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const timeLock = await TimeLock.attach(contractAddress);

    // Get the list of available accounts (for testing)
    const [owner, account1] = await ethers.getSigners();

    // Action 1: Deposit Ether into the contract
    async function depositEther() {
        console.log("Depositing Ether...");
        const depositTx = await timeLock.deposit({ value: ethers.parseEther("1.0") }); // Deposit 1 Ether
        await depositTx.wait();  // Wait for transaction confirmation
        console.log("1 Ether deposited.");
    }

    // Action 2: Increase lock time
    async function increaseLockTime(seconds) {
        console.log(`Increasing lock time by ${seconds} seconds...`);
        const increaseTx = await timeLock.increaseLockTime(seconds);
        await increaseTx.wait();  // Wait for transaction confirmation

        console.log(`Lock time increased by ${seconds} seconds.`);

        // Immediately check the updated lock time
        const updatedLockTime = await timeLock.lockTime(owner.address);
        console.log(`Updated lock time: ${updatedLockTime.toString()}`);
    }

    // Action 3: Withdraw funds
    async function withdrawFunds() {
        console.log("Attempting to withdraw funds...");
        const withdrawTx = await timeLock.withdraw();
        await withdrawTx.wait();  // Wait for transaction confirmation
        console.log("Funds withdrawn.");
    }

    // INTEGER OVERFLOW: exception should be raised here!
    async function increaseLockTimeOverflow() {
      // Test with a large value to cause integer overflow
      const largeValue = ethers.MaxUint256 - 10000n;  // Maximum possible value for uint256
      await increaseLockTime(largeValue);  
    }

    // INTEGER UNDERFLOW: exception should be raised here!
    async function increaseLockTimeUnderflow() {
      // Test with a very small value to cause integer underflow
      const value = 
        // ethers.MinInt256
        ethers.MaxUint256 + 1n - (await timeLock.lockTime(owner.address))
      ; 

      await increaseLockTime(value);  
    }

    // Example invocations (uncomment the actions you want to test)
    await depositEther();                 // Depositing 1 Ether

    // normal lock time (1 day)
    const daySecs = 60 * 60 * 24;
    await increaseLockTime(daySecs); // Increase lock time by 1 day (86400 seconds)
    
    /////////////////////////////////////////////////////////////
    // INTEGER OVERFLOW: exception should be raised here!
    // Test with a large value to cause integer overflow
    // await increaseLockTimeOverflow(); 

    /////////////////////////////////////////////////////////////
    // INTEGER UNDERFLOW: exception should be raised here!
    await increaseLockTimeUnderflow(); 

    /////////////////////////////////////////////////////////////
    // FUND Withdrawal
    // await withdrawFunds();     // Withdraw funds (only works after the lock time has passed)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

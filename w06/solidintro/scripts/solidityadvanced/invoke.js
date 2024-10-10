// Script to invoke functions from SolidityAdvanced.sol contract
async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0x38a024C0b412B9d1db8BC398140D00F5Af3093D4";
  
  const SolidityAdvanced = await ethers.getContractFactory("SolidityAdvanced");
  const solidityAdvanced = await SolidityAdvanced.attach(contractAddress);

  ////// SolidityBasics functions
  // read initial values
  await testNumericTypes(solidityAdvanced);
  await testBooleanType(solidityAdvanced);

  // update values
  await setNumericTypes(solidityAdvanced);
  await setBooleanType(solidityAdvanced);

  // read values again to confirm
  await testNumericTypes(solidityAdvanced);
  await testBooleanType(solidityAdvanced);

  // other types
  await testAddress(solidityAdvanced);
  await testArray(solidityAdvanced);
  await testEnum(solidityAdvanced);
  await testStruct(solidityAdvanced);
  await testControlFlow(solidityAdvanced);

  ////// Solidity advanced functions
  await testMapping(solidityAdvanced);
  await testSetAndGet(solidityAdvanced);
  await testRestrictedFunction(solidityAdvanced);
  await testCheckNumberRange(solidityAdvanced);
}
/// SolidityAdvanced testing

// Function to test error handling
async function testCheckNumberRange(contract) {
  // Valid case: number within the range (10 <= number <= 100)
  console.log("Testing checkNumberRange() with valid number...");
  try {
      const tx = await contract.checkNumberRange(50);  // A number within the valid range
      // valid case do not return a transaction object
      // no need ==> await tx.wait();  
      console.log("Valid number 50 passed checkNumberRange.");
  } catch (error) {
      console.error("Valid number failed in checkNumberRange:", error);
  }

  // Invalid case: number below the range (number < 10)
  console.log("Testing checkNumberRange() with invalid number (too low)...");
  try {
      const tx = await contract.checkNumberRange(5);  // A number below the range
      await tx.wait();
      console.log("Invalid number (too low) should have failed, but passed.");
  } catch (error) {
      console.error("Number 5 (too low) failed as expected:", error.message);
  }

  // Invalid case: number above the range (number > 100)
  console.log("Testing checkNumberRange() with invalid number (too high)...");
  try {
      const tx = await contract.checkNumberRange(150);  // A number above the range
      await tx.wait();
      console.log("Invalid number (too high) should have failed, but passed.");
  } catch (error) {
      console.error("Number 150 (too high) failed as expected:", error.message);
  }
}

// Function to test mapping: updated for overloading
async function testMapping(contract) {
  // NOTE: overloading functions: requires specifying the function header of the 
  // invoked function (to avoide "unambiguous function error on invocation")

  // error: await contract.updateBalance("0x1234567890123456789012345678901234567890", 500);
  await contract["updateBalance(address, uint256)"]("0x1234567890123456789012345678901234567890", 500);
  
  const balance = await contract.getBalance("0x1234567890123456789012345678901234567890");
  console.log("Balance:", balance.toString());
}

// Function to test the function inherited from the 2nd contract
async function testSetAndGet(contract) {
  const value = 2024;
  const setAndGet = await contract.setAndGetExtraValue(value);
  await setAndGet.wait();  // Wait for transaction to be mined

  const result = await contract.extraValue();

  console.log("Extra value set: " + result.toString());
}

// Restricted function
async function testRestrictedFunction(contract) {
  const [owner, nonOwner] = await ethers.getSigners();  // Get owner and another address

  console.log("Testing restrictedFunction() with owner...");
  // Valid case: Call restrictedFunction from the owner account
  try {
      const tx = await contract.connect(owner).restrictedFunction();
      await tx.wait();  // Wait for the transaction to be mined
      console.log("Owner successfully called restrictedFunction.");
  } catch (error) {
      console.error("Owner failed to call restrictedFunction:", error);
  }

  console.log("Testing restrictedFunction() with non-owner...");
  // Invalid case: Call restrictedFunction from a non-owner account
  try {
      const tx = await contract.connect(nonOwner).restrictedFunction();
      await tx.wait();  // Wait for the transaction to be mined
      console.log("Non-owner should not be able to call restrictedFunction, but it succeeded.");
  } catch (error) {
      console.error("Non-owner failed to call restrictedFunction as expected:", error.message);
  }
}


////// SolidityBasics testing
// Function to set numeric types (uint and int)
async function setNumericTypes(contract) {
  const setUintTx = await contract.setUintValue(500);  // Set uintValue to 500
  await setUintTx.wait();  // Wait for transaction to be mined

  const setIntTx = await contract.setIntValue(-200);  // Set intValue to -200
  await setIntTx.wait();  // Wait for transaction to be mined

  console.log("Numeric values set: uintValue = 500, intValue = -200");
}

// Function to set boolean type
async function setBooleanType(contract) {
  const setBoolTx = await contract.setBooleanValue(false);  // Set isTrue to false
  await setBoolTx.wait();  // Wait for transaction to be mined

  console.log("Boolean value set: isTrue = false");
}

// Function to test numeric types
async function testNumericTypes(contract) {
  const uintValue = await contract.uintValue();
  const intValue = await contract.intValue();
  console.log("Uint value:", uintValue.toString());
  console.log("Int value:", intValue.toString());
}

// Function to test boolean type
async function testBooleanType(contract) {
  const isTrue = await contract.isTrue();
  console.log("Boolean value (isTrue):", isTrue);
}

// Function to test address type (owner)
async function testAddress(contract) {
  const owner = await contract.owner();
  console.log("Owner address:", owner);
}

// Function to test arrays
async function testArray(contract) {
  await contract.addToDynamicArray(10);
  await contract.addToDynamicArray(20);
  const dynamicArray = await contract.getDynamicArray();
  console.log("Dynamic Array:", dynamicArray.map(e => e.toString()));
}

// Function to test enum
async function testEnum(contract) {
  await contract.setStatus(1);  // Set to Active (index 1 in the enum)
  const status = await contract.getStatus();
  console.log("Current Status (enum):", status);
}

// Function to test struct
async function testStruct(contract) {
  await contract.setPerson("Alice", 30, "0x1234567890123456789012345678901234567890");
  const person = await contract.getPerson();
  console.log("Person Name:", person[0]);
  console.log("Person Age:", person[1].toString());
  console.log("Person Wallet Address:", person[2]);
}

// Function to test control flow (if-else and loop)
async function testControlFlow(contract) {
  const checkPositive = await contract.checkIfPositive(10);
  console.log("Check if Positive:", checkPositive);

  const sum = await contract.sumArray([1, 2, 3, 4, 5]);
  console.log("Sum of Array:", sum.toString());
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

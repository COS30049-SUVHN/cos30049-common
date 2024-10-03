// Script to invoke functions from SolidityBasics.sol contract
async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
  
  const SolidityBasics = await ethers.getContractFactory("SolidityBasics");
  const solidityBasics = await SolidityBasics.attach(contractAddress);

  // Test different functions

  // read initial values
  await testNumericTypes(solidityBasics);
  await testBooleanType(solidityBasics);

  // update values
  await setNumericTypes(solidityBasics);
  await setBooleanType(solidityBasics);

  // read values again to confirm
  await testNumericTypes(solidityBasics);
  await testBooleanType(solidityBasics);

  // other types
  await testAddress(solidityBasics);
  await testArray(solidityBasics);
  await testEnum(solidityBasics);
  await testStruct(solidityBasics);
  await testMapping(solidityBasics);
  await testControlFlow(solidityBasics);
}

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

// Function to test mapping
async function testMapping(contract) {
  await contract.updateBalance("0x1234567890123456789012345678901234567890", 500);
  const balance = await contract.getBalance("0x1234567890123456789012345678901234567890");
  console.log("Balance:", balance.toString());
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

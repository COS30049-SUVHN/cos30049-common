Week 5: Introduction to Solidity
============================================

# Introduction to Solidity

## LinkedIn Course
Use the following LinkedIn learning course to interactively learn the lecture slide content. The course has similar content.

**Learning Video**: [[LinkedIn Learning] Blockchain: Learning Solidity](https://www.linkedin.com/learning/blockchain-learning-solidity-22873764)
- **Duration**: 1h 8mins
- **Chapters**: 1-4
- **Development IDE**: one of these
  - VS code with Solidity extension
  - [Remix](https://remix.ethereum.org)

## Solidity documentation
- Doc: https://docs.soliditylang.org/en/latest/
  - doc by version, e.g. 0.8.27 => https://docs.soliditylang.org/en/v0.8.27/
- Data types: https://docs.soliditylang.org/en/latest/types.html


# Development environment for testing smart contracts
There are two options:
1. Simple: use Remix
2. More technical but useful for project development later: use local test network.
  
## Remix
- [Remix](https://remix.ethereum.org) has an online test network for testing.

## Local test Ethereum network

To create a local Ethereum network to test your `solidintro` smart contract, you can use the [**Hardhat**](https://hardhat.org/) development environment, which is widely used for Ethereum smart contract development and testing. Hardhat provides a built-in local Ethereum node, allowing you to deploy and interact with smart contracts locally.

### Summary of Steps:

1. **Install Hardhat**: Set up Hardhat as the development environment.
2. **Create a Solidity Contract**: Write the `solidintro` smart contract.
3. **Compile the Contract**: Use Hardhat to compile the contract.
4. **Deploy the Contract**: Write and run a deployment script to deploy the contract on a local Ethereum network.
5. **Start a Local Node**: Use Hardhat's built-in Ethereum node.
6. **Interact with the Contract**: Write and run a script to invoke the contract's functions.

This setup will allow you to test your Ethereum smart contracts in a local development environment.

### 1. Install Prerequisites

Make sure you have Node.js and npm installed. You can verify the installation by running:

```bash
node -v
npm -v
```

If they are not installed, follow the instructions on [Node.js](https://nodejs.org/) to install them.

### 2. Install Hardhat

Navigate to your project folder or create a new one:

```bash
mkdir solidintro
cd solidintro
```

Then install Hardhat in your project folder:

```bash
npm install --save-dev hardhat
```

### 3. Create a Hardhat Project

Initialize a new Hardhat project by running the following command:

```bash
npx hardhat init
```

Select the option to **Create a basic sample project** and follow the prompts. This will set up a basic Hardhat environment with necessary files.

### 4. Create the `HelloWorld.sol` Smart Contract

1. In the `contracts/` directory created by Hardhat, create a new file called `HelloWorld.sol`:

```bash
touch contracts/HelloWorld.sol
```

2. Open the file and add your "Hello World" smart contract code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    function greet() public pure returns (string memory) {
        return "Hello, World!";
    }
}
```

#### 5. Compile the Contract

Compile the `HelloWorld` contract using the Hardhat compile command:

```bash
npx hardhat compile
```

This will compile your contract and generate the necessary artifacts.

#### 6. Write a Deployment Script

You need a script to deploy your contract to the local Ethereum network.

1. Create a new script called `deploy.js` in the `scripts/helloworld` directory:

   ```bash
   touch scripts/deploy.js
   ```

2. Add the following code to the `deploy.js` file to deploy the `HelloWorld` contract:

   ```javascript
   async function main() {
       const HelloWorld = await ethers.getContractFactory("HelloWorld");
       const helloWorld = await HelloWorld.deploy();

       console.log("Waiting for deployment...");
       await helloWorld.waitForDeployment();

       console.log("HelloWorld contract deployed to:", helloWorld.target);
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
         console.error(error);
         process.exit(1);
     });
   ```

#### 7. Start a Local Ethereum Node

To test the smart contract, you need to run a local Ethereum network. Hardhat provides this with its built-in Hardhat Network.

Run the following command to start a local Ethereum node:

```bash
npx hardhat node
```

This will start a local blockchain and display accounts with their private keys.

#### 8. Deploy the Contract to the Local Network

With the local Ethereum node running, open a new terminal window and deploy the contract to the network:

```bash
npx hardhat run scripts/helloworld/deploy.js --network localhost
```

You should see the contract's address printed in the console after the deployment is successful.

#### 9. Interact with the Smart Contract

1. Create a new script in the `scripts/helloworld/` folder called `invoke.js`:

   ```bash
   touch scripts/invoke.js
   ```

2. Add the following code to the `invoke.js` script to call the `greet` function from the deployed contract:

   ```javascript
   async function main() {
       const [deployer] = await ethers.getSigners();

       // Replace this with your deployed contract's address
       const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
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
   ```

3. Replace `YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE` with the contract address printed when you deployed it in the previous step.

4. Run the `invoke.js` script to interact with the deployed contract:

```bash
npx hardhat run scripts/helloworld/invoke.js --network localhost
```

You should see the output:

```bash
Greeting from the contract: Hello, World!
```

# `Lock.sol` contract
The default contract provided with the project is `contracts/Lock.sol`. 

Refer to the added comments in the file for detailed explanation of this contract.

Apply the last two steps of the `HelloWorld` example above to deploy and run this contract on the local test network. 
- You will need to first create in the `scripts/lock` folder the two scripts `deploy.js` and `invoke.js`
- Run these scripts to deploy and execute the contact.

# Solidity basics
A simple Solidity contract named `SolidityBasics` that demonstrates basic value types (numeric, boolean, address, array, enumeration, struct, and mapping), control flow (conditional `if` statements, loops), and basic functions:

This contract serves as a comprehensive demonstration of Solidity's fundamental constructs, making it useful for learning and understanding the basic types and control structures available in the language.

### Solidity Contract: `SolidityBasics.sol`

See `contracts/SolidityBasics.sol`.

### Breakdown of the Contract:

1. **Basic Value Types**:
   - **Numeric Types**: Demonstrates `uint`, `int`, and smaller `uint8` types.
   - **Boolean**: A boolean variable (`isTrue`) to store a true/false value.
   - **Address**: The address of the owner is stored in the contract.

2. **Array Types**:
   - **Fixed Array**: A fixed-size array `fixedArray` of `uint` with five elements.
   - **Dynamic Array**: A dynamically-sized array `dynamicArray` to which you can add elements.

3. **Enumeration (Enum)**:
   - An `enum` named `Status` with values `Inactive`, `Active`, and `Suspended`. The `currentStatus` variable holds the current state.

4. **Struct**:
   - A `struct` named `Person` containing a `name`, `age`, and `wallet` address.
   - Functions `setPerson` and `getPerson` demonstrate how to store and retrieve the struct.

5. **Mapping**:
   - A `mapping` from an Ethereum address to a `uint` representing a balance.
   - The `updateBalance` and `getBalance` functions demonstrate how to modify and retrieve balances.

6. **Control Flow**:
   - **If-Else**: The `checkIfPositive` function uses an `if-else` statement to check if a number is positive, zero, or negative.
   - **For Loop**: The `sumArray` function demonstrates a `for` loop to sum up all elements in a dynamic array passed as an argument.

7. **Functions**:
   - There are various functions to interact with the different data types:
     - `checkIfPositive` for conditionals.
     - `sumArray` for loops.
     - `setPerson`, `getPerson` to manage struct data.
     - `setStatus`, `getStatus` to interact with enums.
     - `addToDynamicArray`, `getDynamicArray` for dynamic arrays.
     - `updateBalance`, `getBalance` for working with mappings.
     - `onlyOwnerAction` for a function that demonstrates ownership control.

### How to Use:

- **Setting Data**: 
   - Use `setPerson` to set the details of a person.
   - Use `setStatus` to update the status.
   - Use `addToDynamicArray` to add values to the dynamic array.
   - Use `updateBalance` to set balances for different addresses.

- **Retrieving Data**:
   - Use `getPerson` to retrieve details of the person.
   - Use `getStatus` to check the current status.
   - Use `getDynamicArray` to see the current state of the dynamic array.
   - Use `getBalance` to view the balance for a given address.

- **Owner-Only Action**:
   - The `onlyOwnerAction` function can only be successfully called by the owner who deployed the contract. This demonstrates basic access control.

# Testing a contract

`npx hardhat test`

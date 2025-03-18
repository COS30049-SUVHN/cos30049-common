How to use the scripts:
===========================

- `deployTk.js`: deploy two contracts and outputs their deployed addresses to a file
- `invokeX.js`: reads the deployed addresses from the file and execute the invocation functions. This script has been enhanced from the previous week such that you do not need to copy-and-paste the deployed contract addresses from the console. 

1. Ensure hardhat test network is running
2. Run `scripts/deployTk.js` to deploy the contracts. This saves the deployed addresses to json file for reading later. 

```bash
$ Contract=Missing ContractAttacker=Attacker npx hardhat run scripts/deployTk.js --network localhost

contracts/Missing.sol:16:24: Warning: Using contract member "balance" inherited from the address type is deprecated. Convert the contract to "address" type to access the member, for example use "address(contract).balance" instead.
        owner.transfer(this.balance);
                       ^----------^

Compiled 2 Solidity files successfully (evm target: unknown evm version for solc version 0.4.24).
Deploying contract: Missing
Missing deployed at: 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf
Deploying contract: Attacker
Deploying Attacker (at 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf)
Attacker deployed at: 0x0E801D84Fa97b50751Dbf25036d067dCf18858bF
Deployment addresses saved to deployedAddresses_Missing.json
```

3. Run `scripts/invokeMissing.js` to execute the attack
```bash
$  npx hardhat run  scripts/invokeMissing.js --network localhost 
Using contract address: 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf
Using Attacker address: 0x0E801D84Fa97b50751Dbf25036d067dCf18858bF
Funding Missing contract...
Initial Missing contract balance: 1.0 ETH
Attacker taking ownership...
Attacker withdrawing funds...
Final Missing contract balance: 0.0 ETH
Attacker contract balance after withdraw: 6.0 ETH
```
Lecture 8 - SmartContract Security Audit: Introduction
------------------------------------------------------

1. Create a generic `deploy.js` script for all smart contracts
2. Security vulnerability:
   - integer overflow
   - integer underflow

## Integer overflow, underflow
**Contract**: `./solidvulner/contracts/TimeLock.sol`

**Affected Solidity versions**: earlier than `0.8.0`

1. Automatic overflow check is not supported in Solidity earlier than version 0.8.0
2. To test the condition requires **Solidity v0.7.6** or earlier

## Default function visibility

**Contract**: `./solidvulner/contracts/RandomContract.sol`

**Affected Solidity versions**: earlier than `0.5.0`

### Deployment
This file consists of 2 contracts: `RandomContract`, `Attack`. The second references the first and thus requires a 2-step deployment: 
- deploy `RandomContract` and note its deployed target address
```solidity
$ Contract=RandomContract npx hardhat run scripts/deploy.js --network localhost

Deploying contract: RandomContract
Waiting for deployment...
RandomContract deployed to: 0x7969c5eD335650692Bc04293B07F5BF2e7A673C0
```

- deploy `Attack`, passing in `RandomContract`'s deployed address as argument:
```solidity
$ Contract=Attack ArgAddress=0x7969c5eD335650692Bc04293B07F5BF2e7A673C0 npx hardhat run scripts/deployWithArgAddress.js --network localhost

Deploying contract: Attack
Waiting for deployment...
Attack deployed to: 0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650
```

### Invocation
Then update the `contractAddress` in `scripts/invokeAttack.js`  and invoke it to observe:

```solidity
$ npx hardhat run scripts/invokeAttack.js --network localhost

Invoking Attack code...
External function invoked: Internal function exposed as public!
```

## Setting command arguments 
In a Windows environment (using **Command Prompt** or **PowerShell**), the syntax for setting environment variables is different from Linux-based systems.

Here’s how you can convert your command to work in **Windows Command Prompt** and **PowerShell**:

### 1. **For Command Prompt (cmd.exe)**:
In the Windows Command Prompt, environment variables are set using the `set` command, and it must be done in a separate line before running the script.

```bash
set Contract=RandomContract && npx hardhat run scripts/deploy.js --network localhost
```

- **Explanation**:
  - `set Contract=RandomContract`: Sets the environment variable `Contract` to `RandomContract`.
  - `&&`: Ensures that the `npx hardhat` command runs only if setting the environment variable succeeds.

### 2. **For PowerShell**:
In PowerShell, you can set environment variables by assigning them using `$env:`.

```bash
$env:Contract="RandomContract"; npx hardhat run scripts/deploy.js --network localhost
```

- **Explanation**:
  - `$env:Contract="RandomContract"`: Sets the environment variable `Contract` to `RandomContract` for the current session.
  - The semicolon (`;`) separates multiple commands in PowerShell.

### Summary:
- **For Command Prompt**: Use `set Contract=TimeLock && npx hardhat run...`.
- **For PowerShell**: Use `$env:Contract="TimeLock"; npx hardhat run...`.

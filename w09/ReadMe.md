Week 09: Interact with Smart Contracts & Error Handling
================================

# Overview
## Backend
- Extend your previous week's backend with error handling feature of Python.

**Folder** `./be`:
- `dapp`: implements `MyContract.sol` for testing. The contract is compiled to the `artifacts` subfolder, which is read by the python script
- `checkTxReceipt.py`: loads `MyContract.sol` from `dapp`, connect to it and execute the function `doSomething`. This functions fires an event named `MyEvent`, which is then detected by the python script.
- `errorHandling.py`: an independent Python script to demonstrates how to perform exception/error handling in the Python backend.

# HardHat configuration
**Network url**: http://127.0.0.1:8545/
**Chain-id**: 31337

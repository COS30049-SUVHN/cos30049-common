import time
import json
from web3 import Web3

# Initialize the Web3 connection
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
chain_id = 31337

# Load the contract ABI and address
with open('./dapp/artifacts/contracts/MyContract.sol/MyContract.json') as f:
    contract_data = json.load(f)

abi = contract_data['abi']
# Replace with actual deployed contract address
contract_address = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

# Initialize the contract
contract = w3.eth.contract(address=contract_address, abi=abi)

# Define the account and private key for signing the transaction
from_account = w3.eth.accounts[0]  # Use funded Hardhat account
# Replace with the account's private key
private_key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

transaction = contract.functions.doSomething(42).build_transaction(
  {
      "chainId": chain_id,
      "from": from_account,
      'nonce': w3.eth.get_transaction_count(from_account),
      "gasPrice": w3.eth.gas_price,
  }
)

signed_txn = w3.eth.account.sign_transaction(
    transaction, private_key=private_key)
tx_hash = w3.eth.send_raw_transaction(
    signed_txn.raw_transaction)
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

if receipt is not None:
    if receipt['status'] == 1:
        print("Transaction successful")
    else:
        print("Transaction failed")
else:
    print("Transaction has not been confirmed yet")

# Detect MyEvent and display its information
event_filter = contract.events.MyEvent.create_filter(from_block='latest')

event_logs = event_filter.get_new_entries()

for event in event_logs:
    print("New event:", event['args'])

# Alternative: Decode logs to check for MyEvent
# try:
#     logs = contract.events.MyEvent().process_receipt(receipt)
#     if logs:
#         for log in logs:
#             print("MyEvent detected!")
#             print("Event value:", log['args']['value'])
#     else:
#         print("No MyEvent logs found in the receipt.")
# except Exception as e:
#     print(f"Error processing logs: {e}")

pragma solidity ^0.8.20;

contract VulnerableRelayer {
    mapping(uint256 => bool) public executed;

    
    function relay(address target, bytes calldata data, uint256 txId) public {
        require(!executed[txId], "Already executed");

        // Forward the call with all remaining gas
        target.call(data);  // May fail silently

        // Mark as executed even if call failed
        executed[txId] = true;
    }
}

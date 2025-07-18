pragma solidity ^0.8.20;

contract SecuredRelayer {
    mapping(uint256 => bool) public executed;

    // secured relay: check gas and target call status
    function relay(address target, bytes calldata data, uint256 txId) public {
      require(!executed[txId], "Already executed");

      require(gasleft() > 50000, "Insufficient gas for call");  // Minimum safe gas

      (bool success, ) = target.call(data);

      require(success, "Sub-call failed");    // prevent griefing

      executed[txId] = true;
    }
}

pragma solidity ^0.8.20;

contract SecureBet {
    struct Bet {
        uint256 amount;
        uint256 blockNumber;
        bool resolved;
    }

    mapping(address => Bet) public bets;

    // phase 1: Register user and block number
    function placeBet() public payable {
        require(msg.value >= 1 ether, "Minimum bet 1 ETH");
        bets[msg.sender] = Bet(msg.value, block.number + 1, false);
    }

    // phase 2: checks bet and computes randomness using future block hash
    function resolveBet() public {
        Bet storage bet = bets[msg.sender];
        require(!bet.resolved, "Bet already resolved");

        // bet needs to be resolved in a future block but not too late (within the next 256 blocks)
        require(block.number > bet.blockNumber, "Wait for future block");
        require(block.number <= bet.blockNumber + 256, "Bet expired");

        // uses block hash instead of raw block number
        bytes32 hash = blockhash(bet.blockNumber);
        require(hash != bytes32(0), "Blockhash unavailable");

        uint256 outcome = uint256(keccak256(abi.encodePacked(hash, msg.sender))) % 100;
        bet.resolved = true;

        if (outcome < 50) {
            payable(msg.sender).transfer(bet.amount * 2); // Winner
        }
        // Else, contract keeps the bet amount
    }
}
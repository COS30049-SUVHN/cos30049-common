// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;

contract RandomContract {
    address public owner;
    constructor() {
      owner = msg.sender;
    }
    
    function nFunction() pure returns (string memory) {
        //performs a task
        return "Internal function exposed as public!";
    }
}

contract Attack {
    RandomContract randContract;

    constructor(address addr) {
        randContract = RandomContract(addr);
    }

    function externalFunction(address addr) external view returns (string memory) {
        return randContract.nFunction();
    }
}

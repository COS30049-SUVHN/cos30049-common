// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SolidityBasics.sol";

// Additional contract for demonstrating multiple inheritance
contract ExtraFeatures {
    // Example state variable
    uint public extraValue;

    // Function in ExtraFeatures
    function setExtraValue(uint _value) public {
        extraValue = _value;
    }
}

// Multiple inheritance
contract SolidityAdvanced is SolidityBasics, ExtraFeatures {
    
    // Event declaration
    event Log(string msg);

    // Constructor to initialize SolidityAdvanced
    constructor() {
        // Call the constructor of SolidityBasics
        owner = msg.sender; // Initialize owner
        emit Log("SolidityAdvanced contract initialized");
    }

    // Custom modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Overriding a function from SolidityBasics (overrides sumArray)
    function sumArray(uint[] memory _numbers) public pure override returns (uint) {
        uint product = 1;
        for (uint i = 0; i < _numbers.length; i++) {
            product *= _numbers[i]; // Calculate product instead of sum
        }
        // -- not allowed with `pure` function:
        // emit Log("Array product calculated");
        return product;
    }

    // Function using the custom modifier `onlyOwner`
    function restrictedFunction() public onlyOwner {
        emit Log("Restricted function executed by owner");
    }

    // Error handling demonstration
    function checkNumberRange(uint _number) public pure {
        if (_number < 10 || _number > 100) {
            revert("Number is out of range (must be between 10 and 100)");
        }
        
        // -- not allowed with `pure` function:
        // emit Log("Number is within the valid range");
    }

    // Overloading function: multiple `updateBalance` functions with different signatures
    function updateBalance(address _address, uint _amount) public override {
        balances[_address] = _amount;
        emit Log("Balance updated using the base function");
    }

    // Overloaded version of `updateBalance` to reset balance to zero
    function updateBalance(address _address) public onlyOwner {
        balances[_address] = 0; // Reset balance to 0
        emit Log("Balance reset to zero");
    }

    // Demonstration of multiple inheritance:
    // Calling a function from ExtraFeatures
    function setAndGetExtraValue(uint _value) public returns (uint) {
        super.setExtraValue(_value); // Calls function from ExtraFeatures
        emit Log("Extra value set in ExtraFeatures");
        return extraValue;
    }
}

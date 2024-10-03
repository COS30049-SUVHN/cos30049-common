// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolidityBasics {
    // Numeric Types
    uint public uintValue = 100; // Unsigned integer
    int public intValue = -50; // Signed integer
    uint8 public smallUintValue = 255; // Small unsigned integer (8 bits)

    // Boolean Type
    bool public isTrue = true;

    // Address Type
    address public owner;

    // Array (fixed and dynamic)
    uint[5] public fixedArray = [1, 2, 3, 4, 5]; // Fixed-size array
    uint[] public dynamicArray; // Dynamic array

    // Enum Type
    enum Status {
        Inactive,
        Active,
        Suspended
    }
    Status public currentStatus;

    // Struct Type
    struct Person {
        string name;
        uint age;
        address wallet;
    }

    Person public person;

    // Mapping Type
    mapping(address => uint) public balances;

    // Constructor
    constructor() {
        owner = msg.sender; // Initialize the owner to the address that deploys the contract
        currentStatus = Status.Inactive; // Set initial status
    }

  // Setter for uintValue
    function setUintValue(uint _value) public {
        uintValue = _value;
    }

    // Setter for intValue
    function setIntValue(int _value) public {
        intValue = _value;
    }

    // Setter for boolean
    function setBooleanValue(bool _value) public {
        isTrue = _value;
    }

    // Function to demonstrate control flow (if-else)
    function checkIfPositive(int _num) public pure returns (string memory) {
        if (_num > 0) {
            return "Positive";
        } else if (_num == 0) {
            return "Zero";
        } else {
            return "Negative";
        }
    }

    // Function to demonstrate loops (for loop)
    function sumArray(uint[] memory _numbers) public pure returns (uint) {
        uint sum = 0;
        for (uint i = 0; i < _numbers.length; i++) {
            sum += _numbers[i];
        }
        return sum;
    }

    // Function to modify and access the struct
    function setPerson(string memory _name, uint _age, address _wallet) public {
        person = Person(_name, _age, _wallet);
    }

    function getPerson() public view returns (string memory, uint, address) {
        return (person.name, person.age, person.wallet);
    }

    // Function to update and access the enum
    function setStatus(Status _status) public {
        currentStatus = _status;
    }

    function getStatus() public view returns (Status) {
        return currentStatus;
    }

    // Function to modify dynamic array
    function addToDynamicArray(uint _value) public {
        dynamicArray.push(_value);
    }

    function getDynamicArray() public view returns (uint[] memory) {
        return dynamicArray;
    }

    // Function to interact with the mapping
    function updateBalance(address _address, uint _amount) public {
        balances[_address] = _amount;
    }

    function getBalance(address _address) public view returns (uint) {
        return balances[_address];
    }

    // Function to show that only the owner can perform an action
    function onlyOwnerAction() public view returns (string memory) {
        require(msg.sender == owner, "Not the owner");
        return "You are the owner!";
    }
}

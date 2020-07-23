pragma solidity ^0.6.0;

contract Demo {
    string public str;

    constructor() public {
        str = "Hello world!";
    }

    function updateString(string memory _str) public {
        str = _str;
    }

    function getString() public view returns(string memory) {
        return str;
    }
}
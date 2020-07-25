pragma solidity ^0.6.0;

contract Demo {
    string public str;

    constructor(string memory _str) public {
        str = _str;
    }

    function updateString(string memory _str) public {
        str = _str;
    }

    function getString() public view returns(string memory) {
        return str;
    }
}
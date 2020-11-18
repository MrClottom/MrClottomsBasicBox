// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Storage is Ownable  {
    bytes private _data; 

    event DataSet(bytes newData);

    constructor() Ownable () { }

    function data() external view returns(bytes memory) {
        return _data;
    }

    function setData(bytes memory newData) external onlyOwner {
        emit DataSet(newData);
        _data = newData;
    }
}

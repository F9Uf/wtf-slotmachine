// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract WTFERC20 is ERC20 {
    constructor (
        string memory name,
        string memory symbol,
        uint _totalSupply
    ) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, _totalSupply * 10 ** uint(decimals()));
    }
}

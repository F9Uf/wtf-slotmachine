// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX {
    using SafeMath for uint256;
    IERC20 wtf_;
    uint256 public totalLiquidity;

    constructor(address token_) {
        wtf_ = IERC20(token_);
    }

    function init(uint256 tokenAmount) public payable returns (uint256) {
        require(totalLiquidity == 0, "[DEX]: int already has liquidity");

        totalLiquidity = address(this).balance;

        require(wtf_.transferFrom(msg.sender, address(this), tokenAmount));
        return totalLiquidity;
    }

    function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public pure returns(uint256) {
        uint256 numerator = input_amount.mul(output_reserve);
        uint256 denominator = input_amount.add(input_reserve);
        return numerator / denominator;
    }

    function ethToToken() public payable returns (uint256) {
        uint256 token_reserve = wtf_.balanceOf(address(this));
        uint256 token_bought = price(msg.value, address(this).balance.sub(msg.value), token_reserve);

        require(wtf_.transfer(msg.sender, token_bought));

        return token_bought;
    }

    function tokenToEth(uint256 tokenAmount) public payable returns(uint256) {
        uint256 token_reserve = wtf_.balanceOf(address(this));
        uint256 eth_bought = price(tokenAmount, token_reserve, address(this).balance);

        // send eth to who's call function
        payable(msg.sender).transfer(eth_bought);

        // force who's call function to send token to this contract
        // by the way who's call function must be approve the contract with the token
        require(wtf_.transferFrom(msg.sender, address(this), tokenAmount));

        return eth_bought;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

library LibEthWallet {
    function sendEth(
        address payable to,
        uint256 amount
    )
        internal
    {
        validateSend(to, amount);

        (bool success,) = to.call{value: amount}("");
        require(
            success,
            "LibEthWallet: sendEth failure"
        );
    }

    function ethBalance()
        internal
        view
        returns (uint256)
    {
        return address(this).balance;
    }

    function validateSend(
        address payable to,
        uint256 amount
    )
        internal
        view
    {
        require(
            address(to) != address(0),
            "LibEthWallet: cannot send to 0 address"
        );

        require(
            ethBalance() >= amount,
            "LibEthWallet: eth balance too low"
        );
    }
}

library LibTokenWallet {
    using SafeERC20 for IERC20;

    function sendToken(
        IERC20 token,
        address to,
        uint256 amount
    )
        internal
    {
        validateSend(token, to, amount);

        token.safeTransfer(
            to,
            amount
        );
    }

    function tokenBalance(IERC20 token)
        internal
        view
        returns (uint256)
    {
        return token.balanceOf(address(this));
    }

    function validateSend(
        IERC20 token,
        address to,
        uint256 amount
    )
        internal
        view
    {
        require(
            to != address(0),
            "LibTokenWallet: cannot send to 0 address"
        );

        require(
            tokenBalance(token) >= amount,
            "LibTokenWallet: token balance too low"
        );
    }
}
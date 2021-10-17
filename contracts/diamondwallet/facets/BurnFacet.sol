// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../../diamond/lib/LibDiamond.sol";

import {LibEthWallet, LibTokenWallet} from "./lib/LibWallet.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Wallet} from "./Wallet.sol";

contract BurnFacet is Wallet {
    function burnEth(uint256 amount)
        external
        onlyOwner
    {
        _burnEth(amount);
    }

    function burnAllEth()
        external
        onlyOwner
    {
        uint256 _balance = LibEthWallet.ethBalance();

        if (_balance == 0)
        {
            revert("EthBurnFacet: no eth balance to burn");
        }

        _burnEth(_balance);
    }

    function _burnEth(uint256 amount)
        internal
    {
        LibEthWallet.sendEth(
            payable(s.burnAddress),
            amount
        );

        emit EthBurned(amount);
    }

    function burnToken(
        IERC20 token,
        uint256 amount
    )
        external
        onlyOwner
    {
        _burnToken(token, amount);
    }

    function burnAllToken(IERC20 token)
        external
        onlyOwner
    {
        uint256 _balance = LibTokenWallet.tokenBalance(token);

        if (_balance == 0)
        {
            revert("TokenBurnFacet: no token balance to burn");
        }

        _burnToken(token, _balance);
    }

    function _burnToken(IERC20 token, uint256 amount)
        internal
    {
        LibTokenWallet.sendToken(
            token,
            s.burnAddress,
            amount
        );

        emit TokenBurned(address(token), amount);
    }
}

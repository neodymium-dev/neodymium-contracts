// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../../diamond/lib/LibDiamond.sol";

import {LibEthWallet, LibTokenWallet} from "./lib/LibWallet.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Wallet} from "./Wallet.sol";

contract WalletFacet is Wallet {
    function ethBalance()
        external
        view
        returns (uint256)
    {
        return LibEthWallet.ethBalance();
    }

    function transferEth(
        address payable to,
        uint256 amount
    )
        external
        onlyOwner
    {
        LibEthWallet.sendEth(to, amount);

        emit EthSent(address(to), amount);
    }

    function tokenBalance(IERC20 token)
        external
        view
        returns (uint256)
    {
        return LibTokenWallet.tokenBalance(token);
    }

    function transferToken(
        IERC20 token,
        address to,
        uint256 amount
    )
        external
        onlyOwner
    {
        LibTokenWallet.sendToken(token, to, amount);
    }
}

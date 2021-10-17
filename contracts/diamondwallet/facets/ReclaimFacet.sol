// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../../diamond/lib/LibDiamond.sol";

import {LibEthWallet, LibTokenWallet} from "./lib/LibWallet.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Wallet} from "./Wallet.sol";

contract ReclaimFacet is Wallet {
    function reclaimEth(uint256 amount)
        external
        onlyOwner
    {
        _reclaimEth(amount);
    }

    function reclaimAllEth()
        external
        onlyOwner
    {
        uint256 _balance = LibEthWallet.ethBalance();

        if (_balance == 0)
        {
            revert("ReclaimFacet: no eth balance to reclaim");
        }

        _reclaimEth(_balance);
    }

    function _reclaimEth(uint256 amount)
        internal
    {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        LibEthWallet.sendEth(
            payable(ds.contractOwner),
            amount
        );

        emit EthReclaimed(amount);
    }

    function reclaimToken(
        IERC20 token,
        uint256 amount
    )
        external
        onlyOwner
    {
        _reclaimToken(token, amount);
    }

    function reclaimAllToken(IERC20 token)
        external
        onlyOwner
    {
        uint256 _balance = LibTokenWallet.tokenBalance(token);

        if (_balance == 0)
        {
            revert("ReclaimFacet: no token balance to reclaim");
        }

        _reclaimToken(token, _balance);
    }

    function _reclaimToken(IERC20 token, uint256 amount)
        internal
    {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        LibTokenWallet.sendToken(
            token,
            ds.contractOwner,
            amount
        );

        emit TokenReclaimed(address(token), amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage} from "../lib/LibAppStorage.sol";

import {LibDiamond} from "../../diamond/lib/LibDiamond.sol";

contract Wallet {
    AppStorage internal s;

    modifier onlyOwner()
    {
        LibDiamond.enforceIsContractOwner();

        _;
    }

    event EthSent(
        address indexed to,
        uint256 indexed amount
    );

    event EthBurned(uint256 indexed amount);

    event EthReclaimed(uint256 indexed amount);

    event TokenBurned(
        address indexed token,
        uint256 indexed amount
    );

    event TokenReclaimed(
        address indexed token,
        uint256 indexed amount
    );
}
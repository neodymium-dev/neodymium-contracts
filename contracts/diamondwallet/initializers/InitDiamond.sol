// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../../diamond/lib/LibDiamond.sol";

import {IERC173} from "../../diamond/interfaces/IERC173.sol";
import {IDiamondLoupe} from "../../diamond/interfaces/IDiamondLoupe.sol";
import {IDiamondCut} from "../../diamond/interfaces/IDiamondCut.sol";

import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";

import {AppStorage} from "../lib/LibAppStorage.sol";

contract InitDiamond {
    AppStorage internal s;

    function init()
        external
    {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        s.burnAddress = 0x000000000000000000000000000000000000dEaD;

        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;
    }
}

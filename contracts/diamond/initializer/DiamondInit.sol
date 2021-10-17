// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../lib/LibDiamond.sol";

import {IERC173} from "../interfaces/IERC173.sol";
import {IDiamondLoupe} from "../interfaces/IDiamondLoupe.sol";
import {IDiamondCut} from "../interfaces/IDiamondCut.sol";

import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";

contract DiamondInit {
    /**
    * @dev init() sets a DiamondStorage object's minimum base supported interfaces,
    *       which are namely IERC165, IERC175, IDiamondCut, and IDiamondLoupe.
    *
    * It is marked as `virtual` to allow for developers to create their own `init()` function
    * suited for their Diamond contract(s), and can then call `super.init()`
    * (assuming that said contract(s) inherit from DiamondInit).
    */
    function init()
        virtual
        external
    {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;

        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;
    }
}

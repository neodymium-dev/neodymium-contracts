// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../lib/LibDiamond.sol";

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";

contract DiamondCutFacet is IDiamondCut {
    function diamondCut(
        FacetCut[] calldata _diamondCut,
        address _init,
        bytes calldata _calldata
    )
        override
        external
    {
        LibDiamond.diamondCut(_diamondCut, _init, _calldata);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibAppStorage} from "../lib/LibAppStorage.sol";
import {LibDiamond} from "../../../diamond/lib/LibDiamond.sol";

abstract contract ResolverFacet {
    LibAppStorage.AppStorage internal _as;

    modifier onlyOwner()
    {
        LibDiamond.enforceIsContractOwner();

        _;
    }
}

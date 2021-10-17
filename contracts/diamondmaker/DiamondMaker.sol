// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Diamond} from "../diamond/Diamond.sol";
import {DiamondCutFacet} from "../diamond/facets/DiamondCutFacet.sol";

import {Create2} from "../utils/Create2.sol";

contract DiamondMaker {
    bytes32 public constant DIAMOND_INIT_CODE_HASH           = keccak256(abi.encode(type(Diamond).creationCode));
    bytes32 public constant DIAMOND_CUT_FACET_INIT_CODE_HASH = keccak256(abi.encode(type(DiamondCutFacet).creationCode));

    bytes internal constant DIAMOND_INIT_CODE = type(Diamond).creationCode;
    bytes internal constant DIAMOND_CUT_FACET_INIT_CODE = type(DiamondCutFacet).creationCode;

    event DiamondCreated(
        address indexed diamond,
        address diamondCutFacet,
        address owner
    );

    struct NewDiamond {
        address diamond;
        address diamondCutFacet;
    }

    function deployDiamond(address _contractOwner)
        public
        returns (NewDiamond memory)
    {
        return _deployDiamond(_contractOwner);
    }

    function _deployDiamond(address _contractOwner)
        internal
        returns (NewDiamond memory)
    {
        NewDiamond memory nd;

        address newDiamondCut = deployDiamondCutFacet(_contractOwner);

        bytes memory _bytecode = abi.encodePacked(DIAMOND_INIT_CODE, abi.encode(_contractOwner, newDiamondCut));

        bytes32 salt = keccak256(abi.encodePacked(
                DIAMOND_INIT_CODE_HASH,
                _contractOwner,
                block.timestamp
        ));

        address newDiamond = Create2.deploy(_bytecode, salt);

        nd.diamond = newDiamond;
        nd.diamondCutFacet = newDiamondCut;

        emit DiamondCreated(newDiamond, newDiamondCut, _contractOwner);

        return nd;
    }

    function deployDiamondCutFacet(address _contractOwner)
        internal
        returns (address)
    {
        bytes32 salt = keccak256(abi.encodePacked(
            DIAMOND_CUT_FACET_INIT_CODE_HASH,
            _contractOwner,
            block.timestamp
        ));

        return Create2.deploy(DIAMOND_CUT_FACET_INIT_CODE, salt);
    }
}

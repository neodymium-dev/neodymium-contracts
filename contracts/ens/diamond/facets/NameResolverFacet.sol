// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ResolverFacet} from "./ResolverFacet.sol";
import {INameResolver} from "../../interfaces/INameResolver.sol";

import {LibAppStorage} from "../lib/LibAppStorage.sol";

contract NameResolverFacet is INameResolver, ResolverFacet {
    function name(bytes32 node)
        external
        view
        returns (string memory)
    {
        LibAppStorage.AppStorage storage _as = LibAppStorage.appStorage();

        return _as.names[node];
    }

    function setName(
        bytes32 node,
        string calldata _name
    )
        external
        onlyOwner
    {
        require(
            node.length != 0,
            "node cannot be empty"
        );

        require(
            bytes(_name).length != 0,
            "name cannot be empty"
        );

        LibAppStorage.AppStorage storage _as = LibAppStorage.appStorage();

        _as.names[node] = _name;

        emit NameChanged(node, _name);
    }
}

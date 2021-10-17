// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ResolverFacet} from "./ResolverFacet.sol";
import {IAddressResolver} from "../../interfaces/IAddressResolver.sol";

import {LibAppStorage} from "../lib/LibAppStorage.sol";

contract AddressResolverFacet is IAddressResolver, ResolverFacet {
    function addr(bytes32 node)
        external
        view
        returns (address)
    {
        LibAppStorage.AppStorage storage _as = LibAppStorage.appStorage();

        return _as.addrs[node];
    }

    function setAddr(
        bytes32 node,
        address _addr
    )
        external
        onlyOwner
    {
        require(
            node.length != 0,
            "node cannot be empty"
        );

        require(
            _addr != address(0),
            "address cannot be zero address"
        );

        LibAppStorage.AppStorage storage _as = LibAppStorage.appStorage();

        _as.addrs[node] = _addr;

        emit AddrChanged(node, _addr);
    }
}

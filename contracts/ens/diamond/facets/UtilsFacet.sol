// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Namehash} from "../../lib/Namehash.sol";

contract UtilsFacet {
    function node(address addr)
        external
        pure
        returns (bytes32)
    {
        return Namehash.namehash(addr);
    }
}

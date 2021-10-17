// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library StringUtil {
    function concat(string memory s1, string memory s2)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(s1, s2));
    }

    function len(string memory s)
        internal
        pure
        returns (uint256)
    {
        bytes memory b = bytes(s);

        return b.length;
    }

    function toBytes32(string memory s)
        internal
        pure
        returns (bytes32 result)
    {
        if (len(s) == 0)
        {
            return 0x0;
        }

        assembly
        {
            result := mload(add(s, 32))
        }
    }
}

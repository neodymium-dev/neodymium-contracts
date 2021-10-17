// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibAppStorage {
    bytes32 constant internal APPSTORAGE_POSITION = keccak256("ensresolver.diamond.appstorage");

    struct AppStorage {
        mapping(bytes32 => address) addrs;
        mapping(bytes32 => string)  names;
        mapping(string => bytes32)  reverseNames;
    }

    function appStorage()
        internal
        pure
        returns (AppStorage storage _as)
    {
        bytes32 position = APPSTORAGE_POSITION;

        assembly
        {
            _as.slot := position
        }
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
    @dev Helpful wrapper around create2.
*/
library Create2 {
    /**
     * @dev Calls create2 using the provided contract creation bytecode and salt.
     *
     * @param bytecode Contract creation bytecode.
     *        Should be encodePacked with all necessary constructor params before being passeed to deploy.
     *
     * @param salt_ Whatever data you want to use as a salt to ensure that you get a (hopefully) unique contract address.
     *      Protip: call `keccak256()` on your desired salt to make sure it gets turned into a bytes32.
     *      Protip 2: Combine your salt with `address(this)` -- and, if you want, the contract creation bytecode --
     *                using `abi.encodePacked()` (and then pass that result to `keccak256()`) to really get a good salt.
     * @return addr Newly created contract address.
    */
    function deploy(
        bytes memory bytecode,
        bytes32 salt_
    )
        internal
        returns (address addr)
    {
        assembly
        {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt_)

            if iszero(extcodesize(addr))
            {
                revert(0, 0)
            }
        }
    }

    /**
     * @dev Calls create2 using the provided contract creation bytecode, lazily generating a salt
     *      using the a keccak256 hash of the result of calling abi.encodePacked() on
     *      the calling contract's address and the passed bytecode.
     *
     * @param bytecode Contract creation bytecode.
     *        Should be encodePacked with all necessary constructor params before being passeed to deploy.
     *
     * @return Newly created contract address. 
    */
    function deploy(bytes memory bytecode)
        internal
        returns (address)
    {
        bytes32 salt_ = keccak256(
            abi.encodePacked(
                address(this),
                bytecode
            )
        );

        return deploy(bytecode, salt_);
    }
}

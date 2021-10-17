# neodymium-contracts

This is an attempt at sharing helpful contracts, libraries, and more that I've written over time or specifically for this project.

Don't rely on anything you haven't personally audited and tested yourself. None of this is really tested, but it compiles so there's that.

## Useful contracts and libraries

- [ERC165](contracts/erc165): A basic [base implementation](contracts/erc165/ERC165Base.sol)
for working with ERC165 which can be inherited by any contract for near-immediate use, 
together with [LibERC165](contracts/erc165/LibERC165.sol) for a few helper functions which make working with ERC165 that much easier. [Examples](contracts/erc165/example) are also included for a quickstart in working with this setup.

- [StringUtil](contracts/utils/StringUtil.sol): Helper functions for strings. 

- More to come?

## ShittyRNG

Just don't worry about it. 

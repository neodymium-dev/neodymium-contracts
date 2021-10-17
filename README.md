# neodymium-contracts

This is an attempt at sharing helpful contracts, libraries, and more that I've written over time or specifically for this project.

Don't rely on anything you haven't personally audited and tested yourself. None of this is really tested, but it compiles so there's that.

## Useful contracts and libraries

- [Diamond](contracts/diamond): Contracts, interfaces, base facets, and libraries 
for creating and working with EIP-2535 "Diamond" type contracts.

  See [ens/diamond](contracts/ens/diamond) for example usage of AppStorage and facets. 

  See [scripts/deploy/deploy_ens.ts](src/scripts/deploy/deploy_ens.ts) for an example of deploying a full-fledged Diamond and facets.

  See [scripts/deploy/deploy_diamond.ts](src/scripts/deploy/deploy_diamond.ts) for abstract/basic deployment of Diamonds,
  including `DiamondCutFacet` and `DiamondLoupeFacet`.

- [StringUtil](contracts/utils/StringUtil.sol): Helper functions for strings.

- [ENS](contracts/ens): Implementations of ENS contracts and interfaces; currently, this only has implementations for resolver contracts.
  I'm personally using the non-Diamond resolver implementation for my own ENS name, so I can attest to it actually working. 

- [DiamondMaker](contracts/diamondmaker): Simplifies deployment of an EIP-2535 Diamond and its necessary facets (`DiamondCut`, `DiamondLoupe`, and `Ownership`)
  using some `create2` magic. 

- More to come.

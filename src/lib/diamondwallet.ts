
export const DiamondWalletInit: string = "InitDiamond";

export interface DiamondWalletAddresses {
    diamondWallet: string,
    diamondInit: string,
    diamondCutFacet: string,
    walletFacet: string,
    burnFacet: string,
    reclaimFacet: string,
};

export const DiamondWalletFacets = {
    WalletFacet: "WalletFacet",
    BurnFacet: "BurnFacet",
    ReclaimFacet: "ReclaimFacet",
};

export const DiamondWalletArtifactPaths = {
    InitDiamond: "contracts/diamondwallet/initializers/InitDiamond.sol:InitDiamond",
    WalletFacet: "contracts/diamondwallet/facets/WalletFacet.sol:WalletFacet",
    ReclaimFacet: "contracts/diamondwallet/facets/ReclaimFacet.sol:ReclaimFacet",
    BurnFacet: "contracts/diamondwallet/facets/BurnFacet.sol:BurnFacet",
};
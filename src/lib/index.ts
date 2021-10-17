import {HardhatRuntimeEnvironment} from "hardhat/types";
import {ethers} from "ethers";

export const
    Diamond: string = "Diamond",
    DiamondInit: string = "DiamondInit",
    DiamondCutFacet: string = "DiamondCutFacet",
    DiamondLoupeFacet: string = "DiamondLoupeFacet",
    OwnershipFacet: string = "OwnershipFacet";

export const DiamondFacets = {
    OwnershipFacet: OwnershipFacet,
    DiamondCutFacet: DiamondCutFacet,
    DiamondLoupeFacet: DiamondLoupeFacet,
}

export const FacetCutAction = {
    Add: 0,
    Replace: 1,
    Remove: 2
}

export const DiamondArtifactPaths = {
    Diamond: "contracts/diamond/Diamond.sol:Diamond",
    DiamondInit: "contracts/diamond/initializer/DiamondInit.sol:DiamondInit",
    DiamondCutFacet: DiamondCutFacet,
    DiamondLoupeFacet: DiamondLoupeFacet,
    OwnershipFacet: OwnershipFacet,
}

export interface ContractInstanceConstructorOpts {
    hre: HardhatRuntimeEnvironment,
    signer: ethers.Signer,
}

export * from "./diamondwallet";
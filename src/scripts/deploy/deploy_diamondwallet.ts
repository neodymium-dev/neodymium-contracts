import '@nomiclabs/hardhat-ethers';
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {ethers} from "ethers";
import {getNetwork} from "../../helpers";

import {
    deployFacets,
    deployDiamondMain,
    getSelectors,
    DeployDiamondResult,
    DiamondInitParams,
    DeployFacetParams
} from "./deploy_diamond";

import {
    DiamondWalletInit,
    FacetCutAction,
    DiamondWalletAddresses
} from "../../lib";

import {
    DiamondWalletFacets,
    DiamondWalletArtifactPaths
} from "../../lib";

const FACETS: DeployFacetParams[] = [
    {
        facet: DiamondWalletFacets.WalletFacet,
        artifactPath: DiamondWalletArtifactPaths.WalletFacet
    },
    {
        facet: DiamondWalletFacets.BurnFacet,
        artifactPath: DiamondWalletArtifactPaths.BurnFacet
    },
    {
        facet: DiamondWalletFacets.ReclaimFacet,
        artifactPath: DiamondWalletArtifactPaths.ReclaimFacet
    }
];

export async function deployDiamondWallet(hre: HardhatRuntimeEnvironment): Promise<DiamondWalletAddresses> {
    const initParams: DiamondInitParams = {
        name: DiamondWalletInit,
        artifactPath: DiamondWalletArtifactPaths.InitDiamond,
    }

    const diamondDeployRes: DeployDiamondResult = await deployDiamondMain(hre, initParams);

    let facets = await deployFacets(hre, FACETS);
    let diamondCuts = facets.map((facet) =>
        [
            facet.address,
            FacetCutAction.Add,
            getSelectors(facet.contract)
        ]
    )

    let diamondCutFacet = await hre.ethers.getContractAt("IDiamondCut", diamondDeployRes.diamond);

    let cutTx = await diamondCutFacet.diamondCut(
        diamondCuts,
        ethers.constants.AddressZero,
        '0x'
    );

    let receipt = await cutTx.wait();
    console.log(`[${getNetwork(hre)}] diamondCut txid: ${receipt.transactionHash}`)
    if (!receipt.status) {
        console.log(`[${getNetwork(hre)}] diamondCut transaction failed :(`)
        process.exit(1);
    }

    return {
        diamondInit: diamondDeployRes.init,
        diamondWallet: diamondDeployRes.diamond,
        diamondCutFacet: diamondDeployRes.diamondCut,
        walletFacet: facets.find((f) => f.contractName === DiamondWalletFacets.WalletFacet)?.address || "",
        burnFacet: facets.find((f) => f.contractName === DiamondWalletFacets.BurnFacet)?.address || "",
        reclaimFacet: facets.find((f) => f.contractName === DiamondWalletFacets.ReclaimFacet)?.address || ""
    }
}
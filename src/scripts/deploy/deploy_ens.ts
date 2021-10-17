import '@nomiclabs/hardhat-ethers';
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {ethers} from "ethers";
import {getNetwork} from "../../helpers";

import {
    deploy
} from "./util";

import {
    deployFacets,
    deployDiamondMain,
    getSelectors,
    DeployDiamondResult,
    DiamondInitParams,
    DeployFacetParams
} from "./deploy_diamond";

import {
    FacetCutAction
} from "../../lib";

import {
    ENSResolver,
    ENSArtifactPaths,
    ENSDiamondFacets,
    ENSDiamondArtifactPaths, ENSDiamondInit,
} from "../../lib/ens";

const FACETS: DeployFacetParams[] = [
    {
        facet:        ENSDiamondFacets.AddressResolverFacet,
        artifactPath: ENSDiamondArtifactPaths.AddressResolverFacet
    },
    {
        facet:        ENSDiamondFacets.NameResolverFacet,
        artifactPath: ENSDiamondArtifactPaths.NameResolverFacet
    },
    {
        facet:        ENSDiamondFacets.UtilsFacet,
        artifactPath: ENSDiamondArtifactPaths.UtilsFacet
    }
];

export async function deployENSResolver(hre: HardhatRuntimeEnvironment): Promise<string> {
    let res = await deploy(hre, ENSResolver, ENSArtifactPaths.ENSResolver);

    return res.address;
}

export async function deployENSDiamond(hre: HardhatRuntimeEnvironment) {
    const initParams: DiamondInitParams = {
        name:         ENSDiamondInit,
        artifactPath: ENSDiamondArtifactPaths.ENSDiamondInit,
    };

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
}
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {getNetwork, getSignedContractFactory, getSigner} from "../../helpers";
import {ethers} from "ethers";

import {
    Diamond,
    DiamondArtifactPaths,
    DiamondCutFacet, DiamondInit, DiamondLoupeFacet, DiamondWalletInit,
    FacetCutAction, OwnershipFacet
} from "../../lib";
import {deploy, DeployResult} from "./util";

export interface DeployDiamondResult {
    diamond: string,
    diamondCut: string,
    diamondLoupe: string,
    ownership: string,
    init: string
}

export interface DiamondInitParams {
    name?: string,
    artifactPath?: string,
}

export interface DeployFacetParams {
    facet: string,
    artifactPath: string,
}

export function getSelectors(contract: ethers.Contract): any[] {
    const signatures: string[] = Object.keys(contract.interface.functions)

    return signatures.reduce((acc: any[], val: string) => {
        if (val !== "init(bytes)") {
            acc.push(contract.interface.getSighash(val))
        }
        return acc
    }, [])
}

export async function deployDiamondMain(hre: HardhatRuntimeEnvironment, initParams: DiamondInitParams): Promise<DeployDiamondResult> {
    let deployMainRes: DeployDiamondResult = {diamond: "", diamondCut: "", diamondLoupe: "", ownership: "", init: ""};

    const contractOwner: string = (await getSigner(hre)).address;

    const diamondCutContract: DeployResult = await deployDiamondCut(hre);

    deployMainRes.diamondCut = diamondCutContract.address

    const diamondContract: DeployResult = await deployDiamond(hre, contractOwner, diamondCutContract.address);

    deployMainRes.diamond = diamondContract.address;

    const initContract: DeployResult = await deployInit(hre, initParams.name, initParams.artifactPath);
    const initFunctionCall: string = initContract.contract.interface.encodeFunctionData("init");

    deployMainRes.init = initContract.address;

    let facets: DeployResult[];

    facets = await deployDiamondFacets(hre);

    deployMainRes.ownership = facets.find((d: DeployResult) => d.contractName == OwnershipFacet)?.address || "";
    deployMainRes.diamondLoupe = facets.find((d: DeployResult) => d.contractName == DiamondLoupeFacet)?.address || "";

    let diamondCuts: any[] = facets.map((facet) =>
        [
            facet.address,
            FacetCutAction.Add,
            getSelectors(facet.contract)
        ]
    )

    let diamondCutFacet: ethers.Contract = await hre.ethers.getContractAt("IDiamondCut", diamondContract.address);

    let cutTx = await diamondCutFacet.diamondCut(
        diamondCuts,
        initContract.address,
        initFunctionCall
    );

    let receipt = await cutTx.wait();
    console.log(`[${getNetwork(hre)}] diamondCut txid: ${receipt.transactionHash}`)
    if (!receipt.status) {
        console.log(`[${getNetwork(hre)}] diamondCut transaction failed :(`)
        process.exit(1);
    }

    return deployMainRes;
}

export async function deployInit(hre: HardhatRuntimeEnvironment, initContract?: string, initArtifact?: string): Promise<DeployResult> {
    return deploy(
        hre,
        initContract || DiamondInit,
        initArtifact || DiamondArtifactPaths.DiamondInit
    );
}

export async function deployDiamond(hre: HardhatRuntimeEnvironment, contractOwner: string, diamondCutFacet: string): Promise<DeployResult> {
    return deploy(
        hre,
        Diamond,
        DiamondArtifactPaths.Diamond, [contractOwner, diamondCutFacet]
    );
}

export async function deployDiamondCut(hre: HardhatRuntimeEnvironment): Promise<DeployResult> {
    return deploy(
        hre,
        DiamondCutFacet,
        DiamondArtifactPaths.DiamondCutFacet
    );
}

export async function deployDiamondFacets(hre: HardhatRuntimeEnvironment): Promise<DeployResult[]> {
    const facets: DeployFacetParams[] = [
        {
            facet: DiamondLoupeFacet,
            artifactPath: DiamondArtifactPaths.DiamondLoupeFacet,
        },
        {
            facet: OwnershipFacet,
            artifactPath: DiamondArtifactPaths.OwnershipFacet,
        }
    ]

    return deployFacets(hre, facets);
}

export async function deployFacets(hre: HardhatRuntimeEnvironment, facetParams: DeployFacetParams[]): Promise<DeployResult[]> {
    let lastNonce: number = await (await getSigner(hre)).getTransactionCount("pending");

    return Promise.all(
        facetParams.map((params: DeployFacetParams, idx: number) => {
            return deploy(hre, params.facet, params.artifactPath, undefined, lastNonce+idx);
        })
    ).then((res: DeployResult[]) => res);
}


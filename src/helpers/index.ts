import '@nomiclabs/hardhat-ethers';
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Contract, ContractFactory} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {FactoryOptions, Libraries} from "@nomiclabs/hardhat-ethers/types";

export function getNetwork(hre: HardhatRuntimeEnvironment): string {
    return hre.network.name;
}

export async function getSigner(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress> {
    let signers = await hre.ethers.getSigners();

    return signers[0];
}

export async function getSignedContractFactory(contractName: string, hre: HardhatRuntimeEnvironment, libraries?: Libraries): Promise<ContractFactory> {
    let opts: FactoryOptions = {
        signer: await getSigner(hre)
    };

    if (libraries) {
        opts.libraries = libraries;
    }

    return hre.ethers.getContractFactory(contractName, opts);
}

export async function getContract(name: string, address: string, hre: HardhatRuntimeEnvironment): Promise<Contract | undefined> {
    const
        signer = await getSigner(hre),
        providerAbi = await hre.artifacts.readArtifact(name);

    return hre.ethers.getContractAt(providerAbi.abi, address, signer);
}
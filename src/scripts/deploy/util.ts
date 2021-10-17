import {HardhatRuntimeEnvironment, TaskArguments} from "hardhat/types";
import {Contract, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {getNetwork, getSignedContractFactory} from "../../helpers";

export interface DeployResult {
    address: string,
    contractName: string,
    contract: ethers.Contract
}

export async function deploy(hre: HardhatRuntimeEnvironment, contractName: string, artifactPath: string, args?: string[], nonce?: number): Promise<DeployResult> {
    const address: string = await deployContract(hre, contractName, artifactPath, args, nonce, getNetwork(hre) !== "bsc_testnet");

    let contractInstance: ethers.Contract = await hre.ethers.getContractAt(artifactPath, address);

    return {
        address: address,
        contractName: contractName,
        contract: contractInstance
    };
}

export async function deployContract(
    hre: HardhatRuntimeEnvironment,
    contractName: string,
    artifactPath?: string,
    args?: string[],
    nonce?: number,
    verify?: boolean
): Promise<string> {
    const network: string = getNetwork(hre);

    console.log(`[${network}] Deploying contract ${contractName}`);

    let contractFactory = await getSignedContractFactory(artifactPath || contractName, hre);

    args = args || []

    let overrides: any = {}

    if (network === "polygon") {
        overrides.gasPrice = ethers.utils.parseUnits('210', 'gwei');
    }
    // let overrides: any = {
    //     gasPrice: 125000000000,
    //     gas: 825200
    // }
    //
    // // let overrides: any = {};
    //
    if (nonce) {
        overrides["nonce"] = nonce;
    }

    let deployTx: Contract = await contractFactory.deploy(...args, overrides);

    console.log(`[${network}] ${contractName} deploy transaction: ${deployTx.deployTransaction.hash}`);

    await deployTx.deployed();

    verify = typeof(verify) !== 'undefined' ? verify : false;

    let txReceipt: ContractReceipt = await deployTx.deployTransaction.wait(verify ? 5 : 1)

    const address: string = deployTx.address;

    console.log(`[${network}] ${contractName} address: ${address}`);

    if (verify) {
        await verifyContract(hre, address, contractName, artifactPath, args);
    }

    return address;
}

export async function verifyContract(
    hre: HardhatRuntimeEnvironment,
    address: string,
    contractName: string,
    artifactPath?: string,
    args?: any[]
) {
    const network: string = getNetwork(hre);

    console.log(`[${network}] Verifying contract ${contractName} at address ${address}`);

    let taskArgs: TaskArguments = {
        address,
        constructorArguments: args || []
    };

    if (artifactPath && artifactPath !== contractName) {
        taskArgs.contract = artifactPath
    }

    await hre.run("verify:verify", taskArgs);
}
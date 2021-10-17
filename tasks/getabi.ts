import '@nomiclabs/hardhat-ethers';
import {task, types} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

export const
    TASK_GET_ABI:      string = "get-abi",
    TASK_GET_BYTECODE: string = "get-bytecode";

task(TASK_GET_ABI, "prints out the ABI of a contract or interface")
    .addParam("contract", "Contract or interface whose ABI you want", "", types.string)
    .setAction(async ({ contract="" }, hre: HardhatRuntimeEnvironment) => {
        const
            artifact = await hre.artifacts.readArtifact(contract),
            artifactABI = artifact.abi;

        console.log(JSON.stringify(artifactABI));
    })

task(TASK_GET_BYTECODE, "prints out the Bytecode of a contract")
    .addParam("contract", "Contract whose Bytecode you want", "", types.string)
    .setAction(async ({ contract="" }, hre: HardhatRuntimeEnvironment) => {
        const
            artifact = await hre.artifacts.readArtifact(contract),
            artifactBytecode = artifact.bytecode;

        console.log(artifactBytecode.slice(2));
    })
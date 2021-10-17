import '@nomiclabs/hardhat-ethers';
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

import path from "path";
import fs from "fs";
import {getNetwork} from "../src/helpers";

import {
    deploy
} from "../src/scripts/deploy/util";

task("deploy:diamondmaker", "Deploys a DiamondMaker")
    .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
        const
            contractName: string = "DiamondMaker",
            artifactPath: string = "contracts/diamondmaker/DiamondMaker.sol:DiamondMaker";

        let res = await deploy(hre, contractName, artifactPath)

        console.log(res.address);
    });
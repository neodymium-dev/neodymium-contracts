import '@nomiclabs/hardhat-ethers';
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

import {deployDiamondWallet} from "../src/scripts/deploy";
import path from "path";
import fs from "fs";
import {getNetwork} from "../src/helpers";

const TASK_DEPLOY_DIAMONDWALLET: string = "deploy:diamondwallet";

task(TASK_DEPLOY_DIAMONDWALLET, "Deploys a DiamondWallet and its facets")
    .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
        const addrs = await deployDiamondWallet(hre);

        const filePath: string = path.join(hre.config.paths.root, "outputs", `${getNetwork(hre)}_diamond_wallet_addresses.json`)
        console.log(filePath);

        fs.writeFileSync(filePath, JSON.stringify(addrs));
    })


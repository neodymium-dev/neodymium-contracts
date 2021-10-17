import '@nomiclabs/hardhat-ethers';
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

import {deployENSDiamond, deployENSResolver} from "../src/scripts/deploy";
import path from "path";
import fs from "fs";
import {getNetwork} from "../src/helpers";

const
    TASK_DEPLOY_ENSDIAMOND: string = "deploy:ens-diamond",
    TASK_DEPLOY_ENS_RESOLVER: string = "deploy:ensresolver";

task(TASK_DEPLOY_ENS_RESOLVER, "Deploys an ENS Resolver and its facets")
    .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
        const addr = await deployENSResolver(hre);
        console.log(addr);

        // const filePath: string = path.join(hre.config.paths.root, "outputs", `${getNetwork(hre)}_ens_resolver_addresses.json`)
        // console.log(filePath);
        //
        // fs.writeFileSync(filePath, JSON.stringify(addrs));
    })

task(TASK_DEPLOY_ENSDIAMOND, "Deploys an ENS Diamond and its facets")
    .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
        const addrs = await deployENSDiamond(hre);

        const filePath: string = path.join(hre.config.paths.root, "outputs", `${getNetwork(hre)}_ens_diamond_addresses.json`)
        console.log(filePath);

        fs.writeFileSync(filePath, JSON.stringify(addrs));
    })


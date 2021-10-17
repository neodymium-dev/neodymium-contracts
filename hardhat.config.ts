// noinspection JSUnusedGlobalSymbols

import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";

import {HardhatUserConfig} from "hardhat/types";
import {DefaultNetworkConfig, DefaultSolidityConfig} from "./src/config";

require('dotenv').config();

const
	BSCSCAN_API_KEY: string = process.env.BSCSCAN_API_KEY || "",
	POLYGONSCAN_API_KEY: string = process.env.POLYGONSCAN_API_KEY || "";

const
	ROOT_DIR: string = "./",
	CONTRACTS_DIR: string = "./contracts",
	TESTS_DIR: string = "./test",
	CACHE_DIR: string = "./cache",
	ARTIFACTS_DIR: string = "./artifacts",
	TASKS_DIR: string = "./tasks";

require(TASKS_DIR);

const hardhatConfig: HardhatUserConfig = {
	networks: DefaultNetworkConfig,
	solidity: DefaultSolidityConfig,
	paths: {
		root: ROOT_DIR,
		sources: CONTRACTS_DIR,
		tests: TESTS_DIR,
		cache: CACHE_DIR,
		artifacts: ARTIFACTS_DIR,
	},
	mocha: {
		timeout: 20000
	},
	etherscan: {
		apiKey: POLYGONSCAN_API_KEY,
	}
};

// console.log(JSON.parse(JSON.stringify(hardhatConfig)));

export default hardhatConfig;
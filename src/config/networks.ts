import {NetworksUserConfig} from "hardhat/types";

import {NetworkConfig} from "./networkconfig";

require('dotenv').config();

const ACCOUNT_PRIVATE_KEY = [process.env.PRIVATE_KEY || ""];

const ETHEREUM_MAINNET_CONFIG = NetworkConfig({
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    chainId: 1
}).withPrivateKeys(ACCOUNT_PRIVATE_KEY)

const BSC_MAINNET_CONFIG = NetworkConfig({
    url: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    gasPrice: 20000000000
}).withPrivateKeys(ACCOUNT_PRIVATE_KEY)

const BSC_TESTNET_CONFIG = NetworkConfig({
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    chainId: 97,
    gasPrice: 20000000000
}).withPrivateKeys(ACCOUNT_PRIVATE_KEY)

const MATIC_MAINNET_CONFIG = NetworkConfig({
    url: "https://polygon-mainnet.g.alchemy.com/v2/O6nbQONUKZ-V4B_4111Xt7Dg0vm_bQEm",
    chainId: 137,
    gas: 2100000,
    gasPrice: 40000000000,
}).withPrivateKeys(ACCOUNT_PRIVATE_KEY)

const AVAX_C_MAINNET_CONFIG = NetworkConfig({
    url: "https://api.avax.network/ext/bc/C/rpc",
    chainId: 43114,
}).withPrivateKeys(ACCOUNT_PRIVATE_KEY)

export const DefaultNetworkConfig: NetworksUserConfig = {
    ethereum:    ETHEREUM_MAINNET_CONFIG,
    bsc:         BSC_MAINNET_CONFIG,
    bsc_testnet: BSC_TESTNET_CONFIG,
    polygon:     MATIC_MAINNET_CONFIG,
    avax:        AVAX_C_MAINNET_CONFIG
}
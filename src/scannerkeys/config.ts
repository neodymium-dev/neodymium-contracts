import { ConfigExtender } from "hardhat/types";

export const scannerKeysConfigExtender: ConfigExtender = (
    resolvedConfig,
    config
) => {
    const defaultConfig = {
        etherscan: undefined,
        bscscan: undefined,
        polygonscan: undefined,
        arbiscan: undefined,
        ftmscan: undefined,
    };

    if (config.scannerkeys !== undefined) {
        const customConfig = config.scannerkeys;
        resolvedConfig.scannerkeys = { ...defaultConfig, ...customConfig };
    } else {
        resolvedConfig.scannerkeys = defaultConfig;
    }
};
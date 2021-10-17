import {SolidityUserConfig, SolcUserConfig} from "hardhat/types";

const COMPILER_SETTINGS = (runs?: number): any => {
    return {
        optimizer: {
            enabled: true,
            runs:    runs || 200
        }
    }
}

const DEFAULT_COMPILER_CONFIG: SolcUserConfig = {
    version: '0.8.9',
    settings: COMPILER_SETTINGS(),
};

// const COMPILER_CONFIG_LOW_RUNS: SolcUserConfig = {
//     version: '0.8.9',
//     settings: COMPILER_SETTINGS(50)
// };

// const COMPILER_CONFIG_NO_OPTIMIZATION:

export const DefaultSolidityConfig: SolidityUserConfig = {
    compilers: [DEFAULT_COMPILER_CONFIG],
    overrides: {
        "contracts/diamondwallet/initializers/InitDiamond.sol": {
            version: '0.8.9',
            settings: COMPILER_SETTINGS(2)
        },
    }
};
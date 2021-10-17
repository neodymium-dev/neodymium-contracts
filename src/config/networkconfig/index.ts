import {HDAccountsUserConfig, NetworkUserConfig} from "hardhat/types";

interface NetConfExtension {
    withPrivateKey: (privateKey: string) => NetworkUserConfig
    withPrivateKeys: (privateKeys: string[]) => NetworkUserConfig
    withHDAccount: (hdAccount: HDAccountsUserConfig) => NetworkUserConfig
}

class ExtendedNetworkConfig implements NetConfExtension {
    private readonly base: NetworkUserConfig;

    constructor(private config: NetworkUserConfig) {
        this.base = config;
    }

    public withPrivateKey(privateKey: string): NetworkUserConfig {
        return withPrivateKey(this.base, privateKey);
    }

    public withPrivateKeys(privateKeys: string[]): NetworkUserConfig {
        return withPrivateKeys(this.base, privateKeys);
    }

    public withHDAccount(hdAccount: HDAccountsUserConfig): NetworkUserConfig {
        return withHDAccount(this.base, hdAccount);
    }
}

function withPrivateKey(config: NetworkUserConfig, privateKey: string): NetworkUserConfig {
    if (privateKey !== "")
        config.accounts = [privateKey];

    return config;
}

function withPrivateKeys(config: NetworkUserConfig, privateKeys: string[]): NetworkUserConfig {
    if (privateKeys.length > 0) {
        if (privateKeys.every((k) => k !== ""))
            config.accounts = privateKeys;
    }

    return config;
}

function withHDAccount(config: NetworkUserConfig, hdAccount: HDAccountsUserConfig): NetworkUserConfig {
    config.accounts = hdAccount;

    return config;
}

export const NetworkConfig = (config: NetworkUserConfig): ExtendedNetworkConfig => {
    return new ExtendedNetworkConfig(config);
}
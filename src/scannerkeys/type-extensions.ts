import "hardhat/types/config";

import { ScannerKeysConfig } from "./types";

declare module "hardhat/types/config" {
    interface HardhatUserConfig {
        scannerkeys?: ScannerKeysConfig;
    }

    interface HardhatConfig {
        scannerkeys: ScannerKeysConfig;
    }
}

import { extendConfig } from "hardhat/config";
import {scannerKeysConfigExtender} from "./config";

extendConfig(scannerKeysConfigExtender);
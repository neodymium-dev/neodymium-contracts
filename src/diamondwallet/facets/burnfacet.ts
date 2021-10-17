import {BigNumber, BigNumberish, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {ContractInstanceConstructorOpts, DiamondFacets, DiamondWalletFacets} from "../../lib";

import {Facet} from "./facet";

export class BurnFacet extends Facet {
    constructor(address: string, opts: ContractInstanceConstructorOpts) {
        super(address, DiamondWalletFacets.BurnFacet, opts);
    }

    async burnETH(amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.burnEth(amount);

        return await tx.wait(confirmations || 1);
    }

    async burnAllETH(confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.burnAllEth();

        return await tx.wait(confirmations || 1);
    }

    async burnToken(tokenAddress: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.burnToken(tokenAddress, amount);

        return await tx.wait(confirmations || 1);
    }

    async burnAllToken(tokenAddress: string, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.burnAllToken(tokenAddress);

        return await tx.wait(confirmations || 1);
    }
}
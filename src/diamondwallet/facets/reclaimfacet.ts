import {BigNumber, BigNumberish, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {ContractInstanceConstructorOpts, DiamondFacets, DiamondWalletFacets} from "../../lib";

import {Facet} from "./facet";

export class ReclaimFacet extends Facet {
    constructor(address: string, opts: ContractInstanceConstructorOpts) {
        super(address, DiamondWalletFacets.ReclaimFacet, opts);
    }

    async reclaimETH(amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.reclaimEth(amount);

        return await tx.wait(confirmations || 1);
    }

    async reclaimAllETH(confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.reclaimAllEth();

        return await tx.wait(confirmations || 1);
    }

    async reclaimToken(tokenAddress: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.reclaimToken(tokenAddress, amount);

        return await tx.wait(confirmations || 1);
    }

    async reclaimAllToken(tokenAddress: string, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.reclaimAllToken(tokenAddress);

        return await tx.wait(confirmations || 1);
    }
}
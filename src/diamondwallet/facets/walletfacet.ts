import {BigNumber, BigNumberish, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {ContractInstanceConstructorOpts, DiamondFacets, DiamondWalletFacets} from "../../lib";

import {Facet} from "./facet";

export class WalletFacet extends Facet {
    constructor(address: string, opts: ContractInstanceConstructorOpts) {
        super(address, DiamondWalletFacets.WalletFacet, opts);
    }

    async ethBalance(): Promise<BigNumber> {
        return (await this._contractInstance).functions
            .ethBalance()
            .then((b: BigNumber[]) => b[0]);
    }

    async transferEth(to: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.transferEth(to, amount);

        return await tx.wait(confirmations || 1);
    }

    async tokenBalance(tokenAddress: string): Promise<BigNumber> {
        return (await this._contractInstance).functions
            .tokenBalance(tokenAddress)
            .then((b: BigNumber[]) => b[0]);
    }

    async transferToken(tokenAddress: string, to: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        let tx: ContractTransaction = await (await this._contractInstance).functions.transferToken(tokenAddress, to, amount);

        return await tx.wait(confirmations || 1);
    }
}
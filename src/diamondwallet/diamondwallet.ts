import {WalletFacet, ReclaimFacet, BurnFacet, OwnershipFacet} from "./facets";
import {BigNumber, BigNumberish, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {ContractInstanceConstructorOpts} from "../lib";

export class DiamondWallet {
    protected readonly _diamondAddress: string;
    protected _contractInstance: Promise<ethers.Contract>;
    protected readonly _signer: ethers.Signer;
    protected _signerAddress: Promise<string>;

    private _walletFacet: WalletFacet;
    private _reclaimFacet: ReclaimFacet;
    private _burnFacet: BurnFacet;
    private _ownershipFacet: OwnershipFacet

    constructor(address: string, opts: ContractInstanceConstructorOpts) {
        this._diamondAddress = address;
        this._signer = opts.signer;
        this._signerAddress = opts.signer.getAddress()
        this._contractInstance = opts.hre.ethers.getContractAt("Diamond", this._diamondAddress, this._signer);

        this._walletFacet = new WalletFacet(address, opts);
        this._reclaimFacet = new ReclaimFacet(address, opts);
        this._burnFacet = new BurnFacet(address, opts);
        this._ownershipFacet = new OwnershipFacet(address, opts);
    }

    async owner(): Promise<string> {
        return this._ownershipFacet.owner();
    }

    async ethBalance(): Promise<BigNumber> {
        return this._walletFacet.ethBalance();
    }

    async transferEth(to: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._walletFacet.transferEth(to, amount, confirmations);
    }

    async tokenBalance(tokenAddress: string): Promise<BigNumber> {
        return this._walletFacet.tokenBalance(tokenAddress);
    }

    async transferToken(tokenAddress: string, to: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._walletFacet.transferToken(tokenAddress, to, amount, confirmations);
    }

    async reclaimETH(amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._reclaimFacet.reclaimETH(amount, confirmations);
    }

    async reclaimAllETH(confirmations?: number): Promise<ContractReceipt> {
        return this._reclaimFacet.reclaimAllETH(confirmations);
    }

    async reclaimToken(tokenAddress: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._reclaimFacet.reclaimToken(tokenAddress, amount, confirmations);
    }

    async reclaimAllToken(tokenAddress: string, confirmations?: number): Promise<ContractReceipt> {
        return this._reclaimFacet.reclaimAllToken(tokenAddress, confirmations);
    }

    async burnETH(amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._burnFacet.burnETH(amount, confirmations);
    }

    async burnAllETH(confirmations?: number): Promise<ContractReceipt> {
        return this._burnFacet.burnAllETH(confirmations);
    }

    async burnToken(tokenAddress: string, amount: BigNumberish, confirmations?: number): Promise<ContractReceipt> {
        return this._burnFacet.burnToken(tokenAddress, amount, confirmations);
    }

    async burnAllToken(tokenAddress: string, confirmations?: number): Promise<ContractReceipt> {
        return this._burnFacet.burnAllToken(tokenAddress, confirmations);
    }
}
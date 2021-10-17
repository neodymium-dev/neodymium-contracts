import {ethers} from "ethers";
import {ContractInstanceConstructorOpts, DiamondFacets} from "../../lib";


export class Facet {
    protected readonly _diamondAddress: string;
    protected _contractInstance: Promise<ethers.Contract>;
    protected readonly _signer: ethers.Signer;
    protected _signerAddress: Promise<string>;

    constructor(address: string, facetName: string, opts: ContractInstanceConstructorOpts) {
        this._diamondAddress = address;
        this._signer = opts.signer;
        this._signerAddress = opts.signer.getAddress()
        this._contractInstance = opts.hre.ethers.getContractAt(facetName, this._diamondAddress, this._signer);
    }
}
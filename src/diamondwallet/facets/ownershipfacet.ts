import {ethers} from "ethers";
import {ContractInstanceConstructorOpts, DiamondFacets} from "../../lib";

import {Facet} from "./facet";

export class OwnershipFacet extends Facet {
    constructor(address: string, opts: ContractInstanceConstructorOpts) {
        super(address, DiamondFacets.OwnershipFacet, opts);
    }

    async owner(): Promise<string> {
        return await (await this._contractInstance).functions.owner()
            .then((owner: string[]) => owner[0]);
    }
}
import '@nomiclabs/hardhat-ethers';
import {expect} from "chai";
import fs from "fs";
import path from "path";
import {BigNumber, BigNumberish, ContractReceipt, ContractTransaction, ethers} from "ethers";
import {getNetwork, getSigner} from "../src/helpers";

import {DiamondWallet} from "../src/diamondwallet";

import {
    DiamondWalletAddresses
} from "../src/lib";

const
    hre = require("hardhat"),
    BSC_TESTNET_USDC_ADDRESS: string = "0x64544969ed7ebf5f083679233325356ebe738930",
    BSC_TESTNET_GAS_PRICE: BigNumberish = 12100000000,
    USDC_TRANSFER_AMT: BigNumber = BigNumber.from("500000000000000000");

async function getContractInstance(facetName: string, address: string, signer): Promise<ethers.Contract> {
    return await hre.ethers.getContractAt(facetName, address, signer)
}

describe("DiamondWallet", async () => {
    console.log("hello I'm a bear");

    const waitTokenTransfer = async (tx: ContractTransaction) => {
        let receipt = await tx.wait(1);
        expect(receipt.events).not.null;
        expect(receipt.events).length.gt(0);
    }

    let
        Signer: ethers.Signer,
        SignerAddress: string,
        TestWallet: DiamondWallet,
        USDCToken: ethers.Contract,
        deployedAddresses: DiamondWalletAddresses;

    before(async () => {
        const filePath: string = path.join(hre.config.paths.root, "outputs", `${getNetwork(hre)}_diamond_wallet_addresses.json`);
        deployedAddresses = JSON.parse(fs.readFileSync(filePath).toString());

        Signer = await getSigner(hre);
        SignerAddress = await Signer.getAddress();

        TestWallet = new DiamondWallet(deployedAddresses.diamondWallet, {hre, signer: Signer});

        USDCToken = await getContractInstance("IERC20", BSC_TESTNET_USDC_ADDRESS, Signer);
    });

    describe("owner()", async () => {
        it("should have the correct owner", async () => {
            let res = await TestWallet.owner();

            expect(res).eq(SignerAddress);
        });
    });

    describe("ETH Wallet", async () => {
        const value = ethers.utils.parseUnits("1000", "gwei");

        it("should receive raw eth", async () => {
            const sendTx: ContractTransaction = await Signer.sendTransaction({
                to: deployedAddresses.diamondWallet,
                value: value,
                gasLimit: 2100000,
                gasPrice: BSC_TESTNET_GAS_PRICE
            })

            await sendTx.wait(1);

            expect(sendTx.hash).not.eq("", "sending raw eth failed");
        });

        describe("ethBalance()", async () => {
            it("should have a balance of at least 1000 gwei", async () => {
                expect((await TestWallet.ethBalance()).gte(value)).is.true;
            });
        });

        describe("reclaimAllEth()", async () => {
            it("should reclaim all eth", async () => {
                let balance = await TestWallet.ethBalance();
                if (balance.eq(BigNumber.from(0))) {
                    return;
                }

                let res = await TestWallet.reclaimAllETH()
                    .then(() => "")
                    .catch((err) => err.toString());

                expect(res.toString()).eq("");
            });
        });
    });

    describe("Token Wallet", async () => {
        describe("tokenBalance()", async () => {
            it("should receive test USDC", async () => {
                let tx: ContractTransaction = await USDCToken.functions.transfer(
                    deployedAddresses.diamondWallet,
                    USDC_TRANSFER_AMT
                );

                await waitTokenTransfer(tx);
            });

            it("should have some test USDC balance", async () => {
                let _tokenBalance: BigNumber = await TestWallet.tokenBalance(BSC_TESTNET_USDC_ADDRESS);

                expect(_tokenBalance.gt(0)).true;
                expect(_tokenBalance.gte(USDC_TRANSFER_AMT)).true;
            });
        });

        describe("reclaimAllToken()", async () => {
            it("should reclaim all test USDC", async () => {
                let receipt: ContractReceipt = await TestWallet.reclaimAllToken(BSC_TESTNET_USDC_ADDRESS);

                expect(receipt.events).not.null;
                expect(receipt.events).length.gt(0);
            });

            it("should have zero test USDC balance", async () => {
                let _tokenBalance: BigNumber = await TestWallet.tokenBalance(BSC_TESTNET_USDC_ADDRESS);

                expect(_tokenBalance.gt(0)).false;
            });
        });
    });
})
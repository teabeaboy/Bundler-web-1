'use client';

import { ChangeEvent, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useCallback } from 'react';
import { BN } from 'bn.js';
import { ReactNode } from 'react';
import debounce from 'lodash.debounce';
import { getHeaderLayout } from '../../components/layouts/HeaderLayout';
import {
    ApiPoolInfoV4,
    Liquidity,
    MAINNET_PROGRAM_ID,
    Token,
} from '@raydium-io/raydium-sdk';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import base58 from 'bs58';

const ZERO = new BN(0)
type BN = typeof ZERO

type CalcStartPrice = {
    addBaseAmount: BN
    addQuoteAmount: BN
}



type LiquidityPairTargetInfo = {
    baseToken: Token
    quoteToken: Token
    targetMarketId: PublicKey
}




export const PROGRAMIDS = MAINNET_PROGRAM_ID;


interface Props {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
}

const InputField: React.FC<Props> = ({ id, label, value, onChange, placeholder, type }) => {
    return (
        <div className='w-full '>
            {label &&
                <label className="block mt-5 text-base text-white font-semibold" htmlFor={id}>
                    {label}
                </label>
            }
            <div className="relative mt-1 rounded-md shadow-sm w-full flex justify-end">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="block w-full p-4 rounded-md text-base border  border-[#404040]  text-white bg-transparent focus:outline-none sm:text-base text-[12px] h-[40px]"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

interface Propss {
    id: string;
    label: string;
    value: string;
    latedisplay: boolean;
}
const OutputField: React.FC<Propss> = ({ id, label, value, latedisplay }) => {
    return (
        <div className='w-full '>
            {label &&
                <label className="block mt-5 text-base text-white font-semibold" htmlFor={id}>
                    {label}
                </label>
            }
            <div className="relative mt-1 rounded-md shadow-sm w-full flex justify-end">
                {!latedisplay || value.length > 0 ? <p
                    id={id}

                    className="block w-full py-2 rounded-md text-base   text-[#96989c] bg-transparent focus:outline-none sm:text-base text-[12px] h-[40px]"
                >
                    {value}
                </p> : <p></p>

                }
            </div>
        </div>
    );
};



const LiquidityHandlerRaydium = () => {
    const [buyerKeypair, setBuyerKeypair] = useState("");
    const [airdropChecked, setAirdropChecked] = useState(false);
    const [predictedMarketCap, setPredictedMarketcap] = useState("$NaN")
    const [predictedSupplyAmount, setPredictedSupplyAmount] = useState("NaN%")
    const [wallets, setWallets] = useState({
        Wallet1: "N/A",
        Wallet2: "N/A",
        Wallet3: "N/A",
    });



    const [formData, setFormData] = useState({
        buyerPrivateKey: '',
        deployerPrivateKey: '',
        walletsNumbers: '',
        tokenMintAddress: '',
        tokenMarketID: '',
        tokenDecimals: '',
        totalSupply: '',
        tokenBaseAmount: '',
        tokenQuoteAmount: '',
        tokenbuyAmount: '',
        tokenLiquidityAmount: '',
        tokenLiquidityAddPercent: '',
        wallets: {
            Wallet1: wallets.Wallet1,
            Wallet2: wallets.Wallet2,
            Wallet3: wallets.Wallet3,
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };



    const generateKeypair = (e: any) => {
        e.preventDefault();
        const keypair = Keypair.generate();
        setBuyerKeypair(keypair.secretKey.toString());
        setWallets({
            Wallet1: `${keypair.publicKey.toString()}`,
            Wallet2: wallets.Wallet2,
            Wallet3: wallets.Wallet3,
        });
    }



    const copytoClipboard = (e: any) => {
        let keypair = Keypair.fromSecretKey(new Uint8Array(buyerKeypair.split(',').map(Number)));
        navigator.clipboard.writeText(base58.encode(keypair.secretKey));
    }



    const handlesubmission = async (e: any) => {
        e.preventDefault();
        console.log(formData , "simple form data")
        console.log(JSON.stringify(formData) , "JSON stringified form data")

        // const response = await fetch('#', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // });
    }


    // const handleRpcAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRpcAddress(event.target.value);
    // };

    // let rpcconnection: any;
    // const checkRpcAddress = useCallback(debounce(async () => {
    //     if (rpcAddress === '' || !rpcAddress.startsWith('http')) {
    //         // toast.error('RPC Address is incorrect or does not start with http');
    //         return;
    //     }

    //     rpcconnection = rpcAddress ? new Connection(rpcAddress) : new Connection('https://mainnet.helius-rpc.com/?api-key=d9e80c44-bc75-4139-8cc7-084cefe506c7');

    //     try {
    //         await rpcconnection.getSlot();
    //         // toast.info('RPC Address is correct');
    //     } catch (error) {
    //         // toast.error('RPC Address is incorrect');
    //     }
    // }, 300), [rpcAddress]); // 300ms delay

    // useEffect(() => {
    //     checkRpcAddress();
    //     // Cancel the debounce on useEffect cleanup.
    //     return checkRpcAddress.cancel;
    // }, [checkRpcAddress]);


    return (
        <div className="space-y-4 mb-8 mx-auto flex justify-center items-center">
            {/* <div>
                <h1 className="text-2xl text-white">Liquidity Remover</h1>
            </div> */}
            <form>
                <div className="space-y-4">
                    <div className="">
                        <div className="flex flex-col md:flex-row h-full gap-6 justify-center">
                            <div className="space-y-4 p-4 bg-neutral-900 border border-neutral-700 shadow rounded-2xl sm:p-6">
                                <div>
                                    <p className='font-bold text-[25px]'>Deploy</p>
                                    <p className=' text-[12px] text-[#96989c] '>Create a liquidity pool and set buy amounts for your token.</p>
                                </div>
                                <div className='w-full'>
                                    <label className="block mt-5 text-base text-white font-semibold" htmlFor="buyerPrivateKey">
                                        Buyer Private key
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm w-full flex gap-2">
                                        <input
                                            id="buyerPrivateKey"
                                            type="password"
                                            value={formData.buyerPrivateKey}
                                            onChange={(e) => handleChange(e, 'buyerPrivateKey')}
                                            className="block w-full p-4 rounded-md text-base border  border-[#404040]  text-white bg-transparent focus:outline-none sm:text-base text-[12px] h-[40px]"
                                            placeholder="Enter your private key"
                                        />
                                        <button
                                            type='button'
                                            className='bg-white text-#171717 h-40px rounded-md px-3 flex justify-center items-center text-15px'
                                            onClick={generateKeypair}
                                        >
                                            Gen
                                        </button>
                                        <button
                                            type='button'
                                            className='bg-white text-#171717 h-40px rounded-md px-3 flex justify-center items-center text-15px'
                                            onClick={copytoClipboard}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <InputField
                                    id="deployerPrivatekey"
                                    label="Deployer Private Key"
                                    value={formData.deployerPrivateKey}
                                    onChange={(e) => handleChange(e, 'deployerPrivateKey')}
                                    placeholder="Enter deployer private key"
                                    type="password"
                                />
                                <div>
                                    <input type="checkbox" id="airdropCheck" onClick={() => setAirdropChecked(!airdropChecked)} />
                                    <label htmlFor="airdropCheck"> Generate and airdrop wallets</label>
                                </div>



                                {airdropChecked && <InputField
                                    id="walletsNumbers"
                                    label="# of Wallets"
                                    value={formData.walletsNumbers}
                                    onChange={(e) => handleChange(e, 'walletsNumbers')}
                                    placeholder="Enter the # of Wallets"
                                    type="number"
                                />
                                }
                                <div className='flex flex-col gap-2' id="tokeninfo">
                                    <InputField
                                        id="tokenMintAddress"
                                        label="Token Info"
                                        value={formData.tokenMintAddress}
                                        onChange={(e) => handleChange(e, 'tokenMintAddress')}
                                        placeholder="Enter token mint Address"
                                        type="text"
                                    />
                                    <InputField
                                        label=""
                                        id="tokenMarketID"
                                        value={formData.tokenMarketID}
                                        onChange={(e) => handleChange(e, 'tokenMarketID')}
                                        placeholder="Enter Market ID"
                                        type="text"
                                    />

                                    <div className='flex justify-center items-center gap-2'>
                                        {/* <InputField
                                            id="tokenTiker"
                                            value={ticker}
                                            onChange={setTicker}
                                            placeholder="Enter ticker"
                                            type="text"
                                        /> */}
                                        <InputField
                                            label=""
                                            id="tokenDecimals"
                                            value={formData.tokenDecimals}
                                            onChange={(e) => handleChange(e, 'tokenDecimals')}
                                            placeholder="Enter decimals"
                                            type="text"
                                        />
                                        <InputField
                                            label=""
                                            id="totalSupply"
                                            value={formData.totalSupply}
                                            onChange={(e) => handleChange(e, 'totalSupply')}
                                            placeholder="Enter total supply"
                                            type="text"
                                        />

                                    </div>
                                    {/*-------------------------------------------  BaseAmount -------------------------------------------*/}
                                    <InputField
                                        label=""
                                        id="tokenBaseAmount"
                                        value={formData.tokenBaseAmount}
                                        onChange={(e) => handleChange(e, 'tokenBaseAmount')}
                                        placeholder="Enter Base Amount"
                                        type="number"
                                    />
                                    {/*------------------------------------------- QuoteAmount------------------------------------------- */}

                                    <InputField
                                        label=""
                                        id="tokenQuoteAmount"
                                        value={formData.tokenQuoteAmount}
                                        onChange={(e) => handleChange(e, 'tokenQuoteAmount')}
                                        placeholder="Enter Quote Amount"
                                        type="number"
                                    />
                                    <InputField
                                        id="tokenbuyAmount"
                                        label="Buy Amounts (SOL)"
                                        value={formData.tokenbuyAmount}
                                        onChange={(e) => handleChange(e, 'tokenbuyAmount')}
                                        placeholder="First"
                                        type="number"
                                    />

                                    <div className='flex justify-end items-end gap-2'>
                                        <InputField
                                            id="tokenLiquidityAmount"
                                            label="Liquidity Amount (SOL)"
                                            value={formData.tokenLiquidityAmount}
                                            onChange={(e) => handleChange(e, 'tokenLiquidityAmount')}
                                            placeholder="Enter Liquidity Amount"
                                            type="number"
                                        />
                                        <InputField
                                            id="tokenLiquidityAddPercent"
                                            value={formData.tokenLiquidityAddPercent}
                                            onChange={(e) => handleChange(e, 'tokenLiquidityAddPercent')}
                                            placeholder="Enter % of tokens to add to liquidity"
                                            type="number"
                                            label=""
                                        />
                                    </div>
                                    <button
                                        onClick={handlesubmission}
                                        className='bg-white   h-[40px] rounded-md px-3 flex justify-center items-center  w-full text-[#171717] text-[14px] mt-4'
                                    >
                                        Initiate Deployment Sequence

                                    </button>
                                </div>
                            </div>
                            <div className="w-auto p-4 bg-neutral-900 border border-neutral-700 shadow rounded-2xl sm:p-6  flex flex-col justify-between items-center">
                                <div>
                                    <div>
                                        <p className='font-bold text-[25px]'>Predicted Parameters</p>
                                        <p className=' text-[12px] text-[#96989c] '>Here are the predicted parameters based on your input.</p>
                                    </div>
                                    <OutputField
                                        id="predictedMarketCap"
                                        label="Predicted Market Cap:"
                                        value={predictedMarketCap}
                                        latedisplay={false}
                                    />
                                    <OutputField
                                        id="deployerPrivatekey"
                                        label="Predicted Supply Amount:"
                                        value={predictedSupplyAmount}
                                        latedisplay={false}

                                    />

                                    <div className='w-full '>
                                        <label className="block mt-5 text-base text-white font-semibold" >
                                            Wallet
                                        </label>
                                        <p>``</p>
                                        <div className="relative  rounded-md shadow-sm w-full flex flex-col justify-end">
                                            {Object.entries(wallets).map(([key, value]) => (
                                                <p

                                                    className="block w-full  rounded-md text-base   text-[#96989c] bg-transparent focus:outline-none sm:text-base text-[12px] h-[40px]"
                                                >
                                                    {key}: {value}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <OutputField
                                        id="totalmintaddress"
                                        label="Token Mint Address"
                                        value={formData.tokenMintAddress}
                                        latedisplay={true}
                                    />
                                    <OutputField
                                        id="MarketId"
                                        label="Market ID"
                                        value={formData.tokenMarketID}
                                        latedisplay={true}

                                    />
                                    <OutputField
                                        id="buyamount"
                                        label="Buy Amount"
                                        value={formData.tokenbuyAmount}
                                        latedisplay={true}

                                    />
                                    <OutputField
                                        id="liquidityamount"
                                        label="Liquidity Amount"
                                        value={formData.tokenLiquidityAmount}
                                        latedisplay={true}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}



LiquidityHandlerRaydium.getLayout = (page: ReactNode) => getHeaderLayout(page, "Raydium Liquidity Remover");

export default LiquidityHandlerRaydium;
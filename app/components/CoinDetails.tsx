"use client";
import React from "react";
import { useGetCoinDataQuery } from "@/lib/features/cryptoDataApi";
import Image from "next/image";

function CoinDetails({ coin }) {
    const query = `https://api.coingecko.com/api/v3/coins/${coin}?market_data=true&x_cg_demo_api_key=CG-EKfXTdjB4RTPQ5VRHjotPZpP`;
    const { data } = useGetCoinDataQuery(query);
const coinData = data || [];

    const coinName = coinData.name || "" ;
    const description = coinData.description.en || "";
    const coinImage = coinData.image.small || "";
    const coinSymbol = coinData.symbol || "";

    return (
        <div className="p-20 flex ">
            <div className="w-3/5  flex flex-col justify-between space-y-32">
                <div className="flex">
                    <div className="space-y-10 flex flex-col justify-between">
                        <div className=" p-10 bg-slate-500 flex flex-col justify-center items-center">
                            <Image src={coinImage} width={32} height={32} alt="coin" />
                            <div>{coinName}[{coinSymbol}]</div>
                        </div> 
                        <div className=" py-2 px-10 bg-slate-500 p-10 bg-slate-500 flex flex-col justify-center items-center" >there</div>
                    </div>
                    <div className="bg-slate-100"></div>
                </div>
                <div>
                    <p>Description</p>
                    <div >{description}</div>
                </div>
            </div>
            <div className="w-2/5 flex flex-col justify-between space-y-40">
                <div className="" >hello</div>
                <div>world</div>
            </div>
        </div>
    );
}

export default CoinDetails;
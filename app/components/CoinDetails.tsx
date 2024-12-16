"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Plus from "../../public/plus.svg";
import { useGetCoinDataQuery } from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";
import DuelPercentageBar from "./DuelPercentageBar";
import { getUnixTime, fromUnixTime } from "date-fns";
import Circle from "../../public/circle.svg";

function CoinDetails({ coin }) {
    const { symbol, currency } = useAppSelector((state) => state.currency);
    const query = `https://api.coingecko.com/api/v3/coins/${coin}?market_data=true`;
    const { data } = useGetCoinDataQuery(query);
    const coinData = [data];
    const SeletedCurrency = currency;

    const handleUnixTime = (date: any) => {
        return getUnixTime(date);
    };

    const formatNumbers = (base: any, property: any, currency: any) => {
        let formatNum = "";
        if (currency !== "none") {
            const num = base[property][currency].toFixed(0);
            formatNum = Number(num).toLocaleString();
        } else {
            const num = base[property].toFixed(0);
            formatNum = Number(num).toLocaleString();
        }
        return formatNum ;
    };

    return (
        <>
            {data != undefined && (
                coinData?.map((item: any) => {
                    const mapKey = Number(item.watchlist_portfolio_users);
                    // const fakeId = 999; 
                    const coinName = item.name;
                    const description = item.description.en;
                    const coinImage = item.image.small;
                    const coinSymbol = item.symbol;
                    const homePageLink = item.links.homepage;
                    const market_data = item.market_data;
                    const current_price = formatNumbers(market_data, "current_price", SeletedCurrency);
                    const change_in_percentage = formatNumbers(market_data, "ath_change_percentage", SeletedCurrency);
                    const ath = formatNumbers(market_data, "ath", SeletedCurrency);
                    const atl = formatNumbers(market_data, "atl", SeletedCurrency);
                    // could refactor here create function
                    const ath_unixCode = handleUnixTime(market_data.ath_date[SeletedCurrency]);
                    const ath_date_time = fromUnixTime(ath_unixCode).toString().slice(0, -27);
                    const atl_unixCode = handleUnixTime(market_data.atl_date[SeletedCurrency]);
                    const atl_date_time = fromUnixTime(atl_unixCode).toString().slice(0, -27);
                    const blockChainSites = item.links.blockchain_site;
                    const [a, b, c] = blockChainSites; // dummy urls 

                    const market_cap = formatNumbers(market_data, "market_cap", SeletedCurrency);
                    // const market_cap_rank = market_data.market_cap_rank; // will use 
                    const fully_diluted_valuation = formatNumbers(market_data, "fully_diluted_valuation", SeletedCurrency);
                    const total_volume = formatNumbers(market_data, "total_volume", SeletedCurrency);
                    const total_supply = formatNumbers(market_data, "total_supply", "none");
                    const cirulating_supply = formatNumbers(market_data, "circulating_supply", "none");
                    const high_24 = formatNumbers(market_data, "high_24h", SeletedCurrency);
                    const low_24 = formatNumbers(market_data, "low_24h", SeletedCurrency);
                    const fill = "bg-yellow-600";
                    const circleFill = "text-yellow-600 fill-current";
                    const circleFillAlt = "text-slate-400 fill-current";

                    const coinData = {
                        "Market cap": market_cap,
                        "Fully diluted valuation": fully_diluted_valuation,
                        "Total volume": total_volume,
                        "Total supply": total_supply,
                        "": "",
                        "Circulating supply": cirulating_supply,
                        "Low 24": low_24,
                        "High 24": high_24
                    };
                    const coinDataArr = Object.entries(coinData);

                    return (
                        <div key={item.id} className=" p-20 flex">
                            <div className="w-3/5  flex flex-col justify-between space-y-32">
                                <div className="flex gap-20">
                                    <div className="space-y-10 flex flex-col justify-between">
                                        <div className=" p-10 bg-slate-500 flex flex-col justify-center items-center">
                                            <Image src={coinImage} width={32} height={32} alt="coin" />
                                            <div>{coinName}[{coinSymbol}]</div>
                                        </div>
                                        <div className=" py-2 px-10 bg-slate-500 p-10 bg-slate-500 flex flex-col justify-center items-center" >
                                            <Link href={homePageLink}>
                                                {homePageLink}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mr-20 bg-slate-500 p-10 flex flex-col justify-between">
                                        {/* treat this likerows and cols */}
                                        <div className="flex justify-around px-10"><div>{symbol}{current_price}</div><div>{change_in_percentage}%</div></div>
                                        <div>Profit:{symbol}{ }</div>
                                        <div className=" bg-slate-500">
                                            <div className="flex px-10">
                                                <div>
                                                    arrow up
                                                </div>
                                                <div>
                                                    <div>All time high: {ath}</div>
                                                    <div>{ath_date_time}</div>
                                                </div>
                                            </div>
                                            <div className="flex px-10">
                                                <div>arrow down</div>
                                                <div>
                                                    <div>All time low: {atl}</div>
                                                    <div>{atl_date_time}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2>Description</h2>
                                    <div >{description}</div>
                                </div>
                            </div>
                            <div className="w-2/5 flex flex-col justify-between space-y-40">
                                <div className="w-11/12 bg-opacity-50 bg-slate-600 opacity-90  p-8 rounded-xl" >
                                    {coinDataArr.map((entry) => {
                                        const [key, value] = entry;

                                        return key || value !== "" ? <div key={mapKey} className="px-10 py-3 flex justify-between ">
                                            <div className="flex gap-4">
                                                <div className="w-6 h-6 shadow-lg shadow-white/50  rounded-full flex justify-center items-center bg-slate-500">
                                                    <Plus className="text-white fill-current" width="12px" height="12px" />
                                                </div>
                                                <div>
                                                    {key}
                                                </div>
                                            </div>
                                            <div className="">{symbol}{value}</div>
                                        </div> : <div className="px-10 py-2"></div>;
                                    })};

                                    <div className="px-10 pt-5 flex">
                                        {/* turn into component then put in cointable later */}
                                        <div className="w-full">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Circle className={circleFill} width="10px" height="10px" />{total_volume}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Circle className={circleFillAlt} width="10px" height="10px" />
                                                    {market_cap}
                                                </div>
                                            </div>
                                            <div>
                                                <DuelPercentageBar height={"h-3"} volume={total_volume} marketCap={market_cap} fill={fill} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col justify-between ">
                                    <div className="">{a}a</div>
                                    <div className="">{b}b</div>
                                    <div className="">{c}c</div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>

    );
}

export default CoinDetails;
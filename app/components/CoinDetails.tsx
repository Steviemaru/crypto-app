"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Plus from "../../public/plus.svg";
import { useGetCoinDataQuery } from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";
import DuelPercentageBar from "./DuelPercentageBar";
import PercentageChange from "./PercentageChange";
import { getUnixTime, fromUnixTime } from "date-fns";
import Circle from "../../public/circle.svg";
import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";
import CoinPageSymbol from "../../public/coinPageSymbol.svg";
import ArrowLeft from "../../public/arrowLeft.svg";

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
    return formatNum;
  };

  return (
    <>
      {data != undefined &&
        coinData?.map((item: any) => {
          const coinName = item.name;
          const description = item.description.en;
          const coinImage = item.image.small;
          const coinSymbol = item.symbol.toUpperCase();
          const homePageLink = item.links.homepage;
          const market_data = item.market_data;
          const current_price = formatNumbers(
            market_data,
            "current_price",
            SeletedCurrency
          );
          const change_in_percentage = formatNumbers(
            market_data,
            "ath_change_percentage",
            SeletedCurrency
          );
          const ath = formatNumbers(market_data, "ath", SeletedCurrency);
          const atl = formatNumbers(market_data, "atl", SeletedCurrency);
          //  refactor here create function later
          const ath_unixCode = handleUnixTime(
            market_data.ath_date[SeletedCurrency]
          );
          const ath_date_time = fromUnixTime(ath_unixCode)
            .toString()
            .slice(0, -27);
          const atl_unixCode = handleUnixTime(
            market_data.atl_date[SeletedCurrency]
          );
          const atl_date_time = fromUnixTime(atl_unixCode)
            .toString()
            .slice(0, -27);
          const blockChainSites = item.links.blockchain_site.slice(0, 3);
          const market_cap = formatNumbers(
            market_data,
            "market_cap",
            SeletedCurrency
          );
          const market_cap_rank = market_data.market_cap_rank; // will use
          const fully_diluted_valuation = formatNumbers(
            market_data,
            "fully_diluted_valuation",
            SeletedCurrency
          );
          const total_volume = formatNumbers(
            market_data,
            "total_volume",
            SeletedCurrency
          );
          const total_supply = formatNumbers(
            market_data,
            "total_supply",
            "none"
          );
          const cirulating_supply = formatNumbers(
            market_data,
            "circulating_supply",
            "none"
          );
          const high_24 = formatNumbers(
            market_data,
            "high_24h",
            SeletedCurrency
          );
          const low_24 = formatNumbers(market_data, "low_24h", SeletedCurrency);

          const fill = "bg-yellow-600";
          const circleFill = "text-yellow-600 fill-current";
          const circleFillAlt = "text-slate-400 fill-current";
          const width = "20px";
          const height = "20px";

          const coinData = {
            "Market cap": market_cap,
            "Fully diluted valuation": fully_diluted_valuation,
            "Total volume": total_volume,
            "Total supply": total_supply,
            "": "",
            "Circulating supply": cirulating_supply,
            "Low 24": low_24,
            "High 24": high_24,
          };
          const coinDataArr = Object.entries(coinData);

          return (
            <div key={item.id} className="p-10 flex gap-10 flex-col">
              {/* top- back link */}
              <Link className="flex gap-4 " href="/">
                <ArrowLeft className=" text-white fill-current" width="10px" />
                <div>Portfolio/Your {coinName} </div>
              </Link>
              {/* middle data */}
              <div className="mb-20">
                <div className="flex gap-7 ">
                  <div className="flex gap-6 ">
                    {/* left */}
                    <div className=" flex  flex-col gap-4 ">
                      <div className="bg-opacity-50 bg-slate-600 opacity-90  p-10 rounded-xl py-20 flex flex-col justify-center items-center">
                        <Image
                          src={coinImage}
                          width={32}
                          height={32}
                          alt="coin"
                        />
                        <h1>
                          {coinName}[{coinSymbol}]
                        </h1>
                      </div>
                      <div className="bg-opacity-50 bg-slate-600 opacity-90 rounded-xl py-4 px-10  p-10 flex flex-col justify-center items-center">
                        <Link href={homePageLink}>{homePageLink}</Link>
                      </div>
                    </div>
                    {/* middle */}
                    <div className=" flex  flex-col  ">
                      <div className="bg-opacity-50 bg-slate-600 opacity-90 rounded-xl  p-5 mr-4 flex flex-col gap-3">
                        <div className="">
                          <div className="flex justify-start gap-7 px-10">
                            <h1 className="text-5xl mb-3">
                              {symbol}
                              {current_price}
                            </h1>
                            <PercentageChange
                              data={Number(change_in_percentage)}
                            />
                          </div>
                          <div
                            className="flex justify-start
                     px-10"
                          >
                            {"Market cap rank"}: {market_cap_rank}
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <CoinPageSymbol />
                        </div>
                        <div>
                          <div className="flex px-10">
                            <div>
                              <TriangleUp
                                width={width}
                                height={height}
                                className="text-green-400 fill-current"
                              />
                            </div>
                            <div>
                              <div>All time high: {ath}</div>
                              <div>{ath_date_time}</div>
                            </div>
                          </div>
                          <div className="flex px-10">
                            <div>
                              <TriangleDown
                                width={width}
                                height={height}
                                className="text-red-400 fill-current"
                              />
                            </div>
                            <div>
                              <div>All time low: {atl}</div>
                              <div>{atl_date_time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="bg-opacity-50 w-6/12 bg-slate-600 opacity-90 px-22 p-7 rounded-xl">
                    {coinDataArr.map((entry) => {
                      const [key, value] = entry;

                      return key || value !== "" ? (
                        <div
                          key={key}
                          className=" w-full py-2 flex justify-between "
                        >
                          <div className="flex gap-6">
                            <div className="w-6 h-6 shadow-lg shadow-white/50  rounded-full flex justify-center items-center bg-slate-500">
                              <Plus
                                className="text-white fill-current"
                                width="12px"
                                height="12px"
                              />
                            </div>
                            <div>{key}</div>
                          </div>
                          <div className="">
                            {symbol}
                            {value}
                          </div>
                        </div>
                      ) : (
                        <div key={key} className="px-10 py-2"></div>
                      );
                    })}
                    <div className="mt-8">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Circle
                            className={circleFill}
                            width="10px"
                            height="10px"
                          />
                          {total_volume}
                        </div>
                        <div className="flex items-center gap-2">
                          <Circle
                            className={circleFillAlt}
                            width="10px"
                            height="10px"
                          />
                          {market_cap}
                        </div>
                      </div>
                      <div className="w-full">
                        <DuelPercentageBar
                          height={"h-3"}
                          volume={total_volume}
                          marketCap={market_cap}
                          fill={fill}
                        />
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
              {/* bottom - description + links */}
              <div>
                <h1 className="mb-4">Description</h1>
                <div className="flex justify-between">
                  <div className="w-8/12">
                    <div className="overflow-y-scroll pt-5 h-56 mr-20">
                      <div className="space-y-4">{description}</div>
                    </div>
                  </div>
                  <div className=" flex gap-7 flex-col text-center justify-between ">
                    {blockChainSites.map((item: any) => (
                      <div
                        key={item}
                        className=" p-4 px-32 bg-slate-500  rounded-xl bg-opacity-50  opacity-90"
                      >
                        {item.length > 50 ? item.slice(0, -15) : item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default CoinDetails;

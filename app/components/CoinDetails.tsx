"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getUnixTime, fromUnixTime } from "date-fns";
import Plus from "../../public/plus.svg";
import { useGetCoinDataQuery } from "@/lib/features/cryptoDataApi";
import { formatNumbers } from "@/utils/helperFunctions";
import { useAppSelector } from "@/lib/hooks";
import DuelPercentageBar from "./DuelPercentageBar";
import PercentageChange from "./PercentageChange";
import Circle from "../../public/circle.svg";
import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";
import CoinPageSymbol from "../../public/coinPageSymbol.svg";
import ArrowLeft from "../../public/arrowLeft.svg";

function CoinDetails({ coin }) {
  const { symbol, currency } = useAppSelector((state) => state.currency);
  const { data } = useGetCoinDataQuery(coin);
  const coinData = [data];
  const SeletedCurrency = currency;

  const handleDateTime = (dateData: any) => {
    const unixCode = getUnixTime(dateData);
    const date_time = fromUnixTime(unixCode).toString().slice(0, -27);
    return date_time;
  };

  return (
    <>
      {data != undefined &&
        coinData?.map((item: any) => {
          const {
            name: coinName,
            description: { en: coinDescription },
            image: { small: coinImage },
            symbol: coinSymbol,
            links: { homepage: homePageLink, blockchain_site },
            market_data,
          } = item;

          const {
            market_cap_rank,
            current_price,
            high_24h,
            low_24h,
            total_supply,
            market_cap,
            total_volume,
            circulating_supply,
            ath_change_percentage,
            fully_diluted_valuation,
            ath,
            atl,
            ath_date,
            atl_date,
          } = market_data;

          const currentPrice = current_price[currency].toFixed(0);
          const high24h = high_24h[currency];
          const low24h = low_24h[currency];
          const marketCap = market_cap[currency];
          const totalVolume = total_volume[currency];
          const athChangePercentage = ath_change_percentage[currency];
          const allTimeLow = atl[currency];
          const allTimeHigh = ath[currency];
          const athDate = handleDateTime(ath_date[SeletedCurrency]);
          const atlDate = handleDateTime(atl_date[SeletedCurrency]);
          const fullyDilutedValuation = fully_diluted_valuation[currency];
          const blockChainSites = blockchain_site.slice(0, 3);

          const fill = "bg-yellow-600";
          const circleFill = "text-yellow-600 fill-current";
          const circleFillAlt =
            "dark:text-slate-400 fill-current text-white dark:fill-current";
          const width = "20px";
          const height = "20px";

          const coinData = {
            "Market cap": marketCap,
            "Fully diluted valuation": fullyDilutedValuation,
            "Total volume": totalVolume,
            "Total supply": total_supply,
            "": "",
            "Circulating supply": circulating_supply,
            "Low 24": low24h,
            "High 24": high24h,
          };

          const coinDataArr = Object.entries(coinData);
          const rightPercentage = ((totalVolume / marketCap) * 10000).toFixed(
            0
          );
          const leftPercentage = 100 - parseInt(rightPercentage);

          return (
            <div key={item.id} className="p-10 flex gap-10 flex-col">
              {/* top- back link */}
              <Link className="flex gap-4 " href="/">
                <ArrowLeft className=" text-white fill-current" width="10px" />
                <div>Portfolio/Your {coinName} </div>
              </Link>
              {/*left */}
              <div className="flex lg:flex-row flex-col justify-between gap-6 mb-20">
                <div className="flex flex-col justify-between lg:flex-[50%] lg:max-w-[50%]  ">
                  <div className=" flex md:flex-row flex-col justify-between gap-4">
                    <div className=" flex  flex-col justify-between flex-[40%] ">
                      <div className="bg-opacity-80 h-[75%] bg-white dark:bg-opacity-50 dark:bg-shark opacity-90  rounded-xl md:pt-20 md:pb-16 py-10 flex flex-col justify-center items-center">
                        <Image
                          src={coinImage}
                          width={32}
                          height={32}
                          alt="coin"
                          loading="lazy"
                        />
                        <h1>
                          {coinName}[{coinSymbol}]
                        </h1>
                      </div>
                      <div className="bg-opacity-80 h-[20%] bg-white dark:bg-opacity-50 dark:bg-shark  opacity-90 rounded-xl py-4 px-10  p-10 md:flex  hidden flex-col justify-center items-center">
                        <Link href={homePageLink}>{homePageLink}</Link>
                      </div>
                    </div>
                    <div className=" flex  flex-col  ">
                      <div className="bg-opacity-80 bg-white dark:bg-opacity-50 dark:bg-shark  opacity-90 rounded-xl  p-5  flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col justify-start md:gap-4 px-10">
                            <h1 className="text-5xl mb-3">
                              {symbol}
                              {parseInt(currentPrice).toLocaleString()}
                            </h1>
                            <PercentageChange
                              symbolType={false}
                              data={Number(athChangePercentage)}
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
                              <div>All time high: {allTimeHigh}</div>
                              <div>{athDate}</div>
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
                              <div>All time low: {allTimeLow}</div>
                              <div>{atlDate}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] lg:flex flex-col  justify-center hidden">
                    <h1 className="mb-4">Description:</h1>
                    <div
                      className={` h-56  pt-5 ${
                        coinDescription == "" ? "" : "overflow-y-scroll"
                      } `}
                    >
                      <div className="space-y-4">
                        {coinDescription == ""
                          ? "Description Unavailible"
                          : coinDescription}
                      </div>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="lg:flex-[40%] lg:max-w-[40%] space-y-[30%]">
                  <div className="bg-opacity-80 bg-white dark:bg-opacity-50 dark:bg-shark  opacity-90 px-22 p-7 rounded-xl">
                    {coinDataArr.map((entry) => {
                      const [key, value] = entry;

                      return key || value !== "" ? (
                        <div
                          key={key}
                          className=" w-full py-2 flex justify-between "
                        >
                          <div className="flex  flex-[50%]">
                            <div className="flex-[30%]">
                              <div className=" w-4 h-4 shadow-lg shadow-white/50  rounded-full flex justify-center items-center bg-opacity-80 bg-white dark:bg-opacity-50 dark:bg-shark ">
                                <Plus
                                  className="text-black dark:text-white dark:fill-current"
                                  width="8px"
                                  height="8px"
                                />
                              </div>
                            </div>
                            <div className="flex-[70%]  md:text-base text-xs">
                              {key}
                            </div>
                          </div>
                          <div className="md:text-base text-xs text-right flex-[50%]">
                            {symbol}
                            {formatNumbers(value)}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={key}
                          className="px-10 py-2 text-right text-xs"
                        ></div>
                      );
                    })}
                    <div className="mt-8">
                      <div className="flex justify-between">
                        <div className="flex items-center sm:text-sm gap-2">
                          <Circle
                            className={circleFill}
                            width="10px"
                            height="10px"
                          />
                          {leftPercentage}%
                        </div>
                        <div className="flex items-center sm:text-sm  gap-2">
                          <Circle
                            className={circleFillAlt}
                            width="10px"
                            height="10px"
                          />
                          {rightPercentage}%
                        </div>
                      </div>
                      <div className="w-full">
                        <DuelPercentageBar
                          height={"h-3"}
                          volume={totalVolume}
                          marketCap={marketCap}
                          fill={fill}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex gap-7 flex-col text-center justify-between ">
                    {blockChainSites.map((item: any) => (
                      <div
                        key={item}
                        className=" p-4 bg-opacity-80 bg-white dark:bg-opacity-50 dark:bg-shark rounded-xl   opacity-90 truncate"
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

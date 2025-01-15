import { useEffect, useState } from "react";
import Image from "next/image";
import PercentageBar from "./PercentageBar";
import PercentageChange from "./PercentageChange";
import { useAppSelector } from "@/lib/hooks";
import { hoverEffect } from "@/utils/hoverEffect";
import { formatNumbers } from "@/utils/FormatNumber";
import Trash from "../../public/trash.svg";
import Edit from "../../public/edit.svg";

function PortfolioAsset({ asset, setIsEditing, setIdForEditing, removeAsset }) {
  const { currency, symbol } = useAppSelector((state) => state.currency);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Tailwind `md` breakpoint is 640px
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const assetMarketData = asset.assetData.market_data;
  const assetData = asset.assetData;

  const trash = (
    <Trash className="text-white fill-current" width={24} height={24} />
  );
  const edit = <Edit />;

  const { id, purchasedAmount, purchaseDate, coinImage, coinSymbol } = asset;
  const { name } = assetData;
  const {
    current_price,
    high_24h,
    market_cap,
    total_volume,
    price_change_24h,
    circulating_supply,
  } = assetMarketData;

  const currencyPrice = current_price[currency];
  const high24h = high_24h[currency];
  const marketCap = market_cap[currency];
  const totalVolume = total_volume[currency];

  const market = {
    "Current Price:": currencyPrice,
    "Price change 24h:": price_change_24h,
    "Market cap vs Volume:": parseFloat(marketCap) / parseFloat(totalVolume),
    "Circ supply:": circulating_supply,
  };

  const coin = {
    "Coin amount:": purchasedAmount,
    "Amount value:": currencyPrice * purchasedAmount,
    "High 24:": high24h,
    "Purchase Date:": purchaseDate,
  };

  const marketArr = Object.entries(market);
  const coinArr = Object.entries(coin);

  const displayedMarketArr = isSmallScreen ? marketArr.slice(0, 2) : marketArr;
  const displayedCoinArr = isSmallScreen ? coinArr.slice(0, 2) : coinArr;
  6;
  return (
    <div className="flex md:flex-row flex-col my-4 ">
      <div className="md:w-1/5 bg-slate-800 p-8  flex flex-col justify-center items-center">
        <div className="rounded-lg p-2 bg-slate-200">
          <Image src={coinImage} width={22} height={22} alt="coin" />
        </div>
        <div className="mt-4 font-semibold">
          {name}
          {` [${coinSymbol}]`}
        </div>
      </div>
      <div className="md:w-4/5 bg-gray-700 md:mr-5 p-8 ">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-lg ">Market Price</h2>
          <button
            className={`bg-slate-400 p-2 rounded-md ${hoverEffect} `}
            onClick={() => {
              removeAsset(asset);
            }}
          >
            {" "}
            {trash}{" "}
          </button>
        </div>
        <div className="border-b border-slate-100 flex justify-between pb-5">
          {displayedMarketArr.map((entry) => {
            const [key, value] = entry;

            return (
              <div
                key={key}
                className="flex flex-col justify-between items-center gap-1 flex-1 m-2"
              >
                <h4 className="text-sm font-medium text-center">{key}</h4>
                {key !== "Market cap vs Volume:" ? (
                  <div className="font-medium fill-current text-teal-400 flex">
                    <PercentageChange symbolType={true} data={value} />
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    {" "}
                    <div className="text-sm">{value.toFixed(1)}%</div>{" "}
                    <PercentageBar progress={value} fill={"bg-teal-400"} />{" "}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between flex-2  mt-5">
          <h2 className="font-medium">Your Coin</h2>
          <button
            className={`bg-slate-400 p-2 rounded-md ${hoverEffect} `}
            onClick={() => {
              setIsEditing(true);
              setIdForEditing(id);
            }}
          >
            {" "}
            {edit}{" "}
          </button>
        </div>
        <div className="flex justify-between">
          {displayedCoinArr.map((entry) => {
            const [key, value] = entry;
            return (
              <div
                key={key}
                className="flex flex-col items-center flex-1 gap-1 m-2"
              >
                <h4 className="text-sm font-medium text-center">{key}</h4>
                {key !== "Coin amount:" && key !== "Purchase Date:" ? (
                  <div className="font-medium fill-current text-teal-400">
                    {symbol}
                    {formatNumbers(value)}
                  </div>
                ) : (
                  <div>{value}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PortfolioAsset;

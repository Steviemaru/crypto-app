"use client";

import { useState } from "react";
import DropDown from "../components/DropDown";
import { useGetCarouselDataQuery, useGetChartDataQuery, useGetDataBQuery } from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";
import ConvertorChart from "../components/ConvertorChart";
// import CoinNavButtons from "../components/CoinNavButtons";

export default function Page() {
  const [left, setLeft] = useState({ name: "bitcoin", current_price: 76000, symbol: "btc" });
  const [right, setRight] = useState({ name: "ethereum", current_price: 2800, symbol: "eth" });
  const [leftSelected, setLeftSelected] = useState("bitcoin");
  const [rightSelected, setRightSelected] = useState("etherium");
  const [numOfCoins, setNumOfCoins] = useState(1);
  const { symbol, currency } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;
  const { data } = useGetCarouselDataQuery(coinQuery);

  const chartQuery = `https://api.coingecko.com/api/v3/coins/${left.name}/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const { data: chartA } = useGetChartDataQuery(chartQuery);
  const chartQuery2 = `https://api.coingecko.com/api/v3/coins/${right.name}/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const { data: chartB } = useGetDataBQuery(chartQuery2);

  const exchangeRate = (left.current_price / right.current_price);
  const convertedRate = () => numOfCoins * exchangeRate;
  const displayConvertedRate = convertedRate();
  const convertedCurrencyA = (1 * (left.current_price / right.current_price)).toFixed(2);
  const convertedCurrencyB = (1 * (right.current_price / left.current_price)).toFixed(2);

  const handleChange = (e: any) => {
    setNumOfCoins(e.target.value);
  };

  const handleSwitch = () => {
    setLeftSelected(right.name);
    setRightSelected(left.name);
    setLeft(right);
    setRight(left);
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <div className="flex">
        <div className="rounded-2xl py-12 px-52  bg-opacity-50 bg-slate-600 opacity-90">
          <div className="flex justify-between items-center ">
            <DropDown data={data} selected={leftSelected} setSelected={setLeftSelected} setConvertorValue={setLeft} />
            <div>
              <input onChange={handleChange} value={numOfCoins} type="text" />
            </div>
          </div>
          <div className="border-b border-red-500 p-2 mb-5"> </div>
          <div> 1 {left.symbol} = {symbol}{convertedCurrencyA} </div>
          {/* can refactor into componets here */}
        </div>
        <button onClick={handleSwitch}> switch</button>
        <div className="rounded-2xl py-12 px-52  bg-opacity-50 bg-slate-600 opacity-90">
          <div className="flex justify-between items-center " >
            <DropDown data={data} selected={rightSelected} setSelected={setRightSelected} setConvertorValue={setRight} />
            <div>
              <div>{displayConvertedRate.toFixed(2)} </div>
            </div>
          </div>
          <div className="border-b border-red-500 p-2 mb-5"> </div>
          <div> 1 {right.symbol} = {symbol}{convertedCurrencyB} </div>
        </div>
      </div>
      <ConvertorChart chartA={chartA} chartB={chartB} />

    </div>
  );
}

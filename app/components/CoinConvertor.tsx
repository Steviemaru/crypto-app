"use client";
import { useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";
import {
  useGetCarouselDataQuery,
  useGetChartDataQuery,
  useGetChartDataBQuery,
} from "@/lib/features/cryptoDataApi";
import Rotate from "@/public/rotate.svg";
import GetTodaysDate from "@/utils/GetTodaysDate";
import DropDown from "../components/DropDown";
import ConvertorChart from "../components/ConvertorChart";
import CoinConvertorContent from "./CoinConvertorContent";
import LeftConvertorItem from "./LeftConvertorItem";
import RightConvertorItem from "./RightConvertorItem";

function CoinConvertor() {
  const [left, setLeft] = useState({
    name: "bitcoin",
    current_price: 76000,
    symbol: "btc",
  });
  const [right, setRight] = useState({
    name: "ethereum",
    current_price: 2800,
    symbol: "eth",
  });

  const [leftSelected, setLeftSelected] = useState("");
  const [rightSelected, setRightSelected] = useState("");
  const [showLeftPlaceholder, setShowLeftPlaceholder] = useState(true);
  const [showRightPlaceholder, setShowRightPlaceholder] = useState(true);
  const [numOfCoins, setNumOfCoins] = useState(0);
  const { symbol, currency } = useAppSelector(
    (state: RootState) => state.currency
  );
  const { selectedDay } = useAppSelector(
    (state: RootState) => state.selectedDay
  );

  const { data } = useGetCarouselDataQuery(currency);

  const chartQuery = `coins/${leftSelected}/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const {
    data: chartA,
    isLoading,
    isSuccess,
  } = useGetChartDataQuery(chartQuery, {
    skip: !leftSelected, // Skip the query if the coin is not selected
  });
  const chartQuery2 = `coins/${rightSelected}/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const {
    data: chartB,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
  } = useGetChartDataBQuery(chartQuery2, {
    skip: !rightSelected, // Skip the query if the coin is not selected
  });

  const exchangeRate = left.current_price / right.current_price;
  const convertedRate = () => numOfCoins * exchangeRate;
  const displayConvertedRate = convertedRate();
  const convertedCurrencyA = (
    1 *
    (left.current_price / right.current_price)
  ).toFixed(2);
  const convertedCurrencyB = (
    1 *
    (right.current_price / left.current_price)
  ).toFixed(2);

  const handleChange = (e: any) => {
    setNumOfCoins(e.target.value);
  };

  const handleSwitch = () => {
    setLeft(right);
    setRight(left);
    setLeftSelected(rightSelected);
    setRightSelected(leftSelected);
  };

  const leftCoinSymbol = left.symbol;
  const rightCoinSymbol = right.symbol;

  return (
    <div className="w-full  flex  flex-col justify-center  gap-4">
      <div className="flex flex-col justify-start items-start my-4">
        <h1>Online Currency Convertor</h1>
        <div>{<GetTodaysDate />}</div>
      </div>

      <div className="flex md:flex-row flex-col w-[100%] items-center">
        <LeftConvertorItem
          currencySymbol={symbol}
          coin={leftCoinSymbol}
          convertedCurrency={convertedCurrencyA}
          handleChange={handleChange}
          numOfCoins={numOfCoins}
          showPlaceHolder={showLeftPlaceholder}
        >
          <DropDown
            data={data}
            selected={leftSelected}
            setSelected={setLeftSelected}
            setConvertorValue={setLeft}
            showPlaceHolder={showLeftPlaceholder}
            setShowPlaceHolder={setShowLeftPlaceholder}
          />
        </LeftConvertorItem>
        <div className="relative  p-2 ">
          <button
            className="flex items-center justify-center absolute left-1/2 top-1/2 z-10  transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-black text-lg rounded-full bg-white"
            onClick={handleSwitch}
          >
            {" "}
            <Rotate width={18} height={18} />
          </button>
        </div>
        <RightConvertorItem
          currencySymbol={symbol}
          coin={rightCoinSymbol}
          convertedCurrency={convertedCurrencyB}
          displayConvertedRate={displayConvertedRate}
          showPlaceHolder={showRightPlaceholder}
        >
          <DropDown
            data={data}
            selected={rightSelected}
            setSelected={setRightSelected}
            setConvertorValue={setRight}
            showPlaceHolder={showRightPlaceholder}
            setShowPlaceHolder={setShowRightPlaceholder}
          />
        </RightConvertorItem>
      </div>
      <CoinConvertorContent
        isLoading={isLoading}
        isLoading2={isLoading2}
        leftSelected={leftSelected}
        rightSelected={rightSelected}
        isSuccess={isSuccess}
        isSuccess2={isSuccess2}
      > 
      {/* nested component to avoid prop drilling */}
        <ConvertorChart chartA={chartA} chartB={chartB} />
      </CoinConvertorContent>
    </div>
  );
}

export default CoinConvertor;

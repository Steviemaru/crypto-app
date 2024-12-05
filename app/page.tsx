"use client";
import { useEffect, useState } from "react";
import Chart from "./components/Charts/Charts";
import { Carousel } from "./components/Carousel";
import CoinTable from "./components/CoinTable";
// import { useGetCarouselDataQuery, useGetChartDataQuery } from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {

  /////////////////////////////////////////////////////
  // These objects are for initial state before the mock data loads. 

  const mockChartObj = {
    prices: [[12.70, 2.40], [2.64, 39.3], [3.4, 4.12]],
    total_volumes: [[12.333, 22.999], [24.500, 33.400], [35.000, 44.550]]
  };

  const mockCoinObj = Array(1).fill(null).map(() => ({
    ath_change_percentage
      :
      222222,
    circulating_supply
      :
      19782096
    , current_price
      :
      91308
    , id
      : "bitcoin"
    , image
      :
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
    , market_cap
      :
      1805961478454
    , name
      :
      "Bitcoin"

    , price_change_percentage_1h_in_currency
      :
      -0.08905927219068985
    , price_change_percentage_7d_in_currency
      :
      21.679469340529533
    , price_change_percentage_24h_in_currency
      :
      4.044298616482231

    , sparkline_in_7d: { price: [74907.2812906931, 75039.68272471422, 74807.69649728524, 74939.60348749362, 76025.81096678146, 76008.9815913615, 76382.74840111578, 76238.96337102703, 76683.43596935458, 76487.56152478016, 75927.03204399807, 75862.29356974358, 75987.24178320667, 76177.71842078357, 76049.3923531652, 75684.3928133205, 75991.86045731162, 75895.23554225442, 76048.00699233459] }

    , symbol: "BTC",
    total_volume: 137998414553,
    total_supply: 537998414553
  }));

  /////////////////////////////////////////////////////
  // All commented code on this page is api related and 
  // would be used if there were no limit on api calls 
  // because of limited api calls this code produces a 429 status code which stops data from being loaded on screen.
  // so inorder to combat this im using mirage.js mock data instead of the redux fetchBaseQueryHook
  /////////////////////////////////////////////////////

  // const { currency } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);

  // api

  const intervals = {
    1: {
      interval: "5m",
      days: 1,
    },
    3: {
      interval: "hourly",
      days: 3,
    },
    7: {
      interval: "daily",
      days: 7,
    },
    30: {
      interval: "daily",
      days: 30,
    },
    90: {
      interval: "daily",
      days: 90,
    },
    180: {
      interval: "daily",
      days: 180,
    },
    365: {
      interval: "daily",
      days: 365,
    },
  };
  const { days } = intervals[selectedDay];

  /////////////////////////////////////////////////////

  const [mockCoin, setMockCoin] = useState(mockCoinObj);
  const [mockChart, setMockChart] = useState(mockChartObj);

  const subCoinQuery = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&sparkline=true";
  const subChartQuery = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily";

  // using mirage.js to fetch mockdata and set state. on initial load. 

  useEffect(() => {
    try {
      fetch(subCoinQuery)
        .then((res) => res.json())
        .then((data) => {
          setMockCoin(data);
        });
      fetch(subChartQuery)
        .then((res) => res.json())
        .then((data) => {
          setMockChart(data);
        });
    } catch (error) {
      // console.error(error, "something went wrong :S")
    }
  }, []);

  ///////////////////////////////////////////////////////
  // undernormal circumstances the urls would have variable interpolation to make the page dynamic  .
  // instead i'm using static urls to present data on screen. 

  // const chartQuery = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
  // const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;

  /////////////////////////////////////////////////////////////////////////////////
  /// fetchBaseQuery hooks would be used under normal circumstances. e.g unlimited calls

  // const { data: coin } = useGetCarouselDataQuery(coinQuery);
  // const { data: chart } = useGetChartDataQuery(chartQuery);

  const coinData = mockCoin?.slice(0, 10)?.map((item: any) => item);
  const chartData = mockChart;

  return (
    <div className="flex justify-center flex-col items-center ">
      <Carousel coinData={coinData} />
      <Chart chartData={chartData} intervals={intervals} days={days} />
      <CoinTable coinData={coinData} />
    </div>
  );
}

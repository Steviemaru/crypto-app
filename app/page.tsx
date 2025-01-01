"use client";
import Chart from "./components/Charts/Charts";
import { Carousel } from "./components/Carousel";
import CoinTable from "./components/CoinTable";
import { useGetCarouselDataQuery } from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const { currency } = useAppSelector((state) => state.currency);

  const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;

  const { data: coin } = useGetCarouselDataQuery(coinQuery);
  const coinData = coin || [];

  return (
    <div className="flex justify-center flex-col items-center h">
     <div className="w-11/12 flex justify-center flex-col items-center gap-10 ">
     <Carousel coinData={coinData} />
      <Chart />
      <CoinTable coinData={coinData} />
     </div>
    </div>
  );
}

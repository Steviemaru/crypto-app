"use client";
import Chart from "./components/Charts/Charts";
import { Carousel } from "./components/Carousel";
import CoinTable from "./components/CoinTable";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h">
      <div className="w-11/12 flex justify-center flex-col items-center gap-10 ">
        <Carousel />
        <Chart />
        <CoinTable />
      </div>
    </div>
  );
}

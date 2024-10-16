"use client";
import Chart from "./components/Charts/Charts";
import { Carousel } from "./components/Carousel";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center ">
      <Carousel/>
      <Chart />
    </div>
  );
}

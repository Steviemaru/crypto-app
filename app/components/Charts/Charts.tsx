"use client";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { setDays } from "@/lib/features/daysSlice";
import GetTodaysDate from "@/utils/GetTodaysDate";
import { getChartLabels } from "@/utils/getChartlabels";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useGetChartDataQuery } from "@/lib/features/cryptoDataApi";
import { chartOptions } from "@/utils/helperFunctions";

function Charts() {
  const [selected, setSelected] = useState("");
  const { currency, symbol } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const dispatch = useAppDispatch();

  const chartQuery = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const { data: chart } = useGetChartDataQuery(chartQuery);

  const chartData = chart;

  // contains values for days buttons 
  const intervalsForDays = {
    "1D": "1",
    "3D": "3",
    "7D": "7",
    "1M": "30",
    "3M": "90",
    "6M": "180",
    "1Y": "365",
};

  // chart data
  const chartPrices = chartData?.prices?.map((item: any) => item[1]);

  const chartVolumes = chartData?.total_volumes?.map((item: any) => item[1]);

  const coinPrice = chartData?.prices?.map((item: any) => item[0]);

  const coinVolume = chartData?.total_volumes?.map((item: any) => item[1]);

  const parsedCoinPrice = parseFloat(coinPrice);

  const parsedVolumePrice = parseFloat(coinVolume);

  const formattedCoin = HandleFormatingNumbersAndLabels(
    parsedCoinPrice,
    "charts"
  );
  const formatedVolumePrice = HandleFormatingNumbersAndLabels(
    parsedVolumePrice,
    "charts"
  );

  // chart gradient data 
  const borderColor = "#f18981";
  const gradientA = "#f18981";
  const gradientB = "rgba(0,0,0,0)";

  return (
      <div className="w-full">
        <div className="flex py-4 lg:gap-10 gap-6 md:flex-row flex-col ">
          {/* chart 1 */}
          <div className="rounded-2xl p-4 bg-opacity-80 bg-shark opacity-90 md:w-3/6 ">
            <div>
              <div className="mb-5 text-base "> Price</div>
              <div className="text-2xl">
                {symbol}
                {formattedCoin}
                { }
              </div>
              <GetTodaysDate />
            </div>
            <LineChart
              chartLabels={getChartLabels(selectedDay)}
              chartData={chartPrices}
              gradientA={gradientA}
              gradientB={gradientB}
              borderColor={borderColor}
              width={"w-full"}
              height={"h-[250px]"}
              chartOptions={chartOptions}
            />
          </div>
          {/* chart 2  */}
          <div className="rounded-2xl p-4 bg-opacity-80 bg-shark opacity-90 md:w-3/6 ">
            <div>
              <div className="mb-5 text-base">Volume 24h</div>
              <div className="text-2xl">
                {symbol}
                {formatedVolumePrice}
              </div>
              <GetTodaysDate />
            </div>
            <BarChart
              chartLabels={getChartLabels(selectedDay)}
              chartData={chartVolumes}
              width={"w-full"}
              height={"h-[150px]"}
            />
          </div>
        </div>
        {/* 1D 3D 5D ect days buttons */}
        <div className="flex gap-3 ">
        {Object.entries(intervalsForDays).map((entry: any) => {
const [key , value] = entry;
                    return (
                        <button
                            key={key}
                            className={`p-2 rounded-xl bg-opacity-50 bg-slate-600 ${key == selected ? "bg-slate-900" : ""
                                }`}
                            onClick={() => {
                                dispatch(setDays(parseInt(value)));
                                setSelected(key);
                            }}
                        >
                            {key}
                        </button>
                    );
                })}
        </div>
      </div>
  );
}

export default Charts;

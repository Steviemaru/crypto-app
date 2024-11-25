"use client";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { setDays } from "@/lib/features/daysSlice";
import GetTodaysDate from "@/utils/GetTodaysDate";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
// check if imports are in correct order...

function Charts({ chartData, intervals, days }) {
  const [selected, setSelected] = useState("");
  const { symbol } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  // gets values for days buttons
  const mappedIntervalsForDays = Object.values(intervals);

  // chart data
  const chartPrices = chartData?.prices?.map((item: any) => item[1]);
  
  const chartVolumes = chartData?.total_volumes?.map((item: any) => item[1]);

  const coinPrice = chartData?.prices[0][0];

  const coinVolume = chartData?.total_volumes[0][1];

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
  const borderColor = "rgba(75,192,192,1)";
  const gradientA = "rgba(75,192,192,1)";
  const colorValue = "#fff";

  // creates numbers on X axis of chart
  const getChartLabels = () => {
    const now = new Date();
    const numOfDays = new Date(now.setDate(now.getDate() - days));
    const labels: any[] = [];
    for (let d = new Date(); d > numOfDays; d.setDate(d.getDate() - 1)) {
      const day = d.getDate();
      labels.push(day);
    }
    labels.reverse();
    return labels;
  };

  return (
    <>
      <div>
        <div className="flex py-4 gap-10">
          {/* chart 1 */}
          <div className="rounded-2xl p-4 bg-opacity-50 bg-slate-600 opacity-90 ">
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
              chartLabels={getChartLabels()}
              chartData={chartPrices}
              borderColor={borderColor}
              gradientA={gradientA}
              xDisplay={true}
              colorValue={colorValue}
              width={"400"}
              height={"200"}
            />
          </div>
          {/* chart 2  */}
          <div className="rounded-2xl p-4 bg-opacity-50 bg-slate-600 opacity-90 ">
            <div>
              <div className="mb-5 text-base">Volume 24h</div>
              <div className="text-2xl">
                {symbol}
                {formatedVolumePrice}
              </div>
              <GetTodaysDate />
            </div>
            <BarChart
              chartLabels={getChartLabels()}
              chartData={chartVolumes}
              width={"400"}
              height={"200"}
            />
          </div>
        </div>
        {/* days buttons */}
        <div className="flex gap-4">
          {mappedIntervalsForDays.map((item: any) => {
            return (
              <button
                key={item.days}
                className={`p-2 rounded-xl bg-opacity-50 bg-slate-600 ${selected == item.days ? "bg-slate-900" : ""
                  }`}
                onClick={() => {
                  dispatch(setDays(item.days));
                  setSelected(item.days);
                }}
              >
                {item.days}D
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Charts;

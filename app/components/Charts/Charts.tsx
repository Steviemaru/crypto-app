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

function Charts() {
  const [selected, setSelected] = useState("");
  const { currency, symbol } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const dispatch = useAppDispatch();

  const chartQuery = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${selectedDay}`;
  const { data: chart } = useGetChartDataQuery(chartQuery);

  const chartData = chart;

  // contains values for days buttons 
  const intervalsForDays = [
    1,
    3,
    7,
    30,
    90,
    180,
    365,
  ];

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
  const borderColor = "rgba(75,192,192,1)";
  const gradientA = "rgba(75,192,192,1)";
  const colorValue = "#fff";

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
              chartLabels={getChartLabels(selectedDay)}
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
              chartLabels={getChartLabels(selectedDay)}
              chartData={chartVolumes}
              width={"400"}
              height={"200"}
            />
          </div>
        </div>
        {/* 1D 3D 5D ect days buttons */}
        <div className="flex gap-4">
          {intervalsForDays.map((item: any) => {
            return (
              <button
                key={item}
                className={`p-2 rounded-xl bg-opacity-50 bg-slate-600 ${selected == item ? "bg-slate-900" : ""
                  }`}
                onClick={() => {
                  dispatch(setDays(item));
                  setSelected(item);
                }}
              >
                {item}D
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Charts;

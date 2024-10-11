 "use client";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { setDays } from "@/lib/features/daysSlice";
import GetTodaysDate from "@/utils/GetTodaysDate";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useGetChartDataQuery } from "@/lib/features/cryptoDataApi";
// check if imports are in correct order...

function Charts() {
  const [selected, setSelected] = useState("");

  //commented out to pass linter
  //currency add back to destructuring
  // redux state
  const {  symbol } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const dispatch = useAppDispatch();

  // api

  const intervals = {
    1: {
      interval: "5m",
      days: "1",
    },
    3: {
      interval: "hourly",
      days: "3",
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
  const {  days } = intervals[selectedDay];

  //commented out to pass linter
  // interval add back to destructuring
  // const query = `coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;

  // using substitute Query in place of query while I find solution to 429 error code.
  const substituteQuery =
    "coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily";

  const { data } = useGetChartDataQuery(substituteQuery);

  // gets values for days buttons
  const mappedIntervalsForDays = Object.values(intervals);

  // chart data
  const chartPrices = data?.prices.map((item: any) => item[1]);

  const chartVolumes = data?.total_volumes.map((item: any) => item[1]);
  const coinPrice = data?.prices[0][0];

  const coinVolume = data?.total_volumes[0][1];

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
                {}
              </div>
              <GetTodaysDate />
            </div>
            <LineChart
              chartLabels={getChartLabels()}
              chartData={chartPrices}
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
                className={`p-2 rounded-xl bg-opacity-50 bg-slate-600 ${
                  selected == item.days ? "bg-slate-900" : ""
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

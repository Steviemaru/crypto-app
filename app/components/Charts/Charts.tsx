"use client";
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { setDays } from "@/lib/features/daysSlice";
import GetTodaysDate from "@/utils/GetTodaysDate";
import { getChartLabels } from "@/utils/getChartlabels";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import Spinner from "../spinner/Spinner";
import {
  firstLetterToUppercase,
  chartOptions,
  getChartData,
} from "@/utils/helperFunctions";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useGetChartDataQuery } from "@/lib/features/cryptoDataApi";

function Charts() {
  const [selected, setSelected] = useState("");
  const [datasetArr, setDatasetArr] = useState<any>([]);
  const { selectedCoins } = useAppSelector((state) => state.chart);
  const { currency, symbol } = useAppSelector((state) => state.currency);
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const dispatch = useAppDispatch();

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

  //////////////////////////////////////////////////////////////

  const {
    data: coin1Query,
    isLoading,
    isSuccess,
  } = useGetChartDataQuery(
    `https://api.coingecko.com/api/v3/coins/${selectedCoins[0]}/market_chart?vs_currency=${currency}&days=${selectedDay}`,
    {
      skip: !selectedCoins[0], // Skip the query if the coin is not selected
    }
  );

  const {
    data: coin2Query,
    isLoading: isLoading2,
    isSuccess: isSucess2,
  } = useGetChartDataQuery(
    `https://api.coingecko.com/api/v3/coins/${selectedCoins[1]}/market_chart?vs_currency=${currency}&days=${selectedDay}`,
    {
      skip: !selectedCoins[1], // Skip the query if the coin is not selected
    }
  );

  const {
    data: coin3Query,
    isLoading: isLoading3,
    isSuccess: isSucess3,
  } = useGetChartDataQuery(
    `https://api.coingecko.com/api/v3/coins/${selectedCoins[2]}/market_chart?vs_currency=${currency}&days=${selectedDay}`,
    {
      skip: !selectedCoins[2], // Skip the query if the coin is not selected
    }
  );
  /////////////////////////////////////////////////////////////

  const chartData = datasetArr;
  // These color classes are the same but will throw an error in chart if custom names are used so seperate array is used
  const colorClasses = ["#f18981", "#9c27b0", "#84ffff"];
  const CustomColorClasses = [
    "bg-Coral-Red",
    "bg-Royal-Purple",
    "bg-Aqua-Blue",
  ];
  const chartLabels = getChartLabels(selectedDay);
  const coinChartData = getChartData(chartData, colorClasses, selectedCoins);

  /////////////////////////////////////////////////////////////
  // chart label code

  // gets volume and market cap arrays
  const coinMarketCap = datasetArr.map(
    (item) => item.chartDataObj?.market_caps?.map((cap) => cap[1]) || []
  );

  const coinVolumes = datasetArr.map(
    (item) => item.chartDataObj?.total_volumes?.map((vol) => vol[1]) || []
  );

  // gets up to 3 market cap and total volume prices displayed onchart when carousel item is selected
  const [coinMarketCap1, coinMarketCap2, coinMarketCap3] = coinMarketCap.map(
    (item) => HandleFormatingNumbersAndLabels(parseFloat(item), "charts")
  );

  const [coinTotalVolume1, coinTotalVolume2, coinTotalVolume3] =
    coinVolumes.map((item) =>
      HandleFormatingNumbersAndLabels(parseFloat(item), "charts")
    );

  // gets names of selected carousel items
  const [coinName1, coinName2, coinName3] = selectedCoins.map((item) => {
    const capitalizedValue =
      item !== undefined ? firstLetterToUppercase(item) : item;
    return capitalizedValue;
  });

  // object used to map through and display coin label data
  const coinMarketCapChartLabels = [
    [coinName1, coinMarketCap1],
    [coinName2, coinMarketCap2],
    [coinName3, coinMarketCap3],
  ];

  const coinTotalVolumeChartLabels = [
    [coinName1, coinTotalVolume1],
    [coinName2, coinTotalVolume2],
    [coinName3, coinTotalVolume3],
  ];

  /////////////////////////////////////////////////////////////

  const placeholder = (
    <div className="flex flex-col h-[500px] justify-center items-center">
      <div className="text-center text-gray-500">
        {" "}
        Select coins to display their chart data.
      </div>
    </div>
  );

  const loader = (
    <div className="flex flex-col h-[500px] justify-center items-center">
      <Spinner />
    </div>
  );
  ///////////////  /////////////////////////////////////////////////////////////

  const lineChartContent =
    isLoading || isLoading2 || isLoading3 ? (
      loader
    ) : selectedCoins.length < 1 ? (
      placeholder
    ) : isSuccess || isSucess2 || isSucess3 ? (
      <LineChart
        chartLabels={chartLabels}
        chartData={coinChartData}
        width={"w-full"}
        height={"h-[300px]"}
        chartOptions={chartOptions}
      />
    ) : (
      []
    );

  const barChartContent =
    isLoading || isLoading2 || isLoading3 ? (
      loader
    ) : selectedCoins.length < 1 ? (
      placeholder
    ) : isSuccess ? (
      <BarChart
        chartLabels={chartLabels}
        chartData={coinChartData}
        width={"w-full"}
        height={"h-[300px]"}
        chartOptions={chartOptions}
      />
    ) : (
      []
    );

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    const handleLoggingAndFiltering = () => {
      if (!selectedCoins.length) return;
      // Ensure all required data queries have succeeded
      const queriesReady = [coin1Query, coin2Query, coin3Query]
        .slice(0, selectedCoins.length)
        .every((query) => query);

      if (queriesReady) {
        // Add new coins to datasetArr
        selectedCoins.forEach((coin, index) => {
          const coinExists = datasetArr.some((item) => item.id === coin);
          if (!coinExists) {
            const loggedCoin = {
              id: coin,
              chartDataObj:
                index === 0
                  ? coin1Query
                  : index === 1
                  ? coin2Query
                  : coin3Query,
            };
            setDatasetArr((prev) => [...prev, loggedCoin]);
          }
        });

        // Remove coins no longer in selectedCoins
        setDatasetArr((prev) =>
          prev.filter((item) => selectedCoins.includes(item.id))
        );
      }
    };

    handleLoggingAndFiltering();
  }, [selectedCoins, coin1Query, coin2Query, coin3Query]);

  return (
    <div className="w-full">
      <div className="flex py-4 lg:gap-10 gap-6 md:flex-row flex-col ">
        {/* {/* chart 1  */}
        <div className="rounded-2xl p-4 bg-opacity-80 bg-shark opacity-90 md:w-3/6  ">
          <div className="lg:text-2xl text-base">
            {selectedCoins.length > 0 && (
              <div className="mb-5 "> Market Cap</div>
            )}
            {selectedCoins.length === 1 && (
              <div>
                <div className="flex items-center">
                  {coinName1 !== undefined && (
                    <div className="flex items-center">
                      <div>{` ${coinName1} ${symbol} ${coinMarketCap1}`}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCoins.length > 0 && <GetTodaysDate />}
          </div>
          {lineChartContent}
          {selectedCoins.length > 1 && (
            <div className="mt-6">
              <div className="flex gap-3 lg:flex-row flex-col">
                {coinMarketCapChartLabels.map((coinData, index) => {
                  const [name, price] = coinData;
                  const lineColor = CustomColorClasses[index];
                  return (
                    name !== undefined &&
                    price !== undefined && (
                      <div key={name} className="flex items-center">
                        <div className={`h-4 w-4 ${lineColor} mr-3`}></div>
                        <div className="flex text-sm gap-1">
                          <div className="truncate">{name}</div>
                          <div className="">{`${symbol} ${price}`}</div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* {/* chart 2   */}
        <div className="rounded-2xl p-4 bg-opacity-80 bg-shark opacity-90 md:w-3/6 ">
          <div className="lg:text-2xl text-base">
            {selectedCoins.length > 0 && (
              <div className="mb-5 "> 24hr Volume</div>
            )}
            {selectedCoins.length === 1 && (
              <div>
                <div className="flex items-center">
                  {coinName1 !== undefined && (
                    <div className="flex items-center">
                      <div>{` ${coinName1} ${symbol} ${coinMarketCap1}`}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCoins.length > 0 && <GetTodaysDate />}
          </div>
          {barChartContent}
          {selectedCoins.length > 1 && (
            <div className="mt-6">
              <div className="flex gap-3  lg:flex-row flex-col">
                {coinTotalVolumeChartLabels.map((coinData, index) => {
                  const [name, price] = coinData;
                  const barColor = CustomColorClasses[index];
                  return (
                    name !== undefined &&
                    price !== undefined && (
                      <div key={name} className="flex items-center">
                        <div className={`h-4 w-4 ${barColor} mr-3`}></div>
                        <div className="flex text-sm gap-1">
                          <div className="truncate">{name}</div>
                          <div>{`${symbol} ${price}`}</div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1D 3D 5D ect days buttons */}
      <div className="flex gap-3 ">
        {Object.entries(intervalsForDays).map((entry: any) => {
          const [key, value] = entry;
          return (
            <button
              key={key}
              className={`p-2 rounded-xl bg-opacity-50 bg-slate-600 ${
                key == selected ? "bg-slate-900" : ""
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

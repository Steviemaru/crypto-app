"use client";
import { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";
import BarChart from "./BarChart";
import { useTheme } from "next-themes";
import LineChart from "./LineChart";
import GetTodaysDate from "@/utils/GetTodaysDate";
import { getChartLabels } from "@/utils/getChartlabels";
import { HandleFormatingNumbersAndLabels } from "@/utils/helperFunctions";
import {
  firstLetterToUppercase,
  chartOptions,
  getChartData,
} from "@/utils/helperFunctions";
import { useGetChartDataQuery } from "@/lib/features/cryptoDataApi";
import ChartContent from "../ChartContent";

function Charts() {
  const [datasetArr, setDatasetArr] = useState<any>([]);
  const { selectedCoins } = useAppSelector((state) => state.chart);
  const { currency, symbol } = useAppSelector(
    (state: RootState) => state.currency
  );
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const { theme } = useTheme();
  const fadeColor =
    theme == "dark" ? "rgba(0,0,0,0.1)" : "rgba(225,225,225,0.1)";
  //////////////////////////////////////////////////////////////

  const {
    data: coin1Query,
    isLoading,
    isSuccess,
  } = useGetChartDataQuery(
    selectedCoins[0]
      ? `coins/${selectedCoins[0]}/market_chart?vs_currency=${currency}&days=${selectedDay}`
      : null,
    {
      skip: !selectedCoins[0], // Skip the query if the coin is not selected
    }
  );

  const {
    data: coin2Query,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
  } = useGetChartDataQuery(
    selectedCoins[1]
      ? `coins/${selectedCoins[1]}/market_chart?vs_currency=${currency}&days=${selectedDay}`
      : null,
    {
      skip: !selectedCoins[1],
    }
  );

  const {
    data: coin3Query,
    isLoading: isLoading3,
    isSuccess: isSuccess3,
  } = useGetChartDataQuery(
    selectedCoins[2]
      ? `coins/${selectedCoins[2]}/market_chart?vs_currency=${currency}&days=${selectedDay}`
      : null,
    {
      skip: !selectedCoins[2],
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
  const coinChartData = getChartData(
    chartData,
    colorClasses,
    selectedCoins,
    fadeColor
  );

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
        <div
          className="rounded-2xl p-4  border-2  
   dark:border-[#55495C] bg-opacity-80 bg-purple-100 dark:bg-shark opacity-90 md:w-3/6  "
        >
          <div className=" text-base">
            {selectedCoins.length > 0 && selectedCoins.length < 2 ? (
              <div className="mb-5  text-xl "> {coinName1}</div>
            ) : (
              <div
                className={`mb-5 ${
                  selectedCoins.length == 0 ? "hidden" : "flex"
                }  text-xl `}
              >
                {" "}
                Market Cap
              </div>
            )}
            {selectedCoins.length === 1 && (
              <div>
                <div className="flex items-center">
                  {coinName1 !== undefined && (
                    <div className="flex items-center">
                      <div className="lg:text-2xl">{` ${symbol} ${coinMarketCap1}`}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCoins.length > 0 && <GetTodaysDate />}
          </div>
          <ChartContent
            selectedCoins={selectedCoins}
            isLoading={isLoading}
            isLoading2={isLoading2}
            isLoading3={isLoading3}
            isSuccess={isSuccess}
            isSuccess2={isSuccess2}
            isSuccess3={isSuccess3}
          >
            {/* nested chart to avoid prop drilling */}
            <LineChart
              chartLabels={chartLabels}
              chartData={coinChartData}
              width={"w-full"}
              height={"h-[300px]"}
              chartOptions={chartOptions}
            />
          </ChartContent>
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
        <div
          className="rounded-2xl p-4 bg-opacity-80 border-2  
   dark:border-[#55495C] bg-purple-100 dark:bg-shark opacity-90 md:w-3/6 "
        >
          <div className=" text-base">
            {selectedCoins.length > 0 && (
              <div className="mb-5 text-xl "> Volume 24hr</div>
            )}
            {selectedCoins.length === 1 && (
              <div>
                <div className="flex items-center">
                  {coinName1 !== undefined && (
                    <div className="flex items-center">
                      <div className="lg:text-2xl">{` ${coinName1} ${symbol} ${coinMarketCap1}`}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCoins.length > 0 && <GetTodaysDate />}
          </div>
          <ChartContent
            selectedCoins={selectedCoins}
            isLoading={isLoading}
            isLoading2={isLoading2}
            isLoading3={isLoading3}
            isSuccess={isSuccess}
            isSuccess2={isSuccess2}
            isSuccess3={isSuccess3}
          >
            <BarChart
              chartLabels={chartLabels}
              chartData={coinChartData}
              width={"w-full"}
              height={"h-[300px]"}
              chartOptions={chartOptions}
            />
          </ChartContent>
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
    </div>
  );
}

export default Charts;

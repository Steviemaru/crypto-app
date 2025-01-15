import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "@/lib/hooks";
import DuelPercentageBar from "./DuelPercentageBar";
import MultiPercentageChange from "./MultiPercentageChange";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import Circle from "../../public/circle.svg";
import LineChart from "./Charts/LineChart";
import {
  coinTableChartOptions,
  getCoinTableChartData,
} from "@/utils/helperFunctions";

const CoinTableItem = memo(({ coinData }: { coinData: any }) => {
  //This ensures that debugging tools like React DevTools can correctly display the name of the component and prevents error.
  CoinTableItem.displayName = "CoinTableItem";

  const { symbol } = useAppSelector((state) => state.currency);
  return (
    <>
      {coinData.length > 1 &&
        coinData?.map((item: any, idx: any) => {
          /////////////////////////////////////////////////////////
          // values in the table
          const { symbol: shortCase, image } = item;
          // will refactor here 

          const current_price = parseInt(
            item.current_price?.toFixed(0)
          ).toLocaleString();
          const price_change_percentage_1h_in_currency =
            HandleFormatingNumbersAndLabels(
              item.price_change_percentage_1h_in_currency,
              "none"
            );
          const price_change_percentage_24h_in_currency =
            HandleFormatingNumbersAndLabels(
              item.price_change_percentage_24h_in_currency,
              "none"
            );
          const price_change_percentage_7d_in_currency =
            HandleFormatingNumbersAndLabels(
              item.price_change_percentage_7d_in_currency,
              "none"
            );
          const market_cap = HandleFormatingNumbersAndLabels(
            item.market_cap,
            "none"
          );

          const market_cap_display = HandleFormatingNumbersAndLabels(
            item.market_cap,
            "charts"
          );
          const total_volume = HandleFormatingNumbersAndLabels(
            item.total_volume,
            "none"
          );

          const total_volume_display = HandleFormatingNumbersAndLabels(
            item.total_volume,
            "charts"
          );

          const circulating_supply = HandleFormatingNumbersAndLabels(
            item.circulating_supply,
            "none"
          );
          const total_supply = HandleFormatingNumbersAndLabels(
            item.total_supply,
            "none"
          );

          const circulating_supply_display = HandleFormatingNumbersAndLabels(
            item.circulating_supply,
            "charts"
          );
          const total_supply_display = HandleFormatingNumbersAndLabels(
            item.total_supply,
            "charts"
          );

          const sparkline_in_7d = item.sparkline_in_7d?.price;

          /////////////////////////////////////////////////////////
          ////

          const percentages = [
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
          ];

          //// Check and Fill conditionals will determine if the percentage bar and the charts colors show up as green or red with an up or down arrow wthin the table depending on if values given is greater than 0 .

          // green or red fill checks
          const check =
            typeof price_change_percentage_7d_in_currency === "number"
              ? price_change_percentage_7d_in_currency > 0
              : parseFloat(price_change_percentage_7d_in_currency) > 0;

          const fill = check ? "bg-green-400" : "bg-red-500";
          const circleFill = check
            ? "text-green-400 fill-current"
            : "text-red-400 fill-current";
          const circleFillAlt = "text-slate-400 fill-current";

          // for chart
          const gradientColor = check
            ? "rgba(52, 211, 153, 0.2)"
            : "rgba(248, 113, 113, 0.2)";
          const borderColor = check
            ? "rgba(52, 211, 153, 1)"
            : "rgba(220, 38, 38, 1)";

          const height = "h-1";

          return (
            <Link
              className="block  bg-shark my-2 rounded-lg"
              key={uuidv4()}
              href={`/coin/${item.id}`}
            >
              <div className="flex justify-between p-2">
                <div className="flex  lg:flex-[20%] min-w-[20%] lg:max-w-[20%] flex-[30%]  max-w-[30%]">
                  <div className="flex-[20%] flex items-center ">
                    <div className="">{idx + 1}</div>
                  </div>
                  <div className="flex flex-[80%] gap-2 ">
                    <div className="w-[15%] relative flex items-center">
                      <Image src={image} alt="coin" width={12} height={12} />
                    </div>
                    <div className="flex flex-wrap items-center md:text-base text-xs">
                      <div className="md:flex hidden truncate">{item.name}</div>
                      <div>[{shortCase?.toUpperCase()}]</div>
                    </div>
                  </div>
                </div>
                <div className="flex lg:flex-[30%] flex-[20%]  min-w-[20%] lg:max-w-[30%]">
                  <div className="flex items-center flex-[25%] ">
                    <div className=" flex-1 md:text-base  text-xs text-center">
                      {symbol}
                      {current_price}
                    </div>
                  </div>
                  <div className="md:flex flex-[75%] min-w-[75%] max-w-[75%] justify-around  hidden">
                    <MultiPercentageChange Percentages={percentages} />
                  </div>
                </div>
                <div className="lg:flex hidden  flex-[20%]  min-w-[20%] max-w-[20%]">
                  <div className=" flex flex-col w-[80%] justify-center ">
                    <div className="flex justify-between ">
                      <div className="flex items-center gap-2">
                        <Circle
                          className={circleFill}
                          width="10px"
                          height="10px"
                        />
                        {total_volume_display}
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle
                          className={circleFillAlt}
                          width="10px"
                          height="10px"
                        />
                        {market_cap_display}
                      </div>
                    </div>
                    <div>
                      <DuelPercentageBar
                        height={height}
                        volume={total_volume}
                        marketCap={market_cap}
                        fill={fill}
                      />
                    </div>
                  </div>
                </div>
                <div className=" lg:flex hidden flex-[20%]  min-w-[20%] max-w-[20%]">
                  <div className="  flex flex-col w-[80%] justify-center ">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Circle
                          className={circleFill}
                          width="10px"
                          height="10px"
                        />
                        {circulating_supply_display}
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle
                          className={circleFillAlt}
                          width="10px"
                          height="10px"
                        />
                        {total_supply_display}
                      </div>
                    </div>
                    <div>
                      <DuelPercentageBar
                        height={height}
                        volume={circulating_supply}
                        marketCap={total_supply}
                        fill={fill}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex-[10%]  min-w-[10%] lg:max-w-[10%] ">
                  <div className=" w-[100%]">
                    <LineChart
                      chartLabels={sparkline_in_7d}
                      chartData={getCoinTableChartData(
                        sparkline_in_7d,
                        borderColor,
                        gradientColor
                      )}
                      width={"w-[100%] md:w-[80%]"}
                      height={"h-[70px]"}
                      chartOptions={coinTableChartOptions}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
});

export default CoinTableItem;

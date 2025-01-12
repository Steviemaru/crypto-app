import React from "react";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import DuelPercentageBar from "./DuelPercentageBar";
import MultiPercentageChange from "./MultiPercentageChange";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import Circle from "../../public/circle.svg";
// import LineChart from "./Charts/LineChart";
// import { coinTableChartOptions } from "@/utils/helperFunctions";

function CoinTable({ coinData }) {
    const { symbol } = useAppSelector((state) => state.currency);

    return (
        <div className=" w-full">
            {/* table labels */}
            <div className="flex  justify-between">
                <div className="flex lg:flex-[20%] min-w-[20%] lg:max-w-[20%] flex-[30%]  max-w-[30%]  ">
                    <div className="flex-[20%]">#</div>
                    <div className="flex-[80%]">Name</div>
                </div>
                <div className="flex lg:flex-[30%] flex-[20%]  ">
                    <div className="flex flex-[25%] justify-center">Price</div>
                    <div className="md:flex flex-[75%] justify-center gap-4 hidden">
                        <div>
                            1ds
                        </div>
                        <div>
                            7ds
                        </div>
                        <div>
                            24hrs
                        </div>
                    </div>
                </div>
                <div className="lg:flex hidden flex-[20%]  ">
                    24hr Volume/ Market Cap
                </div>
                <div className="lg:flex hidden flex-[20%] ">
                    Circulating / Total supply
                </div>
                <div className="flex-[10%] ">
                    Last 7ds
                </div>
            </div>
            {/* table container */}
            <div className="w-full">
                {coinData.length > 1 &&
                    coinData?.map((item: any, idx: any) => {
                        /////////////////////////////////////////////////////////
                        // values in the table
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
                        const total_volume = HandleFormatingNumbersAndLabels(
                            item.total_volume,
                            "none"
                        );
                        const circulating_supply = HandleFormatingNumbersAndLabels(
                            item.circulating_supply,
                            "none"
                        );
                        const total_supply = HandleFormatingNumbersAndLabels(
                            item.total_supply,
                            "none"
                        );
                        // const sparkline_in_7d = item.sparkline_in_7d?.price.slice(0, 7);

                        /////////////////////////////////////////////////////////
                        //// This simulates an increase or decrease in value for 1hr 24hr 7D percentage change.
                        //// Shows values as green or red with an up or down arrow wthin the table depending on if values have increased or decreased.

                        const percentages = [
                            price_change_percentage_1h_in_currency,
                            price_change_percentage_24h_in_currency,
                            price_change_percentage_7d_in_currency,
                        ];
                        const percentagesArr = percentages?.map((item: any) => {
                            const parsedItem = parseFloat(item.toFixed(0));
                            const num = {
                                value: parsedItem,
                                id: uuidv4(),
                            };
                            return num;
                        });
                        const simulatedChange = [-0.5, +0.5];
                        const dynamicPercentage = percentagesArr?.map((item: any) => {
                            const [decrease, increase] = simulatedChange;
                            const isEven = item.value % 2 == 0;
                            const simulatedValue = isEven ? increase : decrease;
                            return { ...item, value: item.value + simulatedValue };
                        });
                        const dynamicPercentageCheck = dynamicPercentage?.map((d: any) => {
                            const A = percentagesArr?.map((p: any) => {
                                return d.id == p.id ? d.value > p.value : "false";
                            });
                            return A;
                        });

                        const [[check]] = dynamicPercentageCheck;
                        const fill = check ? "bg-green-400" : "bg-red-500";
                        const circleFill = check
                            ? "text-green-400 fill-current"
                            : "text-red-400 fill-current";
                        const circleFillAlt = "text-slate-400 fill-current";

                        /// will comeback to this after commit 
                        // const gradientA = check
                        //     ? "rgba(52, 211, 153, 0.2)"
                        //     : "rgba(248, 113, 113, 0.2)";
                        // const gradientB = "rgba(0,0,0,0)";
                        // const borderColor = check
                        //     ? "rgba(52, 211, 153, 1)"
                        //     : "rgba(220, 38, 38, 1)";

                        const height = "h-1";

                        return (
                            <Link className="block  bg-shark my-2 rounded-lg" key={item.id} href={`/coin/${item.id}`}>
                                <div key={item.id} className="flex justify-between p-2">
                                    <div className="flex  lg:flex-[20%] min-w-[20%] lg:max-w-[20%] flex-[30%]  max-w-[30%]">
                                        <div className="flex-[20%] flex items-center ">
                                            <div className="">{idx + 1}</div>
                                        </div>
                                        <div className="flex flex-[80%] gap-2 ">
                                            <div className="w-[15%] relative">
                                                <Image
                                                    src={item.image ? item.image : null}
                                                    alt="coin"
                                                    width={12}
                                                    height={12}
                                                />
                                            </div>
                                            <div className="flex flex-wrap items-center md:text-base text-xs">
                                                <div className="md:flex hidden truncate">{item.name}</div>
                                                <div>[{item.symbol.toUpperCase()}]</div>
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
                                            <MultiPercentageChange
                                                dynamicPercentage={dynamicPercentage}
                                                dynamicPercentageCheck={check}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:flex hidden  flex-[20%]  min-w-[20%] max-w-[20%]">
                                        <div className=" flex flex-col ">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Circle
                                                        className={circleFill}
                                                        width="10px"
                                                        height="10px"
                                                    />
                                                    {total_volume}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Circle
                                                        className={circleFillAlt}
                                                        width="10px"
                                                        height="10px"
                                                    />
                                                    {market_cap}
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
                                        <div className="  flex flex-col ">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Circle
                                                        className={circleFill}
                                                        width="10px"
                                                        height="10px"
                                                    />
                                                    {circulating_supply}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Circle
                                                        className={circleFillAlt}
                                                        width="10px"
                                                        height="10px"
                                                    />
                                                    {total_supply}
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
                                            {/* will comeback to this after commit  */}
                                            {/* <LineChart
                                                chartLabels={["", "", "", "", "", "", ""]}
                                                chartData={sparkline_in_7d}
                                                gradientA={gradientA}
                                                // gradientB={gradientB}
                                                // borderColor={borderColor}
                                                width={"w-[100%] md:w-[80%]"}
                                                height={"h-[50px]"}
                                                chartOptions={coinTableChartOptions}
                                            /> */}
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}

export default CoinTable;

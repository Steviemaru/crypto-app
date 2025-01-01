import React from "react";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import DuelPercentageBar from "./DuelPercentageBar";
import MultiPercentageChange from "./MultiPercentageChange";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import Circle from "../../public/circle.svg";
import LineChart from "./Charts/LineChart";
import { coinTableChartOptions } from "@/utils/helperFunctions";

function CoinTable({ coinData }) {
    const { symbol } = useAppSelector((state) => state.currency);

    //flex container 
    // wid container 
    // content 

    return (
        <div className=" w-full">
            {/* table labels */}
            <div className="flex  justify-between">
                <div className="md:w-3/6 w-4/6 flex item-center md:justify-between justify-around">
                <div className="md:w-2/5 md:flex item-center justify-between  md:text-base md:p-0 text-xs p-2">
                    <div className="ml-4 w-9/12 flex md:gap-3">
                    <div className="md:flex  hidden">#</div>
                    <div>Name</div>
                    </div>
                </div> 
                <div className="md:w-3/5 md:flex item-center md:gap-10  ">
                <div className="md:text-base md:p-0 text-xs p-2">
                    Current price
                </div>
                    <div className="md:flex md:justify-between hidden md:w-2/5">
                    <div>
                        1h%
                    </div>
                    <div>
                        24h%
                    </div>
                    <div>
                        7d%
                    </div>
                    </div>
                </div>
                </div>
                <div className="md:w-3/6 w-2/6 flex item-center md:justify-center justify-start">
                <div className="md:w-4/6 md:flex md:justify-between hidden">
                    <div className=""> 24h volume / Market cap </div>
                    <div className=""> Circulating/ Total supply </div>
                </div>
                <div className="md:w-2/6 md:text-base md:p-0 flex item-center  justify-center text-xs  p-2">
                    <div className="w-9/12">
                    <h5 className="">7Ds</h5>
                    </div>
                </div>
                </div>
            </div>
            {/* table container */}
            <div className="w-full">
                {coinData.length > 1 && coinData?.map((item: any, idx: any) => {

                    /////////////////////////////////////////////////////////
                    // values in the table 
                    const current_price = parseInt(item.current_price?.toFixed(0)).toLocaleString();
                    const price_change_percentage_1h_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_1h_in_currency, "none");
                    const price_change_percentage_24h_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_24h_in_currency, "none");
                    const price_change_percentage_7d_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_7d_in_currency, "none");
                    const market_cap = HandleFormatingNumbersAndLabels(item.market_cap, "none");
                    const total_volume = HandleFormatingNumbersAndLabels(item.total_volume, "none");
                    const circulating_supply = HandleFormatingNumbersAndLabels(item.circulating_supply, "none");
                    const total_supply = HandleFormatingNumbersAndLabels(item.total_supply, "none");
                    const sparkline_in_7d = item.sparkline_in_7d?.price.slice(0, 7);

                    /////////////////////////////////////////////////////////
                    //// This simulates an increase or decrease in value for 1hr 24hr 7D percentage change.
                    //// Shows values as green or red with an up or down arrow wthin the table depending on if values have increased or decreased.

                    const percentages = [price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency];
                    const percentagesArr = percentages?.map((item: any) => {
                        const parsedItem = parseFloat(item.toFixed(0));
                        const num = {
                            value: parsedItem,
                            id: uuidv4()
                        };
                        return num;
                    });
                    const simulatedChange = [-0.50, +0.50];
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
                    const circleFill = check ? "text-green-400 fill-current" : "text-red-400 fill-current";
                    const circleFillAlt = "text-slate-400 fill-current";
                    const gradientA = check ? "rgba(52, 211, 153, 0.2)" : "rgba(248, 113, 113, 0.2)";
                    const gradientB = "rgba(0,0,0,0)";
                    const borderColor = check ? "rgba(52, 211, 153, 1)" : "rgba(220, 38, 38, 1)";
                    const height = "h-1";

                    return (
                        <Link key={item.id} href={`/coin/${item.id}`}>
                            <div className="p-3 px-4 flex items-center justify-around md:gap-6 bg-opacity-50 bg-slate-600 opacity-90 my-3 rounded-lg">
                                <div className="md:w-3/6 w-4/6 flex item-center md:justify-between justify-around">
                                <div className="flex items-center md:w-2/5 md:gap-5 gap-2" key={item.name}>
                                    <div className="md:flex hidden">{idx + 1}</div>
                                    <Image src={item.image ? item.image
                                            : null} width={22} height={22} alt="coin" />
                                    <div className=" md:flex md:text-base text-xs"><div>{item.name}</div> 
                                    <div>[{item.symbol.toUpperCase()}]</div></div>
                                    </div>

                               <div className="md:w-3/5 w-2/5 md:justify-start justify-center md:flex item-center  md:gap-14">
                               <div className=" md:text-base  text-xs text-center">{symbol}{current_price}</div>
                               <div className="md:flex md:justify-between hidden md:w-2/5"><MultiPercentageChange dynamicPercentage={dynamicPercentage} dynamicPercentageCheck={check} /></div>
                               </div>
                                </div>

                               <div className="md:w-3/6 w-2/6 flex item-center justify-center">
                               <div className="md:w-4/6 md:flex md:justify-between hidden">
                               <div className=" md:flex flex-col w-5/12 hidden">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Circle className={circleFill} width="10px" height="10px" />{total_volume}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Circle className={circleFillAlt} width="10px" height="10px" />
                                            {market_cap}
                                        </div>
                                    </div>
                                    <div>
                                        <DuelPercentageBar height={height} volume={total_volume} marketCap={market_cap} fill={fill} />
                                    </div>
                                </div>
                                <div className="  md:flex flex-col w-5/12 hidden">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Circle className={circleFill} width="10px" height="10px" />
                                            {circulating_supply}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Circle className={circleFillAlt} width="10px" height="10px" />
                                            {total_supply}
                                        </div>
                                    </div>
                                    <div>
                                        <DuelPercentageBar height={height} volume={circulating_supply} marketCap={total_supply} fill={fill} />
                                    </div>
                                </div>
                               </div>

                                <div className="md:w-2/6 w-[100%] md:flex item-center justify-center  ">
                          
                         <div className=" w-[80%]">
                         <LineChart
              chartLabels={["", "", "", "", "", "", ""]}
              chartData={sparkline_in_7d}
              gradientA={gradientA}
              gradientB={gradientB}
              borderColor={borderColor}
              width={"w-[100%] md:w-[80%]"}
               height={"h-[50px]"}
              chartOptions={coinTableChartOptions}
            />
                         </div>
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
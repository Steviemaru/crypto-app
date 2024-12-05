import React from "react";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import DuelPercentageBar from "./DuelPercentageBar";
import MultiPercentageChange from "./MultiPercentageChange";
import { HandleFormatingNumbersAndLabels } from "@/utils/FormatNumber";
import Circle from "../../public/circle.svg";
import LineChart from "./Charts/LineChart";

function CoinTable({ coinData }) {
    const { symbol } = useAppSelector((state) => state.currency);
    const randomId = () => Math.round(Math.random() * 999);
    
    return (
        <div>
            {/* table labels */}
            <div className="flex mt-14 items-center gap-12 bg-opacity-50  opacity-90 m-3 rounded-lg">
                <div className="flex items-center  gap-8 px-16">
                    <div>
                        #
                    </div>
                    <div className="mr-20">
                        Name
                    </div>
                </div>

                <div>
                    Price
                </div>
                <div>
                    1h%
                </div>
                <div>
                    24h%
                </div>
                <div>
                    7d%
                </div>
                <div className="flex gap-12 pl-10">
                    <div>
                        24h volume / Market cap
                    </div>
                    <div>
                        Circulating/ Total supply
                    </div>
                    <div>
                        Last 7d
                    </div>
                </div>
            </div>
            {/* table container */}
            <div className="">
                {coinData?.map((item: any, idx: any) => {

                    /////////////////////////////////////////////////////////
                    // values in the table 
                    const current_price = parseInt(item.current_price.toFixed(0)).toLocaleString();
                    const price_change_percentage_1h_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_1h_in_currency, "none");
                    const price_change_percentage_24h_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_24h_in_currency, "none");
                    const price_change_percentage_7d_in_currency = HandleFormatingNumbersAndLabels(item.price_change_percentage_7d_in_currency, "none");
                    const market_cap = HandleFormatingNumbersAndLabels(item.market_cap, "none");
                    const total_volume = HandleFormatingNumbersAndLabels(item.total_volume, "none");
                    const circulating_supply = HandleFormatingNumbersAndLabels(item.circulating_supply, "none");
                    const total_supply = HandleFormatingNumbersAndLabels(item.total_supply, "none");
                    const sparkline_in_7d = item.sparkline_in_7d.price.slice(0, 7);

                    /////////////////////////////////////////////////////////
                    //// This simulates an increase or decrease in value for 1hr 24hr 7D percentage change.
                    //// Shows values as green or red with an up or down arrow wthin the table depending on if values have increased or decreased.

                    const percentages = [price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency];
                    const percentagesArr = percentages?.map((item: any) => {
                        const parsedItem = parseFloat(item.toFixed(0));
                        const num = {
                            value: parsedItem,
                            id: randomId()
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
                    const gradientFill = check ? "rgba(52, 211, 153, 0.2)" : "rgba(248, 113, 113, 0.2)";
                    const borderColor = check ? "rgba(52, 211, 153, 1)" : "rgba(220, 38, 38, 1)";

                    return (
                        <div key={item.id} className="flex items-center gap-6 bg-opacity-50 bg-slate-600 opacity-90 m-3 rounded-lg">
                            <div className="flex items-center  gap-8 px-16" key={item.name}>
                                <div>{idx + 1}</div>
                                <Image src={item.image} width={32} height={32} alt="coin" /> <div className="w-24">{item.name} [{item.symbol}]</div></div>
                            <div className="w-24">{symbol}{current_price}</div>
                            <div className="w-54"><MultiPercentageChange dynamicPercentage={dynamicPercentage} dynamicPercentageCheck={check} /></div>

                            <div className="w-54">
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
                                    {/* replace with circulating / total supply */}
                                    <DuelPercentageBar volume={total_volume} marketCap={market_cap} fill={fill} />
                                </div>
                            </div>
                            <div className="w-54">
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
                                    <DuelPercentageBar volume={circulating_supply} marketCap={total_supply} fill={fill} />
                                </div>
                            </div>

                            <div className="w-54">
                                {/* need to have value for chart labels to show chart so mabe configure options section */}
                                <LineChart chartLabels={["", "", "", "", "", "", ""]}
                                    chartData={sparkline_in_7d}
                                    colorValue={"text-transparent"}
                                    borderColor={borderColor}
                                    gradientA={gradientFill}
                                    xDisplay={false}
                                    width={"120"}
                                    height={"60"} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CoinTable;
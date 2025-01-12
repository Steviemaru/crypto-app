import { useState } from "react";
import LineChart from "../components/Charts/LineChart";
import { getChartLabels } from "@/utils/getChartlabels";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setDays } from "@/lib/features/daysSlice";
// import { ChartOptions } from "chart.js";
import { chartOptions } from "@/utils/helperFunctions";

function ConvertorChart({chartA, chartB}) {
    const { selectedDay } = useAppSelector((state) => state.selectedDay);
    const [selected, setSelected] = useState("");
    const dispatch = useAppDispatch();

    const borderColor = "rgba(75,192,192,1)";
    const gradientA = "rgba(75,192,192,1)";
    const gradientB = "rgba(0,0,0,0) ";
    const intervalsForDays = {
        "1D": "1",
        "3D": "3",
        "7D": "7",
        "1M": "30",
        "3M": "90",
        "6M": "180",
        "1Y": "365",
    };

    const chartAPrices = chartA?.prices?.map((item: any) => item[1]) || [];

    const chartBPrices = chartB?.prices?.map((item: any) => item[1]) || [];

    const chartResult = chartAPrices.map((num: any, index: any) => {
        if (chartBPrices[index] !== 0) {
            return num / chartBPrices[index] * 34;
        } else {
            return null; // Handle division by zero
        }
    });

    return (
        <div className=" w-[100%]">
           <LineChart chartLabels={getChartLabels(selectedDay)}
                chartData={chartResult}
            chartOptions={chartOptions}
                borderColor={borderColor}
                gradientA={gradientA}
                gradientB={gradientB}
                width={"w-full"}
                height={"200"} />
            <div className="flex my-10 gap-2 w-[100%]">
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

export default ConvertorChart;
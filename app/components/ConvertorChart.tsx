import { useState } from "react";
import LineChart from "../components/Charts/LineChart";
import { getChartLabels } from "@/utils/getChartlabels";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setDays } from "@/lib/features/daysSlice";

function ConvertorChart({ chartA, chartB }) {
    const { selectedDay } = useAppSelector((state) => state.selectedDay);
    const [selected, setSelected] = useState("");
    const dispatch = useAppDispatch();

    const borderColor = "rgba(75,192,192,1)";
    const gradientA = "rgba(75,192,192,1)";
    const intervalsForDays = [
        1,
        3,
        7,
        30,
        90,
        180,
        365
    ];

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
        <div className="p-20">
            <LineChart chartLabels={getChartLabels(selectedDay)}
                chartData={chartResult}
                colorValue={"text-transparent"}
                borderColor={borderColor}
                gradientA={gradientA}
                xDisplay={true}
                width={"1000"}
                height={"200"} />
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
    );
}

export default ConvertorChart;
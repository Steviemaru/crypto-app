import { useTheme } from "next-themes";
import LineChart from "../components/Charts/LineChart";
import { getChartLabels } from "@/utils/getChartlabels";
import { useAppSelector } from "@/lib/hooks";
import { chartOptions, getCoinTableChartData } from "@/utils/helperFunctions";

function ConvertorChart({ chartA, chartB }) {
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const { theme } = useTheme();
  const chartColor = theme == "dark" ? "#f18981" : "#4BC0C0";
  const fadeColor =
    theme == "dark" ? "rgba(0,0,0,0.1)" : "rgba(225,225,225,0.1)";

  const chartAPrices = chartA?.prices?.map((item: any) => item[1]) || [];

  const chartBPrices = chartB?.prices?.map((item: any) => item[1]) || [];

  const chartResult = chartAPrices.map((num: any, index: any) => {
    if (chartBPrices[index] !== 0) {
      return num / chartBPrices[index];
    } else {
      return null; // Handle division by zero
    }
  });

  return (
    <div className="h-[300px] max-h-[400px] w-[100%]">
      <LineChart
        chartLabels={getChartLabels(selectedDay)}
        chartData={getCoinTableChartData(
          chartResult,
          chartColor,
          chartColor,
          fadeColor
        )}
        chartOptions={chartOptions}
        width={"w-full"}
        height={"h-[100%]"}
      />
    </div>
  );
}

export default ConvertorChart;

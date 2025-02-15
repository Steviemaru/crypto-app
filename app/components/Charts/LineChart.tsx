"use client";
import React, { useRef, memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = memo(
  ({
    chartData,
    chartLabels,
    width,
    height,
    chartOptions,
  }: {
    chartData: any[];
    chartLabels: any[];
    width: string;
    height: any;
    chartOptions: any;
  }) => {
    //This ensures that debugging tools like React DevTools can correctly display the name of the component and prevents error.
    LineChart.displayName = "LineChart";
    const chartRef = useRef<ChartJS<"line", any>>(null); // gives Glow to charts

    const glowPlugin = {
      id: "glowPlugin",
      beforeDatasetsDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();

        if (!Array.isArray(chart.data.datasets)) return; // Ensure datasets is an array

        chart.data.datasets.forEach((dataset, index) => {
          if (!dataset || !dataset.glowColor) return; // Ensure dataset and glowColor exist

          const meta = chart?.getDatasetMeta(index);
          if (!meta || !meta.dataset || typeof meta.dataset.draw !== "function")
            return; // Ensure dataset.draw exists

          ctx.shadowBlur = 15;
          ctx.shadowColor = dataset.glowColor;
          meta.dataset.draw(ctx);
        });

        ctx.restore();
      },
    };

    ChartJS.register(glowPlugin);

    const data: any = {
      labels: chartLabels,
      datasets: chartData,
    };

    return (
      <div className={` ${width} ${height} min-w-[80%] aspect-w-5 aspect-h-3 `}>
        <Line data={data} options={chartOptions} ref={chartRef} />
      </div>
    );
  }
);

export default LineChart;

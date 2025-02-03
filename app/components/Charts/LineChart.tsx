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

        chart.data.datasets.forEach((dataset, index) => {
          if (!dataset.glowColor) return; // Skip if no glow color

          const meta = chart.getDatasetMeta(index);
          if (!meta || !meta.dataset) return; // Skip if meta or drawable dataset is not available

          ctx.shadowBlur = 15; // Adjust blur for the glow effect
          ctx.shadowColor = dataset.glowColor; // Apply dataset-specific glow color
          meta.dataset.draw(ctx); // Redraw the dataset with the glow
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

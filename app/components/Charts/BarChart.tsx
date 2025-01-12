"use client";
import React, { useRef} from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
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

  const chartRef = useRef<ChartJS<"bar", any>>(null)

    ;// Define the glow plugin
  const glowPlugin = {
    id: "glowPlugin",
    beforeDatasetsDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();

      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset.glowColor) return; // Skip if no glow color

        const meta = chart.getDatasetMeta(index);
        if (!meta || !meta.dataset) return; // Skip if meta or drawable dataset is not available

        ctx.shadowBlur = 130; // Adjust blur for the glow effect
        ctx.shadowColor = dataset.glowColor; // Apply dataset-specific glow color
        meta.dataset.draw(ctx); // Redraw the dataset with the glow
      });

      ctx.restore();
    },
  };

  ChartJS.register(glowPlugin); // Register the plugin globally

  const data: any = {
    labels: chartLabels,
    datasets: chartData
  };

  return <div className={` ${width} ${height} min-w-[80%] aspect-w-5 aspect-h-3 `}>
    <Bar data={data} options={chartOptions} ref={chartRef} />
  </div>;
};

export default BarChart;

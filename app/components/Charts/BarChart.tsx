"use client";
import React, {memo, useRef } from "react";
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

const BarChart = memo(({
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
  BarChart.displayName = "BarChart";
  const chartRef = useRef<ChartJS<"bar", any>>(null); // Define the glow plugin
  const glowPlugin = {
    id: "glowPlugin",
    beforeDatasetsDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
  
      if (!Array.isArray(chart.data.datasets)) return; // Ensure datasets is an array
  
      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset || !dataset.glowColor) return; // Ensure dataset and glowColor exist
  
        const meta = chart?.getDatasetMeta(index);
        if (!meta || !meta.dataset || typeof meta.dataset.draw !== "function") return; // Ensure dataset.draw exists
  
        ctx.shadowBlur = 15;
        ctx.shadowColor = dataset.glowColor;
        meta.dataset.draw(ctx);
      });
  
      ctx.restore();
    },
  };
  ChartJS.register(glowPlugin); // Register the plugin globally

  const data: any = {
    labels: chartLabels,
    datasets: chartData,
  };

  return (
    <div className={` ${width} ${height} min-w-[80%] aspect-w-5 aspect-h-3 `}>
      <Bar data={data} options={chartOptions} ref={chartRef} />
    </div>
  );
});

export default BarChart;

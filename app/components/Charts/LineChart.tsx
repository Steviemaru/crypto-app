"use client";
import React, { useRef } from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  chartData,
  chartLabels,
  width,
  height,
  gradientA,
  gradientB,
  chartOptions,
  borderColor
}: {
  chartData: any[];
  chartLabels: any[];
  width: string;
  height: any;
  gradientA:any;
  gradientB:any;
  chartOptions:any;
  borderColor:any;

}) => {
  const chartRef = useRef<ChartJS<"line", any>>(null)
  
  ;// Define the glow plugin
const glowPlugin = {
  id: "glowPlugin",
  beforeDraw: (chart: any) => {
    const { ctx } = chart;
    ctx.save(); // Save the canvas state
    ctx.shadowBlur = 15; // Set blur amount for glow
    ctx.shadowColor = gradientA; // Glow color
  },
  afterDraw: (chart: any) => {
    const { ctx } = chart;
    ctx.shadowBlur = 0; // Reset shadow properties
    ctx.shadowColor = "transparent";
    ctx.restore(); // Restore the canvas state
  },
};

ChartJS.register(glowPlugin); // Register the plugin globally

  const data: any = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, gradientA); // Top color: Apricot
          gradient.addColorStop(0.65, gradientB); // Semi-transparent apricot
          return gradient;
        },
        pointStyle: false,
        borderColor: borderColor,
        borderWidth: 3,
        fill: true,
        tension: 0.5,
      },
    ],
  };

  return (
    <div className={` ${width} ${height} min-w-[80%] aspect-w-5 aspect-h-3 `}>
      <Line data={data} options={chartOptions} ref={chartRef} />
    </div>
  );
};

export default LineChart;

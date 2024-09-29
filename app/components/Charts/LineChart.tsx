"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  registerables,
} from "chart.js";

// Register all chart types
ChartJS.register(...registerables);

const LineChart = ({
  chartData,
  chartLabels,
  width,
  height,
}: {
  chartData: any[];
  chartLabels: any[];
  width: string;
  height: string;
}) => {
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prices = chartData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Exit early if canvas is null
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return; // Exit early if getContext fails
    }

    // Create a linear gradient create function that gives gradient input colors
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(75,192,192,1)");
    gradient.addColorStop(1, "rgba(153,102,255,1)");

    const data: ChartData<"line", number[], string> = {
      labels: chartLabels,
      datasets: [
        {
          // label: 'My Dataset',
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(75,192,192,1)",
          pointStyle: false,
          borderWidth: 3,
          fill: true,
          tension: 0.5,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          stacked: true,
          display: false,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#fff",
          },
        },
      },
    };

    // Create the chart and store it in the ref
    const chartInstance = new ChartJS(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    chartRef.current = chartInstance; // Store the chart instance in the ref

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      chartInstance.destroy();
    };
  }, [prices]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default LineChart;

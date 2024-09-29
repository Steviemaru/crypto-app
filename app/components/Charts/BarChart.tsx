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

const BarChart = ({
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
  const chartRef = useRef<ChartJS<"bar", number[], string> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const volume = chartData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Exit early if canvas is null
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return; // Exit early if getContext fails
    }

    // Create a linear gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(247, 117, 21,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    const data: ChartData<"bar", number[], string> = {
      labels: chartLabels,
      datasets: [
        {
          // label: 'My Dataset',
          data: volume,
          backgroundColor: gradient,
          borderColor: "rgba(242, 155, 108,1)",
          pointStyle: false,
          borderWidth: 3,
          // fill: true,
          // tension:0.5
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
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
            color: "#fff", //for refactor make it switch to black
            //refactor options and gradient later
          },
        },
      },
    };

    // Create the chart and store it in the ref
    const chartInstance = new ChartJS(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    chartRef.current = chartInstance; // Store the chart instance in the ref

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      chartInstance.destroy();
    };
  }, [volume]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default BarChart;

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
  colorValue,
  borderColor,
  gradientA,
  xDisplay,
  width,
  height,
}: {
  chartData: any[];
  chartLabels: any[];
  colorValue: string;
  borderColor: string;
  gradientA: string;
  xDisplay: boolean
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
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0.5, gradientA);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    const data: ChartData<"line", number[], string> = {
      labels: chartLabels,
      datasets: [
        {
          // label: 'My Dataset',
          data: prices,
          backgroundColor: gradient,
          borderColor: borderColor,
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
          display: false,
          grid: { display: false },
        },
        x: {
          display: xDisplay,
          grid: { display: false },
          ticks: {
            color: colorValue
          },
        },
      },
      elements: {
        line: {
          borderColor: borderColor,
          borderWidth: 2,
        },
      },
    };

    // Initialize chart with glow effect in the plugin
    const glowPlugin = {
      id: "glowPlugin",
      beforeDraw: (chart: any) => {
        const { ctx } = chart;
        ctx.shadowBlur = 15;                 // Set blur amount for glow
        ctx.shadowColor = gradientA;         // Glow color, matching the top gradient color
      },
      afterDraw: (chart: any) => {
        const { ctx } = chart;
        ctx.shadowBlur = 0;                  // Reset shadow properties
        ctx.shadowColor = "transparent";
      },
    };

    // Create the chart and store it in the ref
    const chartInstance = new ChartJS(ctx, {
      type: "line",
      data: data,
      options: options,
      plugins: [glowPlugin]
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

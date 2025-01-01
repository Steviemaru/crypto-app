export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        display: true,
        grid: { display: false },
        ticks: {
          color: "#fff"
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
}

export const coinTableChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        display: false,
        grid: { display: false },
        ticks: {
          color: "#fff"
        },
      },
    },
    elements: {
      line: {
        borderColor: "#f18981",
        borderWidth: 2,
      },
    },
}
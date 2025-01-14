///////////////////////////////////////////////////
/////// General functions 
///////////////////////////////////////////////////

export const firstLetterToUppercase = (value: string) => {
  const newValue = value.slice(0, 1).toUpperCase() + value.slice(1)
  return newValue
}

///////////////////////////////////////////////////
/////// Chart Data functions 
///////////////////////////////////////////////////

export const getChartData =(chartData:any, colorClasses:any, selectedCoins:any)=> {

  const Dataset =
  chartData && chartData.length > 0
    ? chartData.map((coinData:any, index:any) => {
      const fillColor = colorClasses[index];
      return {
        label: selectedCoins[index] || [],
        data: coinData.chartDataObj?.market_caps?.map((price) => price[1]) || [],
        borderColor: fillColor,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, fillColor);
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
        borderWidth: 4,
        pointStyle: false,
        tension: 0.4,
        fill: true,
        glowColor:fillColor
      };
    })
    : [];

    return Dataset
}



///////////////////////////////////////////////////
/////// Chart options 
///////////////////////////////////////////////////

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
        borderWidth: 2,
      },
    },
}



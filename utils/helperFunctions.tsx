///////////////////////////////////////////////////
/////// General functions
///////////////////////////////////////////////////

export const firstLetterToUppercase = (value: string) => {
  const newValue = value.slice(0, 1).toUpperCase() + value.slice(1);
  return newValue;
};

//////////////////////////////////////////////
export const formatNumbers = (num: any) => {
  let formatNum = "";
  const fixedNum = num.toFixed(0);
  formatNum = Number(fixedNum).toLocaleString();

  return formatNum;
};

const sortNumbersbyAmount = (value: any) => {
  if (value >= 1_000_000_000_000 - 1) {
    // Trillions
    return [value / 1_000_000_000_000, "trillion"];
  } else if (value >= 1_000_000_000 - 1) {
    // Billions
    return [value / 1_000_000_000, "billion"];
  } else if (value >= 1_000_000 - 1) {
    // Millions
    return [value / 1_000_000, "million"];
  } else {
    return [value/ 1_000 , "kilo"]; // Less than a million
  }
};

const getFormatingNumbersLabels = (option: any, unit: any) => {
  const numSigns = {
    charts: {
      trillion: "tln",
      billion: "bln",
      million: "mln",
      kilo: "k",
    },
    nav: {
      trillion: "T",
      billion: "B",
      million: "M",
      kilo: "k",
    },
    none: {
      undefined: "",
    },
  };

  const result = option == "none" ? "" : numSigns[option][unit];
  return result;
};

export const HandleFormatingNumbersAndLabels = (value: number, option: string) => {
  const [num, unit] = sortNumbersbyAmount(value);
 
  const sign = getFormatingNumbersLabels(option, unit);
  const fixedNum = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      
  const formated =
     option ==  "charts" || "nav" ? ` ${fixedNum} ${sign}` :  parseFloat(fixedNum) ;
  return formated;
};

///////////////////////////////////////////////////
/////// Chart Data functions
///////////////////////////////////////////////////

export const getChartData = (
  chartData: any,
  colorClasses: any,
  selectedCoins: any,
  fadeColor:any
) => {
  const Dataset =
    chartData && chartData.length > 0
      ? chartData.map((coinData: any, index: any) => {
          const fillColor = colorClasses[index];
          return {
            label: selectedCoins[index] || [],
            data:
              coinData.chartDataObj?.market_caps?.map((price) => price[1]) ||
              [],
            borderColor: fillColor,
            backgroundColor: (context) => {
              const { chart } = context;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(
                10,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0.15, fillColor);
              gradient.addColorStop(1, fadeColor);
              return gradient;
            },
            borderWidth: 4,
            pointStyle: false,
            tension: 0.4,
            fill: true,
            glowColor: fillColor,
          };
        })
      : [];

  return Dataset;
};

export const getCoinTableChartData = (
  chartData: any,
  borderColor: any,
  gradientColor: any,
  fadeColor:any
) => {

  const Dataset = [
    {
      label: "",
      data: chartData,
      borderColor: borderColor,
      backgroundColor: (context) => {
        const { chart } = context;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(
          10,
          chartArea.top,
          0,
          chartArea.bottom
        );
        gradient.addColorStop(0.25, gradientColor);
        gradient.addColorStop(1, fadeColor);
        return gradient;
      },
      borderWidth: 2,
      pointStyle: false,
      tension: 0.4,
      fill: true,
      glowColor: gradientColor,
    },
  ];
  return Dataset;
};

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
        color: "#fff",
      },
    },
  },
};

export const coinTableChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 3,
  hitRadius: 20,
  hoverRadius: 6,
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
        display: false,
      },
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
  },
};

export const formatNumbers = (num: any) => {
  let formatNum = "";
  const fixedNum = num.toFixed(0);
  formatNum = Number(fixedNum).toLocaleString();

  return formatNum;
};

const sortNumbersbyAmount = (value: any) => {
  const epsilon = 1e-9; // Small tolerance for precision issues
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

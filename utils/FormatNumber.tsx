const handleFormatingNumbers = (value: any) => {
  if (value >= 1_000_000_000_000) {
    // Trillions
    return [value / 1_000_000_000_000, "trillion"];
  } else if (value >= 1_000_000_000) {
    // Billions
    return [value / 1_000_000_000, "billion"];
  } else if (value >= 1_000_000) {
    // Millions
    return [value / 1_000_000, "million"];
  } else {
    return [value, "kilo"]; // Less than a million
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
      undefined: ""
    },
  };

  const result = option == "none" ? "" : numSigns[option][unit]
  return result;
};

export const HandleFormatingNumbersAndLabels = (value: any, option: string) => {
  // let formated = "";
  const [num, unit] = handleFormatingNumbers(value);
  const sign = getFormatingNumbersLabels(option, unit);
  const fixedNum =
    option == "charts"
      ? parseFloat(num).toFixed(3) : parseFloat(num).toFixed(2);
  const formated = option == "none" ? parseFloat(fixedNum) : `${fixedNum} ${sign}`
  return formated;
};




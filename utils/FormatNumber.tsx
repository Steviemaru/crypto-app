
export default function FormatNumber(value: any) {
  if (value >= 1_000_000_000_000) {
    // Trillions
    return (value / 1_000_000_000_000).toFixed(2) + " T";
  } else if (value >= 1_000_000_000) {
    // Billions
    return (value / 1_000_000_000).toFixed(2) + " B";
  } else if (value >= 1_000_000) {
    // Millions
    return (value / 1_000_000).toFixed(2) + " M";
  } else {
    return value.toFixed(2) + " K"; // Less than a million
  }
}

// format number
// options : nav, chart
// check number is tln ? bln mln ?
// if chart fixed 3 + bln else nav fix3d 2 B

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
  };

  return numSigns[option][unit];
};

export const HandleFormatingNumbersAndLabels = (value: any, option: string) => {
  let formated = "";
  const [num, unit] = handleFormatingNumbers(value);
  const sign = getFormatingNumbersLabels(option, unit);
  const fixedNum =
    option == "charts"
      ? parseFloat(num).toFixed(3)
      : parseFloat(num).toFixed(2);
  return (formated = `${fixedNum} ${sign}`);
};




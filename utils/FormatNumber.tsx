
export default function 
//refactor this
FormatNumber(value:any) {
  if(!value){
  return 
  }else {
    if (value >= 1_000_000_000_000) { // Trillions
      return (value / 1_000_000_000_000).toFixed(2) + " T";
  } else if (value >= 1_000_000_000) { // Billions
      return (value / 1_000_000_000).toFixed(2) + " B";
  } else if (value >= 1_000_000) { // Millions
      return (value / 1_000_000).toFixed(2) + " M";
  } else {
      return value.toFixed(2) + " K"; // Less than a million
  }
  }
}
import React from "react";

function DuelPercentageBar({
  volume,
  marketCap,
  fill,
}: {
  volume: any;
  marketCap: any;
  fill: any;
}) {

  const total = volume +
    marketCap;  // Total value (both values combined)

  // Calculate the percentages (ensure total is not zero to avoid division by zero)
  const valueOnePercentage = total > 0 ? (volume / total) * 100 : 0;
  const valueTwoPercentage = total > 0 ? (marketCap / total) * 100 : 0;
  return (
    <div className="flex w-44  h-1 bg-gray-200 rounded-md overflow-hidden" >
      <div
        className={` ${fill}`}
        style={{ width: `${valueOnePercentage}%` }}
      >
        {/* Optional: Display the value inside the filled part */}
        {/* {Math.round(valueOnePercentage)}% */}
      </div>
      <div
        className={`text-black 
     ${"bg-slate-400"}`}
        style={{ width: `${valueTwoPercentage}%` }}
      >
        {/* Optional: Display the value inside the unfilled part */}
        {/* {Math.round(valueTwoPercentage)}% (${valueTwoPercentage.toLocaleString()}) */}
      </div>
    </div>
  );
}

export default DuelPercentageBar;
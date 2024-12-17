import React from "react";

function DuelPercentageBar({
  volume,
  marketCap,
  fill,
  height,
}: {
  volume: any;
  marketCap: any;
  fill: any;
  height:any;
}) {

  const total = volume +
    marketCap;  // Total value (both values combined)

  // Calculate the percentages (ensure total is not zero to avoid division by zero)
  const valueOnePercentage = total > 0 ? (volume / total) * 100 : 0;
  const valueTwoPercentage = total > 0 ? (marketCap / total) * 100 : 0;
  return (
    <div className={`flex ${height} bg-gray-200 rounded-md overflow-hidden `} >
      <div
        className={`p-10 ${fill}`}
        style={{ width: `${valueOnePercentage}%`, height: "100%" }}
      >
        {/* Optional: Display the value inside the filled part */}
        {/* {Math.round(valueOnePercentage)}% */}
      </div>
      <div
        className={`  text-black 
     ${"bg-slate-400"}`}
        style={{ width: `${valueTwoPercentage}%`, height: "100%" }}
      >
        {/* Optional: Display the value inside the unfilled part */}
        {/* {Math.round(valueTwoPercentage)}% (${valueTwoPercentage.toLocaleString()}) */}
      </div>
    </div>
  );
}

export default DuelPercentageBar;
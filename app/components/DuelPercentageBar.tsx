function DuelPercentageBar({
  volume,
  marketCap,
  fill,
  height,
}: {
  volume: any;
  marketCap: any;
  fill: any;
  height: any;
}) {
  const total = volume + marketCap;

  // Calculate the percentages (ensure total is not zero to avoid division by zero)
  const valueOnePercentage = total > 0 ? (volume / total) * 100 : 0;
  const valueTwoPercentage = total > 0 ? (marketCap / total) * 100 : 0;
  return (
    <div className={`flex ${height}  bg-gray-200 rounded-md overflow-hidden `}>
      <div
        className={`p-10 ${fill}`}
        style={{ width: `${valueOnePercentage}%`, height: "100%" }}
      ></div>
      <div
        className={`  text-black 
     ${"dark:bg-slate-400 bg-white"}`}
        style={{ width: `${valueTwoPercentage}%`, height: "100%" }}
      ></div>
    </div>
  );
}

export default DuelPercentageBar;

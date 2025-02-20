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
  const volumePercentage = total > 0 ? (volume / total) * 100 : 0;
  const marketCapPercentage = total > 0 ? (marketCap / total) * 100 : 0;
   
  return (
    <div className={`flex ${height} bg-gray-200 rounded-md overflow-hidden`}>
      <div
        className={`flex items-center justify-center ${fill} text-white`}
        style={{ width: `${volumePercentage}%` }} // Using inline style for dynamic sizing as tailwind doesn't support e.g w-[${percentage}%] won’t work;
      >
      </div>
      <div
        className="flex items-center justify-center text-black dark:bg-slate-400 bg-white"
        style={{ width: `${marketCapPercentage}%` }}
      >
      </div>
    </div>
  );
}

export default DuelPercentageBar;

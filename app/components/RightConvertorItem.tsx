function RightConvertorItem({
  children,
  displayConvertedRate,
  showPlaceHolder,
  convertedCurrency,
  coin,
  currencySymbol,
}: {
  children: React.ReactNode;
  displayConvertedRate: number;
  showPlaceHolder: boolean;
  convertedCurrency: any;
  coin: string;
  currencySymbol: string;
}) {
  return (
    <div className="p-7 min-h-[185px] rounded-2xl  bg-opacity-50 bg-purple-400 dark:bg-shark border-t-2  border-opacity-80 dark:border-[#55495C] rounded-t-3xl opacity-90 w-[100%]">
      <div className="pb-5">
        <p>You Buy</p>
      </div>
      <div className="flex justify-between items-center ">
        {children}
        <div>
          <div>{displayConvertedRate.toFixed(2)} </div>
        </div>
      </div>
      <div className="border-b border-white p-2 mb-5"> </div>
      {!showPlaceHolder && (
        <div>
          {" "}
          1 {coin} = {currencySymbol}
          {convertedCurrency}{" "}
        </div>
      )}
    </div>
  );
}

export default RightConvertorItem;

function LeftConvertorItem({
  children,
  handleChange,
  numOfCoins,
  showPlaceHolder,
  convertedCurrency,
  coin,
  currencySymbol,
}: {
  children: React.ReactNode;
  handleChange: any;
  numOfCoins: any;
  showPlaceHolder: any;
  convertedCurrency: any;
  coin: string;
  currencySymbol: string;
}) {
  return (
    <div className="p-7 min-h-[185px] rounded-2xl bg-purple-400 dark:bg-shark border-t-2  border-opacity-80 dark:border-[#55495C] rounded-t-3xl w-[100%]">
      <div className="pb-5">
        <p>You Sell</p>
      </div>
      <div className="flex justify-between items-center ">
        {children}
        <div>
          <input
            className="w-20 bg-opacity-30 bg-shark opacity-60"
            onChange={handleChange}
            value={numOfCoins}
            type="text"
          />
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

export default LeftConvertorItem;

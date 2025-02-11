function CoinTableHeader({ handleSort, getSortIndicator }) {
  
  return (
    <div className="flex  justify-between">
      <div className="flex lg:flex-[20%] min-w-[20%] lg:max-w-[20%] flex-[30%]  max-w-[30%]  ">
        <div className="flex-[20%] flex justify-center">
          <div>#</div>
        </div>
        <div
          onClick={() => handleSort("name")}
          className="flex-[80%] flex justify-center"
        >
          <p> Name {getSortIndicator("name")}</p>
        </div>
      </div>
      <div className="flex lg:flex-[30%] flex-[20%]  ">
        <div
          onClick={() => handleSort("current_price")}
          className="flex flex-[25%] justify-center"
        >
          <p>
            {" "}
            Price {getSortIndicator("current_price")}
          </p>
        </div>
        <div className="md:flex flex-[75%] justify-center gap-9 hidden">
          <div
            onClick={() => handleSort("price_change_percentage_1h_in_currency")}
          >
            <p>
              {" "}
              1ds {getSortIndicator("price_change_percentage_1h_in_currency")}
            </p>
          </div>
          <div
            onClick={() => handleSort("price_change_percentage_7d_in_currency")}
          >
            <p>
              {" "}
              7ds {getSortIndicator("price_change_percentage_7d_in_currency")}
            </p>
          </div>
          <div
            onClick={() =>
              handleSort("price_change_percentage_24h_in_currency")
            }
          >
            <p>
              {" "}
              24hrs{" "}
              {getSortIndicator("price_change_percentage_24h_in_currency")}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden flex-[20%] gap-2   justify-center">
        <div className="w-[90%] flex ">
          <p
            onClick={() => handleSort("total_volume")}
          >
            {getSortIndicator("total_volume")}24hr Volume/
          </p>{" "}
          <p
            onClick={() => handleSort("market_cap")}
          >
            Market Cap {getSortIndicator("market_cap")}
          </p>
        </div>
      </div>
      <div className="lg:flex hidden flex-[20%] gap-2 justify-center ">
        <div className="flex w-[90%]">
          <p
            onClick={() => handleSort("circulating_supply")}
          >
            {getSortIndicator("circulating_supply")} Circulating /
          </p>
          <p
            onClick={() => handleSort("total_supply")}
          >
            {" "}
            Total supply {getSortIndicator("total_supply")}
          </p>
        </div>
      </div>
      <div
        onClick={() => handleSort("sparkline_in_7d")}
        className="flex-[10%] flexjustify-center"
      >
        Last 7ds {getSortIndicator("sparkline_in_7d")}
      </div>
    </div>
  );
}

export default CoinTableHeader;

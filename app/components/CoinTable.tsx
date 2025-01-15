import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinTableItem from "./CoinTableItem";
import { useAppSelector } from "@/lib/hooks";
import { useGetCoinTableDataQuery } from "@/lib/features/cryptoDataApi";
import Spinner from "./spinner/Spinner";

function CoinTable() {
  const { currency } = useAppSelector((state) => state.currency);
  const [page, setPage] = useState(1);
  const [coinData, setCoinData] = useState<any[]>([]);
  const { data } = useGetCoinTableDataQuery({
    currency,
    per_page: 30,
    page,
  });

  /////////////////////////////////
  //sort stuff

  const [sortConfig, setSortConfig] = useState<SortConfig | any>("default");

  type Coin = {
    name: string;
    current_price: any;
    price_change_percentage_1h_in_currency: any;
    price_change_percentage_24h_in_currency: any;
    price_change_percentage_7d_in_currency: any;
    market_cap: any;
    total_volume: any;
    circulating_supply: any;
    total_supply: any;
    sparkline_in_7d: any;
  };

  type SortConfig = {
    key: keyof Coin;
    direction: "asc" | "desc";
  };

  // this determines what (current_price ect) is sorted and how (direction: asc or desc)
  const handleSort = (key: keyof Coin) => {
    let direction: "asc" | "desc" | "default" = "asc"; // "default" can be a special case
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc"; // Toggle to descending
      } else if (sortConfig.direction === "desc") {
        direction = "default"; // Reset to default state
      }
    }
    // If the column is being sorted for the first time or is reset, set to "asc"
    if (direction === "default") {
      setSortConfig({ key, direction: "default" }); // Reset sorting to default (no sorting)
    } else {
      setSortConfig({ key, direction });
    }
  };

  // this sorts does the sorting
  const sortedCoins = React.useMemo(() => {
    if (sortConfig?.direction === "default") {
      return coinData;
    } else {
      const sorted = [...coinData].sort((a, b) => {
        if (sortConfig?.direction === "asc") {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
          return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
      });
      return sorted;
    }
  }, [coinData, sortConfig]);

  // displays arrows indicating asc or desc or default

  const getSortIndicator = (key: keyof Coin) => {
    if (!sortConfig || sortConfig.key !== key) return "";
    return sortConfig.direction === "asc"
      ? "↑"
      : sortConfig.direction === "desc"
      ? "↓"
      : "";
  };

  ////////////////////////////////////
  // adds new page dynamically via api to infinite scroll
  const fetchData = () => {
    setPage((prev) => (prev == 4 ? prev : prev + 1));
  };

  useEffect(() => {
    //  this appends new data into coinData arr
    if (data) {
      setCoinData((prevData) => [...prevData, ...data]);
    }
  }, [data]);

  return (
    <div className=" w-full">
      {/* table labels */}
      <div className="flex  justify-between">
        <div className="flex lg:flex-[20%] min-w-[20%] lg:max-w-[20%] flex-[30%]  max-w-[30%]  ">
          <div className="flex-[20%]">#</div>
          <div onClick={() => handleSort("name")} className="flex-[80%]">
            Name {getSortIndicator("name")}
          </div>
        </div>
        <div className="flex lg:flex-[30%] flex-[20%]  ">
          <div
            onClick={() => handleSort("current_price")}
            className="flex flex-[25%] justify-center"
          >
            Price {getSortIndicator("current_price")}
          </div>
          <div className="md:flex flex-[75%] justify-center gap-9 hidden">
            <div
              onClick={() =>
                handleSort("price_change_percentage_1h_in_currency")
              }
            >
              1ds {getSortIndicator("price_change_percentage_1h_in_currency")}
            </div>
            <div
              onClick={() =>
                handleSort("price_change_percentage_7d_in_currency")
              }
            >
              7ds {getSortIndicator("price_change_percentage_7d_in_currency")}
            </div>
            <div
              onClick={() =>
                handleSort("price_change_percentage_24h_in_currency")
              }
            >
              24hrs{" "}
              {getSortIndicator("price_change_percentage_24h_in_currency")}
            </div>
          </div>
        </div>
        <div className="lg:flex hidden flex-[20%] gap-2  ">
          <div className="w-[80%] ">
            <span onClick={() => handleSort("total_volume")}>
              24hr Volume/{getSortIndicator("total_volume")}
            </span>{" "}
            <span onClick={() => handleSort("market_cap")}>
              Market Cap {getSortIndicator("market_cap")}
            </span>
          </div>
        </div>
        <div className="lg:flex hidden flex-[20%] gap-2  ">
          <div className=" w-[80%]">
            <span onClick={() => handleSort("circulating_supply")}>
              Circulating /{getSortIndicator("circulating_supply")}
            </span>
            <span onClick={() => handleSort("total_supply")}>
              {" "}
              Total supply {getSortIndicator("total_supply")}
            </span>
          </div>
        </div>
        <div
          onClick={() => handleSort("sparkline_in_7d")}
          className="flex-[10%] flexjustify-center"
        >
          Last 7ds {getSortIndicator("sparkline_in_7d")}
        </div>
      </div>
      {/* table container */}
      <div className="w-full">
        <InfiniteScroll
          dataLength={coinData.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={
            <div className="dark:bg-darkPurple bg-lightPurple text-lightText  flex justify-center items-center gap-10 py-20 text-sm">
              <Spinner />
            </div>
          }
        >
          <CoinTableItem coinData={sortedCoins} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default CoinTable;

import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useGetCoinTableDataQuery } from "@/lib/features/cryptoDataApi";
import Loader from "./Loader";
import BackToTop from "./BackToTop";
import CoinTableItem from "./CoinTableItem";
import CoinTableHeader from "./CoinTableHeader";

const CoinTable = memo(() => {
  CoinTable.displayName = "CoinTable";
  const { currency } = useAppSelector((state: RootState) => state.currency);
  const [page, setPage] = useState(1);
  const [coinData, setCoinData] = useState<any[]>([]);
  
  // Fetch data based on current currency and page
  const { data } = useGetCoinTableDataQuery({
    currency,
    per_page: 30,
    page,
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  type Coin = {
    id: string; 
    name: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    market_cap: number;
    total_volume: number;
    circulating_supply: number;
    total_supply: number;
    sparkline_in_7d: any;
  };

  type SortConfig = {
    key: keyof Coin;
    direction: "asc" | "desc";
  };

  // Sorting logic
  const handleSort = useCallback(
    (key: keyof Coin) => {
      setSortConfig((prev) => {
        if (!prev || prev.key !== key) {
          return { key, direction: "asc" };
        } else if (prev.direction === "asc") {
          return { key, direction: "desc" };
        } else {
          return null; // Reset to default
        }
      });
    },
    []
  );

  // Memoized sorting function
  const sortedCoins = useMemo(() => {
    if (!sortConfig) return coinData;

    return [...coinData].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });
  }, [coinData, sortConfig]);

  // Get sorting indicator
  const getSortIndicator = useCallback(
    (key: keyof Coin) => {
      if (!sortConfig || sortConfig.key !== key) return "";
      return sortConfig.direction === "asc" ? "↑" : "↓";
    },
    [sortConfig]
  );

  // Fetch next page for infinite scroll
  const fetchData = useCallback(() => {
    setPage((prev) => (prev === 4 ? prev : prev + 1));
  }, []);

  // Append new data without duplicates
  useEffect(() => {
    if (data) {
      setCoinData((prevData) => {
        const existingIds = new Set(prevData.map((coin) => coin.id));
        const newData = data.filter((coin) => !existingIds.has(coin.id)); // Prevent duplicates
        return [...prevData, ...newData];
      });
    }
  }, [data]);

  return (
    <div className="w-full">
      {/* Table Header */}
      <CoinTableHeader handleSort={handleSort} getSortIndicator={getSortIndicator} />

      {/* Infinite Scroll Container */}
      <InfiniteScroll
        className="!overflow-visible"
        dataLength={coinData.length}
        next={fetchData}
        hasMore={true}
        loader={<Loader height="h-[200px]" />}
      >
        <div className="w-full">
          {sortedCoins.map((item, idx) => (
            <CoinTableItem key={item.id} idx={idx} item={item} />
          ))}
        </div>
        <BackToTop />
      </InfiniteScroll>
    </div>
  );
});

export default CoinTable;

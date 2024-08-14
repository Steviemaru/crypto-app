"use client";
import { useAppSelector } from "../../lib/hooks";
import { useGetGlobalMarketDataQuery } from "@/lib/features/cryptoDataApi";
import FormatNumber from "@/utils/FormatNumber";
import tw from "tailwind-styled-components";
import PercentageBar from "./PercentageBar";

const BottomNavItem = tw.div`
flex
gap-2
items-center
py-2
px-8
border-l-4
border-grey-500
relative
`;
export default function BottomNavData() {
  const { data } = useGetGlobalMarketDataQuery("");
  const { currency, symbol } = useAppSelector((state) => state.currency);

  const handleCryptoPropertyFinder = (prop: string, crypto: string) =>
    parseFloat(data?.data[prop][crypto]);

  const handlePropertyFinder = (prop: any) => data?.data[prop];

  const convertTofixed = (value: number) => value.toFixed(0);

  const exchanges = handlePropertyFinder("markets");
  const coins = handlePropertyFinder("active_cryptocurrencies");
  const totalMarketCap = handleCryptoPropertyFinder(
    "total_market_cap",
    currency
  );
  const totalMarketVolume = handleCryptoPropertyFinder(
    "total_volume",
    currency
  );
  const bitcoinMCP = handleCryptoPropertyFinder("market_cap_percentage", "btc");

  const ethereumMCP = handleCryptoPropertyFinder(
    "market_cap_percentage",
    "eth"
  );

  return (
    <div className="flex p-3 justify-start gap-3 border border-opacity-10 border-black">
      {/* add loading */}
      <BottomNavItem>Coins:{coins}</BottomNavItem>
      <BottomNavItem>Exchange:{exchanges}</BottomNavItem>
      <BottomNavItem>
        {symbol}
        {FormatNumber(totalMarketCap)}
      </BottomNavItem>
      <BottomNavItem>
        {symbol}
        {FormatNumber(totalMarketVolume)}
        <PercentageBar fill={"bg-grey-100"} progress={totalMarketVolume} />
      </BottomNavItem>
      <BottomNavItem>
        {convertTofixed(bitcoinMCP)}%
        <PercentageBar fill={"bg-yellow-100"} progress={bitcoinMCP} />
      </BottomNavItem>
      <BottomNavItem>
        {convertTofixed(ethereumMCP)}%
        <PercentageBar fill={"bg-blue-100"} progress={ethereumMCP} />
      </BottomNavItem>
    </div>
  );
}

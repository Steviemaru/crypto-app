"use client";
import tw from "tailwind-styled-components";
import { useAppSelector } from "../../lib/hooks";
import { RootState } from "@/lib/store";
import { useGetGlobalMarketDataQuery } from "@/lib/features/cryptoDataApi";
import { HandleFormatingNumbersAndLabels } from "@/utils/helperFunctions";
import PercentageBar from "./PercentageBar";
import Loader from "./Loader";
import BitcoinLogo from "../../public/bitcoinLogo.svg";
import EthereumLogo from "../../public/ethereumLogo.svg";
import ExchangeIcon from "../../public/exchangeIcon.svg";
import CoinsIcon from "../../public/coinsIcon.svg";
import Line from "../../public/line.svg";

const BottomNavItem = tw.div`
flex
gap-2
items-center
py-2
md:px-6
border-gray-100
relative
md:text-base
text-xs 
`;
export default function BottomNavData() {
  const { data, isLoading, isSuccess, isError } =
    useGetGlobalMarketDataQuery();

  const { currency, symbol } = useAppSelector(
    (state: RootState) => state.currency
  );

  const handleCryptoPropertyFinder = (prop: any, crypto: any) =>
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

  if (isLoading) {
    return <Loader height="" />;
  }

  if (isError || !data) {
    return (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText flex justify-center items-center gap-10 py-4 text-sm">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className="flex p-2 items-center md:justify-center justify-around gap-1 md:gap-3 border-t border-b border-opacity-10 border-black">
          <div className="hidden lg:flex items-center">
            <BottomNavItem>
              <CoinsIcon /> Coins: {coins}{" "}
            </BottomNavItem>
            <Line />
            <BottomNavItem>
              <ExchangeIcon /> Exchange: {exchanges}{" "}
            </BottomNavItem>
            <BottomNavItem>
              {symbol}
              {HandleFormatingNumbersAndLabels(totalMarketCap, "nav")}
            </BottomNavItem>
            <Line />
          </div>
          <BottomNavItem>
            {symbol}
            {HandleFormatingNumbersAndLabels(totalMarketVolume, "none")}
            <PercentageBar
              fill={"bg-purple-300"}
              progress={HandleFormatingNumbersAndLabels(
                totalMarketVolume,
                "none"
              )}
            />
          </BottomNavItem>
          <Line />
          <BottomNavItem>
            <BitcoinLogo />
            {convertTofixed(bitcoinMCP)}%
            <PercentageBar fill={"bg-yellow-500"} progress={bitcoinMCP} />
          </BottomNavItem>
          <Line />
          <BottomNavItem>
            <EthereumLogo />
            {convertTofixed(ethereumMCP)}%
            <PercentageBar fill={"bg-blue-300"} progress={ethereumMCP} />
          </BottomNavItem>
        </div>
      </>
    );
  }
}

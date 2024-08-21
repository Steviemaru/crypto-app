"use client";
import { useAppSelector } from "../../lib/hooks";
import { useGetGlobalMarketDataQuery } from "@/lib/features/cryptoDataApi";
import FormatNumber from "@/utils/FormatNumber";
import tw from "tailwind-styled-components";
import PercentageBar from "./PercentageBar";
import Spinner from "./Spinner/Spinner";
import BitcoinLogo from "../../public/bitcoinLogo.svg";
import EthereumLogo from "../../public/ethereumLogo.svg";
import ExchangeIcon from "../../public/exchangeIcon.svg";
import CoinsIcon from "../../public/coinsIcon.svg";

const BottomNavItem = tw.div`
flex
gap-2
items-center
py-2
px-6
border-gray-100
relative
text-base
`;
export default function BottomNavData() {
  const { data, isLoading, isSuccess } = useGetGlobalMarketDataQuery("");

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

  if (isLoading) {
    return (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText  flex justify-center items-center gap-10 py-4 text-sm">
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className="flex p-2 justify-start gap-3 border border-opacity-10 border-black">
          <BottomNavItem>
            <CoinsIcon /> Coins: {coins}{" "}
          </BottomNavItem>
          <BottomNavItem>
            <ExchangeIcon /> Exchange: {exchanges}{" "}
          </BottomNavItem>
          <BottomNavItem>
            {symbol}
            {FormatNumber(totalMarketCap)}
          </BottomNavItem>
          <BottomNavItem>
            {symbol}
            {FormatNumber(totalMarketVolume)}
            <PercentageBar
              fill={"bg-white"}
              progress={FormatNumber(totalMarketVolume)}
            />
          </BottomNavItem>
          <BottomNavItem>
            <BitcoinLogo />
            {convertTofixed(bitcoinMCP)}%
            <PercentageBar fill={"bg-yellow-500"} progress={bitcoinMCP} />
          </BottomNavItem>
          <BottomNavItem>
            <EthereumLogo />
            {convertTofixed(ethereumMCP)}%
            <PercentageBar fill={"bg-blue-300"} progress={ethereumMCP} />
          </BottomNavItem>
        </div>
      )}
      ;
    </>
  );
}

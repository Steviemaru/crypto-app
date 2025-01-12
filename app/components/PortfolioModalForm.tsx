import { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import PortfolioModalInput from "./PortfolioModalInput";
import PortfolioModalDropdown from "./PortfolioModalDropdown";
import { hoverEffect } from "@/utils/hoverEffect";
import {
  useGetCarouselDataQuery,
  useGetCoinDataQuery,
} from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";

function PortfolioModalForm({
  idForEditing,
  findAsset,
  addAsset,
  handleUpdateAsset,
  setIsModalOpen,
  isEditing,
  setIsEditing,
}) {
  const [coinName, setCoinName] = useState("bitcoin");
  const [purchasedAmount, setPurchasedAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const { currency } = useAppSelector((state) => state.currency);
  const SeletedCurrency = currency;

  useEffect(() => {
    if (isEditing) {
      const selectedAsset = findAsset(idForEditing);
      const { coinName, purchasedAmount, purchaseDate } = selectedAsset;
      setCoinName(coinName);
      setPurchasedAmount(purchasedAmount);
      setPurchaseDate(purchaseDate);
    }
  }, [isEditing, idForEditing, findAsset]);

  const query = `https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}?market_data=true`;
  const { data: assetData } = useGetCoinDataQuery(query);
  const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${SeletedCurrency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;
  const { data } = useGetCarouselDataQuery(coinQuery);
  if (!assetData) {
    return;
  }

  const coinSymbol = assetData.symbol.toUpperCase();
  const coinImage = assetData.image.small;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!purchasedAmount && !purchaseDate) {
      return;
    }
    const newAsset = {
      coinName,
      id: uuidv4(),
      coinImage,
      coinSymbol,
      purchasedAmount,
      purchaseDate,
      assetData,
    };

    isEditing ? handleUpdateAsset(newAsset, idForEditing) : addAsset(newAsset);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  return (
    <div className="flex ">
      {/* left */}
      <div className="md:w-5/12 md:flex hidden">
        <div className="bg-slate-800 flex-grow  mr-4 flex flex-col justify-center items-center">
          <div className="rounded-lg p-2 bg-slate-200">
            <Image src={coinImage} width={22} height={22} alt="coin" />
          </div>
          <div className="mt-4 font-medium">
            {coinName.toUpperCase()}
            {`[${coinSymbol}]`}
          </div>
        </div>
      </div>
      {/* right */}
      <div className="md:w-7/12">
        <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* top */}

          <div className="flex flex-col gap-3 relative">
            <PortfolioModalDropdown
              data={data}
              selected={coinName}
              setSelected={setCoinName}
            />
            <PortfolioModalInput
              placeholder="Purchase amount"
              stateValue={purchasedAmount}
              setState={setPurchasedAmount}
              type={"number"}
            />
            <PortfolioModalInput
              placeholder="Purchased date"
              stateValue={purchaseDate}
              setState={setPurchaseDate}
              type={"date"}
            />
          </div>

          {/* bottom */}
          <div className="flex gap-2">
            <button
              className={`${hoverEffect} flex-1  bg-slate-200 opacity-90 font-medium rounded-md py-2 px-3`}
            >
              cancel
            </button>
            <button
              onSubmit={handleSubmit}
              className={`${hoverEffect} flex-1  bg-black opacity-90 font-medium rounded-md py-2 px-3`}
            >
              Save and continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PortfolioModalForm;

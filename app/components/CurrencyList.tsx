"use client";
import { useState, useEffect, useRef, memo} from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import CurrencyListIcon from "./CurrencyListIcon";
import { setCurrency } from "@/lib/features/currencySlice";
import UpArrow from "../../public/upArrow.svg";
import DownArrow from "../../public/downArrow.svg";

const currencyList = [
  { currency: "gbp" },
  { currency: "eur" },
  { currency: "usd" },
  { currency: "btc" },
  { currency: "eth" },
  { currency: "ltc" },
];

export  const CurrencyList = memo(()=> {
  CurrencyList.displayName = "CurrencyList";
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state: RootState) => state.currency);

  useEffect(() => {
    function handler({ target }: MouseEvent) {
      if (!dropDownRef.current?.contains(target as Node)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div
      className="relative rounded-lg md:p-6 p-2 h-[100%]  border-t-2 
   dark:border-[#373745] dark:bg-shark bg-purple-100 flex flex-col items-center justify-center "
    >
      <div
        ref={dropDownRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="flex gap-3  items-center justify-center lg:text-base text-sm flex-2  font-semibold dark:text-white"
      >
        <div className="hidden lg:block">
          <CurrencyListIcon />
        </div>
        <div>{currency.toUpperCase()}</div>
        <div>{showDropdown ? <UpArrow /> : <DownArrow />}</div>
      </div>
      {showDropdown && (
        <div className="left-0 top-[100%] absolute rounded-xl p-2 z-50 dark:bg-shark bg-purple-100 dark:text-white text-black w-full">
          {currencyList.map((item) => {
            return (
              <option
                key={item.currency}
                onClick={() => {
                  dispatch(setCurrency(item.currency));
                }}
                className=" dark:bg-shark dark:text-white bg-purple-100 hover:bg-purple-50 dark:hover:bg-slate-400 rounded-lg py-2 text-center"
              >
                {item.currency.toUpperCase()}
              </option>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default CurrencyList;
"use client";
import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
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


export default function CurrencyList() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);


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
    <>
      <div
        ref={dropDownRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="flex relative py-1 nav-items-Light bg-slate-900 text-white"
      >
        <CurrencyListIcon />
        {currency.toUpperCase()}
        <div>{showDropdown ? <UpArrow /> : <DownArrow />}</div>
      </div>
      {showDropdown && (
        <div className="nav-items-Light absolute rounded-xl p-2 z-50 bg-slate-900 text-white">
          {currencyList.map((item) => {
            return (
              <option
                key={item.currency}
                onClick={() => {
                  dispatch(setCurrency(item.currency));
                }}
                className="hover:bg-slate-400 rounded-lg py-2 px-5"
              >
                {item.currency.toUpperCase()}
              </option>
            );
          })}
        </div>
      )}
    </>
  );
}
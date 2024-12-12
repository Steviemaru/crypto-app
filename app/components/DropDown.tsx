"use client";

import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { useGetCarouselDataQuery} from "@/lib/features/cryptoDataApi";
import { useAppSelector } from "@/lib/hooks";

export default function DropDown({setConvertorValue, selected, setSelected}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { currency } = useAppSelector((state) => state.currency);
  const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;
  const {data } = useGetCarouselDataQuery(coinQuery)


 useEffect(() => {
  function handler({ target }: MouseEvent) {
    if (!dropDownRef.current?.contains(target as Node)) {
      setShowDropdown(false);
    }
  }
  window.addEventListener("click", handler);
  return () => window.removeEventListener("click", handler);
}, []);

// const query = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";



//ask chat gpt theres an error here 
// list causes error may try to access it before it loads 
const cryptoList = data || [{ name:"bitcoin",price:76819, symbol:"btc"}, { name:"etherium",price:2895.71 , symbol:"eth"}];

 // put this in top level setAge in the hangle switch 
// console.log(cryptoList, "list " ,selected, " test age ");
const handleChange = (event:any) => {
  setSelected(event.target.value as string);
};
console.log(selected, typeof selected, "value ")

return (
  <>
      <div ref={dropDownRef}
      onClick={() => {
        setShowDropdown(!showDropdown);
      }}
      className="dark:text-white "
        onChange={handleChange}
      >
        {selected}
      </div>
     {showDropdown && (
       <div className=" absolute rounded-xl p-2 z-50 dark:bg-slate-900 bg-purple-100 dark:text-white text-black">
       {cryptoList.map((item:any)=> {
           return  <option onClick={()=>{setConvertorValue(item);
             setSelected(item.name); 
           }} value={item.name} key={item.name}>{item.name}</option>;
         })}
       </div>
     )}
      
  </>);

}

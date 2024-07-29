"use client";
import { useState, useEffect, useRef } from "react";
import UpArrow from  "../../public/upArrow.svg";
import DownArrow from  "../../public/downArrow.svg";
const currencyList = [{currency:"GBP",symbol:"£"}, {currency:"EUR", symbol:"€"}, {currency:"USD",symbol:"$"}];

export default function CurrencyList() {
const [showDropdown, setShowDropdown] = useState(false);
const [currency, setCurrency] = useState("GBP");
const dropDownRef = useRef<HTMLDivElement>(null);
const handleCurrency =(value:string)=> {
  setCurrency(value);
};

useEffect(() => {
  function handler({target}:MouseEvent) {
    if(!dropDownRef.current?.contains(target as Node)) {
      setShowDropdown(false);
  }  
  }
  window.addEventListener("click", handler);
  return () => window.removeEventListener("click", handler);
}, []);

  return (
    <>
    <div ref={dropDownRef} onClick={()=>{setShowDropdown(!showDropdown);}} className="flex relative py-1 bg-slate-700 text-white" >
    {currency}
    <div>
      {showDropdown ? <UpArrow/> : <DownArrow/> }
    </div>
    </div>
    {showDropdown &&
        <div  className="absolute p-2 bg-slate-700 text-white" >
          {currencyList.map((item) => {
          return <option key={item.currency}onClick={()=>{handleCurrency(item.currency);}} className="hover:bg-green-300 ">{item.currency}</option>;
          })}
        </div>}
     
    </>
  );
}
"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import FormDownArrow  from "@/public/formDownArrow.svg";
import { hoverEffect } from "@/utils/hoverEffect";

function PortfolioModalDropdown({ data, selected, setSelected }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlaceholder , setShowPlaceholder] = useState(true);
  const dropDownRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function handler({ target }: MouseEvent) {
      if (!dropDownRef.current?.contains(target as Node)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const cryptoList = data || [{ name: "bitcoin", price: 76819, symbol: "btc" }, { name: "etherium", price: 2895.71, symbol: "eth" }];

  const handleChange = (e: any) => {
    setSelected(e.target.value as string);
  };
  
  return (
    <>
      <div ref={dropDownRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className={`${hoverEffect} relative dark:text-white bg-slate-800 p-2 rounded-md font-medium flex justify-between items-center`}
        onChange={handleChange}
      >
       {!showPlaceholder ?  selected : "Select Coin"} 
       <FormDownArrow/>
      </div>
      {showDropdown && (
        
          <div className="  w-full absolute p-2 z-50 dark:bg-slate-900 bg-purple-100  dark:text-white  text-black max-h-40 overflow-y-scroll">
          <option className="font-medium" onClick={()=> setShowPlaceholder(true)} value="Select Coin">Select Coin</option>
          {cryptoList.map((item: any) => {
            return <option className="dark:hover:bg-slate-400 font-medium" onClick={() => {
              setSelected(item.id);
              setShowPlaceholder(false);
            }}  value={item.id} key={item.id}>{item.name}</option>;
          })}
        </div>
  
      )}

    </>);

}

export default PortfolioModalDropdown;
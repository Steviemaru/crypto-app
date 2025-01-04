"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function DropDown({ data, setConvertorValue, selected, setSelected }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlaceholder , setShowPlaceholder] = useState(true);
  const dropDownRef = useRef<HTMLDivElement>(null);
 
  // refactor put in utils 
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

  const handleChange = (event: any) => {
    setSelected(event.target.value as string);
  };

  return (
    <div className="relative">
      <div ref={dropDownRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="dark:text-white"
        onChange={handleChange}
      >
       <div className="flex gap-3">
{ selected.image ? <Image  alt="coin-image" width={22} height={22}  src={selected.image} /> : "" }
<div className="w-28 truncate text-nowrap">{!showPlaceholder ?  selected.name : "Select Coin"}</div> 
       </div>
      </div>
      {showDropdown && (
        <div className="left-0 absolute overflow-y-scroll h-48 rounded-xl p-4 z-50 dark:bg-slate-900 bg-purple-100 dark:text-white text-black">
             <option className="font-medium my-2" onClick={()=> setShowPlaceholder(true)} value="Select Coin">Select Coin</option>
          {cryptoList.map((item: any) => {
            
            return <option className="my-1 dark:hover:bg-slate-400 hover:bg-purple-50" onClick={() => {
              setConvertorValue(item);
              setSelected({name:item.name, image:item.image});
              setShowPlaceholder(false);
            }} value={item.name} key={item.name}>{item.name}</option>;
          })}
        </div>
      )}

    </div>);

}

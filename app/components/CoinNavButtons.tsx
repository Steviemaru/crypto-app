"use client";
import {useState} from "react";
import Link from "next/link";

function CoinNavButtons() {
  const [navItems] = useState(["coins", "convertor"]);
  const [selected, setSelected] = useState("coins");
// refacter upper case 
  return (
    <div className="flex gap-2 justify-center bg-black bg-opacity-50 w-96 rounded-lg">
      {navItems.map((item)=>{
return (
  <Link key={item} href={`/${item == "coins" ? "" : item}`}>
  <button onClick={()=> setSelected(item)} className={`${selected == item? "bg-black" : "bg-transparent"} px-16 py-2 rounded-lg`}>{item.slice(0, 1).toUpperCase() + item.slice(1)}</button>
  </Link>
);
      })}
    </div>
  );
}

export default CoinNavButtons;
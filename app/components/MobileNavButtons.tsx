"use client";
import { useState } from "react";
import Link from "next/link";
import HomeLogo from "@/public/homeLogo.svg";
import CoinPageSymbol from "../../public/coinPageSymbol.svg";
import CoinConvertorSymbol from "../../public/CoinConvertorSymbol.svg";

function MobileNavButtons() {
  const [navItems] = useState(["Home", "portfolio", "convertor"]);
  const [selectedItem, setSelectedItem] = useState("Home");
  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex gap-6">
      {navItems.map((item: string) => {
        return (
          <Link key={item} href={`/${item == "Home" ? "" : item}`}>
            <button
              className={`flex flex-col items-center py-3 px-5 rounded-lg ${
                item == selectedItem
                  ? "dark:bg-black bg-purple-200"
                  : "bg-transparent"
              }`}
              onClick={() => {
                handleClick(item);
              }}
            >
              <div className="flex justify-center  gap-5">
                {item == "Home" ? (
                  <HomeLogo
                    className={"text-white fill-current"}
                    width="22"
                    height="22"
                  />
                ) : item == "portfolio" ? (
                  <CoinPageSymbol />
                ) : (
                  <CoinConvertorSymbol />
                )}
              </div>
              <div className="text-xs">
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
              </div>
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default MobileNavButtons;

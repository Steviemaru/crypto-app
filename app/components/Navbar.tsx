"use client";

import React from "react";
import ToggleTheme from "./ToggleTheme";
import NavButtons from "../components/NavButtons";
import CurrencyList from "../components/CurrencyList";
import SearchInput from "../components/SearchInput";
import BottomNavData from "./BottomNavData";
import NavLogo from "../../public/navlogo.svg";

function Navbar() {
  return (
    <div className="dark:bg-black dark:bg-opacity-20 bg-white bg-opacity-20">
      {/* Top Navigation */}
      <div className="flex  px-7 pt-4 justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center flex-wrap gap-4">
          <NavLogo className="md:w-11 md:h-11 w-6 h-6  md:mx-8 text-white" />
          <div className="md:flex hidden">
            <NavButtons />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center md:gap-6 gap-2 lg:w-auto  h-[30px] ">
          <SearchInput />
          <CurrencyList />
          <ToggleTheme />
        </div>
      </div>
      {/* 

      {/* Bottom Navigation */}
      <div className="mt-4">
        <BottomNavData />
      </div>
    </div>
  );
}

export default Navbar;

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
      <div className="flex px-7 py-4 justify-between">
        <div className="flex items-center">
          <NavLogo className=" py-0 mx-8 text-white h-12 w-12" />
          <NavButtons />
        </div>
        <div className="flex items-center gap-6 border-1">
          <SearchInput />
          <div className="dark:bg-slate-900 bg-purple-100 py-2 px-4 m-1 rounded-t-xl rounded-b-xl ">
            <CurrencyList />
          </div>
          <div className="dark:bg-slate-900 bg-purple-100 rounded-t-xl rounded-b-xl ">
            <ToggleTheme />
          </div>
        </div>
      </div>
      <div>
        <BottomNavData />
      </div>
    </div>
  );
}

export default Navbar;

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
  <div className="flex  px-7 py-4 justify-between items-center">
    {/* Left Section */}
    <div className="flex items-center flex-wrap gap-4">
      <NavLogo className="md:w-11 md:h-11 w-6 h-6  md:mx-8 text-white" />
      <div className="">
        <NavButtons />
      </div>
    </div>

    {/* Right Section */}
    <div className="flex  items-center  md:gap-6 gap-2  w-40 md:w-auto">
      {/* Search Input */}
      <div className="dark:bg-shark flex-2 rounded-lg ">
       <SearchInput/>
      </div>

      {/* Currency List */}
      <div className=" relative  p-2 md:p-4 py-3 dark:bg-shark bg-purple-100 flex-1 rounded-lg">
        <CurrencyList />
      </div>

      {/* Theme Toggle */}
      <div className="dark:bg-shark bg-purple-100 flex-2 rounded-lg ">
       <ToggleTheme />
      </div>
    </div>
  </div>
{/* 
put the containers inside the components 
flex container 
then size within flex contaienr flex1 flex 2 ect 
then content symbol 
*/}
{/* 
study the mobile first approuch
study the tailwind responsive syntax and how to apply it with mobile first approuch 
e.g md --> apply to medium and above 
*/}

  {/* Bottom Navigation */}
  <div className="mt-4 px-4">
    <BottomNavData />
  </div>
</div>
  );
}

export default Navbar;

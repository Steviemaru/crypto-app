"use client";
import React from "react";
import MobileNavButtons from "./MobileNavButtons";

function MobileNavbar() {
  return  (
<div className="bottom-0 z-10 fixed flex justify-center items-center bg-[#3c3d7d4f] backdrop-blur-sm px-20 py-5 w-full " >
    <MobileNavButtons/>
</div>
  );
}

export default MobileNavbar;
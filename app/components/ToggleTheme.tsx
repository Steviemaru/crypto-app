"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../public/sunIcon.svg";
import MoonIcon from "../../public/moonIcon.svg";

function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="flex items-center rounded-lg md:p-6 p-2 gap-3 h-[100%]  border-t-2 
   dark:border-[#373745] dark:bg-shark bg-purple-100 "
    >
      <button
        className=" flex items-center text-white   h-6 w-6"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme == "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

export default ToggleTheme;

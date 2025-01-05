"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../public/sunIcon.svg";
import MoonIcon from "../../public/moonIcon.svg";

function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, [setTheme]);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex items-center  gap-3 md:p-3 p-2 py-3">
      <button
        className="dark:bg-shark bg-purple-100  flex items-center text-white md:h-6  h-4 w-4"
        onClick={handleTheme} 
      >
        {theme == "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

export default ToggleTheme;

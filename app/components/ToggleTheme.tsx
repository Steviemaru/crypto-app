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
  }, []);

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
    <div className="flex gap-3">
      <button
        className="dark:bg-slate-900 bg-purple-100 py-0 m-2.5  text-white h-7 w-7"
        onClick={handleTheme}
      >
        {theme == "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

export default ToggleTheme;

"use client";


import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import StoreProvider from "../StoreProvider";


export default function ThemeSwitchProvider({ children }: any) {
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return <>{children}</>;
  }


  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}

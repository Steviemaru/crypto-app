"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeSwitchProvider({ children }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}

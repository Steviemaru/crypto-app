import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${font.className} bg-custom-gradient-light  dark:bg-custom-gradient-dark transition-all dark:text-white`}
      >
        <div className="bg-custom-fade-light dark:bg-custom-fade-dark  min-h-screen absolute"></div>
        <StoreProvider>
          <Navbar />
          <div className="flex lg:hidden">
            <MobileNavbar />
          </div>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

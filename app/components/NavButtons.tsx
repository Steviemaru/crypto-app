"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import tw from "tailwind-styled-components";

interface WrapperProps {
  $primary?: string;
}

const Wrapper = tw.div<WrapperProps>`
 ${(p) => (p.$primary == "dark" ? "bg-black" : "bg-white")}
  flex
  bg-opacity-50
  rounded-3xl  
  w-80
`;

interface ButtonProps {
  $item?: string;
  $selectedItem: string;
  $bgColor: any;
}

const Button = tw.button<ButtonProps>`
${(p) => (p.$item == p.$selectedItem ? p.$bgColor : "bg-transparent")};
     border-0
     focus:outline-none
     dark:text-white
     text-black
    rounded-3xl
    ring-black
    ring-offset-black
    m-3
    py-1
    px-7
    w-32  
  `;

export default function NavButtons() {
  const [navItems] = useState(["coins", "convertor"]);
  const [selectedItem, setSelectedItem] = useState("coins");
  const { theme } = useTheme();
  const navBtnBgColor = theme == "dark" ? "bg-black" : "bg-purple-200";
  const handleClick = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Wrapper $primary={theme}>
        {navItems.map((item: string) => {
          return (
            <Link key={item} href={`/${item == "coins" ? "" : item}`}>
              <Button
                $item={item}
                $selectedItem={selectedItem}
                $bgColor={navBtnBgColor}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
              </Button>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
}

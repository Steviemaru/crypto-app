"use client";
import { useState } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";

const Wrapper = tw.div`
  flex
  bg-black
  bg-opacity-50
  rounded-3xl  
  w-80
`;

interface ButtonProps {
  $item?: string
  $selectedItem:string
}

const Button = tw.button<ButtonProps>`
${(props) => (props.$item == props.$selectedItem? "bg-black" : "bg-transparent")};
     border-0
     focus:outline-none
    text-white
    rounded-3xl 
    ring-black
    ring-offset-black
    m-3
    py-1
    px-7
    w-32  
  `;

export default function NavButtons() {
  const [navItems] = useState(["coins", "portfolio"]);
  const [selectedItem, setSelectedItem] = useState("coins");
  const handleClick = (item:string) => {
    setSelectedItem(item);
  };
    return (
      <>
        <Wrapper>
          {navItems.map((item:string) => {
            return (
              <Link key={item} href={`/${item == "coins" ? "" : item}`}>
                <Button $selectedItem={selectedItem} onClick={() => {handleClick(item);}} $item={item}>
                  {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </Button>
              </Link>
            );
          })}
        </Wrapper>
    </>
  );
}
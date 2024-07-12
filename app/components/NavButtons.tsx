"use client";
import { useState } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";

export default function NavButtons() {
  const [navItems] = useState(["coins", "portfolio"]);
  const [selectedItem, setSelectedItem] = useState("coins");

  const handleClick = (item: any) => {
    setSelectedItem(item);
  };                                                                                                                               
const Wrapper = tw.div`
  flex
  bg-black
  bg-opacity-50
  rounded-3xl  
  w-80
`;

  interface ButtonProps {
    $item?: string;
  }

  const Button = tw.button<ButtonProps>`
${(props) =>
     (props.$item == selectedItem  ? "bg-black" : "bg-transparent")
     };
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

  return (
    <>
      <Wrapper>
       {navItems.map((item) => {
        
        return(  
          <Link key={item} href={`/${item == "coins" ? "" : item }`}>
<Button  onClick={() => handleClick(item)} $item={item}>
            {item.slice(0,1).toUpperCase() + item.slice(1) }
          </Button></Link>);
})}
      </Wrapper>
    </>
  );
}
"use client"
import { useState } from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import tw from 'tailwind-styled-components';


export default function NavButtons() {
  const [navItems] = useState(['coins', 'portfolio']);
  const [selectedItem, setSelectedItem] = useState("coins");

  const handleClick = (item: any) => {
    setSelectedItem(item);
  };
const width = styled.div`
width:320px;
`
  const Wrapper = tw(width)`
  flex
  bg-black
  bg-opacity-50
  rounded-3xl  
`;

  interface ButtonProps {
    $item: string;
  }

  const focus = styled.button`
    &:focus {
      outline: none;
    }
    &:hover {
      background: #686b78;
      border: #c9cacf;
    }
    border: none;
  `;

  const Button = tw(focus)<ButtonProps>`
  
   ${(props) =>
     props.$item == selectedItem  ? 'bg-black' : 'bg-transparent'
     
     };
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
        console.log(item, selectedItem, "check");
        return(  
          <Link href={`/${item == 'coins' ? '' : item }`}>
<Button key={item} onClick={() => handleClick(item)} $item={item}>
            {item.slice(0,1).toUpperCase() + item.slice(1) }
          </Button></Link>)
})}
      </Wrapper>
    </>
  );
}



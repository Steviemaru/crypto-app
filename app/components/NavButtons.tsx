"use client";
import 'tailwindcss/tailwind.css'
import Link from "next/link";
import tw from "tailwind-styled-components";
import { useAppSelector, useAppDispatch } from "../../lib/hooks"
import { setSelectedItem } from "../../lib/features/navbuttons/navbuttonsSlice";


const Wrapper = tw.div`
  flex
  bg-black
  bg-opacity-50
  rounded-3xl  
  w-80
`;

interface ButtonProps {
  $item?: string
  $selecteditem:string
}

const Button = tw.button<ButtonProps>`
${(props) => (props.$item == props.$selecteditem? "bg-black" : "bg-transparent")};
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
  const navItems = useAppSelector((state) => state.NavButtons.array )
const SelectedItem = useAppSelector((state)=> state.NavButtons.SelectedItem )
  const dispatch = useAppDispatch()
  
  return (
    <>
      <Wrapper>
        {navItems.map((item:any) => {
          console.log(SelectedItem, "selected item")
          return (
            <Link key={item} href={`/${item == "coins" ? "" : item}`}>
              <Button $selecteditem={SelectedItem} onClick={() => {dispatch(setSelectedItem(item))}} $item={item}>
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
              </Button>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
}
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import tw from "tailwind-styled-components";
import HomeLogo from "@/public/homeLogo.svg";

interface WrapperProps {
  $primary?: string;
}

const Wrapper = tw.div<WrapperProps>`
 ${(p) => (p.$primary == "dark" ? "bg-black" : "bg-white")}
  flex
  items-center
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
     hidden md:flex
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
  const [navItems] = useState(["Home", "portfolio"]);
  const [selectedItem, setSelectedItem] = useState("Home");
  const { theme } = useTheme();
  const navBtnBgColor = theme == "dark" ? "bg-black" : "bg-purple-200";
  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Wrapper $primary={theme}>
        {/* Home Logo: Always visible on small screens */}
        <div className="flex md:hidden">
          <HomeLogo width="22" height="22" />
        </div>

        {/* Buttons: Hidden on small screens */}
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

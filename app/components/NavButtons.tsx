import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { firstLetterToUppercase } from "@/utils/helperFunctions";
import tw from "tailwind-styled-components";

interface WrapperProps {
  $primary?: string;
}

const Wrapper = tw.div<WrapperProps>`
 ${(p) => (p.$primary == "dark" ? "bg-shark-light" : "bg-white")}
  flex
  items-center
   border-t-2 
  dark:border-[#373745]
 border-opacity-80
  bg-opacity-80 
  opacity-90
  rounded-full  
  md:w-80
  gap-4
`;

interface ButtonProps {
  $item?: string;
  $selectedItem: string;
  $bgColor: any;
}

const Button = tw.button<ButtonProps>`
${(p) => (p.$item == p.$selectedItem ? p.$bgColor : "bg-transparent")};
    
     hidden lg:flex
     focus:outline-none
     dark:text-white
     text-black
     flex 
     justify-center
    rounded-3xl
    ring-black
    ring-offset-black
    m-3
    py-1
    px-7
    lg:w-32  
  `;

export default function NavButtons() {
  const navItems = {
    //label: path
    home: "/",
    portfolio: "/portfolio",
  };

  const { theme } = useTheme();
  const pathname = usePathname();
  const navBtnBgColor = theme == "dark" ? "bg-black" : "bg-purple-200";
  const selectedItem = pathname == "/portfolio" ? "portfolio" : "home";

  return (
    <>
      <Wrapper $primary={theme}>
        {Object.entries(navItems).map(([label, path]: [string, string]) => {
          return (
            <Link key={label} href={path}>
              <Button
                $item={label}
                $selectedItem={selectedItem}
                $bgColor={navBtnBgColor}
              >
                {firstLetterToUppercase(label)}
              </Button>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
}

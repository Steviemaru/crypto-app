import { useAppSelector } from "../../lib/hooks";
import { useTheme } from "next-themes";
import CurrencyBgIcon from "../../public/currencyBgIcon.svg";
import CurrencyBgLightIcon from "../../public/currencyBgLightIcon.svg";


function CurrencyListIcon() {
  const { symbol } = useAppSelector((state) => state.currency);
  const { theme } = useTheme();


  if (theme == "light") {
    return (
      <div className="relative">
        <CurrencyBgLightIcon />
        <div className="absolute  rounded-lg top-1 left-1 h-3 w-3 selected-Light bg-white text-black  flex justify-center  items-center">
          <div className="font-bold">{symbol}</div>
        </div>
      </div>
    );
  }


  return (
    <div className="relative">
      <CurrencyBgIcon />
      <div className="absolute  rounded-lg top-1 left-1 h-3 w-3 bg-white text-black  flex justify-center  items-center">
        <div className="font-bold">{symbol}</div>
      </div>
    </div>
  );
}


export default CurrencyListIcon;

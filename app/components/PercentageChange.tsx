import { useAppSelector } from "@/lib/hooks";
import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";

export default function PercentageChange ({data, withCurrencySymbol}) {
  const { symbol } = useAppSelector((state) => state.currency);
const percentage = data?.toFixed(0);
const simulatedChange = [-1, +1];
const [decrease , increase ] = simulatedChange;
const isEven =  parseInt(percentage) % 2 == 0 ;
const simulatedValue = isEven ? increase : decrease;
const dynamicPercentage = parseFloat(percentage) + simulatedValue ; 
const dynamicPercentageCheck = dynamicPercentage > percentage ;

return (
<div className={`${dynamicPercentageCheck ? "text-teal-400": "text-red-500" } flex gap-1 items-center`}>
 {withCurrencySymbol? symbol : "" } {dynamicPercentage.toLocaleString()}  {dynamicPercentageCheck ? <TriangleUp className="text-teal-400 fill-current" width="20px" height="20px" /> : <TriangleDown  className="text-red-500 fill-current" width="20px" height="20px" /> } 
</div>
);
}
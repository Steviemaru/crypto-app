import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";

export default function PercentageChange ({data}) {

const percentage = data.toFixed(2);
const simulatedChange = [-0.50, +0.50] ;
const random = Math.round(Math.random());
const dynamicPercentage = parseFloat(percentage) + simulatedChange[random] ; 
const dynamicPercentageCheck = dynamicPercentage > percentage ;

return (
<div className={`${dynamicPercentageCheck ? "text-green-400": "text-red-500" } flex gap-1 items-center`}>
  {dynamicPercentage}  {dynamicPercentageCheck ? <TriangleUp className="text-green-400 fill-current" width="20px" height="20px" /> : <TriangleDown  className="text-red-400 fill-current" width="20px" height="20px" /> } 
</div>
);
}
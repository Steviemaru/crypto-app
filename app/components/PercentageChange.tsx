import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";

export default function PercentageChange ({data}) {

const percentage = data.toFixed(2);
const simulatedChange = [-0.50, +0.50] ;
const [decrease , increase ] = simulatedChange;
const isEven =  parseInt(percentage) % 2 == 0 ;
const simulatedValue = isEven ? increase : decrease;
const dynamicPercentage = parseFloat(percentage) + simulatedValue ; 
const dynamicPercentageCheck = dynamicPercentage > percentage ;

return (
<div className={`${dynamicPercentageCheck ? "text-green-400": "text-red-500" } flex gap-1 items-center`}>
  {dynamicPercentage}  {dynamicPercentageCheck ? <TriangleUp className="text-green-400 fill-current" width="20px" height="20px" /> : <TriangleDown  className="text-red-400 fill-current" width="20px" height="20px" /> } 
</div>
);
}
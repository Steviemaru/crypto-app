
export default function PercentageChange ({data}) {
  
const percentage = data.toFixed(2);
const simulatedChange = [-0.50, +0.50] ;
const random = Math.round(Math.random());
const dynamicPercentage = parseFloat(percentage); + simulatedChange[random] ; 

return (
<div className={`${dynamicPercentage > percentage ? "text-green-400": "text-red-500" }  `}>
  {dynamicPercentage}
</div>
);
}
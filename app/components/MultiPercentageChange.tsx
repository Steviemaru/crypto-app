import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";

export default function MultiPercentageChange ({dynamicPercentage, dynamicPercentageCheck}) {
  
return (
<div className={`${dynamicPercentageCheck ? "text-green-400": "text-red-500" } flex gap-1 items-center`}>
  {dynamicPercentage?.map((item:any)=>{
    return <div key={item.id} className="flex items-center gap-2 mx-2">
    {item.value}%  {dynamicPercentageCheck ? <TriangleUp className="text-green-400 fill-current" width="20px" height="20px" /> : <TriangleDown  className="text-red-400 fill-current" width="20px" height="20px" /> }; 
    </div>;
  })}  
</div>
);
}
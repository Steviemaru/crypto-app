import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";

export default function MultiPercentageChange({ dynamicPercentage, dynamicPercentageCheck }) {

  return (
    <div className={`${dynamicPercentageCheck ? "text-green-400" : "text-red-500"} flex items-center justify-between gap-1`}>
      {dynamicPercentage?.map((item: any) => {
        return <div key={item.id} className="flex items-center ">
          {dynamicPercentageCheck ? <TriangleUp className="text-green-400 fill-current" width="20px" height="20px" /> : <TriangleDown className="text-red-400 fill-current" width="10px" height="10px" />} {item.value}%  
        </div>;
      })}
    </div>
  );
}
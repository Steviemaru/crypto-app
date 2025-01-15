import TriangleUp from "../../public/triangleUp.svg";
import TriangleDown from "../../public/triangleDown.svg";
import { v4 as uuidv4 } from "uuid";

export default function MultiPercentageChange({ Percentages }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {Percentages?.map((item: any) => {
        const itemChecker = item > 0;
        return (
          <div
            key={uuidv4()}
            className={`flex items-center gap-2 ${
              itemChecker ? "text-green-400" : "text-red-500"
            }`}
          >
            {itemChecker ? (
              <TriangleUp
                className="text-green-400 fill-current"
                width="10px"
                height="10px"
              />
            ) : (
              <TriangleDown
                className="text-red-400 fill-current"
                width="10px"
                height="10px"
              />
            )}
            {item}%
          </div>
        );
      })}
    </div>
  );
}

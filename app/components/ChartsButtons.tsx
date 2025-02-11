import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setDays } from "@/lib/features/daysSlice";

function ChartsButtons() {
  const [selected, setSelected] = useState("7");
  const dispatch = useAppDispatch();

  // contains values for days buttons
  const intervalsForDays = {
    "1D": "1",
    "3D": "3",
    "7D": "7",
    "1M": "30",
    "3M": "90",
    "6M": "180",
    "1Y": "365",
  };

  return (
    <div className="flex justify-start w-full">
      <div className="flex gap-3 w ">
        {/* 1D 3D 5D ect days buttons */}
        {Object.entries(intervalsForDays).map((entry: any) => {
          const [key, value] = entry;
          const parsedValue= parseInt(value);
          return (
            <button
              key={key}
              className={`p-2 rounded-xl "bg-opacity-30 bg-white dark:bg-shark ${
                value == selected
                  ? "bg-opacity-100 dark:bg-opacity-100"
                  : "bg-opacity-50 dark:bg-opacity-50"
              }`}
              onClick={() => {
                dispatch(setDays(parsedValue));
                setSelected(value);
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ChartsButtons;

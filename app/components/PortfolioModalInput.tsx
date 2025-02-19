import React, { useState, useEffect, useRef } from "react";
import FormDownArrow from "@/public/formDownArrow.svg";

function PortfolioModalInput({ type, setState, stateValue, placeholder }) {
  const [showInput, setShowInput] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    function handler({ target }: MouseEvent) {
      if (!dropDownRef.current?.contains(target as Node)) {
        if (stateValue !== "") {
          setShowInput(true);
        } else {
          setShowInput(false);
        }
      } else {
        setShowInput(true);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [stateValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInput(true);
  };

  return (
    <div
      ref={dropDownRef}
      className="relative dark:bg-slate-800 bg-white rounded-md p-1 font-medium "
      onClick={() => {
        handleClick;
      }}
    >
      {showInput ? (
        <input
          autoFocus
          className="w-full dark:bg-slate-800 bg-white"
          required
          value={stateValue}
          onChange={handleOnChange}
          type={type}
          max={type == "date" ? formattedDate : ""}
        />
      ) : (
        <div className="flex items-center justify-between p-1">
          <span className=" dark:bg-slate-800 bg-white">{placeholder}</span>
          <FormDownArrow />
        </div>
      )}
    </div>
  );
}

export default PortfolioModalInput;

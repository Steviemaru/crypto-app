import React, { useState, useEffect, useRef } from "react";
import FormDownArrow from "@/public/formDownArrow.svg";
import { hoverEffect } from "@/utils/hoverEffect";

function PortfolioModalInput({ type, setState, stateValue, placeholder }) {
  const [showInput, setShowInput] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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
      className={` relative bg-slate-800 rounded-md p-1 font-medium ${hoverEffect}`}
      onClick={() => {
        handleClick;
      }}
    >
      {showInput ? (
        <input
          required
          autoFocus
          className="w-full bg-slate-800"
          value={stateValue}
          onChange={handleOnChange}
          type={type}
        />
      ) : (
        <div className="flex items-center justify-between p-1">
          <span className=" bg-slate-800">{placeholder}</span>
          <FormDownArrow />
        </div>
      )}
    </div>
  );
}

export default PortfolioModalInput;

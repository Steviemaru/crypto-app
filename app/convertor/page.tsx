"use client";

import { useState } from "react";
import DropDown from "../components/DropDown";

export default function Page() {
const [left, setLeft] = useState({ name:"bitcoin", price:45000 , symbol:"btc"}); 
const [right, setRight] = useState({ name:"etherium", price:3300 , symbol:"eth"});
const [leftSelected, setLeftSelected] = useState("bitcoin"); 
const [rightSelected, setRightSelected] = useState("etherium");
const [numOfCoins, setNumOfCoins] = useState(1);
console.log(left.price, right.price , "values to convert");

const exchangeRate = (left.price/right.price) ;
const convertedRate = () =>  numOfCoins * exchangeRate ;
const displayConvertedRate = convertedRate().toLocaleString("en-US", { style: "currency", currency: right.symbol.toUpperCase(), minimumFractionDigits: 5});

const handleChange =(e:any)=> {
setNumOfCoins(e.target.value);
}

const handleSwitch =() => {
setLeftSelected(right.name);
setRightSelected(left.name);
setLeft(right);
setRight(left);
}

  return (
  <div className="h-56  flex flex-col justify-center items-center">
  
<div className="flex">
<div className="flex justify-between items-center rounded-2xl py-12 px-52  bg-opacity-50 bg-slate-600 opacity-90">
<DropDown selected={leftSelected} setSelected={setLeftSelected} setConvertorValue={setLeft}/>
<div onClick={()=>{setNumOfCoins(numOfCoins + 1 ); }}>
  <input onChange={handleChange} value={numOfCoins} type="text" />
</div>
<div onClick={()=>{setNumOfCoins(numOfCoins - 1 ); }}>
  -
</div>
</div>
<button onClick={handleSwitch}> switch</button>
<div className="flex justify-between items-center rounded-2xl py-12 px-52  bg-opacity-50 bg-slate-600 opacity-90" >
<DropDown selected={rightSelected} setSelected={setRightSelected} setConvertorValue={setRight}/>
<div>
  {displayConvertedRate}
</div>
</div>
</div>

<div className="flex gap-10">

</div>
   </div>
);
}
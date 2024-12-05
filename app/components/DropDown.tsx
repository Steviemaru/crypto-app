"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchDataWithFallback } from "@/utils/mockData"; 

export default function DropDown({setConvertorValue, selected, setSelected}) {

 const [mockData, setMockData] = useState([]);

// const query = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  useEffect(() => {
    fetchDataWithFallback("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    //   .then((response) => response.json());
      .then((data) => {
        setMockData(data);
        // console.log(data, "data test");
      });
     
  }, []);

//ask chat gpt theres an error here 
// list causes error may try to access it before it loads 
const cryptoList = mockData.length ? mockData?.map((item:any)=> 
 { 
     return { name:item.name, price:item.current_price , symbol:item.symbol };
}) : [{ name:"bitcoin", price:45000 , symbol:"btc"}, { name:"etherium", price:3300 , symbol:"eth"}];

 // put this in top level setAge in the hangle switch 
// console.log(cryptoList, "list " ,selected, " test age ");
const handleChange = (event: SelectChangeEvent) => {
  setSelected(event.target.value as string);
};

return (
  <Box sx={{ minWidth: 120 }}>
    <FormControl className=" convertor-Input border-transparent" variant="standard" sx={{ m: 1, minWidth: 120 , borderBottom:"red" }} fullWidth>
      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
      <Select
      className="dark:text-white"
       labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        value={selected}
        label="selected"
        onChange={handleChange}
      >
        {cryptoList.map((item:any)=> {
          return  <MenuItem onClick={()=>{setConvertorValue(item);}} value={item.name} key={item.name}>{item.name}</MenuItem>;
        })
        };
      </Select>
    </FormControl>
  </Box>
);
}

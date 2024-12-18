import React from "react";
import CoinDetails from "@/app/components/CoinDetails";

export default  async function Page({ params }: { params: Promise<{ coin: string }> }) {
  const  coinName  = (await params).coin; 

  return (
    <>
    <CoinDetails coin={coinName}/>
    </>
  );
} 
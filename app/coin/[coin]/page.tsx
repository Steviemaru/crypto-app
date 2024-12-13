import React from "react";
import CoinDetails from "@/app/components/CoinDetails";

export default  async function Page({ params }: { params: { coinName: string } }) {
   // Use React.use() to unwrap the promise
  const { coinName } = await params;
  return (
    <>
    <CoinDetails coin={coinName}/>
    </>
  );
} 
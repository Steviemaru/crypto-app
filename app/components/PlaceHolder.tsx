import React from "react";

function PlaceHolder({ height }: { height: string }) {
  return (
    <div className={`flex flex-col ${height} justify-center items-center`}>
      <div className="text-center text-gray-500">
        {" "}
        Select coins to display their chart data.
      </div>
    </div>
  );
}

export default PlaceHolder;

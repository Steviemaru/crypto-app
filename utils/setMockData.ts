import { useEffect } from "react";

export const setMockData = (setData:any, api:any ) => {
    const mock = {prices: [[1.70, 2.40], [2.64, 39.3], [3.4, 4.12]],
        total_volumes: [[12.333, 22.999], [24.500, 33.400], [35.000, 44.550]]}

        fetch(api)
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "mockdata", localStorage, "storage"); // This will log an array of 10 mock crypto objects
          setData([mock, data]);
          });
      
}
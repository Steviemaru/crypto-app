import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uniqueKey = "CG-EKfXTdjB4RTPQ5VRHjotPZpP";
const apiDemoKey = `&x_cg_demo_api_key=${uniqueKey}`;

export const cryptoDataApi = createApi({
  reducerPath: "cryptoDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getGlobalMarketData: builder.query<any, any>({
      query: () => `global?${apiDemoKey}`,
    }),
    getChartData: builder.query<any, any>({
      query: (query) => `${query}${apiDemoKey}`,
    }),
    getCarouselData: builder.query<any, any>({
      query: (query) => `${query}${apiDemoKey}`,
    }),
    getDataB: builder.query<any, any>({
      query: (query) => `${query}${apiDemoKey}`,
    }),
  }),
});

export const { useGetGlobalMarketDataQuery, useGetChartDataQuery, useGetCarouselDataQuery,useGetDataBQuery } =
  cryptoDataApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uniqueKey = "CG-EKfXTdjB4RTPQ5VRHjotPZpP";
const apiDemoKey = `&x_cg_demo_api_key=${uniqueKey}`;

export const cryptoDataApi = createApi({
  reducerPath: "cryptoDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getGlobalMarketData: builder.query<any, void>({
      query: () => `global?${apiDemoKey}`,
    }),
    getChartData: builder.query({
      query: (query) => `${query}${apiDemoKey}`,
    }),
    getCarouselData: builder.query({
      query: (currency) =>
        `coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d${apiDemoKey}`,
    }),
    getChartDataB: builder.query({
      query: (query) => `${query}${apiDemoKey}`,
    }),
    getCoinData: builder.query({
      query: (coin) => `coins/${coin}?market_data=true${apiDemoKey}`,
    }),
    getSearchCoinListData: builder.query({
      query: (query) => `search?query=${query}${apiDemoKey}`,
    }),
    getCoinTableData: builder.query({
      query: ({ currency, per_page, page }) =>
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d${apiDemoKey}`,
    }),
  }),
});

export const {
  useGetGlobalMarketDataQuery,
  useGetChartDataQuery,
  useGetCarouselDataQuery,
  useGetChartDataBQuery,
  useGetCoinDataQuery,
  useGetSearchCoinListDataQuery,
  useGetCoinTableDataQuery,
} = cryptoDataApi;

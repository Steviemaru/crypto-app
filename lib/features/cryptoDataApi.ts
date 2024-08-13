import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoDataApi = createApi({
  reducerPath: "cryptoDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getGlobalMarketData: builder.query<any, any>({
      query: () => "global",
    }),
  }),
});

export const { useGetGlobalMarketDataQuery } = cryptoDataApi;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  currency: string;
  symbol: string;
}

const initialState: CurrencyState = {
  currency: "gbp",
  symbol: "£",
};

const currencySymbols: Record<
  "gbp" | "eur" | "usd" | "btc" | "eth" | "ltc",
  string
> = {
  gbp: "£",
  eur: "€",
  usd: "$",
  btc: "₿",
  eth: "♦",
  ltc: "Ł",
};

export const currencySelectorSlice = createSlice({
  name: "currencySelector",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      const currencyKey = action.payload.toLowerCase();
      state.currency = currencyKey;
      state.symbol = currencySymbols[currencyKey] || "£";
    },
  },
});

export const { setCurrency } = currencySelectorSlice.actions;

export default currencySelectorSlice.reducer;

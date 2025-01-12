// chartSlice.js
import { createSlice } from "@reduxjs/toolkit";

type ChartState = {
  selectedCoins: string[];
};

const initialState: ChartState = {
  selectedCoins: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    toggleCoin: (state, action) => {
      const coin = action.payload;
      if (state.selectedCoins.includes(coin)) {
        state.selectedCoins = state.selectedCoins.filter(c => c !== coin);
      } else if (state.selectedCoins.length < 3) {
        state.selectedCoins.push(coin);
      }
    },
  },
});

export const { toggleCoin } = chartSlice.actions;
export default chartSlice.reducer;
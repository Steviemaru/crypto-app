import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectedDayState {
  selectedDay: number;
}

const initialState: selectedDayState = {
  selectedDay: 7,
};

const selectedDaySlice = createSlice({
  name: "selectedDay",
  initialState,
  reducers: {
    setDays: (state, item: PayloadAction<number>) => {
      state.selectedDay = item.payload;
    },
  },
});

export const { setDays } = selectedDaySlice.actions;

export default selectedDaySlice.reducer;

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface NavButtonsState {
  array: any,
  SelectedItem: string
}


const initialState: NavButtonsState = {
  array: ["coins", "portfolio"],
  SelectedItem: "coins"

}

export const NavButtonsSlice = createSlice(
  {
    name: 'NavButtons',
    initialState,
    reducers: {
      setSelectedItem:(state, item: PayloadAction<string> ) => {
state.SelectedItem = item.payload
      }
    } 
  }
)

export const { setSelectedItem } = NavButtonsSlice.actions

export default NavButtonsSlice.reducer
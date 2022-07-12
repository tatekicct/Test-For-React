import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models/models";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [{
      id: 0,
      category: "",
      content: "",
      fee: "",
      inOrOut: "支出",
    }]
  },
  reducers: {
    add: (state, action : PayloadAction<Item>) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = itemsSlice.actions;

export default itemsSlice.reducer;

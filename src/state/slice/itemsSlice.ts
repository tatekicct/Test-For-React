import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../models/models"

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [{
      id: 0,
      date: formatDate(new Date(Date.now())),
      category: "",
      content: "",
      fee: "",
      inOrOut: "支出",
      isFilled: false
    }]
  },
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
    setItems: (state, action) => {
      state.value = ([
       ...action.payload
      ])
    }
  },
});

// Action creators are generated for each case reducer function
export const { addItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;

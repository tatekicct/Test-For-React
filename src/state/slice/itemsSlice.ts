import { initialItem, Item } from "./../../model/model";
import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [initialItem(0)],
  },
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
    setItems: (state, action) => {
      state.value = [...action.payload];
    },
    updateItem: (state, action) => {
      const updatedItems = 
        action.payload.items.map((preItem: Item, index: number) =>
          index === action.payload.item.id
            ? { ...action.payload.item, isFilled: action.payload.isFilled }
            : preItem
        )
      state.value = [...updatedItems]
    },
  },
});

export const { addItem, setItems, updateItem } = itemsSlice.actions;

export default itemsSlice.reducer;

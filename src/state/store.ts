import { configureStore } from "@reduxjs/toolkit";
import undefinedRowReducer from "./slice/undefinedRowSlice";
import itemsReducer from "./slice/itemsSlice";


export const store = configureStore({
  reducer: {
    undefinedRow: undefinedRowReducer,
    items: itemsReducer
  }
});

export type State = ReturnType<typeof store.getState>
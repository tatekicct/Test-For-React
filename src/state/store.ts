import { configureStore } from "@reduxjs/toolkit";
import undefinedRowReducer from "./slice/undefinedRowSlice";


export const store = configureStore({
  reducer: {
    undefinedRow: undefinedRowReducer
  }
});

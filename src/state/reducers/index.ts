import {combineReducers } from "redux";
// import itemReducer from "./itemReducer";
import isNotNullReducer from "./isNotNullReducer";

const reducers = combineReducers({
  isNotNull: isNotNullReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>
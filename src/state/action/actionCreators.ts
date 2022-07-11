import { Dispatch } from "redux";
import { Item } from "../../models/models";
import { itemAction } from "../reducers/itemReducer"
import { isNotNullAction } from "../reducers/isNotNullReducer"

export const updateItem = (item: Item) => {
  return (dispatch: Dispatch<itemAction>) => {
    dispatch({
      type: "update",
      payload: item
    })
  }
}

export const setIsNotNull = (isNotNull: boolean) => {
  return (dispatch: Dispatch<isNotNullAction>) => {
    dispatch({
      type: "set",
      payload: isNotNull
    })
  }
}
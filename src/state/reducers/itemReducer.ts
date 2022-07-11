import { Item } from "../../models/models";

interface updateAction {
  type: "update";
  payload: Item;
}

interface addAction {
  type: "add";
  payload: Array<Item>;
}

export type itemAction = updateAction | addAction;

const itemReducer = (state: Item, action: itemAction) => {
  switch (action.type) {
    case "update":
      const newState = { ...state };
      newState.date = action.payload.date;
      newState.category = action.payload.category;
      newState.content = action.payload.content;
      newState.fee = action.payload.fee;
      newState.inOrOut = action.payload.inOrOut;
      return newState;

    case "add":
      const newItem = { ...state };
      action.payload.push(newItem)
      
  }
};

export default itemReducer;

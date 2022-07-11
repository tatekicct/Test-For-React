interface readAction {
  type: "read";
  payload: boolean;
}

interface setAction {
  type: "set";
  payload: boolean;
}

export type isNotNullAction = readAction | setAction 
const isNotNullReducer = (state: boolean = false, action: isNotNullAction) => {
  switch (action.type) {
    case "read":
      return state;
    case "set":
      return action.payload;
    default:
      return state;
      
  }
};

export default isNotNullReducer;

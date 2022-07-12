import { ActionTypes } from "./Actions";

let initState = [];

export const UpdateMegaMenuData = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LoadMegaMenu:
      state = action.data;
      return state;
    default:
      return state;
  }
};

import { ActionTypes } from "./request.action";

var initialState = {
  leadpurchased: false,
  leadpurchased_data: null,
};

export const updateProviderDashboard = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LEAD_PURCHASED:
      state = {
        ...state,
        leadpurchased: true,
        leadpurchased_data: action.data,
      };
      return state;
    case ActionTypes.LEAD_PURCHASED_RESET:
      state = {
        ...state,
        leadpurchased: false,
        leadpurchased_data: null,
      };
      return state;
    default:
      return state;
  }
};

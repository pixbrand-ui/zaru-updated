import { ActionTypes } from "./Actions";

let initState = [];

export const ChangeTaskSteps = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.STEPFWD:
      let fdata = [...state];
      if (state.length > 0) {
        fdata.forEach((element) => {
          if (element.step === action.step) {
            return fdata.splice(fdata.indexOf(element), 1);
          }
        });
        fdata.push({ step: action.step, [action.step]: action.payload });
      } else {
        fdata.push({ step: action.step, [action.step]: action.payload });
      }
      state = null;
      state = fdata;
      return state;
    case ActionTypes.STEPBWD:
      return state;
    default:
      return state;
  }
};

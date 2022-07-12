export const ChangeStepFwd = (data, step) => {
  return { type: ActionTypes.STEPFWD, payload: data, step: step };
};

export const ChangeStepBwd = (data, step) => {
  return { type: ActionTypes.STEPBWD, payload: data, step: step };
};

export const ActionTypes = {
  STEPFWD: "StepForward",
  STEPBWD: "StepBackward",
};

export const TaskCreated = (data) => {
  return { type: ActionTypes.TASK_CREATED, data: data };
};
export const TaskAccept = (data) => {
  return { type: ActionTypes.TASK_ACCEPT, data: data };
};
export const TaskReject = (data) => {
  return { type: ActionTypes.TASK_REJECT, data: data };
};
export const TaskCancel = (data) => {
  return { type: ActionTypes.TASK_CANCEL, data: data };
};

export const ActionTypes = {
  TASK_CREATED: "NEW_TASK_CREATED",
  TASK_ACCEPT: "NEW_TASK_ACCEPT",
  TASK_REJECT: "NEW_TASK_REJECT",
  TASK_CANCEL: "NEW_TASK_CANCEL",
};

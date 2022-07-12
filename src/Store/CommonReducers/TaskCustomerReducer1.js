import {
  TaskAccept,
  TaskCreated,
  TaskReject,
  TaskCancel,
  ActionTypes,
} from "../CommonActions/TaskCustomerActions";

var initialState = {
  taskData: null,
  taskStatus: "",
};

const TaskCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TASK_CREATED:
        console.log("TASK_CREATED : ", action.data);
      return { ...state, taskData: action.data, taskStatus: "open" };
    case ActionTypes.TASK_CANCEL:
      return { ...state, taskData: action.data, taskStatus: "canceled" };
    case ActionTypes.TASK_ACCEPT:
      return { ...state, taskData: action.data, taskStatus: "accepted" };
    case ActionTypes.TASK_REJECT:
      return { ...state, taskData: action.data, taskStatus: "rejected" };
    default:
      return { ...state };
  }
};

export default TaskCustomerReducer;

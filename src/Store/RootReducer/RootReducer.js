import { combineReducers } from "redux";
import { UpdateMegaMenuData } from "../../Views/Comman/MegaMenu/Reducer";
import { ChangeTaskSteps } from "../../Views/Customer/Tasks/Redux/Reducer";
import { ReloadAuth } from "../CommonReducers/CommonReducers";
import { updateProviderDashboard } from "../../Views/Provider/CustomerRequest/request.reducer";

const rootReducer = combineReducers({
  ChangeTaskSteps,
  UpdateMegaMenuData,
  ReloadAuth,
  updateProviderDashboard,
});

export default rootReducer;

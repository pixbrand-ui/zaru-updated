import { combineReducers } from "redux";
import wallet from "./wallet/reducer";
import { UpdateMegaMenuData } from "../Views/Comman/MegaMenu/Reducer";
import { ChangeTaskSteps } from "../Views/Customer/Tasks/Redux/Reducer";
import { updateProviderDashboard } from "../Views/Provider/CustomerRequest/request.reducer";
import { ReloadAuth } from "./CommonReducers/CommonReducers";

const rootReducer = combineReducers({
  // public
  wallet,
  ReloadAuth,
  ChangeTaskSteps,
  UpdateMegaMenuData,
  updateProviderDashboard,
});

export default rootReducer;

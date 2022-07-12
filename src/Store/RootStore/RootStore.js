import { createStore } from "redux";
import rootReducer from "../RootReducer/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootStore = createStore(rootReducer, composeWithDevTools());
export default rootStore;
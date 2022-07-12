import Auth from "../../Helpers/Auth/Auth";
import { ActionTypes } from "../CommonActions/CommonActions";

let ReloadAuth_initState = 0;
export const ReloadAuth = (state = ReloadAuth_initState, action) => {
  switch (action.type) {
    case ActionTypes.ReloadLoginAuth:
      console.log("Account profile updated.");
      reloadUserData(action.data);
      state += 1;
      return state;
    default:
      return state;
  }
};
const reloadUserData = (data) => {
  try {
    if (data) {
      let userAuth = [];
      userAuth.push({
        name: data.firstname + " " + data.lastname,
        email: data.email,
        phone: data.phone,
        role: data.usertype,
        profileImage : data.profileimage,
      });
      userAuth.push({ otp: data.otp });
      userAuth.push({ ref: data._id });
      userAuth.push({ businesses: data.businesses });
      Auth.setLoginAuth(userAuth);
    }
  } catch (error) {
    console.log(error);
  }
};

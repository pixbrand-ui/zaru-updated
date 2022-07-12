import GLocalStorage from "../Global/GLocalStorage";
const loginauth_key = "zaaruuworkbench";
const token_key1 = "zuid";
const token_key2 = "zrole";
const token_key3 = "ztoken";
const Auth = {
  setLoginAuth: (value) => {
    GLocalStorage.Add(loginauth_key, value);
  },
  getLoginAuth: () => {
    let auth = null;
    const isexists = GLocalStorage.IsExists(loginauth_key);
    if (isexists) {
      auth = GLocalStorage.Get(loginauth_key);
      return JSON.parse(auth);
    } else {
      return auth;
    }
  },
  removeLoginAuth: () => {
    GLocalStorage.Remove(loginauth_key);
    GLocalStorage.Remove("user-role");
  },

  setToken: (value) => {
    let token = "";
    token = value;
    let chunk1 = 0;
    let chunk2 = 0;
    let chunk3 = 0;
    if (token != null && token.length > 0) {
      chunk1 = token.slice(0, 30);
      chunk2 = token.slice(30, 60);
      chunk3 = token.slice(60, token.length);
    }
    GLocalStorage.Add(token_key1, chunk1);
    GLocalStorage.Add(token_key2, chunk2);
    GLocalStorage.Add(token_key3, chunk3);
  },
  getToken: () => {
    let auth = null;
    const key1_ex = GLocalStorage.IsExists(token_key1);
    const key2_ex = GLocalStorage.IsExists(token_key2);
    const key3_ex = GLocalStorage.IsExists(token_key3);

    if (key1_ex && key2_ex && key3_ex) {
      const auth1 = JSON.parse(GLocalStorage.Get(token_key1));
      const auth2 = JSON.parse(GLocalStorage.Get(token_key2));
      const auth3 = JSON.parse(GLocalStorage.Get(token_key3));
      auth = auth1 + auth2 + auth3;
      return auth;
    } else {
      return auth;
    }
  },
  removeToken: () => {
    GLocalStorage.Remove(token_key1);
    GLocalStorage.Remove(token_key2);
    GLocalStorage.Remove(token_key3);
    GLocalStorage.Remove("user-role");
  },
  isUserLoggedIn: () => {
    return Auth.getToken() !== null ? true : false;
  },
};
export default Auth;

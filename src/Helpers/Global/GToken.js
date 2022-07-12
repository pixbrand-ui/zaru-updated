import * as JWT from "jsonwebtoken";

export default class GToken {
  static Generate = (key, value, time) => {
    let gkey = JWT.sign({ val: value }, key, { expiresIn: time });
    return gkey;
  };

  static IsExpired = (token) => {
    let isExpired = false;
    let decodedToken = JWT.decode(token, { complete: true });
    let dateNow = new Date();
    if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
      isExpired = true;
    }
    return isExpired;
  };
}

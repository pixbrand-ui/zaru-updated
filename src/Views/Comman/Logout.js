import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../Helpers/Auth/Auth";
import GLocalStorage from "../../Helpers/Global/GLocalStorage";

export default function Logout() {
  const [gotologin, setgotologin] = useState(false);
  useEffect(() => {
    Auth.removeToken();
    Auth.removeLoginAuth();
    setgotologin(true);
    GLocalStorage.Remove("user-role")
  }, []);

  return <div>{gotologin && <Redirect to="/login" />}</div>;
}

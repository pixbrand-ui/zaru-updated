import React from "react";
import AuthHelper from "../../../Helpers/Auth/AuthHelper";
import Home from "./Home";
import BecomeaProvider from "../../Provider/BecomeaProvider/BecomeaProvider";

export default function HomeDecide() {
  return (
    <>
      {AuthHelper.getUserRole() === "Customer" ? (
        <Home />
      ) : (
        <BecomeaProvider />
      )}
    </>
  );
}

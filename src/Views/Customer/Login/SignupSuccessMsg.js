import React from "react";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import FormModal from "../../../Components/FormModal/FormModal";

export default function SignupSuccessMsg(props) {
  return (
    <div className="p-2 d-flex justify-content-center flex-column align-items-center">
      <h2 className="f24 f700 colorBlack fBold mb30">
        Registered Successfully
      </h2>
      <img className="img-fluid mb-2" src={Img.success.default} alt="" />
      <p className="m-2 text-muted p-3 mb-3 radius text-center">
        A verification link has been sent to your email: <b>{props.email} </b>
        and OTP has been sent to your mobile number <b>{props.mobile}</b>. You
        have to verify both before login.
      </p>
      <div className="d-flex justify-content-center mb20">
        <CmnButton
          onClick={(e) => {
            props.callback();
            FormModal.hide();
          }}
          type="square"
          text="Continue"
          className="btnTheme pl20 pr20 radius"
        />
      </div>
    </div>
  );
}

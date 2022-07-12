import React, { useEffect, useState } from "react";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { useHistory, useParams } from "react-router-dom";
import Img from "../../../Assets/Img/Img";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";

export default function EmailVerifiSuccess() {
  const histroy = useHistory();
  const { token } = useParams();
  const [showProgress, setshowProgress] = useState(true);
  const [verificationDone, setverificationDone] = useState(false);
  useEffect(() => {
   // console.log(token);
    try {
      HTTP.get(API.verifyEmail, false, token).then((res) => {
        if (res && res.status && res.status === 200) {
          setshowProgress(false);
          setverificationDone(true);
        } else {
          setshowProgress(false);
          setverificationDone(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className="container">
      <div className="p-5 d-flex justify-content-center flex-column align-items-center w-100 h-100">
        {showProgress && (
          <LoadinMsg
            message="Zaaruu is verifying your email. Please wait..."
            type="grow"
            className="align-self-center"
          />
        )}
        {!showProgress && verificationDone && (
          <>
            <h2 className="f24 f700 colorBlack fBold mb30">
              Verified Successfully
            </h2>
            <img className="img-fluid mb-2" src={Img.success.default} alt="" />
            <p className="m-2 text-muted p-3 mb-3 radius text-center">
              Your email has been verified successfully. You can login with your
              credentials.
            </p>
            <div className="d-flex justify-content-center mb20">
              <CmnButton
                onClick={(e) => {
                  histroy.push({
                    pathname: "/login",
                  });
                }}
                type="square"
                text="Goto Login"
                className="btnTheme pl20 pr20 radius"
              />
            </div>
          </>
        )}
        {!showProgress && !verificationDone && (
          <div className="d-flex justify-content-center flex-column align-items-center w-100 h-100">
            <p className="m-2 text-muted p-3 mb-3 radius text-center">
              Email verification failed. Please try after some time.
            </p>
            <div className="d-flex justify-content-center mb20">
              <CmnButton
                onClick={(e) => {
                  histroy.push({
                    pathname: "/login",
                  });
                }}
                type="square"
                text="Goto Login"
                className="btnTheme pl20 pr20 radius"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

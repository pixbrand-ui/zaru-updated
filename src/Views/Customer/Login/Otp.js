import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Container } from "reactstrap";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "./Otp.scss";
const Otp = (props) => {
  const [otpVal, setOtpVal] = useState("");

  const clearStates=()=>{
    setOtpVal("");
  }

  const saveData = () => {

    try{

    }catch(e){
    console.log("error on otp page", e);
    clearStates();
    }

 

  };

  return (
    <section className="bgOrange otpSection text-center bgLightOrange pt80 pb80 mobPt40 mobPb40">
      <Container>
        <div className="otpWrapper pt40 pb40 radius bgWhite width50 mobWidth100 mx-auto pl40 pr40">
          <div className="otpText w-100">
            <h2 className="f24 fBold">Check your inbox</h2>
            <p className="paraColor fs18">
              Sent via SMS to your mobile number +42 9876 543 210
            </p>
          </div>
          <div className="otpInputWrapper d-flex align-items-center justify-content-center mb30">
            <OtpInput
              onChange={(e) => setOtpVal(e)}
              value={otpVal}
              numInputs={4}
              separator={<span className="otpSep"></span>}
            />
          </div>
          <CmnButton
            type="square"
            onClick={() => saveData()}
            text="Submit"
            className="w-100"
          />

          <div className="ifNotReceive mt20">
            <p className="fs18 mb0">
              Not receiving code?{" "}
              <button className="btnBlank colorOrange" onClick={(e) => {}}>
                {" "}
                Resend
              </button>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Otp;

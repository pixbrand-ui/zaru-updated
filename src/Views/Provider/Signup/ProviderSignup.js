import React from "react";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import { Row, Col } from "reactstrap";
import { useState } from "react";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import { Link, Redirect } from "react-router-dom";
import GCard from "../../../Components/GComponents/GCard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPModal from "../../../Components/OTPModal/OTPModal";
import FormModal from "../../../Components/FormModal/FormModal";
import SignupSuccessMsg from "../../Customer/Login/SignupSuccessMsg";

const ProviderSignup = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [confviewPassword, setConfviewPassword] = useState(false);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [otpmobile, setotpmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [agree, setagree] = useState(false);
  const [gotologin, setgotologin] = useState(false);

  const togglePassword = (value, key) => {
    setViewPassword(value);
  };
  const togglePasswordConfirm = (value) => {
    setConfviewPassword(value);
  };

  const clearStates = () => {
    setfirstname("");
    setlastname("");
    setemail("");
    setmobile("");
    setpassword("");
    setconfirmpassword("");
  };

  const handleResendOTP = async () => {
    var result = false;
    try {
      await HTTP.post(
        API.resendOTP,
        { phone: otpmobile },
        false,
        false,
        ""
      ).then((res) => {
        if (res && res.status && res.status === 200) {
          result = true;
          return result;
        }
      });
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const handelVerifyOTP = async (otp) => {
    var result = false;
    try {
      await HTTP.post(
        API.verifyOTP,
        { phone: otpmobile, otp: otp },
        false,
        false,
        ""
      ).then((res) => {
        console.log("handelVerifyOTP : ", res);
        if (res && res.status && res.status === 200) {
          result = true;
          setgotologin(true);
          return result;
        }
      });
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const saveData = () => {
    try {
      if (firstname.trim().length <= 0) {
        return AlertModal.show(
          "Please enter first name.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (lastname.trim().length <= 0) {
        return AlertModal.show(
          "Please enter last name.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (email.trim().length <= 0) {
        return AlertModal.show(
          "Please enter email address.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (mobile.trim().length <= 9) {
        return AlertModal.show(
          "Please enter valid mobile no.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (password.trim().length <= 0) {
        return AlertModal.show(
          "Please enter password.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (confirmpassword.trim().length <= 0) {
        return AlertModal.show(
          "Please enter confirm password.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      if (confirmpassword.trim() !== password.trim()) {
        return AlertModal.show(
          "Password mismatch, please re-enter password.",
          "Oops!",
          () => {},
          "sm",
          false
        );
      }
      const iData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: mobile,
        password: password,
        usertype: "Provider",
        city: "",
      };
      HTTP.post(API.customersignup, iData, false, false, "").then((res) => {
        console.log("res", res);
        if (res && res.status === 201) {
          return AlertModal.show(
            res.message,
            "This account already exists!",
            () => {}
          );
        }
        if (res && res.status && res.status.toString() === "200") {
          FormModal.show(
            <SignupSuccessMsg
              email={email}
              mobile={otpmobile}
              callback={() => {
                OTPModal.show(
                  "",
                  otpmobile,
                  handelVerifyOTP,
                  () => {},
                  handleResendOTP
                );
              }}
            />,
            "",
            () => {},
            "md",
            "",
            false,
            false
          );
          clearStates();
        }
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="container">
      <div className="mx-auto mb120 mt40 width55 pl15 pr15 mobWidth100">
        {gotologin && <Redirect to="/login" />}
        <GCard
          className="p-4"
          direction="column"
          boxShadow="0px 2px 8px rgba(0, 0, 0, 0.3)"
        >
          <h2 className="f24 f700 colorBlack fBold mb30">
            Create your free Pro Account
          </h2>
          <Row>
            <Col xl={6}>
              <CmnInput
                className=""
                placeholder="Enter first name"
                label="First Name *"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
            </Col>

            <Col xl={6}>
              <CmnInput
                className=""
                placeholder="Enter last name"
                label="Last Name"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
            </Col>

            <div className="w-100 fs16 colorBlack mb-2">Mobile Number *</div>
            <PhoneInput
              country={"in"}
              value={mobile}
              placeholder="+91 90807-06050"
              onChange={(e) => {
                setmobile(e);
                setotpmobile(e);
              }}
            />
            <div className="w-100 d-none fs12 colorOrange mb-2 mt-1">
              Country code must be entered.
            </div>

            <Col xl={12}>
              <CmnInput
                className=""
                placeholder="Enter email"
                label="Email *"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />

              <div className="position-relative">
                <CmnInput
                  className=""
                  placeholder="Enter password"
                  label="Password *"
                  type={viewPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <button
                  className="btnBlank eyeIcon"
                  onClick={(e) => togglePassword(!viewPassword)}
                >
                  {viewPassword ? Svg.eye : Svg.eyeCut}
                </button>
              </div>

              <div className="position-relative">
                <CmnInput
                  className=""
                  placeholder="Enter confirm password"
                  label="Confirm Password *"
                  type={confviewPassword ? "text" : "password"}
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
                <button
                  className="btnBlank eyeIcon"
                  onClick={(e) => togglePasswordConfirm(!confviewPassword)}
                >
                  {confviewPassword ? Svg.eye : Svg.eyeCut}
                </button>
              </div>

              <div className="d-flex flex-wrap">
                <CmnCheckbox
                  id="agree"
                  label={`I agree to the`}
                  value={agree}
                  onChange={(e) => setagree(e.target.checked)}
                />
                <Link className="mr5 ml5 colorOrange" to="/termandcondition">
                  Terms of Service
                </Link>
                and
                <Link className="ml5 colorOrange" to="/privacypolicy">
                  Privacy Policy
                </Link>
              </div>

              <div className="mt30">
                <CmnButton
                  className={`w-100 ${agree ? "" : "g-disabled"}`}
                  type="square"
                  text="Create an Account"
                  onClick={(e) => saveData()}
                />
              </div>
            </Col>
          </Row>
        </GCard>
      </div>
    </div>
  );
};

export default ProviderSignup;

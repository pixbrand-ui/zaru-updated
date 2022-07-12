import React, { useState } from "react";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import FormModal from "../../../Components/FormModal/FormModal";
import GCard from "../../../Components/GComponents/GCard";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import { Link, Redirect } from "react-router-dom";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import { Col, Row } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPModal from "../../../Components/OTPModal/OTPModal";
import SignupSuccessMsg from "./SignupSuccessMsg";

export default function LoginAskPage(props) {
  const [viewPassword, setViewPassword] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loggedin, setloggedin] = useState(false);
  const [gotoSignup, setgotoSignup] = useState(false);

  const [viewpasswordsignup, setviewpasswordsignup] = useState(false);
  const [confviewPassword, setConfviewPassword] = useState(false);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [otpmobile, setotpmobile] = useState("");
  const [passwordsignup, setpasswordsignup] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [agree, setagree] = useState(false);

  const [gotoPage, setgotoPage] = useState("");

  const togglePassword = (value) => {
    setViewPassword(value);
  };

  const togglePasswordSignup = (value, key) => {
    setviewpasswordsignup(value);
  };
  const togglePasswordConfirm = (value) => {
    setConfviewPassword(value);
  };

  const clearStates = () => {
    setusername("");
    setpassword("");
  };

  const saveData = () => {
    try {
      if (username.trim().length <= 0) {
        return AlertModal.show(
          "Please enter user name.",
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
      const iData = {
        username: username,
        password: password,
      };
      HTTP.post(API.login, iData, false, false, "").then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          Auth.setToken(res.data.token);
          GLocalStorage.Add("task-pending", "#145210AH760AMP09");
          //--------------------
          console.log(res);
          let userAuth = [];
          userAuth.push({
            name: res.data.firstname + " " + res.data.lastname,
            email: res.data.email,
            phone: res.data.phone,
            role: res.data.usertype,
            profileImage : res.data.profileimage,
          });
          userAuth.push({ otp: res.data.otp });
          userAuth.push({ ref: res.data._id });
          userAuth.push({ businesses: res.data.businesses });
          Auth.setLoginAuth(userAuth);
          Auth.setToken(res.data.token);
          clearStates();
          setTimeout(() => {
            if (res.data.usertype === "Customer") {
              GLocalStorage.Add("user-role", "Customer");
              setloggedin(true);
            } else if (res.data.usertype === "Provider") {
              GLocalStorage.Add("user-role", "Customer");
              switchToCustomer().then((res) => {
                GLocalStorage.Add("user-role", "Customer");
                setloggedin(true);
              });
            }
          }, 1000);
        }
      });
    } catch (e) {
      console.log("error", e);
    }
  };
  const switchToCustomer = async () => {
    try {
      // call api to change user role field
      await HTTP.post(
        API.changeUserRole,
        { usertype: "Customer" },
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          // update local auth role (Local Storage)
          var userauthdata = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
          userauthdata[0].role = "Customer";
          GLocalStorage.Update("zaaruuworkbench", userauthdata);
          Auth.setToken(res.data.token);
          // then redirect to provder dashboard
          setloggedin(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
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
        console.log("handleResendOTP : ", res);
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
    console.log("Called handelVerifyOTP");
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
          setloggedin(true);
          return result;
        }
      });
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const saveDataSignup = () => {
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
        role: "Customer",
        city: "",
      };
      HTTP.post(API.customersignup, iData, false, false, "").then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          FormModal.show(
            <SignupSuccessMsg
              email={email}
              mobile={otpmobile}
              callback={() => {
                Auth.setToken(res.data.token);
                GLocalStorage.Add("task-pending", "#145210AH760AMP09");
                //--------------------
                console.log(res);
                let userAuth = [];
                userAuth.push({
                  name: res.data.firstname + " " + res.data.lastname,
                  email: res.data.email,
                  phone: res.data.phone,
                  role: res.data.usertype,
                  profileImage : res.data.profileimage,
                });
                userAuth.push({ otp: res.data.otp });
                userAuth.push({ ref: res.data._id });
                userAuth.push({ businesses: res.data.businesses || [] });
                Auth.setLoginAuth(userAuth);
                Auth.setToken(res.data.token);
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

          // AlertModal.show(
          //   "Regsitered successfully.",
          //   "Done",
          //   () => {
          //     Auth.setToken(res.data.token);
          //     GLocalStorage.Add("task-pending", "#145210AH760AMP09");
          //     //--------------------
          //     console.log(res);
          //     let userAuth = [];
          //     userAuth.push({
          //       name: res.data.firstname + " " + res.data.lastname,
          //       email: res.data.email,
          //       phone: res.data.phone,
          //       role: res.data.usertype,
          //     });
          //     userAuth.push({ otp: res.data.otp });
          //     userAuth.push({ ref: res.data._id });
          //     userAuth.push({ businesses: res.data.businesses || [] });
          //     Auth.setLoginAuth(userAuth);
          //     Auth.setToken(res.data.token);
          //     clearStates();
          //     OTPModal.show(
          //       "",
          //       otpmobile,
          //       handelVerifyOTP,
          //       () => {
          //         setloggedin(true);
          //       },
          //       handleResendOTP
          //     );
          //     // setTimeout(() => {
          //     //   if (res.data.usertype === "Customer") {
          //     //     GLocalStorage.Add("user-role", "Customer");
          //     //     setloggedin(true);
          //     //   } else if (res.data.usertype === "Provider") {
          //     //     GLocalStorage.Add("user-role", "Customer");
          //     //     switchToCustomer().then((res) => {
          //     //       GLocalStorage.Add("user-role", "Customer");
          //     //       setloggedin(true);
          //     //     });
          //     //   }
          //     // }, 1000);
          //     // setloggedin(true);
          //   },
          //   "sm"
          // );
        }
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      {gotoPage === "customer/dashboard" && (
        <Redirect to="/customer/dashboard" />
      )}
      {gotoPage === "provider/dashboard" && (
        <Redirect to="/provider/dashboard" />
      )}
      {loggedin && <Redirect to="/customer/dashboard" />}
      <div className="w-100 d-flex flex-column pt10 pr10 pl10">
        <p className="p-0 text-center">
          You are not logged in, Please login to your account. If you not have
          registered account please Signup.
        </p>
        <div className="d-flex flex-row  justify-content-center w-100 mb-3">
          <button
            onClick={(e) => {
              setgotoSignup(false);
              GLocalStorage.Add("task-pending", "#145210AH760AMP09");
            }}
            className={`btnTheme mr3 ${gotoSignup && "btnLightOrange"}`}
          >
            Login
          </button>
          <button
            onClick={(e) => {
              setgotoSignup(true);
              GLocalStorage.Add("task-pending", "#145210AH760AMP09");
            }}
            className={`btnTheme ${!gotoSignup && "btnLightOrange"}`}
          >
            Signup
          </button>
        </div>
        <div className="">
          <GCard
            direction="column"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.3)"
            className="p-3"
          >
            {!gotoSignup ? (
              <div className="loginTab">
                <CmnInput
                  label="Email *"
                  className=""
                  type="text"
                  name="email"
                  placeholder="Enter email or mobile number"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
                <div className="position-relative">
                  <CmnInput
                    label="Password *"
                    type={viewPassword ? "text" : "password"}
                    className=""
                    name="email"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <button
                    className="btnBlank eyeIcon"
                    onClick={(e) => togglePassword(!viewPassword)}
                  >
                    {viewPassword ? Svg.eyeCut : Svg.eye}
                  </button>
                </div>

                <div className="mt30">
                  <CmnButton
                    onClick={(e) => saveData()}
                    type="square"
                    text="log In"
                    className="w-100"
                  />
                </div>
              </div>
            ) : (
              <div className="signUpTab">
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

                  <div className="w-100 fs16 colorBlack mb-2">
                    Mobile Number<span className="colorRed">*</span>
                  </div>
                  <PhoneInput
                    country={"in"}
                    value={mobile}
                    placeholder="+91 90807-06050"
                    onChange={(e) => {
                      setmobile(e);
                      setotpmobile(e);
                    }}
                  />
                  <div className="w-100 fs12 d-none colorOrange mb-2 mt-1">
                    Country code must be entered.
                  </div>

                  <Col xl={12}>
                    <CmnInput
                      className=""
                      placeholder="Enter email"
                      label="Email *"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />

                    <div className="position-relative">
                      <CmnInput
                        className=""
                        placeholder="Enter password"
                        label="Password *"
                        type={viewpasswordsignup ? "text" : "password"}
                        value={passwordsignup}
                        onChange={(e) => setpasswordsignup(e.target.value)}
                      />
                      <button
                        className="btnBlank eyeIcon"
                        onClick={(e) =>
                          togglePasswordSignup(!viewpasswordsignup)
                        }
                      >
                        {viewpasswordsignup ? Svg.eyeCut : Svg.eye}
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
                        onClick={(e) =>
                          togglePasswordConfirm(!confviewPassword)
                        }
                      >
                        {confviewPassword ? Svg.eyeCut : Svg.eye}
                      </button>
                    </div>

                    <CmnCheckbox
                      id="agree"
                      label={`I agree to the ${<Link to="/termandcondition">Terms of Service</Link>} and ${<Link to="/privacypolicy">Privacy Policy</Link>}`}
                      value={agree}
                      onChange={(e) => setagree(e.target.checked)}
                    />

                    <div className="mt30">
                      <CmnButton
                        className={`w-100 ${agree ? "" : "g-disabled"}`}
                        type="square"
                        text="Create an Account"
                        onClick={(e) => saveDataSignup()}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </GCard>
        </div>
      </div>
    </>
  );
}

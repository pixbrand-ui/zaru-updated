import React, { useEffect, useState } from "react";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import Img from "../../../Assets/Img/Img";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import { Redirect, useHistory } from "react-router-dom";
import Auth from "../../../Helpers/Auth/Auth";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import FormModal from "../../../Components/FormModal/FormModal";

const SignIn = (props) => {
  const history=useHistory();
  const [viewPassword, setViewPassword] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [gotoPage, setgotoPage] = useState("");

  useEffect(() => {
    document.getElementById("emailid").focus();
  }, []);

  const togglePassword = (value) => {
    setViewPassword(value);
  };

  const clearStates = () => {
    setusername("");
    setpassword("");
    document.getElementById("emailid").focus();
  };

  const saveData = () => {
    try {
      if (username.trim().length <= 0) {
        return AlertModal.show(
          "Please enter user name.",
          "Oops!",
          () => {
            setTimeout(() => {
              document.getElementById("emailid").focus();
            }, 400);
          },
          "sm",
          false
        );
      }
      if (password.trim().length <= 0) {
        return AlertModal.show(
          "Please enter password.",
          "Oops!",
          () => {
            setTimeout(() => {
              document.getElementById("emailid").focus();
            }, 400);
          },
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
              setgotoPage("customer/dashboard");
            } else if (res.data.usertype === "Provider") {
              GLocalStorage.Add("user-role", "Provider");
              setgotoPage("provider/dashboard");
            }
            else if (res.data.usertype === "Admin") {
              GLocalStorage.Add("user-role", "Admin");
              history.push("admin");
            }
          }, 1000);
        } else if (res && res.status && res.status === 201) {
          AlertModal.show(res.message, "Oops!");
        } else {
          AlertModal.show(
            "Invalid credentials, Please check user & password.",
            "Oops!",
            () => {
              setTimeout(() => {
                document.getElementById("emailid").focus();
              }, 400);
            }
          );
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
      <div className="loginTab">
        <h2 className="f24 f700 colorBlack fBold mb30">Login Account</h2>

        <CmnInput
          label="Email *"
          className=""
          id="emailid"
          type="text"
          name="email"
          placeholder="Enter email"
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
            {viewPassword ? Svg.eye : Svg.eyeCut}
          </button>
        </div>

        <div className="d-flex align-items-center flex-wrap justify-content-between">
          <div>
            {/* <CmnCheckbox id="remember" label="Remember me" /> */}
          </div>

          <div>
            <button
              className="f16 colorOrange btnBlank"
              onClick={(e) =>
                FormModal.show(
                  <Forgot callback={props.callback} />,
                  "Forgot Password",
                  () => {},
                  "md"
                )
              }
            >
              Forgot Password
            </button>
          </div>
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
    </>
  );
};
export default SignIn;

const Forgot = (props) => {
  const [formdata, setformdata] = useState({
    email: "",
    redirecturl: API.productionurl + "reset/",
  });

  const IsSignup = () => {
    props.callback(false);
    FormModal.hide();
  };

  const ifSuccessForget = () => {
    try {
      if (formdata.email.trim() === "") {
        return AlertModal.show(
          "Please enter your email id.",
          "Required!",
          () => {},
          "sm"
        );
      }
      HTTP.post(API.forgotPasswordByEmail, formdata, false, false, "").then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            AlertModal.show(
              <ForgotSuccessText email={formdata.email} />,
              "Success!",
              () => {},
              "md",
              false
            );
            FormModal.hide();
          } else {
            AlertModal.show(
              "User not found, Please register with this email id.",
              "Oops!",
              () => {},
              "sm",
              false
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-3">
        <p className="fs16">
          enter the email address associated with your account and we'll send
          you a link to reset your password.
        </p>

        <CmnInput
          type="email"
          placeholder="Email Address"
          value={formdata.email}
          onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
        />
        <CmnButton
          text="Submit"
          type="square"
          className="w-100"
          onClick={(e) => ifSuccessForget()}
        />
        <div className="IfNotAccount text-center mt20">
          <p className="fs16 mb0">
            Don't have an account ?
            <button className="btnBlank colorOrange" onClick={() => IsSignup()}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

const ForgotSuccessText = (props) => {
  return (
    <>
      <div className="text-center">
        <img className="img-fluid" src={Img.success.default} alt="" />
        <h2 className="f24 f700 colorBlack fBold mb30">Mail Sent</h2>
        <p className="fs14">
          Change password link has been sent to {props.email}
        </p>

        <p className="fs16 colorOrange">
          Please check your inbox or spam. <br /> Sometimes mail goes to spam.
        </p>
      </div>
    </>
  );
};

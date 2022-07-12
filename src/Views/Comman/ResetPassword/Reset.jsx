/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";

const Reset = (props) => {
  const { ticket } = useParams();
  const [gotopage, setgotopage] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
  const [formdata, setformdata] = useState({
    password: "",
    confirmpassword: "",
    userticket: ticket,
  });

  const togglePassword = (value, key) => {
    if (key === "confirmPassword") {
      setviewConfirmPassword(value);
    } else {
      setViewPassword(value);
    }
  };

  const saveData = () => {
    try {
      if (formdata.password.trim() === "") {
        return AlertModal.show(
          "Please enter new password",
          "Required!",
          () => {},
          "sm"
        );
      }
      if (formdata.confirmpassword.trim() === "") {
        return AlertModal.show(
          "Please re-enter password",
          "Required!",
          () => {},
          "sm"
        );
      }
      if (formdata.password.trim() !== formdata.confirmpassword.trim()) {
        return AlertModal.show(
          "New password not matched with re-entered password.",
          "Required!",
          () => {},
          "sm"
        );
      }
      HTTP.post(
        API.changePasswordByToken,
        { password: formdata.password },
        true,
        false,
        ticket
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          AlertModal.show(
            <RestMsg />,
            "Success!",
            () => {
              setformdata({
                password: "",
                confirmpassword: "",
                userticket: ticket,
              });
              setgotopage("login");
            },
            "xs"
          );
        } else {
          return AlertModal.show(
            "This password link has expired. Please re-use forget password to get new link.",
            "Expired!",
            () => {},
            "sm"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bgOrange otpSection text-center bgLightOrange pt80 pb80 mobPt40 mobPb40">
      {gotopage === "login" && <Redirect to="/login" />}
      <Container>
        <div className="otpWrapper pt40 pb40 radius bgWhite width50 mobWidth100 mx-auto pl40 pr40">
          <div className="otpText w-100 mb30">
            <h2 className="f24 fBold mb20">Reset Password</h2>
            <p className="paraColor fs18">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
          </div>

          <CmnInput
            label="New Password *"
            type={viewPassword ? "text" : "password"}
            placeholder="New Password"
            icon={viewPassword ? Svg.eye : Svg.eyeCut}
            onClick={(e) => togglePassword(!viewPassword, "password")}
            validationText=""
            value={formdata.password}
            onChange={(e) =>
              setformdata({ ...formdata, password: e.target.value })
            }
          />

          <CmnInput
            label="Re-Enter New Password *"
            type={viewConfirmPassword ? "text" : "password"}
            placeholder="Re-Enter New Password"
            icon={viewConfirmPassword ? Svg.eye : Svg.eyeCut}
            onClick={(e) =>
              togglePassword(!viewConfirmPassword, "confirmPassword")
            }
            value={formdata.confirmpassword}
            onChange={(e) =>
              setformdata({ ...formdata, confirmpassword: e.target.value })
            }
          />

          <CmnButton
            onClick={(e) => saveData()}
            type="square"
            text="Reset Password"
            className="w-100"
          />
        </div>
      </Container>
    </section>
  );
};

export default Reset;

const RestMsg = () => {
  return (
    <>
      <div className="text-center pb30">
        <div className="mb15">
          <img src={Img.tick.default} alt="" />
        </div>

        <h2 className="f24 f700 colorBlack fBold mb15">Password Changed!</h2>
        <p className="paraColor fs18">
          Your password has been changed successfully.
        </p>

        <Link
          to="/login"
          className="btnTheme f18"
          onClick={(e) => AlertModal.hide()}
        >
          Back to log In
        </Link>
      </div>
    </>
  );
};

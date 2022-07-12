import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import CustomerAccountAside from "../CustomerAccountAside/CustomerAccountAside";

const CustomerChangePassword = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [confviewPassword, setConfviewPassword] = useState(false);
  const [confviewNewPassword, setConfviewNewPassword] = useState(false);

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");

  const togglePassword = (value) => {
    setViewPassword(value);
  };

  const togglePasswordConfirm = (value) => {
    setConfviewPassword(value);
  };

  const togglePasswordNewConfirm = (value) => {
    setConfviewNewPassword(value);
  };

  const clearStates = () => {
    setcurrentPassword("");
    setnewPassword("");
    setconfirmNewPassword("");
    setViewPassword(false);
    setConfviewPassword(false);
    setConfviewNewPassword(false);
  };

  const saveData = () => {
    try {
      if (currentPassword.trim().length <= 0) {
        return AlertModal.show(
          "Invalid current password. Please check it.",
          "Oops!"
        );
      }
      if (newPassword.trim().length <= 0) {
        return AlertModal.show("Please enter new password", "Oops!");
      }
      if (confirmNewPassword.trim().length <= 0) {
        return AlertModal.show("Please confirm new password", "Oops!");
      }
      if (currentPassword === confirmNewPassword) {
        return AlertModal.show(
          "Current password and confirm password should not match, Please re-check it.",
          "Oops!"
        );
      }
      if (confirmNewPassword !== newPassword) {
        return AlertModal.show(
          "New password and confirm password mismatch, Please check it.",
          "Oops!"
        );
      }
      const iData = {
        oldpassword: currentPassword,
        password: newPassword,
      };
      HTTP.post(
        API.changePasswordAuth,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          AlertModal.show(`Your password changed successfully.`, "Success");
          clearStates();
        } else {
          return AlertModal.show(
            "Invalid current password. Please check it.",
            "Wrong password!"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <CustomerAccountAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <h3 className="fs28 fBold">Change Password</h3>
              <section className="bgWhite radius mb30 border">
                <div className="pt20 pb20 pl30 pr30">
                  <h3 className="fs18 colorBlack mb0">Change Password</h3>
                </div>
                <div className="bBottom"></div>
                <div className="pt20 pb20 pl30 pr30">
                  <div className="position-relative">
                    <CmnInput
                      label="Current Password *"
                      type={viewPassword ? "text" : "password"}
                      className=""
                      name="email"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setcurrentPassword(e.target.value)}
                    />
                    <button
                      className="btnBlank eyeIcon"
                      onClick={(e) => togglePassword(!viewPassword)}
                    >
                      {viewPassword ? Svg.eyeCut : Svg.eye}
                    </button>
                  </div>
                  <div className="position-relative">
                    <CmnInput
                      label="New Password *"
                      type={confviewPassword ? "text" : "password"}
                      className=""
                      name="email"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setnewPassword(e.target.value)}
                    />
                    <button
                      className="btnBlank eyeIcon"
                      onClick={(e) => togglePasswordConfirm(!confviewPassword)}
                    >
                      {confviewPassword ? Svg.eyeCut : Svg.eye}
                    </button>
                  </div>
                  <div className="position-relative">
                    <CmnInput
                      label="Confirm New Password *"
                      type={confviewNewPassword ? "text" : "password"}
                      className=""
                      name="email"
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setconfirmNewPassword(e.target.value)}
                    />
                    <button
                      className="btnBlank eyeIcon"
                      onClick={(e) =>
                        togglePasswordNewConfirm(!confviewNewPassword)
                      }
                    >
                      {confviewNewPassword ? Svg.eyeCut : Svg.eye}
                    </button>
                  </div>
                </div>
              </section>
              <div className="d-flex justify-content-end">
                <CmnButton
                  type="square"
                  text="Change Password"
                  className=""
                  onClick={(e) => saveData()}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CustomerChangePassword;

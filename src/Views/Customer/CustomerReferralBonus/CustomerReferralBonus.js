import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CustomerAccountAside from "../CustomerAccountAside/CustomerAccountAside";
import "./CustomerReferralBonus.scss";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { TagsInput } from "react-tag-input-component";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import $ from 'jquery';

const CustomerReferralBonus = () => {
  const [dataState, setdataState] = useState({
    email: [],
    subject: "",
    message: "",
  });

  const clearState = (e) => {
  
    
   
    setdataState({
      ...dataState,
      email: [],
      subject: "",
      message: "",
    });
    //$(".rti--container > span").remove();
  };

  const onSubmit = () => {
    try {
      if (dataState.email.length === 0) {
        return AlertModal.show(
          "Please fill email field",
          "Fill Required Fields"
        );
      }
      if (dataState.subject.trim().length === 0) {
        return AlertModal.show(
          "Please fill subject field",
          "Fill Required Fields"
        );
      }
      if (dataState.message.trim() === "") {
        return AlertModal.show(
          "Please fill message field",
          "Fill Required Fields"
        );
      }
      if (dataState.message.trim().length < 10) {
        return AlertModal.show(
          "Please fill more than 10 characters",
          "Fill Required Fields"
        );
      }

      HTTP.post(
        API.referralBonusEmail,
        dataState,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          AlertModal.show(
            "Your mail has been sent successfully",
            "Success Message",
            () => {},
            "md"
          );
        }
      });
    } catch (e) {
      console.log(e, "Error in the Customer referral bonus");
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
              <section className="bgWhite radius mb30 border">
                <div className="bgGreen pl30 pb20 pr30 mb30 radiusTop">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h1 className="fs32 fBold colorWhite crb-head">
                        Refer Friends & Earn Credit
                      </h1>
                      <p className="fs16 colorWhite mb0 crb-para">
                        Introduce a friend to Bluebis and you'll be credited
                        $100 to your account
                      </p>
                    </div>
                    <div className="position-relative badge-mb">
                      <span className="credit-badge-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="138"
                          height="137"
                          viewBox="0 0 138 137"
                        >
                          <g
                            id="Group_54206"
                            data-name="Group 54206"
                            transform="translate(-1118 -130)"
                          >
                            <path
                              id="Path_24191"
                              data-name="Path 24191"
                              d="M0,0H138V113a4,4,0,0,1-4,4L69.787,137,4,117a4,4,0,0,1-4-4Z"
                              transform="translate(1118 130)"
                              fill="#20272b"
                            />
                            <g
                              id="Group_52757"
                              data-name="Group 52757"
                              transform="translate(1150 166)"
                            >
                              <text
                                id="R100"
                                transform="translate(37 28)"
                                fill="#fff"
                                fontSize="32"
                                fontFamily="SFProDisplay-Medium, SF Pro Display"
                                fontWeight="500"
                              >
                                <tspan x="-37.047" y="0">
                                  R100
                                </tspan>
                              </text>
                              <text
                                id="Credit"
                                transform="translate(12 55)"
                                fill="#fff"
                                fontSize="20"
                                fontFamily="SFProDisplay-Regular, SF Pro Display"
                              >
                                <tspan x="0" y="0">
                                  Credit
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </svg>
                      </span>
                      {/* <div className="credit-badge-content text-center">
                        <h1 className="fs32 colorWhite crb-badge-head">R100</h1>
                        <h3 className="fs20 colorWhite crb-para">Credit</h3>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="pl30 pb20 pr30">
                  <div className="mb12">
                    <label htmlFor="tagID" className="mb7">
                      Enter Email Addresses Manually
                    </label>
                    {dataState.email}
                    <TagsInput
                      id="tagID"
                      value={dataState.email}
                      onChange={(e) =>
                        setdataState({
                          ...dataState,
                          email: e,
                        })
                      }
                      name="multiEmails"
                      placeHolder="Enter Email Address and press enter key"
                      className="w-100 inputTransparent  outlineNone"
                    />
                  </div>

                  <CmnInput
                    className="bgLightOrange colorPara"
                    label="Subject"
                    type="text"
                    placeholder="Robin Rathore  wants you to join BlueBis"
                    value={dataState.subject}
                    onChange={(e) =>
                      setdataState({
                        ...dataState,
                        subject: e.target.value,
                      })
                    }
                  />
                  <CmnTextarea
                    className="heightVh60 colorPara bgLightOrange"
                    label="Message "
                    placeholder="Robin Rathore thinks that Zaaruu  would be a great way for you to find new customers."
                    value={dataState.message}
                    onChange={(e) =>
                      setdataState({
                        ...dataState,
                        message: e.target.value,
                      })
                    }
                  />
                  <p className="fs14">
                    Note: Each person will receive a separate email. This is not
                    a group email.
                  </p>
                  <div className="d-flex justify-content-end">
                    <CmnButton
                      onClick={(e) => clearState(e)}
                      type="noBg"
                      text="Reset"
                      className="mr10 btnTransparentBlack radius pl25 pr25"
                    />
                    <CmnButton
                      onClick={onSubmit}
                      type="square"
                      text="Send Invite"
                      className=""
                    />
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CustomerReferralBonus;

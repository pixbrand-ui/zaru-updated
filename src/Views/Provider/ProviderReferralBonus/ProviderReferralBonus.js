import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import ProAside from "../ProviderProfile/ProAside";
import "./ProviderReferralBonus.scss";
import { TagsInput } from "react-tag-input-component";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal from "../../../Components/AlertModal/AlertModal";

const ProviderReferralBonus = () => {
  const [refer, setrefer] = useState({
    email: [],
    subject: "",
    message: "",
  });


  const saveData=()=>{
    try{
     const iData= {
        "email" : refer.email,
        "subject" : refer.subject,  
        "message" : refer.message
    }
    if(refer.email.length === 0){
       return AlertModal.show("Please fill email field","Fill Required Fields");
    }
    if(refer.subject.trim().length === 0){
      return AlertModal.show("Please fill subject field","Fill Required Fields");
    }
    if(refer.message.trim()===""){
      return AlertModal.show("Please fill message field","Fill Required Fields");
    }
    if(refer.message.trim().length < 10){
      return AlertModal.show("Please fill more than 10 characters","Fill Required Fields");
    }
    HTTP.post(API.referralBonusEmail,iData,true,false,Auth.getToken()).then((res)=>{
      console.log("res",res);
      if(res && res.status && res.status===200){

        return AlertModal.show("Your mail has been sent.","Success!");

      }
      else if(res && res.status && res.status===201){
        return AlertModal.show("Please enter proper email","Oops!");
      }
    })
    }catch(e){
      console.log(e,"error in referal bonus page")
    }
  }

  return (
    <div>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProAside />
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
                    </div>
                  </div>
                </div>
                <div className="pl30 pb20 pr30">
                  <div className="mb15 position-relative">
                    <label className="fs16 mb7">
                    Enter Email Addresses Manually
                    </label>
                    <TagsInput
                      value={refer.email}
                      onChange={(e) => setrefer({ ...refer, email: e })}
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
                    value={refer.subject}
                    onChange={(e) =>
                      setrefer({ ...refer, subject: e.target.value })
                    }
                  />
                  <CmnTextarea
                    className="heightVh60 colorPara bgLightOrange"
                    label="Message "
                    placeholder="Robin Rathore thinks that Zaaruu  would be a great way for you to find new customers."
                    value={refer.message}
                    onChange={(e) =>
                      setrefer({ ...refer, message: e.target.value })
                    }
                  />
                  <p className="fs12" style={{color: 'orange'}}>Please describe your task. (Minimum 10 character. and Maximum 2000 characters)</p>
                  <p className="fs14">
                    Note: Each person will receive a separate email. This is not
                    a group email.
                  </p>
                  <div className="d-flex justify-content-end">
                    <CmnButton
                      type="noBg"
                      text="Cancel"
                      className="mr10 btnTransparentBlack radius pl25 pr25"
                    />
                    <CmnButton onClick={e=>saveData()} type="square" text="Send Invite" className="" />
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

export default ProviderReferralBonus;

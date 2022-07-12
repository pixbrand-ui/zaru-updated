import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BusinessAside from "../BusinessAside/BusinessAside";
import { Svg } from "../../../Assets/Svgs/Svg";
import "./BusinessReviews.scss";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import { Redirect } from "react-router-dom";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { TagsInput } from "react-tag-input-component";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";

const BusinessReviews = () => {

  const [refer, setrefer] = useState({
    email: [],
    subject: "",
    message: "",
    gotoPage: ""
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
        GLocalStorage.Remove("c-bref");
        return AlertModal.show(
          <ZaruPro />,"",() => {
            setrefer({gotoPage: "provider/dashboard" })}, "xs"
        )
        //return AlertModal.show("Your mail has been sent.","Success!");

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
      {refer.gotoPage === "provider/dashboard" && (
        <Redirect to="/provider/dashboard" />

      )}
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={3} xl={3}>
              <BusinessAside />
            </Col>
            <Col lg={9} md={9} xl={9}>
              <h3 className="fs24 colorBlack fBold mb30">Reviews</h3>
              <section className="bgWhite radius mb30 border">
                <div className="bgGreen mb30">
                  <div className="d-flex align-items-center justify-content-between pl30 pr30 pt30 pb30">
                    <h1 className="fs32 fBold colorWhite reviews-head">
                      Request reviews from your customers for business
                    </h1>
                    <div className="reviews-head-svg">{Svg.yellowStar}</div>
                  </div>
                </div>
                <div className="pl30 pr30">
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
                  <p className="fs14 colorPara">
                    Note: Each person will receive a separate email. This is not
                    a group email.
                  </p>

                  <div className="d-flex justify-content-end mb35">
                    <CmnButton
                      type="noBg"
                      text="Skip"
                      className="mr10 bgLightOrange pl30 pr30 radius borderGrey"
                      onClick={() =>
                        AlertModal.show(
                          <ZaruPro />,
                          "",
                          () => {
                            setrefer({ gotoPage: "provider/dashboard" })
                          },
                          "xs"
                        )
                      }
                    />
                    <CmnButton
                      type="square"
                  
                      onClick={() =>
                      saveData()
                      }
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

export default BusinessReviews;

const ZaruPro = () => {
  return (
    <>
      <section className="text-center">
        <div className="mb20">{Svg.circleCheckedBlank}</div>
        <h4 className="fBold fs20 colorBlack">
          Congratulations! You are now a Zaaru pro!
        </h4>
        <p>
          You will now start to receive job opportunities that match your
          profile. Pick the jobs that you want and start winning customers!
        </p>
      </section>
    </>
  );
};

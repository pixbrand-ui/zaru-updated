import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import CustomerAccountAside from "../CustomerAccountAside/CustomerAccountAside";
import "./CustomerSupport.scss";
import CmnAccordian from "../../../Components/CmnAccordian/CmnAccordian";
import { useEffect } from "react";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";

const CustomerSupport = () => {
  const [showProgress, setshowProgress] = useState(false);
  const [contactInfo, setcontactInfo] = useState([]);
  const [faqData, setfaqData] = useState([]);

  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [company, setcompany] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  useEffect(() => {
    loadData();
    loadFaq();
  }, []);

  const loadData = () => {
    setshowProgress(true);
    try {
      HTTP.get(API.getsupportInfo,false, Auth.getToken()).then(
        (res) => {
          
          if (res && res.status && res.status.toString() === "200") {
            
            if (res.data) {
              setcontactInfo(res.data);
              setshowProgress(false);
            }
          } else {
            setshowProgress(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  const loadFaq = () => {
    setshowProgress(true);
    try {
      HTTP.get(API.getCustomerFaqs,false, Auth.getToken()).then(
        (res) => {
          
          if (res && res.status && res.status.toString() === "200") {
            
            if (res.data) {
              setfaqData(res.data);
              setshowProgress(false);
            }
          } else {
            setshowProgress(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  const clearStates = () => {
    setname("");
    setmobile("");
    setcompany("");
    setemail("");
    setmessage("");
    document.getElementById("query_name").focus();
    return;
  };

  const submitQuery = () => {
    try {
      if (name.trim().length <= 0) {
        AlertModal.show("Name is required.", "Oops!");
        document.getElementById("query_name").focus();
        return;
      }
      if (mobile.trim().length <= 0) {
        AlertModal.show("Please enter your Mobile no.", "Oops!");
        document.getElementById("query_mobile").focus();
        return;
      }
      if (email.trim().length <= 0) {
        AlertModal.show("Email address is required.", "Oops!");
        document.getElementById("query_email").focus();
        return;
      }
      if (message.trim().length <= 49) {
        AlertModal.show(
          "Please enter your message. it should be at least 50 charcter long.",
          "Oops!"
        );
        document.getElementById("query_message").focus();
        return;
      }
      const iData = {
        email: email,
        phone: mobile,
        name: name,
        message: message,
        company: company,
      };
      HTTP.post(API.submitQuery, iData, false, false, "").then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          clearStates();
          AlertModal.show(
            "Message submitted successfully. Our team respond you soon.",
            "Success"
          );
        } else {
          AlertModal.show(
            "There is some issue to submit your message, Please try after some time.",
            "Oops!"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <CustomerAccountAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
             
              <h3 className="fs28 fBold mb15">Contact Us</h3>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Retrieving contact details.." />
                </div>
              )}
              {!showProgress && (
                <section className="bgWhite radius mb30">
                  <div className="pt30 pb10 pl30 pr30">
                    <Row>
                      <Col lg={4}>
                        <div className="text-center">
                          <span>{Svg.cs_phone}</span>
                          <p className="fs20 colorBlack mb7 mt10">Telephone</p>
                          <p className="fs16">
                            <a href="tel:+1 9876 543 210" className="colorPara">
                              {contactInfo.telephone}
                            </a>
                          </p>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="text-center">
                          <span>{Svg.cs_email}</span>
                          <p className="fs20 colorBlack mb7 mt10">Email</p>
                          <p className="fs16">
                            <a
                              href="mailto:support@zaaruu.co.za"
                              className="colorPara"
                            >
                              {contactInfo.email}
                            </a>
                          </p>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="text-center">
                          <span>{Svg.cs_location}</span>
                          <p className="fs20 colorBlack mb7 mt10">
                            Physical Address
                          </p>
                          <p className="fs16">{contactInfo.address}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </section>
              )}
              <h3 className="fs28 fBold mb15">Help</h3>
              <section className="bgWhite radius mb30 ">
                    <CmnAccordian data={
                      faqData && faqData.map((elem)=>{
                        return(
                         {
                          title: elem.question,
                          content: elem.answer
                         }
                        );
                       
                      })
                    }
                ></CmnAccordian>

              </section>

              <section className="bgWhite radius pb30 border">
                <div className="bgOrange pt30 pl30 pr30 pb30 mb30">
                  <div className="d-flex align-items-center justify-content-between">
                    <h1 className="fs32 mb0 fw600 colorWhite cs_que_head">
                      Any Queries? <br />
                      Send us an email by filling in this form
                    </h1>
                    <span className="cs_que">{Svg.cs_que}</span>
                  </div>
                </div>
                <div className="pl30 pr30">
                  <h3 className="fs22 colorBlack">Your Details</h3>
                  <Row>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        id="query_name"
                        type="text"
                        placeholder="Your Name *"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </Col>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        id="query_mobile"
                        type="number"
                        placeholder="Mobile Number *"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        id="query_company"
                        type="text"
                        placeholder="Your Company Name (Optional)"
                        value={company}
                        onChange={(e) => setcompany(e.target.value)}
                      />
                    </Col>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        id="query_email"
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <CmnTextarea
                    className="heightVh20 colorPara "
                    label="Message "
                    id="query_message"
                    placeholder="Write your message here. message should be at least 50 characters."
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                  />
                  <p className="fs12 colorOrange">
                    Please describe your query/message. (Minimum 50 character.
                    and Maximum 2000 characters)
                  </p>
                  <div className="d-flex justify-content-end">
                    <CmnButton
                      type="square"
                      text="Submit"
                      className=""
                      onClick={(e) => submitQuery()}
                    />
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomerSupport;

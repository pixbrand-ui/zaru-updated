/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BusinessAside from "../BusinessAside/BusinessAside";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "./BusinessMedia.scss";
import CmnFileUpload from "../../../Components/CmnFileUpload/CmnFileUpload";
import { Svg } from "../../../Assets/Svgs/Svg";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BusinessMedia = () => {
  const location = useLocation();
  const [gotoPage, setgotoPage] = useState("");
  const [formMode, setformMode] = useState("insert");
  const [showProgress, setshowProgress] = useState(false);
  const [bLogo, setBLogo] = useState(null);
  const [multiImg, setmultiImg] = useState([]);
  const [gotonext, setgotonext] = useState(false);

  useEffect(() => {
    if (location.state && location.state.refid) {
      loadData().then((res) => {
        if (res) {
          // here
          console.log("On load : ", res);
          setformMode("update");
        }
        setshowProgress(false);
      });
    } else {
      setformMode("insert");
    }
  }, []);

  const getUploadedImgState = (data) => {
    console.log("dddd",data);
    if (data !== null) {
      setmultiImg(data);
    }
  };

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.get(
          API.getBusinessInfo + location.state.refid,
          false,
          Auth.getToken()
        ).then((res) => {
          console.log("data on load", res);
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
            return result;
          } else {
            result = null;
            setshowProgress(false);
            return result;
          }
        });
      }
    } catch (error) {
      console.error(error);
      setshowProgress(false);
    }
    return result;
  };

  const saveData = () => {
    try {
      const iData = new FormData();
      iData.append("logoimage", bLogo);

      if (multiImg.length > 0) {
        multiImg.forEach((f, i) => {
          console.log("loop", f.file);
          iData.append("demoworks", f.file);
        });
      } else {
        iData.append("demoworks", []);
      }

      const businessID = JSON.parse(GLocalStorage.Get("c-bref"));
      const completeUrl = API.businessUploadDemo + businessID;
      HTTP.put(completeUrl, iData, true, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          setgotonext(true);
        }
      });
    } catch (e) {
      console.log(e, "Business Media");
    }
  };
  return (
    <div>
      {gotonext && <Redirect to="/business/business-location"></Redirect>}
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={3} xl={3}>
              <BusinessAside />
            </Col>
            <Col lg={9} md={9} xl={9}>
              <h3 className="fs24 colorBlack fBold mb30">Reviews</h3>
              <section className="bgWhite pt30 pb30 radius mb30 border">
                <div className="pl30 pr30">
                  <h3 className="fs20 colorBlack">Business Logo</h3>
                  <p className="fs16 mb30">
                    You want new customers fast. So we made it easy and It is a
                    long established fact that a reader will be distracted by
                    the readable content of a page .
                  </p>

                  <div className="text-center ">
                    {bLogo !== null && (
                      <div className="mb20 w128 h128 d-flex align-items-center flex-wrap justify-content-center mx-auto">
                        <img
                          src={URL.createObjectURL(bLogo)}
                          alt=""
                          className="radius100 img-fluid height100"
                        />
                      </div>
                    )}

                    <div className="d-flex align-items-center flex-wrap justify-content-center mb30">
                      <label
                        htmlFor="busLogo"
                        className="d-flex align-items-center flex-wrap justify-content-center flex-column"
                      >
                        {bLogo === null && (
                          <div className="pointer busLogoLabel d-flex align-items-center flex-wrap justify-content-center radius100 mb20">
                            {Svg.plus}
                          </div>
                        )}

                        <input
                          type="file"
                          name="busLogo"
                          id="busLogo"
                          className="busLogo d-none"
                          accept="image/*"
                          onChange={(e) => setBLogo(e.target.files[0])}
                        />
                        <div className="pointer uploadBlack btnTheme btnBlack d-flex align-items-center flex-wrap  radius100">
                          {bLogo === null ? (
                            <span className="mr15"> {Svg.upload}</span>
                          ) : (
                            ""
                          )}
                          <span> {bLogo === null ? "Upload" : "Change"}</span>
                        </div>
                      </label>
                    </div>

                    <h3 className="fs18 colorBlack mb10 fBold">
                      Tips for a high quality profile picture:
                    </h3>
                    <p className="fs16 width70 mx-auto mb20 b-media-para">
                      Check that the photo is good enough and make sure your
                      face is visible. We will then verify your photo.
                    </p>

                    <div className="d-flex width40 mx-auto justify-content-between mb20 b-media-center-img">
                      <div className="">
                        <img
                          src={Img.bl1.default}
                          alt=""
                          className="radius100 w128"
                        />
                      </div>
                      <div className="">
                        <img
                          src={Img.bl2.default}
                          alt=""
                          className="radius100 w128"
                        />
                      </div>
                      <div className="">
                        <img
                          src={Img.bl3.default}
                          alt=""
                          className="radius100 w128"
                        />
                      </div>
                    </div>
                    <p className="fs16">Examples providers</p>
                  </div>
                </div>
                <div className="bBottom mb20"></div>
                <div className="pl30 pr30">
                  <h3 className="fs20 colorBlack mb20">
                    Upload Demos of Your Work
                  </h3>
                  <p className="fs16">
                    Seeing is believing show off you skills and win customers
                    trust.
                  </p>

                  <CmnFileUpload callback={getUploadedImgState} />
                  <div className="d-flex justify-content-end mt20">
                    <CmnButton
                      onClick={() => saveData()}
                      type="square"
                      text="Continue"
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

export default BusinessMedia;

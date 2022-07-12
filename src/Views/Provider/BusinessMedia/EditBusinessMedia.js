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
import GAlign from "../../../Components/GComponents/GAlign";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import { useParams } from "react-router-dom";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import GImage from "../../../Components/GImage/GImage";

const EditBusinessMedia = () => {
  const { refid } = useParams();
  const [showProgress, setshowProgress] = useState(true);
  const [dataImg, setdataImg] = useState("");
  const [bLogo, setBLogo] = useState(null);
  const [logo, setLogo] = useState({
    file: null,
    url: null,
  });
  const [multiImg, setmultiImg] = useState([]);
  const [gotonext, setgotonext] = useState(false);

  useEffect(() => {
    //console.log(refid);
    if (refid) {
      loadData().then((res) => {
        if (res) {
          setdataImg(res);
          if (res.logoimage) {
            setLogo({ ...logo, url: API.imageurl + res.logoimage });
          }
        }
        setshowProgress(false);
      });
    }
  }, []);

  const getUploadedImgState = (data) => {
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
          API.getBusinessInfo + refid,
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
      iData.append("logoimage", logo.file);

      if (multiImg.length > 0) {
        multiImg.forEach((f, i) => {
          console.log("loop", f.file);
          iData.append("demoworks", f.file);
        });
      } else {
        iData.append("demoworks", []);
      }

      const completeUrl = API.businessUploadDemo + refid;
      HTTP.put(completeUrl, iData, true, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          AlertModal02.show(
            "Business logo and works demo updated successfully.",
            "Success!"
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-2">
      <Row>
        <Col lg={12} md={12} xl={12}>
          <GAlign align="between" className="mb-2">
            <h3 className="fs24 colorBlack fBold">Edit Logo and Work Info</h3>
            <CmnButton
              type="square"
              onClick={(e) => saveData()}
              text="Update"
            />
          </GAlign>

          {showProgress && (
            <div className="pageBody">
              <LoadinMsg message="Please wait" />
            </div>
          )}
          {!showProgress && (
            <div className="bgWhite radius pt30 pb30 border">
              <div className="pl30 pr30">
                <h3 className="fs20 colorBlack">Business Logo</h3>
                <p className="fs16 mb30">
                  You want new customers fast. So we made it easy and It is a
                  long established fact that a reader will be distracted by the
                  readable content of a page .
                </p>

                <div className="text-center ">
                  {logo.url !== null && (
                    <div className="mb20 w128 h128 d-flex align-items-start flex-wrap justify-content-start mx-auto">
                      <img
                        src={logo.url}
                        alt=""
                        className="radius100 img-fluid height100 w128"
                      />
                    </div>
                  )}

                  <div className="d-flex align-items-center flex-wrap justify-content-center mb30">
                    <label
                      htmlFor="busLogo"
                      className="d-flex align-items-center flex-wrap justify-content-center flex-column"
                    >
                      {logo.url === null && (
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
                        onChange={(e) =>
                          setLogo({
                            file: e.target.files[0],
                            url: URL.createObjectURL(e.target.files[0]),
                          })
                        }
                      />
                      <div className="pointer uploadBlack btnTheme btnBlack d-flex align-items-center flex-wrap  radius100">
                        <span className="mr15"> {Svg.upload}</span>
                        <span>Change</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bBottom mb20"></div>
              <div className="pl30 pr30">
                <Row className="mb20">
                  {dataImg &&
                    dataImg.files.map((elem, ind) => {
                      return (
                        <Col>
                          <GImage radius="5px" src={API.imageurl+elem} />
                        </Col>
                      );
                    })}
                </Row>

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
                    text="Update"
                    className=""
                  />
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EditBusinessMedia;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CustomerAccountAside from "../CustomerAccountAside/CustomerAccountAside";

import DatePicker from "react-datepicker";
import "./CustomerAccountProfile.scss";
import Img from "../../../Assets/Img/Img";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnRadioBorder from "../../../Components/CmnRadioBorder/CmnRadioBorder";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import { useDispatch } from "react-redux";
// import { ReloadLoginAuth } from "../../../Store/CommonActions/CommonActions";

const CustomerAccountProfile = (props) => {
  const [showProgress, setshowProgress] = useState(false);
  const [profileImg, setprofileImg] = useState(null);
  const [profileImage, setprofileImage] = useState({
    file: null,
    objectUrl: null,
  });
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setmobile] = useState("");
  const [mobileverified, setmobileverified] = useState("");
  const [email, setemail] = useState("");
  const [emailverified, setemailverified] = useState("");
  const [gender, setgender] = useState("Male");
  const [dob, setdob] = useState(Date.now());
  const [terms, setterms] = useState(false);
  const [userdata, setuserdata] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setshowProgress(true);
    try {
      HTTP.get(API.getUserInfo, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          //console.log("Profile res: ", res);
          if (res.data) {
            // dispatch(ReloadLoginAuth(res.data));
            setuserdata(res.data);
            // now load states according to data;
            setfirstName(res.data.firstname);
            setlastName(res.data.lastname);
            setmobile(res.data.phone);
            setemail(res.data.email);
            setgender(res.data.gender || "Male");
            setdob(res.data.dob ? new Date(res.data.dob) : Date.now());
            setmobileverified(res.data.phoneverified);
            setemailverified(res.data.emailverified);
            setterms(res.data.showoffer);
            setprofileImg(res.data.profileImage || null);
            setprofileImage({
              ...profileImage,
              objectUrl: API.imageurl + res.data.profileimage,
            });
          }
          setshowProgress(false);
        } else {
          setshowProgress(false);
        }
      });
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  const updateImage = (file) => {
    try {
      var iData = new FormData();
      iData.append("profile", file);
      HTTP.post(
        API.updateProfileImage,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        //console.log("res", res);
        if (res && res.status) {
          if (res.status === 200) {
            loadData();
            AlertModal.show("Profile image updated sucessfully.", "Success!");
          } else if (res.status === 201) {
            console.log("error : ", res.message);
          }
        }
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const saveData = () => {
    try {
      if (firstName.trim().length <= 0) {
        return AlertModal.show("First name is required.", "Oops!");
      }
      if (lastName.trim().length <= 0) {
        return AlertModal.show("Last name is required.", "Oops!");
      }
      if (lastName.trim().length <= 0) {
        return AlertModal.show("Last name is required.", "Oops!");
      }
      if (email.trim().length <= 0) {
        return AlertModal.show("Email id is required.", "Oops!");
      }

      const iData = {
        firstname: firstName,
        lastname: lastName,
        email: userdata.email,
        phone: userdata.phone,
        gender: gender,
        dob: `${new Date(dob).getFullYear()}-${
          new Date(dob).getMonth().toString().length === 1 ? "0" : ""
        }${new Date(dob).getMonth() + 1}-${new Date(dob).getDate()}`,
        showoffer: terms,
      };
      HTTP.post(
        API.updateUserAccount,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          loadData();
          AlertModal.show(
            `${userdata.firstname} ${userdata.lastname} your account has updaetd successfully.`,
            "Success"
          );
        }
        if (res && res.status && res.status === 201) {
          AlertModal.show(res.message, "Oops!");
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
              <h3 className="fs28 colorBlack fBold mb30">Account Profile</h3>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Please wait" />
                </div>
              )}
              {!showProgress && (
                <div className="">
                  <section className="bgWhite radius mb30 border">
                    <div className="pt20 pb20 pl30 pr30">
                      <h3 className="fs18 colorBlack mb0">Profile Image</h3>
                    </div>
                    <div className="bBottom"></div>
                    <div className="pt20 pb20 pl30 pr30">
                      <div className="d-flex align-items-center cap-profile">
                        <div className="mb15 wh128">
                          <img
                            className="w-100 radius100 height100 cover"
                            src={
                              profileImage.objectUrl !== null &&
                              profileImage.objectUrl !==
                                API.imageurl + "undefined"
                                ? profileImage.objectUrl
                                : Img.boy.default
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml20 cap-profile-desc">
                          <div className="d-flex mb10">
                            <div className="d-flex align-items-center flex-wrap justify-content-center mb10">
                              <label
                                htmlFor="busLogo"
                                className="d-flex align-items-center flex-wrap justify-content-center flex-column"
                              >
                                <input
                                  type="file"
                                  name="busLogo"
                                  id="busLogo"
                                  className="busLogo d-none "
                                  accept="image/*"
                                  onChange={(e) => {
                                    setprofileImg(e.target.files[0]);
                                    if (
                                      e.target.files !== null &&
                                      e.target.files.length > 0
                                    ) {
                                      updateImage(e.target.files[0]);
                                      setprofileImage({
                                        file: e.target.files[0],
                                        objectUrl: URL.createObjectURL(
                                          e.target.files[0]
                                        ),
                                      });
                                    }
                                  }}
                                />
                                <div className="pointer  btnTheme btnBlack d-flex align-items-center flex-wrap  radius100 ">
                                  <span>
                                    {profileImage.objectUrl === null
                                      ? "Upload Avtar"
                                      : "Change"}
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <p className="fs15">
                            This should be a image upload form only that allows
                            image types as png, jpg, bitmap. Maximum size is of
                            10MB.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bgWhite radius mb30 border">
                    <div className="pt20 pb20 pl30 pr30">
                      <h3 className="fs18 colorBlack mb0">
                        Personal Information
                      </h3>
                    </div>
                    <div className="bBottom"></div>
                    <div className="pt20 pb20 pl30 pr30">
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="First Name *"
                            type="text"
                            placeholder="Robbin"
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                          />
                        </Col>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="Last Name *"
                            type="text"
                            placeholder="Rathore"
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="position-relative">
                            <CmnInput
                              className="bgLightOrange"
                              label="Mobile Number"
                              type="number"
                              placeholder="9876 543 210"
                              value={mobile}
                              onChange={(e) => setmobile(e.target.value)}
                              readOnly={true}
                              disabled={true}
                              icon={
                                <button className="btn btn-link pt0 pb0 pr0 pl0 text-success fs14">
                                  <span className="dNoneXs dNoneMd">
                                    {mobileverified ? "Verified" : "Verify"}
                                  </span>
                                  <span className="dNoneLg dNoneXl">
                                    &#10003;
                                  </span>
                                </button>
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="position-relative">
                            <CmnInput
                              className=""
                              label="Email *"
                              type="email"
                              placeholder="Example@gmail.com"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                              readOnly={true}
                              disabled={true}
                              icon={
                                <button
                                  className={`btn btn-link pt0 pb0 pr0 pl0 ${
                                    emailverified
                                      ? "text-success"
                                      : "text-danger"
                                  }  fs14`}
                                >
                                  <span className="dNoneXs dNoneMd">
                                    {emailverified ? "Verified" : "Verify"}
                                  </span>
                                  <span className="dNoneLg dNoneXl">
                                    &#10003;
                                  </span>
                                </button>
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p className="colorBlack fs16 mb7">Gender</p>
                        <Col lg={3}>
                          <CmnRadioBorder
                            name="gender"
                            id="male"
                            label="Male"
                            value={gender}
                            checked={gender === "Male"}
                            onChange={() => setgender("Male")}
                          />
                        </Col>
                        <Col lg={3}>
                          <CmnRadioBorder
                            name="gender"
                            id="female"
                            label="Female"
                            value={gender}
                            checked={gender === "Female"}
                            onChange={() => setgender("Female")}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="colorBlack fs16 mb7">Date of Birth</p>
                          <div className="position-relative mb20">
                            {console.log({dob})}
                            <DatePicker
                              selected={dob}
                              onChange={(dob) => setdob(dob)}
                              // dateFormat="yyyy-M-dd"
                              dateFormat="dd-MM-yyyy"
                              locale="es"
                              placeholderText="Choose Date"
                              className="w-100 inputTransparent  outlineNone"
                            />
                            <div className="acp-dob">
                              <span>{Svg.dob}</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <CmnCheckbox
                        id="agree"
                        label="I want to receive marketing and promotional offers"
                        checked={terms}
                        onChange={(e) => setterms(!terms)}
                      />
                    </div>
                  </section>
                  <div className="d-flex justify-content-end">
                    <CmnButton
                      className={""}
                      type="square"
                      text="Update Info"
                      onClick={(e) => saveData()}
                    />
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomerAccountProfile;

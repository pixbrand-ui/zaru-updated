/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "./ServiceProviderSingle.scss";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Progress } from "reactstrap";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { useEffect } from "react";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import { useParams, useLocation } from "react-router-dom";

const ServiceProviderSingle = (props) => {
  const { refid } = useParams();
  const { testvalue } = useParams();
  const history = useHistory();
  const [ratingdataloaded, setratingdataloaded] = useState(null);
  const [userdataloaded, setuserdataloaded] = useState(null);
  const [viewAsProfile, setviewAsProfile] = useState(false);

  const history1 = useHistory();

  useEffect(() => {
    //console.log("aaq",history1.location.vAsProfile);
    setviewAsProfile(history1.location.vAsProfile);
    //console.log("param",testvalue);
  }, []);

  const loadRatingData = (data) => {
    try {
      if (data) {
        setratingdataloaded(data);
      }
    } catch (error) {}
  };

  const loadUserData = (data) => {
    try {
      if (data) {
        setuserdataloaded(data);
      }
    } catch (error) {}
  };

  return (
    <section className="bgLightOrange pt40">
      <Container>
        <div>
          <Link to="#" onClick={(e) => history.goBack()}>
            {Svg.backArrow}
          </Link>
        </div>

        <SpHeader
          ViewAsProfile={viewAsProfile}
          ratingData={ratingdataloaded}
          userData={userdataloaded}
          businessid={refid}
        />

        <div className="pl30 pr30 bgWhite mobPl10 mobPr10">
          <Row>
            <Col xl={7} lg={7} md={12}>
              <LeftContent userDataCallback={loadUserData} businessid={refid} />
            </Col>

            <Col xl={5} lg={5} md={12}>
              <RightContent
                ratingDataCallback={loadRatingData}
                businessid={refid}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ServiceProviderSingle;

const SpHeader = (props) => {
  const [businessdetails, setbusinessdetails] = useState(null);
  const [localratingData, setlocalratingData] = useState(null);
  const [localuserdata, setlocaluserdata] = useState(null);

  useEffect(() => {
    //alert(props.ViewAsProfile);
    loadData().then((res) => {
      setbusinessdetails(res);
    });
  }, []);

  useEffect(() => {
    if (props.ratingData !== null) {
      setlocalratingData(props.ratingData);
    }
  }, [props.ratingData]);

  useEffect(() => {
    if (props.userData !== null) {
      setlocaluserdata(props.userData);
    }
  }, [props.userData]);

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        await HTTP.get(
          API.getBusinessInfo + props.businessid,
          false,
          Auth.getToken()
        ).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
          } else {
            result = res.message ? res.message : "Unknown Error";
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  return (
    <>
      <div className="spHeader position-relative mt20 d-flex align-items-end flex-wrap h300">
        <img
          src={Img.proSingle.default}
          alt=""
          className="w-100 h300 cover radiusTop"
        />

        <div className="ratingReview  d-flex align-items-end flex-wrap justify-content-end">
          <div className="bgBlack pt20 pb20 pl20 pr20 position-relative tri">
            <div className="rating colorWhite fs16 d-flex align-items-center flex-wrap">
              <span className="pl20 pr20 text-center position-relative">
                <span className="colorWhite fs16">
                  {localratingData && localratingData[5].avg_rating}{" "}
                  <span className="">
                    {localratingData &&
                      localratingData[5].avg_rating > 0 &&
                      Svg.fillStarYellowSmall}
                    {localratingData &&
                      localratingData[5].avg_rating === 0 &&
                      Svg.greyStarSmall}
                    {!localratingData && "0"}
                  </span>
                </span>

                <div className="">Ratings</div>
              </span>

              <span className="pl20 pr20 text-center position-relative">
                <span className="colorWhite fs16">
                  {localratingData &&
                    localratingData[4].count +
                      localratingData[3].count +
                      localratingData[2].count +
                      localratingData[1].count +
                      localratingData[0].count}
                  {!localratingData && "0"}
                </span>

                <div className="">Reviews</div>
              </span>

              <span className="pl20 pr20 text-center position-relative">
                <span className="colorWhite fs16">
                  {localuserdata ? localuserdata.taskcount : "0"}
                </span>

                <div className="">Tasks</div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pl30 pr30  bgWhite mobPl10 mobPr10">
        <Row
          className="align-items-center topHeader gy-3
        "
        >
          <Col lg={7} md={7}>
            <div className="d-flex align-items-center flex-wrap mobPt30">
              <div className="mr15">
                <div className="w128">
                  <img
                    className="img-fluid radius100 bWhite"
                    src={
                      businessdetails && businessdetails.logoimage
                        ? API.imageurl + businessdetails.logoimage
                        : Img.businessPlaceholder.default
                    }
                    alt=""
                    srcset=""
                  />
                </div>
              </div>

              <div>
                <h2 className="f24 fBold colorBlack">
                  {businessdetails !== null
                    ? businessdetails.bussinessname
                    : "Loading..."}
                  <img className="pl10" src={Img.badge.default} alt="" />
                </h2>

                <p className="fs16 colorPara mb0">
                  <span className="fs13 fBold">R</span>{" "}
                  {businessdetails !== null
                    ? businessdetails.hourlyprice + ".00"
                    : "0.00"}
                  /H
                </p>
              </div>
            </div>
          </Col>

          {!props.ViewAsProfile && (
            <Col lg={5} md={5}>
              <div className="d-flex align-items-center flex-wrap justify-content-end mobJustifyContentStart">
                <CmnButton
                  onClick={(e) => {}}
                  type="square"
                  icon={Svg.book}
                  text="Send Request"
                  className="fBold mobBtnSm tabMb10"
                />

                <CmnButton
                  type="noBg"
                  icon={Svg.blankHeart}
                  text="Favourite"
                  className="fBold btnTransparent mdBtn radius ml10 mobBtnSm tabMl0"
                />
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

const LeftContent = (props) => {
  const [showProgress, setshowProgress] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [photos, setphotos] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  useEffect(() => {
    loadData().then((res) => {
      console.log("resss", res);
      if (res === "Data not Found") {
        return setuserdata([]);
      } else {
        setuserdata(res);
      }

      props.userDataCallback(res);
      var _photos = [];
      if (res.files && res.files.length > 0) {
        res.files.forEach((element, index) => {
          _photos.push({ src: API.imageurl + element });
        });
        //console.log(_photos);
        setphotos(_photos);
      }
      setshowProgress(false);
    });
  }, []);

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.get(
          API.getBusinessInfo + props.businessid,
          false,
          Auth.getToken()
        ).then((res) => {
          //console.log("RESS",res);
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
          } else {
            result = res.message ? res.message : "Unknown Error";
            console.error(result);
          }
        });
      }
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
    return result;
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      {showProgress && (
        <div className="pageBody">
          <LoadinMsg message="Please wait" />
        </div>
      )}

      {!showProgress && userdata !== null && (
        <>
          <section className="bBottom mb20 pb10 mobPt30">
            <h4 className="fs18 fBold colorBlack">About Me</h4>

            <div className="readMore mb20">
              <p
                className={`paraHeight text-justify ${
                  readMore ? "readMoreFull" : ""
                }`}
              >
                {userdata.description}
              </p>
              <CmnButton
                type="noBg"
                text={readMore ? "Read Less" : "Read More"}
                onClick={() => setReadMore(!readMore)}
              />
            </div>

            <Row className="">
              <Col lg={6} md={6} xs={6}>
                <p className="fs16 colorBlack fBold mb5">
                  Year business started
                </p>
                <p className="fs16 colorPara">{userdata.startedyear}</p>
              </Col>

              <Col lg={6} md={6} xs={6}>
                <p className="fs16 colorBlack fBold mb5">No of Employees</p>
                <p className="fs16 colorPara">{userdata.noofemployee}</p>
              </Col>
            </Row>
          </section>

          <section className="bBottom mb20 pb10">
            <h4 className="fs18 fBold colorBlack">Services Offered</h4>

            <div className="readMore mb20">
              <p className="">
                {userdata.subcategory &&
                  userdata.subcategory.length > 0 &&
                  userdata.subcategory.map((element, index) => {
                    return (
                      <span key={index}>
                        {element.subcategory_name}
                        {index !== userdata.subcategory.length - 1 && " | "}
                      </span>
                    );
                  })}
              </p>
            </div>
          </section>

          <section className="bBottom mb20 pb20">
            <h4 className="fs18 fBold colorBlack mb15">Verified Information</h4>
            <Row className="gy-2">
              {!userdata.adminverified && (
                <p> {Svg.crossCircle} No any information verified.</p>
              )}
              {userdata.identitydoc && userdata.adminverified && (
                <Col lg={6} md={6}>
                  <div className="d-flex align-items-center">
                    <div className="circleGreen" style={{ width: 30 + "px" }}>
                      {Svg.checkGreen}
                    </div>
                    <p className="mb0">Identity Document </p>
                    <div></div>
                  </div>
                </Col>
              )}

              {userdata.addressdoc && userdata.adminverified && (
                <Col lg={6} md={6}>
                  <div className="d-flex align-items-center">
                    <div className="circleGreen" style={{ width: 30 + "px" }}>
                      {Svg.checkGreen}
                    </div>
                    <p className="mb0">Proof of Address</p>
                    <div></div>
                  </div>
                </Col>
              )}

              {userdata.bussinessregdoc && userdata.adminverified && (
                <Col lg={6} md={6}>
                  <div className="d-flex align-items-center">
                    <div className="circleGreen" style={{ width: 30 + "px" }}>
                      {Svg.checkGreen}
                    </div>
                    <p className="mb0">Business Registration</p>
                    <div></div>
                  </div>
                </Col>
              )}
            </Row>
          </section>

          <section className="bBottom mb20 pb10">
            <div className="grpSingle mb20">
              <h4 className="fs18 fBold colorBlack">Mobile Number</h4>
              <div className="d-flex align-items-center">
                <div className="circleGreen" style={{ width: 30 + "px" }}>
                  {Svg.info}
                </div>
                <p className="mb0">
                  When you book a provider you can see the contact information
                </p>
                <div></div>
              </div>
            </div>

            <div className="grpSingle mb20">
              <h4 className="fs18 fBold colorBlack">E-mail</h4>
              <div className="d-flex align-items-center">
                <div className="circleGreen" style={{ width: 30 + "px" }}>
                  {Svg.info}
                </div>
                <p className="mb0">
                  When you book a provider you can see the contact information
                </p>
              </div>
            </div>
            <div className="grpSingle mb20">
              <h4 className="fs18 fBold colorBlack">Website (optional)</h4>
              <div className="d-flex align-items-center">
                <div className="circleGreen" style={{ width: 30 + "px" }}>
                  {Svg.info}
                </div>
                <p className="mb0">
                  When you book a provider you can see the contact information
                </p>
                <div></div>
              </div>
            </div>
          </section>

          <section className="bBottom mb20 pb10">
            <h4 className="fs18 fBold colorBlack">Business Hours</h4>
            {userdata.isflexible && <p> Flexible Timings</p>}
            {!userdata.isflexible && (
              <Table bordered={false} className="noBorder tdPl0 colorPara">
                <tbody>
                  <tr>
                    <td>Monday - </td>
                    <td>
                      {userdata.monday[0].closed &&
                      userdata.monday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.monday[0].opening &&
                        userdata.monday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.monday[0].closed &&
                      userdata.monday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.monday[0].closing &&
                        userdata.monday[0].closing + " PM"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Tuesday - </td>
                    <td>
                      {userdata.tuesday[0].closed &&
                      userdata.tuesday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.tuesday[0].opening &&
                        userdata.tuesday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.tuesday[0].closed &&
                      userdata.tuesday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.tuesday[0].closing &&
                        userdata.tuesday[0].closing + " PM"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Wednesday - </td>
                    <td>
                      {userdata.wednesday[0].closed &&
                      userdata.wednesday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.wednesday[0].opening &&
                        userdata.wednesday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.wednesday[0].closed &&
                      userdata.wednesday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.wednesday[0].closing &&
                        userdata.wednesday[0].closing + " PM"
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Thursday - </td>
                    <td>
                      {userdata.thursday[0].closed &&
                      userdata.thursday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.thursday[0].opening &&
                        userdata.thursday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.thursday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.thursday[0].closing + " PM"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Friday - </td>
                    <td>
                      {userdata.friday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.friday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.friday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.friday[0].closing + " PM"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday - </td>
                    <td>
                      {userdata.saturday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.saturday[0].opening + " AM"
                      )}
                    </td>
                    <td>
                      {userdata.saturday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.saturday[0].closing + " PM"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Sunday - </td>
                    <td>
                      {userdata.sunday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.sunday[0].opening + "AM"
                      )}
                    </td>
                    <td>
                      {userdata.sunday[0].closed ? (
                        <span className="colorRed f15 fw600">Closed</span>
                      ) : (
                        userdata.sunday[0].closing + "PM"
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </section>

          <section className="bBottom mb20 pb10">
            <h4 className="fs18 fBold colorBlack">Work Gallery</h4>
            {userdata.files && userdata.files.length > 0 && (
              <>
                <div className="galleryArea">
                  <Gallery photos={photos} onClick={openLightbox} />
                </div>
                <ModalGateway>
                  {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                      <Carousel
                        currentIndex={currentImage}
                        views={photos.map((x) => ({
                          ...x,
                          srcset: x.srcSet,
                          caption: x.title,
                        }))}
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </>
            )}
          </section>

          <section className="bBottom mb20 pb20">
            <h4 className="fs18 fBold colorBlack">Location</h4>
            <div className="d-flex  mb20">
              <div className="circleGreen" style={{ width: 30 + "px" }}>
                {Svg.locationPin}
              </div>
              <p className="mb0">
                {userdata.city}, {userdata.state}, {userdata.country}
              </p>
              <div></div>
            </div>

            <div>
              <iframe
                key="asdasd"
                title="542313431asd45"
                // #aaqib
                src={`https://maps.google.com/maps?q=${userdata.location.coordinates[0]},${userdata.location.coordinates[1]}&z=15&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </section>

          <section className="mb20 pb20">
            <h4 className="fs18 fBold colorBlack">Work Radius</h4>
            <p>{userdata.radiusofservice} KM</p>
          </section>
        </>
      )}
      {!showProgress && userdata === null && (
        <p>There is no any data available.</p>
      )}
    </>
  );
};

const RightContent = (props) => {
  return (
    <>
      <RatingsArea
        ratingDataCallback={props.ratingDataCallback}
        businessid={props.businessid}
      />
      <ReviewListings businessid={props.businessid} />
    </>
  );
};

const RatingsArea = (props) => {
  const [showProgressRating, setshowProgressRating] = useState(true);
  const [ratingdata, setratingdata] = useState(null);

  useEffect(() => {
    loadData().then((res) => {
      setratingdata(res);
      props.ratingDataCallback(res);
      setshowProgressRating(false);
    });
  }, []);

  const loadData = async () => {
    var result = null;
    setshowProgressRating(true);
    try {
      await HTTP.get(
        API.getBusinessRating + props.businessid,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status) {
          if (res.status.toString() === "200") {
            if (res.data) {
              result = res.data;
              return result;
            }
          } else if (res.status.toString() === "201") {
            console.log(res);
            setshowProgressRating(false);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setshowProgressRating(false);
    }
    return result;
  };
  return (
    <>
      {showProgressRating && (
        <div className="pageBody">
          <LoadinMsg message="Please wait" />
        </div>
      )}
      {!showProgressRating && ratingdata != null && (
        <section className="mb25 ml25">
          <h3 className="fs20 fBold colorBlack">Ratings</h3>

          <Row className="gy-3">
            <Col lg={4}>
              <div className="ratingBox radius border2px pt10 pl10 pr10 pb10 text-center">
                <h4 className="fs25 fBold">
                  {ratingdata[5].avg_rating > 5
                    ? "5.0"
                    : ratingdata[5].avg_rating}
                </h4>

                <div className="d-flex align-items-center justify-content-center mb6">
                  <GenerateStarSmall rating={ratingdata[5].avg_rating} />
                </div>

                <p className="mb0 colorPara fs15">
                  {ratingdata[4].count +
                    ratingdata[3].count +
                    ratingdata[2].count +
                    ratingdata[1].count +
                    ratingdata[0].count +
                    " "}
                  reviews
                </p>
              </div>
            </Col>

            <Col lg={8}>
              {/* 5 start */}
              <Row className="align-items-center w-100 mb3">
                <Col xs={4} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">5 Star</p>
                </Col>

                <Col xs={6} xl={6} md={6}>
                  <Progress
                    className="ratingProgress"
                    value={
                      ratingdata[4].count > 50 ? 100 : ratingdata[4].count * 2
                    }
                  />
                </Col>

                <Col xs={2} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">{ratingdata[4].count}x</p>
                </Col>
              </Row>
              {/* 4 start */}
              <Row className="align-items-center w-100 mb3">
                <Col xs={4} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">4 Star</p>
                </Col>

                <Col xs={6} xl={6} md={6}>
                  <Progress
                    className="ratingProgress"
                    value={
                      ratingdata[3].count > 50 ? 100 : ratingdata[3].count * 2
                    }
                  />
                </Col>

                <Col xs={2} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">{ratingdata[3].count}x</p>
                </Col>
              </Row>
              {/* 3 start */}
              <Row className="align-items-center w-100 mb3">
                <Col xs={4} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">3 Star</p>
                </Col>

                <Col xs={6} xl={6} md={6}>
                  <Progress
                    className="ratingProgress"
                    value={
                      ratingdata[2].count > 50 ? 100 : ratingdata[2].count * 2
                    }
                  />
                </Col>

                <Col xs={2} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">{ratingdata[2].count}x</p>
                </Col>
              </Row>
              {/* 2 start */}
              <Row className="align-items-center w-100 mb3">
                <Col xs={4} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">2 Star</p>
                </Col>

                <Col xs={6} xl={6} md={6}>
                  <Progress
                    className="ratingProgress"
                    value={
                      ratingdata[1].count > 50 ? 100 : ratingdata[1].count * 2
                    }
                  />
                </Col>

                <Col xs={2} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">{ratingdata[1].count}x</p>
                </Col>
              </Row>
              {/* 1 start */}
              <Row className="align-items-center w-100 mb12">
                <Col xs={4} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">1 Star</p>
                </Col>

                <Col xs={6} xl={6} md={6}>
                  <Progress
                    className="ratingProgress"
                    value={
                      ratingdata[0].count > 50 ? 100 : ratingdata[0].count * 2
                    }
                  />
                </Col>

                <Col xs={2} xl={3} md={3}>
                  <p className="fs14 colorPara mb0">{ratingdata[0].count}x</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

const WriteReview = () => {
  return (
    <>
      <section className="mb25">
        {/* <h4 className="fs18 fBold colorBlack mb25">Reviews</h4> */}

        <div className="border2px pl10 pr10 pt20 pb20 radius text-center">
          <div>
            <h4 className="fs16 colorPara">
              <p className="mb10">Have you used this business? </p>
              <p>Tell others about it with a Zaaruu review!</p>
            </h4>

            <div className="d-flex align-items-center flex-wrap justify-content-center">
              <CmnButton text="Write a review" type="square" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ReviewListings = (props) => {
  const [showProgressReview, setshowProgressReview] = useState(false);
  const [reviewsdata, setreviewsdata] = useState([]);
  useEffect(() => {
    loadData().then((res) => {
      setreviewsdata(res);
      setshowProgressReview(false);
    });
  }, []);

  const loadData = async () => {
    var result = [];
    setshowProgressReview(true);
    try {
      await HTTP.get(
        API.getBusinessReviews + props.businessid + "?pagesize=10&page=1",
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status) {
          if (res.status.toString() === "200") {
            if (res.data) {
              result = res.data;
              return result;
            }
          } else if (res.status.toString() === "201") {
            console.log(res);
            setshowProgressReview(false);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setshowProgressReview(false);
    }
    return result;
  };
  return (
    <>
      {showProgressReview && (
        <div className="pageBody">
          <LoadinMsg message="Please wait" />
        </div>
      )}

      {!showProgressReview && reviewsdata.length > 0 && (
        <section className="mb25 ml25">
          <h3 className="fs20 fBold colorBlack mb25">Reviews</h3>
          {reviewsdata.map((element, index) => {
            return <ReviewDataItem data={element} key={index} />;
          })}
        </section>
      )}
      {!showProgressReview && reviewsdata.length <= 0 && (
        <div className="w-100 d-flex justify-content-center">
          <WriteReview />
        </div>
      )}
    </>
  );
};

const ReviewDataItem = (props) => {
  return (
    <section className="pb10 bdashedBottom mb30">
      <div className="d-flex">
        <div className="w75 ml20 mr20">
          <img
            className="img-fluid radius100"
            src={Img.ratingPlaceholder.default}
            alt=""
          />
        </div>

        <div className="d-flex align-items-start flex-column w-100">
          <div className="d-flex align-items-center flex-wrap w-100 justify-content-between">
            <h5 className="colorBlack fs16 fBold m-0">
              {props.data.userid.firstname} {props.data.userid.lastname}
            </h5>
            <h5 className="colorPara fs13 m-0">
              {new Date(props.data.createdAt).toDateString()}{" "}
              {new Date(props.data.createdAt).toLocaleTimeString()}
            </h5>
          </div>

          <div className="d-flex align-items-center justify-content-start mb10">
            <GenerateStar rating={props.data.rating} />
          </div>

          <p>{props.data.review}</p>
        </div>
      </div>
    </section>
  );
};

const GenerateStarSmall = ({ rating }) => {
  if (rating && rating > 0) {
    if (rating >= 5) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
        </>
      );
    }
    if (rating < 5 && rating >= 4) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
        </>
      );
    }
    if (rating < 4 && rating >= 3) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
        </>
      );
    }
    if (rating < 3 && rating >= 2) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
        </>
      );
    }
    if (rating < 2 && rating >= 1) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
        </>
      );
    }
    if (rating === 0) {
      return (
        <>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
      </>
    );
  }
};

const GenerateStar = ({ rating }) => {
  if (rating && rating > 0) {
    if (rating === 5) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <p className="mb0 colorGreen fBold ml10 mt4 fs14">Excellent</p>
        </>
      );
    }
    if (rating === 4) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <p className="mb0 colorGreen fBold ml10 mt4 fs14">V.Good</p>
        </>
      );
    }
    if (rating === 3) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <p className="mb0 colorGreen fBold ml10 mt4 fs14">Good</p>
        </>
      );
    }
    if (rating === 2) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <p className="mb0 colorGreen fBold ml10 mt4 fs14">It's ok</p>
        </>
      );
    }
    if (rating === 1) {
      return (
        <>
          <div className="mr4">{Svg.fillStarYellowSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <p className="mb0 colorRed fBold ml10 mt4 fs14">Poor</p>
        </>
      );
    }
    if (rating === 0) {
      return (
        <>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <div className="mr4">{Svg.greyStarSmall}</div>
          <p className="mb0 colorBlack fBold ml10 mt4 fs14">No Rating</p>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
        <div className="mr4">{Svg.greyStarSmall}</div>
      </>
    );
  }
};

// const ReviewListingsWithReply = () => {
//   return (
//     <>
//       <section className="pb10 bdashedBottom mb30 pb20">
//         <div className="d-flex">
//           <div className="w128 mr15">
//             <img
//               className="img-fluid radius100"
//               src={Img.ratingPlaceholder.default}
//               alt=""
//             />
//           </div>

//           <div>
//             <div className="d-flex align-items-center flex-wrap justify-content-between">
//               <h5 className="colorBlack fs16 fBold">Kimberly S. 083 ****156</h5>

//               <p className="mb0 fs16 colorPara">24 July, 2020</p>
//             </div>

//             <div className="d-flex align-items-center justify-content-start mb10">
//               <div className="mr4">{Svg.redStar}</div>
//               <div className="mr4">{Svg.greyStar}</div>
//               <div className="mr4">{Svg.greyStar}</div>
//               <div className="mr4">{Svg.greyStar}</div>
//               <div className="mr4">{Svg.greyStar}</div>

//               <p className="mb0 colorRed fBold ml10 mt4">Bad</p>
//             </div>

//             <p>
//               Great experience . Took 2 months for house plans and 4 months to
//               construct . Currently living in our new home and we are very happy
//               with the service recieved during our engagement .
//             </p>

//             <div className="reply bgLightOrange radius pl20 pr20 pt20 pb20">
//               <div className="d-flex align-items-center flex-wrap justify-content-between mb15">
//                 <h5 className="colorBlack fs16 fBold mb0">
//                   UrbanClab Cleaning Services
//                 </h5>

//                 <p className="mb0 fs16 colorPara">24 July, 2020</p>
//               </div>

//               <p>
//                 Great experience . Took 2 months for house plans and 4 months to
//                 construct . Currently living in our new home and we are very
//                 happy with the service recieved during our engagement .
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

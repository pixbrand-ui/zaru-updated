/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Img from "../../../../Assets/Img/Img";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CmnProgressbar from "../../../../Components/CmnProgressbar/CmnProgressbar";
import ConfirmModal02 from "../../../../Components/ConfirmModal02/ConfirmModal02";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";
import LoadinMsg from "../../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../../Helpers/Api/Api";
import Auth from "../../../../Helpers/Auth/Auth";
import API from "../../../../Helpers/Constants/Constants";
import ProAside from "../ProAside";

const ProviderDashboard = (props) => {
  const [showProgress, setshowProgress] = useState(false);
  const [gotoPage, setgotoPage] = useState("");
  const [businessdata, setbusinessdata] = useState([]);

  useEffect(() => {
    //load data
    loadData().then((res) => {
      setbusinessdata(res);
    });
  }, []);

  const loadData = async () => {
    let fdata = [];
    setshowProgress(true);
    try {
      if (Auth.getToken() !== null) {
        console.log('getbussinss')
        await HTTP.get(API.getBusinessList, false, Auth.getToken()).then(
          (res) => {
            console.log("res Business profile dashboard : ", res);
            if (res && res.status) {
              if (res.status.toString() === "200") {
                fdata = res.data;
                setshowProgress(false);
                return fdata;
              } else if (res.status.toString() === "201") {
                setshowProgress(false);
              }
            }
          }
        );
      } else {
        setshowProgress(false);
        setgotoPage("login");
      }
    } catch (error) {
      setshowProgress(false);
      console.log(error);
    }
    return fdata;
  };

  const RefreshData = () => {
    loadData().then((res) => {
      setbusinessdata(res);
    });
  };

  return (
    <section className="bgLightOrange pt60 pb60">
      {gotoPage === "business/business-info" && (
        <Redirect to="/business/business-info" />
      )}
      {gotoPage === "login" && <Redirect to="/logout" />}
      <Container>
        <Row className="gx-5 gy-5">
          <Col lg={3} md={4} xl={3}>
            <ProAside />
          </Col>

          <Col lg={9} md={8} xl={9}>
            <div className="d-flex align-items-center flex-wrap justify-content-between mb20">
              <div>
                <h2 className="f24 fBold mb0 mobMb10">Business Profile</h2>
              </div>

              {!showProgress && (
                <div>
                  <CmnButton
                    type="square"
                    className="fBold"
                    onClick={(e) => setgotoPage("business/business-info")}
                    text="+ Add New Business"
                  />
                </div>
              )}
            </div>

            {showProgress && (
              <div className="pageBody">
                <LoadinMsg message="Please wait" />
              </div>
            )}

            {!showProgress &&
              businessdata.length > 0 &&
              businessdata.map((element, index) => {
                if (element.profilestatus > 0 && element.profilestatus < 4) {
                  return (
                    <IncompleteBussinessProfile
                      key={index}
                      data={element}
                      refresList={RefreshData}
                    />
                  );
                } else {
                  return <ListingBusinessPro key={index} data={element} />;
                }
              })}

            {!showProgress && businessdata.length <= 0 && (
              <div className="d-flex w-100 h-50 justify-content-center align-items-center colorPara">
                There is no any business, Please add business.
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProviderDashboard;

const ListingBusinessPro = (props) => {
  const { data } = props;
  const [showProgressRating, setshowProgressRating] = useState(false);
  const [ratingdata, setratingdata] = useState(null);
  const history = useHistory();

  useEffect(() => {
    loadData().then((res) => {
      setratingdata(res);
      setshowProgressRating(false);
    });
  }, []);

  const loadData = async () => {
    var result = null;
    setshowProgressRating(true);
    try {
      await HTTP.get(
        API.getBusinessRating + data.id,
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
      <section className="bgWhite radius pl20 pr20 pt20 pb20 mb30 border">
        <Row className="gy-3">
          <Col lg={8} md={8}>
            <Row className="gy-3">
              <Col lg={3} md={12}>
                <img
                  className="img-fluid radius100"
                  src={data && data.logoimage ? API.imageurl + data.logoimage :  Img.businessPlaceholder.default}
                  alt=""
                />
              </Col>
              <Col lg={9} md={12}>
                <div className="wrapperText">
                  <h3 className="colorBlack fs18 fBold mb4">
                    {data.bussinessname}
                  </h3>
                  <p className="fs16 colorPara">
                    &#9741;{" "}
                    {data.city
                      ? data.city + ", " + data.state
                      : "location not availabel"}
                    <br />
                    &#9993; {data.email}
                    <br />
                    &#9742; {data.phone}
                  </p>

                  <div className="d-flex flex-wrap w-100 mt15">
                    {/* <Link to="#" className="fs14 colorOrange">
                      &#9998; Get Customer Reviews
                    </Link>
                    <span className="mr3 ml3 dNoneXs colorGrey"> | </span> */}
                    <Link
                      viewCustomer="myData"
                      onClick={()=>{
                        history.push({pathname: `/provider/${data._id}`,vAsProfile: true})
                      }}
                      className="fs14 colorOrange"
                    >
                      &#9872; View Profile as Customer
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4}>
            <div className="d-flex flex-column justify-content-end mobJustifyContentStart">
              {showProgressRating && (
                <div className="w50 align-self-end">
                  <LoadinMsg size="small" type="grow" />
                </div>
              )}
              {!showProgressRating && ratingdata && (
                <>
                  <div
                    className="colorPara fs14 text-lg-end pl10 pr10 pt3 pb3 radius align-self-lg-end"
                    style={{ width: "60px !important" }}
                  >
                    <span className="mr6 d-inline-flex">
                      {Svg.fillStarYellowSmall}
                    </span>
                    <span className="colorPara fw600">
                      { ratingdata.avg_rating}
                    </span>
                  </div>
                  <div className="colorPara fs14 text-lg-end pl10 pr10 pb3 radius">
                    {ratingdata.reviewcount} Reviews
                  </div>
                </>
              )}
            </div>
          </Col>

          <Col lg={8} md={8}>
            <Row className="gy-3">
              <Col lg={3} md={12}></Col>
              <Col lg={9} md={12} className="bTop pt-2">
                <CmnProgressbar
                  label="Profile Strength "
                  progressPercentage={100}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} className="bTop pt-2">
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center flex-wrap w-100 mobJustifyContentStart justify-content-end">
                <div className="mr10">
                  <span className="mr5">{Svg.circleCheck}</span>
                  <span className="fs14 colorPara mb10">Verified</span>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      // history.push({
                      //   pathname: "/business/business-info/" + data._id,
                      //   state: { userdata: data },
                      // });
                      history.push({
                          pathname: "/business/edit-profile/" + data._id,
                          state: { userdata: data },
                        });
                    }}
                    className="btnTheme"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

const IncompleteBussinessProfile = (props) => {
  const { data } = props;
  const history = useHistory();

  const removeBusiness = (id) => {
    try {
      //console.log(id);
      ConfirmModal02.show(
        "Are you sure to remove?",
        () => {
          LoadingModal.show("Please wait");
          HTTP.delete(API.deleteBusiness + id, false, Auth.getToken()).then(
            (res) => {
              if (res && res.status) {
                if (res.status === 200) {
                  props.refresList();
                  LoadingModal.hide();
                } else if (res.status === 201) {
                  LoadingModal.hide();
                  AlertModal.show(res.message, "Oops!");
                } else {
                  LoadingModal.hide();
                  console.error("error: ", res);
                }
              }
            }
          );
        },
        () => {},
        "sm"
      );
    } catch (error) {
      LoadingModal.hide();
      console.error(error);
    }
  };

  return (
    <>
      <section className="bgWhite radius pl20 pr20 pt20 pb20 mb30 border">
        <Row className="gy-3">
          <Col lg={8} md={8}>
            <Row className="gy-3">
              <Col lg={3} md={12}>
                <img
                  className="img-fluid radius100"
                  src={Img.busPro.default}
                  alt=""
                />
              </Col>
              <Col lg={9} md={12}>
                <div className="wrapperText">
                  <h3 className="colorBlack fs18 fBold mb4">
                    {data.bussinessname}
                  </h3>
                  <p className="fs16 colorPara">
                    &#9741;{" "}
                    {data.city
                      ? data.city + ", " + data.state
                      : "location not availabel"}
                    <br />
                    &#9993; {data.email}
                    <br />
                    &#9742; {data.phone}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4}>
            <div className="d-flex flex-row w-100 h-100 justify-content-end">
              <div className="colorRed text-lg-end">
                &#10005; Incomplete Profile
              </div>
              <UncontrolledDropdown className="noBgonDropDown">
                <DropdownToggle>
                  <div className="d-flex align-items-center">
                    {Svg.verticalDots}
                  </div>
                </DropdownToggle>
                <DropdownMenu className="radius4 shadow noBorder">
                  <DropdownItem>
                    <ul className="noBg noUl mb0">
                      <li className="">
                        <Link
                          to="#"
                          onClick={(e) => removeBusiness(data._id)}
                          className="fs15 d-block w-100 colorPara"
                        >
                          Remove Business
                        </Link>
                      </li>
                    </ul>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Col>

          <Col lg={8} md={8}>
            <Row className="gy-3">
              <Col lg={3} md={12}></Col>
              <Col lg={9} md={12} className="bTop pt-2">
                <CmnProgressbar
                  label="Profile status"
                  progressPercentage={
                    data.profilestatus === 4
                      ? 100
                      : data.profilestatus === 3
                      ? 75
                      : data.profilestatus === 2
                      ? 50
                      : data.profilestatus === 1
                      ? 25
                      : 0
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} className="bTop pt-2">
            <div className="d-flex justify-content-lg-end">
              <button
                onClick={(e) => {
                  history.push({
                    pathname: "/business/business-info/" + data._id,
                    state: { userdata: data },
                  });
                }}
                className="btnTheme  btnTransparentBlack"
              >
                Complete
              </button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

// const ListingBusinessPro1 = () => {
//   return (
//     <>
//       <section className="bgWhite radius pl20 pr20 pt20 pb20 mb10">
//         <Row className="gy-3 bBottom pb30">
//           <Col lg={8} md={8}>
//             <Row className="gy-3">
//               <Col lg={3} md={12}>
//                 <img
//                   className="img-fluid radius100"
//                   src={Img.busPro.default}
//                   alt=""
//                 />
//               </Col>
//               <Col lg={9} md={12}>
//                 <div className="wrapperText">
//                   <h3 className="colorBlack fs18 fBold mb4">
//                     UrbanClab Cleaning Services{" "}
//                     <span className="colorRed">(Inactive)</span>
//                   </h3>
//                   <p className="fs16 colorPara">Eldoraigne, Centurion</p>

//                   <div className="mt15">
//                     <Link to="#" className="fs16 colorOrange">
//                       Get Customer Reviews
//                     </Link>
//                   </div>
//                   <div className="">
//                     <Link to="#" className="fs16 colorOrange">
//                       View Profile as Customer
//                     </Link>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </Col>

//           <Col lg={4} md={4}>
//             <div className="d-flex justify-content-end mobJustifyContentStart">
//               <div className="wrapperRightRvewiw d-flex justify-content-end flex-wrap mobJustifyContentStart">
//                 <div className="w-100 d-flex justify-content-end mobJustifyContentStart">
//                   <div className="reviewSection d-flex align-items-center justify-content-center pt4 pb4 pl2 pr2">
//                     <div className="mr6">{Svg.fillStar}</div>
//                     <div className="fs16 colorWhite  text-center">4.0</div>
//                   </div>
//                 </div>

//                 <p className="colorPara fs16 text-end mb20">3 reviews</p>

//                 <div className="d-flex align-items-center flex-wrap  w-100 mobJustifyContentStart justify-content-end">
//                   <div className="mr10 mb5">
//                     <span className="mr5">{Svg.crossCircle}</span>
//                     <span className="fs14 colorPara">Not Verified</span>
//                   </div>

//                   <div>
//                     <button className="btnTheme  btnTransparentBlack pl15 pr15">
//                       Complete Your Profile
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>

//         <Row className="progressWrapper position-relative align-items-center pt20">
//           <Col lg={3}>
//             {" "}
//             <div className="text-uppercase">Profile Strength:</div>
//           </Col>

//           <Col lg={9}>
//             <div className="progress" style={{ height: "18px" }}>
//               <div
//                 className="progress-bar"
//                 style={{ width: "80%", height: "18px" }}
//               >
//                 <span className="dynamicVal">80%</span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//         <Row className="progressWrapper position-relative pt15">
//           <Col lg={3}>
//             <div className="text-uppercase">TIPS:</div>
//           </Col>

//           <Col lg={9}>
//             <div className="d-flex flex-wrap justify-content-between">
//               <div className="fs16 colorPara">
//                 Upload 5+ photos of your work <br />
//                 Get 5+ reviews
//               </div>
//               <div>
//                 <p className="mb0 fs16 colorOrange">
//                   Improve Your Business Profile
//                 </p>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </section>
//     </>
//   );
// };

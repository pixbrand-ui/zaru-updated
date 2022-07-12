import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModalTop from "../../../Components/AlertModalTop/AlertModalTop";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import FormModal from "../../../Components/FormModal/FormModal";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import IncompleteTaskMsg from "../Tasks/IncompleteTaskMsg";
import "./CustomerDashboard.scss";
import CategorySearch from "../../../Views/Comman/Home/CategorySearch";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import CancelJobRequest from "./PurchasedModals/CancelJobRequest";
import BookedReview from "../../Customer/Booked/Review/Review";

const CustomerDashboard = () => {
  const [showProgress, setshowProgress] = useState(false);
  const [havePendingTask, sethavePendingTask] = useState([]);
  const [gotoStep, setgotoStep] = useState(0);
  const [openTaskList, setopenTaskList] = useState([]);
  const [bookedTaskList, setbookedTaskList] = useState([]);
  const [selectedTab, setselectedTab] = useState(0); // 0 == open task 1 == booked task

  useEffect(() => {
    if (GLocalStorage.IsExists("task-pending")) {
      sethavePendingTask(true);
      FormModal.show(
        <IncompleteTaskMsg callback={gotoTaskPublishPage} />,
        "Incomplete Task",
        () => {},
        "xs",
        "",
        false,
        false
      );
    }
    loadOpenTasks();
    loadBookedTask();
  }, []);

  const RefreshData = () => {
    loadOpenTasks();
    loadBookedTask();
  };

  const loadOpenTasks = () => {
    //LoadingModal.show("Loading task details...");
    setshowProgress(true);
    try {
      HTTP.post(
        API.MyTaskList,
        { type: "Open" },
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          console.log(res);
          if (res.data) {
            //LoadingModal.hide();
            setshowProgress(false);
            setopenTaskList(res.data);
          }
        } else {
          //LoadingModal.hide();
          setshowProgress(false);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadBookedTask = async () => {
    // alert("Booked");
    setshowProgress(true);
    const iData = {
      type: "Booked",
    };
    try {
      await HTTP.post(API.MyTaskList, iData, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            if (res.data) {
              setshowProgress(false);
              setbookedTaskList(res.data);
            }
          } else {
            //LoadingModal.hide();
            setshowProgress(false);
          }
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const gotoTaskPublishPage = () => {
    setgotoStep(6);
  };
  const searchModal = () => {
    AlertModal02.show(
      <CategorySearch />,
      "",
      () => {},
      "lg",
      "Cancel",
      false,
      false
    );
  };

  // add pending task
  // check ls and create pending task
  useEffect(() => {
    if (GLocalStorage.IsExists("task-pending")) {
      FormModal.show(
        <IncompleteTaskMsg callback={gotoTaskPublishPage} />,
        "Incomplete Task",
        () => {},
        "xs",
        "",
        false,
        false
      );
    }
  }, [havePendingTask]);

  return (
    <>
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 6 && <Redirect to="/tasks/image-upload" />}
      <section className="bgLightOrange pt60 pb60">
        <AlertModalTop />
        <Container>
          <div className="d-flex justify-content-between mb10">
            <h3 className="fs28 fBold colorBlack">My Tasks</h3>
            <div className="d-flex flex-row">
              <CmnButton
                type="square"
                text="+ Create New Task"
                className="fBold mobBtnSm tabMb10"
                onClick={(e) => {
                  searchModal();
                  //setgotoStep(1);
                }}
              />
            
            </div>
          </div>
          <div className="bgWhite radius">
            <div className="pl30 pr30 pt10 pb10">
              <span
                id="open_tasktab"
                className={`${
                  selectedTab === 0 ? "colorOrange bBorderOrange" : "colorBlack"
                } fs16 pl10 pr10  mr25 pointer`}
                onClick={(e) => {
                  setselectedTab(0);
                  loadOpenTasks();
                }}
              >
                Open
              </span>
              <span
                id="booked_tasktab"
                className={`${
                  selectedTab === 1 ? "colorOrange bBorderOrange" : "colorBlack"
                } fs16  pl10 pr10 mr25 pointer`}
                onClick={(e) => {
                  setselectedTab(1);
                  loadBookedTask();
                }}
              >
                Booked
              </span>
            </div>
            <div className="bBottom"></div>
            {showProgress && (
              <div className="pageBody">
                <LoadinMsg message="" />
              </div>
            )}
            {!showProgress && selectedTab === 0 && openTaskList.length <= 0 && (
              <div className="d-flex justify-content-center align-items-center pt80 pb80 text-center">
                <div>
                  <span>{Svg.blanTaskIcon}</span>
                  <p className="fs18 mt20 mb2 colorBlack">
                    You have not posted any recent Task
                  </p>
                  <p className="fs14">
                    Use "Create New Task" button and create a task for what
                    service you needed.
                  </p>
                </div>
              </div>
            )}
            {!showProgress && selectedTab === 0 && openTaskList.length > 0 && (
              <div className="pt30 pr30 pb30 pl30">
                {openTaskList.length > 0 &&
                  openTaskList.map((element, index) => {
                    return (
                      <MyTaskListItem
                        key={index}
                        data={element}
                        refreshData={RefreshData}
                      />
                    );
                  })}
              </div>
            )}

            {!showProgress && selectedTab === 1 && bookedTaskList.length <= 0 && (
              <div className="d-flex justify-content-center align-items-center pt80 pb80 text-center">
                <div>
                  <span>{Svg.blanTaskIcon}</span>
                  <p className="fs18 mt20 mb2 colorBlack">
                    There is no any booked Task
                  </p>
                  <p className="fs14">
                    Use "Create New Task" button and create a task for what
                    service you needed.
                  </p>
                </div>
              </div>
            )}
            {!showProgress && selectedTab === 1 && bookedTaskList.length > 0 && (
              <div className="pt30 pr30 pb30 pl30">
                {bookedTaskList.length > 0 &&
                  bookedTaskList.map((element, index) => {
                    return <BookedItems key={index} data={element} />;
                  })}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default CustomerDashboard;

const MyTaskListItem = (props) => {
  return (
    <div>
      <Row className="bBottom mb30 pb20">
        <Col lg={9} xs={12}>
          <Row>
            <Col lg={3} xs={12}>
              <span className="mr15">
                <img
                  className="img-fluid w-100"
                  src={Img.placedashboard.default}
                  alt=""
                />
              </span>
            </Col>

            <Col lg={9} xs={12}>
              <div>
                <p className="fs13 mb5 colorPara">
                  <span className="mr5">{Svg.calenderOrange}</span>
                  {new Date(props.data.createdAt).toString()}
                </p>
                <p className="fs18 mb5 fw600 colorBlack dBlock_mob">
                  <span>{props.data.title}</span>

                  <span
                    className={`bgGreen radius4 fw400 pl15 pr15 ml10 pt3 pb3 fs12`}
                  >
                    {(() => {
                      if (props.data.isBroadcast) {
                        return props.data.interestcount + " interested";
                      } else {
                        return "requested";
                      }
                    })()}
                  </span>
                </p>
                <p className="fs14 mb5 colorPara">{props.data.information}</p>
                <Link
                  to={`/customer/task/${props.data._id}`}
                  className="fs15 colorOrange pointer hoverablelink"
                >
                  View Details
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} xs={12}>
          <div className="d-flex justify-content-end">
            <div className="text-end">
              <UncontrolledDropdown className="noBgonDropDown">
                <DropdownToggle>
                  <span>{Svg.three_dots}</span>
                </DropdownToggle>
                <DropdownMenu className="radius4 shadow noBorder">
                  <DropdownItem>
                    <ul className="noBg noUl mb0">
                      <li>
                        <Link
                          to="#"
                          onClick={() => {
                            FormModal.show(
                              <CancelJobRequest
                                taskID={props.data._id}
                                callback={props.refreshData}
                              />,
                              "",
                              () => {},
                              "md"
                            );
                          }}
                          className="fs15 d-block colorPara"
                        >
                          Cancel
                        </Link>
                      </li>
                    </ul>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <p className="fs18 colorBlack">
                {props.data.minbudget}
                <span className="fs14 colorOrange">R</span> {"-"}{" "}
                {props.data.maxbudget}
                <span className="fs14 colorOrange">R</span>
              </p>

              <span className="fs14 pl10 pr10 pt5 radius pb5 borderGrey">
                {(() => {
                  return props.data.status;
                })()}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const BookedItems = (props) => {
  console.log("res",props);
  const cancelTask = () => {};
  return (
    <div>
      <Row className="bBottom mb30 pb20">
        <Col lg={9} xs={12}>
          <Row>
            <Col lg={3} xs={12}>
              <span className="mr15">
                <img
                  className="img-fluid w-100"
                  src={Img.placedashboard.default}
                  alt=""
                />
              </span>
            </Col>

            <Col lg={9} xs={12}>
              <div>
                <p className="fs13 mb5 colorPara">
                  <span className="mr5">{Svg.calenderOrange}</span>
                  {new Date(props.data.createdAt).toString()}
                </p>
                <p className="fs18 mb5 fw600 colorBlack dBlock_mob">
                  <span>{props.data.title}</span>

                  <span className="bgGreen radius4 fw400 pl15 pr15 ml10 pt3 pb3 fs12">
                    {(() => {
                      if (props.data.isBroadcast) {
                        return props.data.interestcount + " interested";
                      } else {
                        return "requested";
                      }
                    })()}
                  </span>
                </p>
                <p className="fs14 mb5 colorPara">{props.data.information}</p>
                <Link
                  to={`/customer/booked/task/${props.data._id}`}
                  className="fs15 colorOrange pointer hoverablelink"
                >
                  View Details
                </Link>
                <div className="d-flex mt10">
                  <div className="border-left b-left mr10"></div>
                  <div>
                    <img
                      src={
                        props.data.providerid.logoimage &&
                        props.data.providerid.logoimage === "null"
                          ? Img.rectangle2547.default
                          : API.imageurl + props.data.providerid.logoimage
                      }
                      alt=""
                      className="mytasks-logo radius100 mr10"
                    />
                  </div>
                  <div>
                    <span className="fs16 colorBlack">
                      {props.data.providerid.bussinessname}
                    </span>
                    <p className="fs16 colorBlack mb0">
                      <span style={{ color: "rgb(133 133 133)" }}>&#9742;</span>{" "}
                      {props.data.providerid.phone}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} xs={12}>
          <div className="d-flex justify-content-end">
            <div className="text-end">
              {/* <CmnButton
                type="square"
                icon={Svg.pencilBlack}
                className="btnTransparent btnTransparentBlack radius7"
                text="Write a review"
                onClick={() =>
                  //FormModal.show(
                    <BookedReview businessID={props.data.providerid._id} />,
                    "",
                    () => {},
                    "md"
                  )
                }
              /> */}

              <p className="fs18 colorBlack mt10 mb40">
                {props.data.minbudget}
                <span className="fs14 colorOrange">R</span> {"-"}{" "}
                {props.data.maxbudget}
                <span className="fs14 colorOrange">R</span>
              </p>

              <span className="fs14 pl10 pr10 pt5 colorGreen radius pb5 borderGreen">
                {props.data.status && props.data.status}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

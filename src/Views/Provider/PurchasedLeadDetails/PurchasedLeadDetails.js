/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
// import Img from "../../../Assets/Img/Img"
// import Svg from "../../../Assets/Img/svg/Svg"
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import "./PurchasedLeadDetails.scss";
import TimeAgo from "react-timeago";
import API from "../../../Helpers/Constants/Constants";
import ConfirmModal02 from "../../../Components/ConfirmModal02/ConfirmModal02";
import { Redirect } from "react-router-dom";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import FormModal from "../../../Components/FormModal/FormModal";
import CreateQuoteNew from "../CreateQuoteSetup/CreateQuoteNew";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import CreateInvoiceSetup from "../CreateInvoiceSetup/CreateInvoiceSetup";
import { useDispatch } from "react-redux";
import { LeadPurchased } from "../CustomerRequest/request.action";
import ViewQuoteProvider from "../../Customer/Booked/ViewQuote/ViewQuoteProvider";

const PurchasedLeadDetails = (props) => {
  const dispatch = useDispatch();
  const [taskDetails, setTaskDetails] = useState(null);
  const [catqueansData, setCatqueansData] = useState(null);
  const [showProgress, setshowProgress] = useState(true);
  const [taskPurchased, settaskPurchased] = useState(false);
  const [businessid, setBusinessId] = useState(props.businessid);
  const [gotonext, setgotonext] = useState(false);
  const [gotoPage, setgotoPage] = useState("");
  const [gotonextInvoice, setgotonextInvoice] = useState(false);
  const [gotoPageInvoice, setgotoPageInvoice] = useState("");
  const [taskStatus, setTaskStatus] = useState("open");

  useEffect(() => {
    loadTaskDetails();
  }, []);

  const loadTaskDetails = () => {
    const refid = { taskid: props.taskid, businessid: props.businessid };
    setBusinessId(props.businessid);
    //console.log("props.businessid",props.businessid);

    // if (history.location.state) refid = history.location.state.taskid;
    if (refid) {
      try {
        HTTP.post(
          "taskDetailForProvider",
          refid,
          true,
          false,
          Auth.getToken()
        ).then((res) => {
         console.log("res:", res);
          if (res.data) {
            setTaskDetails(res.data);
            if (res.data.catqueans) {
              setCatqueansData(res.data.catqueans);
            }
            if (res.data.leadpurchased.length > 0) {
              settaskPurchased(true);
            }

            getTaskStatus(res.data.leadpurchased);
          }
          setshowProgress(false);
        });
      } catch (err) {
        console.log("erorr res:", err);
        setshowProgress(false);
      }
    } else {
      console.log("erorr refid:", "invalid task id.");
    }
  };

  const GenerateQuestionAnswer = (props) => {
    const { data } = props;
    if (data) {
      if (
        data.questionSetId.qusType === "SingleChoice" ||
        data.questionSetId.qusType === "MultiChoice"
      ) {
        return <GenerateSingleQuestionAnswer data={data} />;
      } else if (data.questionSetId.qusType === "Number") {
        return <GenerateNumberQuestionAnswer data={data} />;
      }
    } else {
      return "";
    }
  };

  const GenerateSingleQuestionAnswer = (props) => {
    const { data } = props;
    return (
      <>
        <div className="fBold fs16 colorPara mb15">
          Q. {data.questionSetId.qusTitle}
        </div>
        <ul>
          {data.answerIds.length > 0 &&
            data.answerIds.map((element, index) => {
              return <li className="fs15">{element.data}</li>;
            })}
        </ul>
      </>
    );
  };

  const GenerateNumberQuestionAnswer = (props) => {
    const { data } = props;
    return (
      <>
        <div className="fBold fs16 colorPara mb15">
          Q. {data.questionSetId.qusTitle}
        </div>
        <ul>
          <li className="fs15">{data.answerText}</li>
        </ul>
      </>
    );
  };

  const purchaseTask = (businessId, taskId) => {
    ConfirmModal02.show(
      "Are you viewed all information about the task? Sure to buy the lead?",
      () => {
        HTTP.post(
          API.purchaseTask,
          { businessid: businessId, taskid: taskId },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          console.log(res);
          if (res && res.status && res.status.toString() === "200") {
            settaskPurchased(true);
            dispatch(LeadPurchased({ taskid: taskId, businessid: businessId }));
            props.refreshData();
            AlertModal.hide();
          }
        });
      }
    );
  };

  const createLeadQuotation = (data) => {
    FormModal.show(
      <CreateQuoteNew
        businessData={data.leadpurchased[0].businessid}
        businessid={data.leadpurchased[0].businessid._id}
        taskid={data._id}
        userData={data.userid}
      />,
      "",
      () => {},
      "xl",
      "",
      true,
      true
    );
    GLocalStorage.Add("quoteInfo", {
      businessid: data.leadpurchased[0].businessid._id,
      taskid: data._id,
      userData: data.userid,
    });
  };

  const createLeadInvoice = (data) => {
    FormModal.show(
      <CreateInvoiceSetup
        businessData={data.leadpurchased[0].businessid}
        businessid={data.leadpurchased[0].businessid._id}
        taskid={data._id}
        userData={data.userid}
      />,
      "",
      () => {},
      "xl",
      "",
      true,
      true
    );
    GLocalStorage.Add("InvoiceInfo", {
      businessid: data.leadpurchased[0].businessid._id,
      taskid: data._id,
      userData: data.userid,
    });
  };

  const ViewQuoteDetails = (data) => {
    FormModal.show(
      <div style={{ padding: "0px 35px" }}>
        <ViewQuoteProvider
          data={{
            taskData: data._id,
            quoteData: data.leadpurchased[0].quote[0],
            businessData: data.leadpurchased[0].businessid,
          }}
        />
      </div>,
      "",
      () => {},
      "xl"
    );
  };

  const getTaskStatus = (leadpurchased) => {
    if (leadpurchased) {
      if (leadpurchased.length > 0) {
        leadpurchased.forEach((element, index) => {
          if (element.businessid._id === props.businessid) {
            setTaskStatus(element.status);
          }
        });
      }
    }
  };

  return (
    <>
    
      {gotonext && (
        <Redirect
          to={{
            pathname: "/provider/create-quote",
            businessid: props.businessid ? props.businessid : null,
            taskid: props.taskid ? props.taskid : null,
          }}
        ></Redirect>
      )}
      {gotoPage === "/provider/create-quote" && (
        <Redirect to="/provider/create-quote" />
      )}

      {gotonextInvoice && (
        <Redirect
          to={{
            pathname: "/provider/create-invoice",
            businessid: props.businessid ? props.businessid : null,
            taskid: props.taskid ? props.taskid : null,
          }}
        ></Redirect>
      )}
      {gotoPageInvoice === "/provider/create-invoice" && (
        <Redirect to="/provider/create-invoice" />
      )}
      <Container>
        <Row>
          {showProgress && <LoadinMsg />}
          {!showProgress && taskDetails && (
            <section className="bgWhite pb30 ps-4 pe-4 radius">
              <div>
                <h1 className="fs24 fBold mb30">
                  Request for {taskDetails.title}
                </h1>
                <Row>
                  <Col lg={8}>
                    <div className="d-flex mb15 align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src={
                              taskDetails.userid.profileimage
                                ? API.imageurl + taskDetails.userid.profileimage
                                : Img.placedashboard.default
                            }
                            alt=""
                            className="pur-rd-logo mr10 radius100"
                          />
                        </div>
                        <div>
                          <p className="fs15 mb0">POSTED</p>
                          <p className="fs15 mb0 colorOrange">
                            {taskDetails.userid.firstname +
                              " " +
                              taskDetails.userid.lastname}
                          </p>
                        </div>
                      </div>
                      <p className="fs14 mb0">
                        <TimeAgo date={taskDetails.createdAt} />
                      </p>
                    </div>
                    <div className="bBottom mb15"></div>
                    <div className="d-flex mb15">
                      <div className="mr10">{Svg.rd_location}</div>
                      <div>
                        <p className="fs14 mb0">LOCATION</p>
                        <p className="fs14 mb0 colorBlack">
                          {taskDetails.address}
                        </p>
                      </div>
                    </div>
                    <div className="bBottom mb15"></div>
                    <div className="d-flex mb15">
                      <div className="mr10">{Svg.due_date}</div>
                      <div>
                        <p className="fs14 mb0">DUE DATE</p>
                        <p className="fs14 mb0 colorBlack">
                          {new Date(taskDetails.todate).toDateString()} |{" "}
                          {taskDetails.timeslot}
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={4} className="xsOrder1">
                    <div className="border radius pt10 pb10 mb10">
                      {(() => {
                        if (!taskPurchased) {
                          return (
                            <p className="fs14 mb5 text-center">TASK BUDGET</p>
                          );
                        } else if (taskPurchased) {
                          return (
                            <p className="fs16 mb5 text-center colorGreen">
                              PURCHASED
                            </p>
                          );
                        }
                      })()}

                      <h1 className="fs30 fw700 mb10 fBold text-center">{`R${taskDetails.minbudget} - R${taskDetails.maxbudget}`}</h1>
                      <div className="d-flex justify-content-center">
                        {!taskPurchased && (
                          <CmnButton
                            type="square"
                            text="Purchase"
                            className="fBold mobBtnSm tabMb10"
                            onClick={(e) => {
                              purchaseTask(businessid, taskDetails._id);
                            }}
                          />
                        )}
                        {(() => {
                          var purchasedInfo = taskDetails.leadpurchased;

                          if (
                            taskPurchased &&
                            purchasedInfo &&
                            purchasedInfo.length > 0
                          ) {
                            console.log(
                              "purchasedInfo :=",
                              purchasedInfo[0].status
                            );
                            if (purchasedInfo[0].status === "open") {
                              return (
                                <div className="text-sm-start text-xs-start text-end">
                                  <CmnButton
                                    type="square"
                                    text="Send Quote"
                                    className="fBold mobBtnSm tabMb10"
                                    onClick={(e) =>
                                      createLeadQuotation(taskDetails)
                                    }
                                  />
                                </div>
                              );
                            } else if (purchasedInfo[0].status === "sent") {
                              return (
                                <div className="text-sm-start text-xs-start text-end">
                                  <CmnButton
                                    type="square"
                                    text="View Quote"
                                    className="fBold mobBtnSm tabMb10"
                                    onClick={(e) =>
                                      ViewQuoteDetails(taskDetails)
                                    }
                                  />
                                </div>
                              );
                             
                            } else if ( 
                              
                              taskDetails.providerid!==null &&
                              taskDetails.providerid === props.businessid && 
                              taskDetails.invoice.length === 0 &&
                              taskDetails.status==="assigned") {

                              return (
                                <div className="text-sm-start text-xs-start text-end">
                                  <CmnButton
                                    type="square"
                                    text="Create Invoice"
                                    className="fBold mobBtnSm tabMb10"
                                    onClick={(e) =>
                                      createLeadInvoice(taskDetails)
                                    }
                                  />
                                </div>
                              );
                            }
                          }
                        })()}

                        {
                            console.log("purchasedInfo1", taskDetails.providerid)
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="bBottom mb30"></div>
                  <Col lg={12} className="xsOrder2">
                    <h3 className="fs20 fw700">Customer Details</h3>

                    <div className="d-flex mb7">
                      <span className="mr10">{Svg.peopleGrey}</span>
                      <p className="fs14 colorBlack mb0">
                        {taskDetails.userid.firstname +
                          " " +
                          taskDetails.userid.lastname}
                      </p>
                    </div>
                    <Col lg={8}>
                      <div className="d-flex justify-content-between mb7">
                        <div className="d-flex">
                          <span className="mr5">{Svg.rd_phone}</span>
                          <p className="fs14 colorBlack mb0">
                            <div className="d-flex align-items-center">
                              <p className="mb0 ml5 fItalic">
                                After purchased lead you can see the contact
                                information &emsp;
                                <span className="fs12 radius colorGreen pt2 pb2 pl15 pr15 bgGreenOpacity">
                                  Verified
                                </span>
                              </p>
                            </div>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb7">
                        <div className="d-flex">
                          <span className="mr5">{Svg.rd_email}</span>
                          <p className="fs14 colorBlack mb0">
                            <div className="d-flex align-items-center">
                              <p className="mb0 ml5 fItalic">
                                After purchased lead you can see the contact
                                information &emsp;
                                <span className="fs12 radius colorGreen pt2 pb2 pl15 pr15 bgGreenOpacity">
                                  Verified
                                </span>
                              </p>
                            </div>
                          </p>
                        </div>
                      </div>
                    </Col>

                    <div className="bBottom mb20 mt20"></div>

                    <div className="mb20 mt15">
                      <h3 className="fs20 fw700">Request Description</h3>
                      <p className="fs15 w-75">{taskDetails.information}</p>
                    </div>

                    <div className="bBottom mb20 mt20"></div>

                    <h3 className="fs20 fw700 mb13">Time Schedule</h3>
                    <div className="d-flex mb15">
                      <span className="mr10">{Svg.clockgrey}</span>
                      <p className="fs14 colorBlack mb0">
                        {taskDetails.timeslot}
                      </p>
                    </div>

                    <div className="bBottom mb20 mt20"></div>

                    <h3 className="fs20 fw700 m-0 p-0 mb-1 ">
                      More Details (FAQ)
                    </h3>
                    <p className="fs13 colorPara mb13">
                      Frequently asked question to tasker and it's reply.
                    </p>

                    {catqueansData.length > 0 &&
                      catqueansData.map((element, index) => {
                        return <GenerateQuestionAnswer data={element} />;
                      })}
                  </Col>
                </Row>
              </div>
              <div className="bBottom mb30"></div>
              <Row>
                <div className="mb20">
                  <Col lg={10}>
                    <h3 className="fs20 fw700 mb20">Purchase Details</h3>
                    {(() => {
                      if (taskDetails.isBroadcast === true) {
                        return (
                          <>
                            <div className="d-flex justify-content-between mb7">
                              <p className="fs14 mb0">Pros Purchased</p>
                              <span className="fs12 pt2 pb2 radius colorPara bgPara pl20 pr20 bgGreyOpacity">
                                {taskDetails.interestcount}/5
                              </span>
                            </div>
                            <div className="bBottom mb5 mt5"></div>
                          </>
                        );
                      }
                    })()}

                    <div className="d-flex justify-content-between mb7">
                      <p className="fs14 mb0">Cost to Quote</p>
                      <span className="fs12 radius pt2 pb2 colorGreen bgGreenOpacity pl15 pr15 ">
                        {taskDetails.creditpoints} Credits
                      </span>
                    </div>
                    <div className="bBottom mb5 mt5"></div>
                    <div className="d-flex justify-content-between mb7">
                      <p className="fs14 mb0">Status</p>
                      <p className="fs14 mb0 colorOrange">
                        {(() => {
                          if (taskDetails.status === "open") {
                            return "Open to Purchase";
                          } else if(taskDetails.status === "assigned" || taskDetails.status === "purchased") {
                            return "Assigned";
                          }else{
                            return "Closed";
                          }
                        })()}
                        {/* {taskDetails.interestcount < 5
                          ? "Open to Purchase"
                          : "Purchase Closed"} */}
                      </p>
                    </div>
                  </Col>
                  <Col lg={3}></Col>
                </div>
              </Row>
              <div className="bBottom mb30"></div>

              <Row>
                <div className="mb30">
                  <Col lg={9}>
                    <h3 className="fs20 fw700 mb13">Quote Request Number</h3>
                    <p className="fs14 mb0">{taskDetails._id}</p>
                  </Col>
                  <Col lg={3}></Col>
                </div>
                <Row>
                {
                  taskDetails.files &&
                  taskDetails.files.map((elem,ind)=>{
                    return(
                      <Col lg={4} md={6} xl={4}>
                      <img className="w-100 radius4" src={API.imageurl+elem} alt="" />
                      </Col>

                      
                    );
                  })
                }
                </Row>
              </Row>

              {/* <Row>
                <div className="mb30">
                  <Col lg={9} xs={12} md={12}>
                    <h3 className="fs20 fw700 mb13">Project History</h3>
                    <Row className="mb5">
                      <Col lg={6} xs={7}>
                        <p className="fs14 mb0">April 26, 2021 7:26 am</p>
                      </Col>
                      <Col lg={6} xs={5}>
                        <p className="fs14 mb0">Task Created</p>
                      </Col>
                    </Row>

                    <Row className="mb5">
                      <Col lg={6} xs={7}>
                        <p className="fs14 mb0">April 26, 2021 7:26 am</p>
                      </Col>
                      <Col lg={6} xs={5}>
                        <p className="fs14 mb0">Lead Purchased</p>
                      </Col>
                    </Row>

                    <Row className="mb5">
                      <Col lg={6} xs={7}>
                        <p className="fs14 mb0">April 26, 2021 7:26 am</p>
                      </Col>
                      <Col lg={6} xs={5}>
                        <p className="fs14 mb0">Quotation Accepted</p>
                      </Col>
                    </Row>
                    <Row className="mb5">
                      <Col lg={6} xs={7}>
                        <p className="fs14 mb0">April 26, 2021 7:26 am</p>
                      </Col>
                      <Col lg={6} xs={5}>
                        <p className="fs14 mb0">Close Lead</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={3}></Col>
                </div>
              </Row> */}
            </section>
          )}
        </Row>
      </Container>
    </>
  );
};

export default PurchasedLeadDetails;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import "./Booked.scss";
import CreateQuoteInvoice from "./Invoice/CreateQuoteInvoice";
import BookedReview from "./Review/Review";
import Timeago from "react-timeago";
import API from "../../../Helpers/Constants/Constants";
import ViewQuote from "./ViewQuote/ViewQuote";
import FormModal from "../../../Components/FormModal/FormModal";

const Booked = () => {
  const { refid } = useParams();
  const [taskData, settaskData] = useState("");
  const [catqueans, setcatqueans] = useState([]);
  const [showProgress, setshowProgress] = useState(true);
  const [latitude, setlatitude] = useState(35.856737);
  const [longitude, setlongitude] = useState(10.606619);

  useEffect(() => {
    if (refid) {
      setTimeout(() => {
        loadTaskData(refid);
      }, 500);
    }
  }, []);

  const loadTaskData = (id) => {
    setshowProgress(true);
    try {
      HTTP.get("task/" + id, false, Auth.getToken()).then((res) => {
        if (res.data) {
          console.log("loggg",res);
          settaskData(res.data);
          if (res.data.catqueans) {
            setcatqueans(res.data.catqueans);
          }
        }
        setshowProgress(false);
      });
    } catch (error) {
      console.log("error", error);
      setshowProgress(false);
    }
  };

  return (
    <>
   
      <section className="bgLightOrange pt60 pb60">
        {showProgress && (
          <div className="pageBody">
            <LoadinMsg message="" />
          </div>
        )}
        {!showProgress && (
          <Container>
            <Row className="align-items-center mb30">
              <Col lg={1} xs={1}>
                <div className="mb0">
                  <Link to="/customer/dashboard">
                    <span>{Svg.backArrow}</span>
                  </Link>
                </div>
              </Col>
              <Col lg={11} xs={11}>
                <div className="d-flex align-items-center justify-content-end">
                  <p className="fs14 mr10 mb0">
                    <Timeago date={taskData.createdAt} />
                  </p>
                  {/* <span className="fs16 colorBlack radius borderGreen pl20 pr20 pt5 pb5 mr10">
                    Awaiting Approval
                  </span> */}
                  <UncontrolledDropdown className="noBgonDropDown">
                    <DropdownToggle>
                      <span>{Svg.three_dots}</span>
                    </DropdownToggle>
                    <DropdownMenu className="radius4 shadow noBorder">
                      <DropdownItem>
                        <ul className="noBg noUl mb0">
                          <li>
                            <Link to="#" className="fs15 colorPara">
                              Cancel task
                            </Link>
                          </li>
                        </ul>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>

            <Row>
              <h2 className="fs28 colorBlack fBold">
                Request for {taskData.title}
              </h2>
              <Col lg={8}>
                <div className="bgWhite radius pt30 pb30 pl20 pr20">
                  <div className="mb30">
                    <h3 className="fs20 fw700">Request Description</h3>
                    <p className="fs16">{taskData.information}</p>
                  </div>
                  <div className="bBottom mb30"></div>
                  <h3 className="fs20 fw700 mb13">More Details</h3>
                  {catqueans.length > 0 &&
                    catqueans.map((element, index) => {
                      return <GenerateQuestionAnswer data={element} />;
                    })}
                  <div className="bBottom mb30"></div>
                  <h3 className="fs20 fw700 mb8">Task Budget</h3>
                  <div className="mb30">
                    <p className="fs14 mb1">
                      What is your budget for this offer?
                    </p>
                    <p className="fs16 mb0 colorBlack">
                      R{taskData.minbudget} - R{taskData.maxbudget}
                    </p>
                  </div>
                  <div className="bBottom mb30"></div>
                  <h3 className="fs20 fw700 mb8">Location</h3>
                  <p className="fs16 colorBlack">
                    <span className="mr10">{Svg.locationPin}</span>{" "}
                    {taskData.address}
                  </p>

                  <div className="mapList mb30">
                
                  </div>
                  <div className="bBottom mb30"></div>
                  <div className="mb30">
                    <h3 className="fs20 fw700 mb8">Request ID</h3>
                    <p className="fs16 mb0 text-uppercase">
                      REF: {taskData._id}
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <h3 className="fs20 fw700 mb8 text-center mb-3">
                  Accepted Provider
                </h3>
                <AcceptedProvider taskData={taskData} />
                {/* <InterestedProvdersView taskid={taskid} /> */}
                {taskData && taskData.isBroadcast && (
                  <>
                    <h3 className="fs20 fw700 mb8">Unsuccessfull Provider</h3>
                    <UnsuccessfulProviders taskid={taskData._id} />
                  </>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
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
      <div className="fBold fs16">{data.questionSetId.qusTitle}</div>
      <ul>
        {data.answerIds.length > 0 &&
          data.answerIds.map((element, index) => {
            return <li>{element.data}</li>;
          })}
      </ul>
    </>
  );
};

const GenerateNumberQuestionAnswer = (props) => {
  const { data } = props;
  return (
    <>
      <div className="fBold fs16">{data.questionSetId.qusTitle}</div>
      <ul>
        <li>{data.answerText}</li>
      </ul>
    </>
  );
};

const AcceptedProvider = (props) => {
  const { taskData } = props;

  useEffect(() => {
  }, []);

  const openInvoice = () => {
    AlertModal.show(<CreateQuoteInvoice />, "", () => {}, "xl");
  };

  const viewQuote = (taskid, quoteData, businessData) => {
    FormModal.show(
      <ViewQuote
        data={{
          taskData: taskid,
          quoteData: quoteData,
          businessData: businessData,
        }}
      />,
      "",
      () => {},
      "lg"
    );
  };

  return (
    <>
      {taskData && (
        
        <div className="bgWhite radius pt25 pb20 pl15 pr15 mb25">
          <div className="text-center">
            {
              console.log("taskData",taskData)
            }
            <div>
              <img
                src={taskData.providerid.logoimage ? API.imageurl+taskData.providerid.logoimage : Img.busPro1.default}
                alt=""
                className="radius100 w80 mb15"
              />
            </div>
            <p className="fs18 colorBlack mb5">
              {taskData.providerid.bussinessname}
            </p>
            <div className="rating colorPara fs16 mb10">
              <span className="colorBlack fs16">
                {taskData.providerid.avg_rating ? taskData.providerid.avg_rating : 0}{" "}
                <span className="staryellow">{Svg.fillStar}</span>
              </span>
              <span className="ml10">Ratings</span>
            </div>
            <div className="mb20">
              <span className="mr7">{Svg.rd_phone} </span>
              <span className="mr7">{taskData.providerid.phone}</span>
              <span className="mr7">{Svg.rd_email}</span>
              <span className="fs16 colorBlack">
                {taskData.providerid.email}
              </span>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center">
              {(() => {
                try {
                  var acceptedProviderId = taskData.providerid.id;
                  var quotationData = null;
                  for (let provider of taskData.leadpurchased) {
                    if (acceptedProviderId === provider.businessid.id) {
                      quotationData = provider;
                    }
                  }

                  if (quotationData) {
                    if (quotationData.status === "open") {
                      return (
                        <CmnButton
                          onClick={() => {
                            AlertModal.show(
                              <p className="colorPara fs-6">
                                Provider is preparing the quotation. Once
                                prepared than you can view the quote and proceed
                                further.
                              </p>,
                              "🛈 Information!"
                            );
                          }}
                          type="noBg"
                          icon={Svg.black_book}
                          text="Quote Pending"
                          className="btnTransparentBlack mr10 radius4 pt6 pb7 pl15 pr15"
                        />
                      );
                    } else if (quotationData.status === "sent") {
                      return (
                        <CmnButton
                          onClick={(e) =>
                            viewQuote(
                              taskData._id,
                              quotationData.quote[0],
                              quotationData.businessid
                            )
                          }
                          type="noBg"
                          icon={Svg.black_book}
                          text="View Quote"
                          className="btnTransparentBlack mr10 radius4 pt6 pb7 pl15 pr15"
                        />
                      );
                    }else if(taskData.status==="completed"){
                      <CmnButton
                      type="square"
                      icon={Svg.white_pencil}
                      text="Write a review"
                      className=""
                      onClick={() =>
                        AlertModal.show(<BookedReview taskID={taskData._id} providerID={taskData.providerid} />, "", () => {}, "lg")
                      }
                    />
                    }
                  }
                } catch (e) {}
              })()}


            
            </div>
          </div>
        </div>
      )}

      {!taskData && <p>Accepted provider profile not found.</p>}
    </>
  );
};

const UnsuccessfulProviders = (props) => {
  const { taskid } = props;
  const [providersList, setprovidersList] = useState(null);

  useEffect(() => {
    loadUnscuessfullProviders(taskid);
  }, []);

  const loadUnscuessfullProviders = (taskid) => {
    if (taskid) {
      try {
        HTTP.post(
          API.unsuccessfulTaskProviders,
          { taskid: taskid },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            setprovidersList(res.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {providersList &&
        providersList.length > 0 &&
        providersList.map((el, ind) => {
          return (
            <div key={ind}>
              <div className="bgWhite radius pt10 pb10 pl15 pr15 mb5">
                <div className="d-flex w-100 ">
                  <div
                    style={{ flex: "0 1 55px", width: "55px" }}
                    className="mr10"
                  >
                    <img
                      src={
                        el.logoimage
                          ? API.imageurl + el.logoimage
                          : Img.busPro1.default
                      }
                      alt=""
                      className="img-fluid radius100 mr15"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="fs16 colorBlack mb0">{el.bussinessname}</p>
                    <div className="rating colorPara fs16 mb10">
                      <span className="colorBlack fs14">
                        {el.avg_rating}{" "}
                        <span className="staryellow">{Svg.fillStar}</span>
                      </span>
                      <span className="fs14 ml5 colorpara">
                        Ratings ({el.taskcount} tasks)
                      </span>
                    </div>
                    <ul className="mb0 noUl colorpara w-100">
                      <li className="fs14 mb3 d-flex w-100 justify-content-between">
                        <div>
                          <span className="mr10 ">{Svg.rd_phone}</span>
                          {el.phone}
                        </div>
                      </li>
                      <li className="fs14">
                        <span className="mr10 ">{Svg.rd_email}</span>
                        {el.email}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {!providersList && <p>There is no unsuccessfull Providers.</p>}
    </>
  );
};

export default Booked;

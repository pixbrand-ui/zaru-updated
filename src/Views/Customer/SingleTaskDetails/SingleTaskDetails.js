/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import Img from "../../../Assets/Img/Img";
import { Link, useParams } from "react-router-dom";
import "./SingleTaskDetails.scss";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import API from "../../../Helpers/Constants/Constants";
import FormModal from "../../../Components/FormModal/FormModal";
import CreateQuoteInvoice from "../Booked/Invoice/CreateQuoteInvoice";
import Timeago from "react-timeago";
import ViewQuote from "../Booked/ViewQuote/ViewQuote";
const SingleTaskDetails = () => {
  const { taskid } = useParams();
  const [taskData, settaskData] = useState("");
  const [catqueans, setcatqueans] = useState([]);
  const [showProgress, setshowProgress] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      loadTaskData(taskid);
    }, 500);
  }, []);

  const loadTaskData = (id) => {
    setshowProgress(true);
    try {
      HTTP.get("task/" + id, false, Auth.getToken()).then((res) => {
        console.log("res:", res);
        if (res.data) {
          settaskData(res.data);
          if (res.data.catqueans) {
            setcatqueans(res.data.catqueans);
            console.log(res.data.catqueans);
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
                  <p className="fs14 mr10 mb0"><Timeago date={taskData.createdAt} /></p>
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
                    <iframe
                      title="#"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15280116.95864286!2d73.72945418007228!3d20.7711595857707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1639391426404!5m2!1sen!2sin"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
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
                <h3 className="fs20 fw700 mb8">Interested Providers</h3>
                <InterestedProvdersView taskid={taskid} />
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

const InterestedProvdersView = (props) => {
  const [interestedProviders, setInterestedProviders] = useState([]);
  const [showprogress, setshowprogress] = useState(true);

  useEffect(() => {
    loadProviders().then((res) => {
      setInterestedProviders(res);
      setshowprogress(false);
    });
  }, []);

  const loadProviders = async () => {
    setshowprogress(true);
    let result = [];
    try {
      await HTTP.post(
        API.taskInterestedProvider,
        { taskid: props.taskid },
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status === 200) {
          if (res.data) {
            result = res.data;
            return result;
          }
        }
      });
    } catch (error) {
      setshowprogress(false);
      console.error(error);
    }
    return result;
  };
  return (
    <>
      <div className="mt15">
        {/* people_orange */}
        {console.log("interestedProviders", interestedProviders)}
        {interestedProviders && interestedProviders.length > 0 ? (
          <>
            {interestedProviders.length === 1 && (
              <>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
              </>
            )}
            {interestedProviders.length === 2 && (
              <>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
              </>
            )}
            {interestedProviders.length === 3 && (
              <>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_grey}</span>
                <span className="mr10">{Svg.people_grey}</span>
              </>
            )}
            {interestedProviders.length === 4 && (
              <>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_grey}</span>
              </>
            )}
            {interestedProviders.length === 5 && (
              <>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
                <span className="mr10">{Svg.people_orange}</span>
              </>
            )}
          </>
        ) : (
          <>
            <span className="mr10">{Svg.people_grey}</span>
            <span className="mr10">{Svg.people_grey}</span>
            <span className="mr10">{Svg.people_grey}</span>
            <span className="mr10">{Svg.people_grey}</span>
            <span className="mr10">{Svg.people_grey}</span>
          </>
        )}
      </div>
      {showprogress && (
        <div className="pt50 d-flex justify-content-center align-items-center">
          <LoadinMsg message="Loading providers.." />
        </div>
      )}
      {!showprogress && interestedProviders.length > 0 && (
        <>
          {interestedProviders.map((element, index) => {
            return (
              <InterestedProviderItem
                key={index}
                data={element}
                taskid={props.taskid}
              />
            );
          })}
        </>
      )}
      {!showprogress && interestedProviders.length <= 0 && (
        <>
          <div className="colorPara w-100 fs14 mt15">
            No any interested provider yet.
          </div>
        </>
      )}
    </>
  );
};

const InterestedProviderItem = ({ data, taskid }) => {
  return (
    <div className="bgWhite radius pt15 pb15 pr20 pl30 mb5 bBottom w-100 mt20">
      <div className="d-flex  w-100 flex-wrap justify-content-between">
        <div style={{ flex: "0 1 55px", width: "55px" }} className="mr10">
          <img
            src={
              data.businesses.logoimage
                ? API.imageurl + data.businesses.logoimage
                : Img.busPro.default
            }
            alt=""
            className="img-fluid radius100 mr15"
          />
        </div>
        <div style={{ flex: 1 }}>
          <p className="fs16 colorBlack mb0">{data.businesses.bussinessname}</p>
          <div className="rating colorPara fs16 mb10">
            <span className="colorBlack fs14">
              {data.ratings ? data.ratings : 0}{" "}
              <span className="staryellow">
                {data.ratings !== null ? Svg.fillStarYellow : Svg.greyStarSmall}
              </span>
            </span>
            <span className="fs14 ml5 colorpara">
              Ratings ({data.tasks ? data.tasks : 0} tasks)
            </span>
          </div>
          <ul className="mb0 noUl colorpara w-100">
            <li className="colorPara fs14 mb3 d-flex w-100 justify-content-between">
              <div>
                <span className="mr10 ">{Svg.rd_phone}</span>
                {data.businesses.phone
                  ? data.businesses.phone
                  : "contact details not available"}
              </div>
              <div>
                {data.quote && data.quote.length > 0 && (
                  <span className="fs14 colorOrange svgOrange">
                    <img
                      alt=""
                      className="mr5"
                      style={{ width: "12px" }}
                      src={Img.book.default}
                    />
                    <Link
                      to="#"
                      onClick={(e) => {
                        console.log("data.quote[0]", data.quote[0]);
                        FormModal.show(
                          <ViewQuote
                            data={{
                              taskData: taskid,
                              quoteData: data.quote[0],
                              businessData: data.businesses,
                            }}
                          />,
                          "",
                          () => {},
                          "lg"
                        );
                      }}
                    >
                      View Quote
                    </Link>
                  </span>
                )}
                {data.quote && data.quote.length <= 0 && (
                  <span
                    className="fs14 colorPara svgOrange"
                    style={{ cursor: "default" }}
                  >
                    <img
                      alt=""
                      className="mr5"
                      style={{ width: "12px" }}
                      src={Img.book.default}
                    />
                    Pending
                  </span>
                )}
              </div>
            </li>
            <li className="colorPara fs14">
              <span className="mr10 ">{Svg.rd_email}</span>
              {data.businesses.email
                ? data.businesses.email
                : "contact details not available"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskDetails;

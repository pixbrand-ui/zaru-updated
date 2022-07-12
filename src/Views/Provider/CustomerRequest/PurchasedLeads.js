/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Row, Col } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { useState } from "react";
import { useEffect } from "react";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import PurchasedLeadDetails from "../PurchasedLeadDetails/PurchasedLeadDetails";
import Global from "../../../Helpers/Global/Global";
import FormModal from "../../../Components/FormModal/FormModal";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import CreateQuoteNew from "../CreateQuoteSetup/CreateQuoteNew";
import CreateInvoiceSetup from "../CreateInvoiceSetup/CreateInvoiceSetup";
import ViewQuoteProvider from "../../Customer/Booked/ViewQuote/ViewQuoteProvider";

const PurchasedLeads = (props) => {
  const [showProgress, setshowProgress] = useState(true);
  const [purchasedlead, setpurchasedlead] = useState(null);

  useEffect(() => {
    loadData().then((res) => {
      setpurchasedlead(res);
      setshowProgress(false);
    });
  }, [props.businessid]);

  useEffect(() => {
    if (props.reloadRequired) {
      loadData().then((res) => {
        setpurchasedlead(res);
        setshowProgress(false);
        props.reloadReset(false);
      });
    }
  }, [props.reloadRequired]);

  const refreshData = () => {
    loadData().then((res) => {
      setpurchasedlead(res);
      setshowProgress(false);
      props.reloadReset(false);
    });
  };

  const openDetailPage = (id) => {
    FormModal.show(
      <PurchasedLeadDetails
        taskid={id}
        businessid={props.businessid}
        key={id}
      />,
      "",
      () => {},
      "xl"
    );
  };
  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.post(
          API.getProviderPurchasedLead,
          {
            businessid: props.businessid,
          },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          console.log("api load", res);
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
            return result;
          } else {
            result = res.message ? res.message : "Unknown Error";
            console.error(result);
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

  const ViewQuoteDetails = (data) => {
    FormModal.show(
      <ViewQuoteProvider
        data={{
          taskData: data._id,
          quoteData: data.leadpurchased[0].quote[0],
          businessData: data.leadpurchased[0].businessid,
        }}
      />,
      "",
      () => {},
      "lg"
    );
  };

  const SendQuoteDetails = (data) => {
    FormModal.show(
      <CreateQuoteNew
        businessData={data.leadpurchased[0].businessid}
        businessid={data.leadpurchased[0].businessid._id}
        taskid={data._id}
        userData={data.userid}
        refreshData={refreshData}
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

  const CreateInvoiceDetails = (data) => {
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

  return (
    <>

      <style jsx={true}>
        {`
          .w60 {
            width: 80px;
            height: 80px;
          }
        `}
      </style>
      {showProgress && (
        <div className="pageBody">
          <LoadinMsg message="Please wait" />
        </div>
      )}
      {!showProgress && purchasedlead && purchasedlead.length <= 0 && (
        <div className="pageBody">There is no any purchased leads.</div>
      )}
      {!showProgress &&
        purchasedlead &&
        purchasedlead.map((obj, ind) => {
          return (
            <section className="bgLightOrange  pb20" key={ind}>
          
              <div className="bgWhite radius pt30 pb30 pl20 pr20 mb20">
                <div className="d-flex align-items-center justify-content-between mb20">
                  <h1 className="fs24 fBold mb0">{obj.title}</h1>
                  {(() => {
                    if (obj.status === "canceled") {
                      return (
                        <span className="fs14 colorBlack radius pl10 pr10 pt3 pb3 borderRed">
                          Rejected
                        </span>
                      );
                    } else if (obj.status === "completed") {
                      return (
                        <span className="fs14 colorBlack radius pl10 pr10 pt3 pb3 borderGreen">
                          Completed
                        </span>
                      );
                    } else if (
                      obj.leadpurchased &&
                      obj.leadpurchased[0].status === "accepted"
                    ) {
                      return (
                        <span className="fs14 colorBlack radius pl10 pr10 pt3 pb3 borderGreen">
                          Accepted
                        </span>
                      );
                    } else {
                      return (
                        <span className="fs14 colorBlack radius pl10 pr10 pt3 pb3 borderGrey">
                          Awaiting
                        </span>
                      );
                    }
                  })()}
                </div>
                <Row className="gy-3">
                  <Col lg={4}>
                    <div className="d-flex align-items-center mb3">
                      <div className="mr7 w60">
                        <img
                          src={
                            obj.userid.profileimage
                              ? API.imageurl + obj.userid.profileimage
                              : Img.boy.default
                          }
                          alt=""
                          className="radius100 cover w-100 h-100 img-fluid"
                        />
                      </div>
                      <div className="d-flex flex-column pl10">
                        <p className="fs12 mb0 colorPara">POSTED BY</p>
                        <p className="fs16 mb3 colorOrange">
                          {obj.userid.firstname + " " + obj.userid.lastname}
                        </p>
                        <div className="d-flex justify-content-between">
                          <p className="fs14 mb3">
                            <span
                              className="mr3 iconWidth"
                              style={{ marginRight: "8px" }}
                            >
                              {Svg.rd_email}
                            </span>
                            {obj.userid.email}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="fs14 mb3">
                            <span
                              className="mr3 iconWidth"
                              style={{ marginRight: "8px" }}
                            >
                              {Svg.rd_phone}
                            </span>
                            {obj.userid.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <Row>
                      <Col lg={6}>
                        <p className="fs14 mb8">
                          <span
                            className="mr3 iconWidth"
                            style={{ marginRight: "5px" }}
                          >
                            {Svg.calenderGrey}
                          </span>
                          {Global.Date(obj.fromdate)} -{" "}
                          {Global.Date(obj.todate)}
                        </p>
                        <p className="fs14 mb8">
                          <span className="mr3 iconWidth">{Svg.clockgrey}</span>{" "}
                          {obj.timeslot}
                        </p>
                      </Col>
                      <Col lg={6}>
                        <div className="d-flex justify-content-between">
                          <p className="fs14 mb8">
                            <span
                              className="mr3 iconWidth"
                              style={{ marginRight: "5px" }}
                            >
                              {Svg.fileIconSmall}
                            </span>
                            R{obj.minbudget} - R{obj.maxbudget}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="fs14 mb8">
                            <span
                              className="mr3 iconWidth"
                              style={{ marginRight: "5px" }}
                            >
                              {Svg.clockgrey}
                            </span>
                            {obj.isflexible
                              ? "Flexible time schedule"
                              : "Fix time schedule"}
                          </p>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <p className="fs14 mb8 text-capitalize">
                          <span className="mr3 iconWidth">
                            {Svg.locationPinGrey}
                          </span>{" "}
                          {obj.address}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={2} className="mr0 pr0"></Col>
                  <div className="bTop mt10 pt14">
                    <Row className=" align-items-center">
                      <Col lg={4} xs={3}>
                        <CmnButton
                          type="square"
                          text="View"
                          className="btnGreen radius pl20 pt10 pb10 pr20 mr10"
                          onClick={() => openDetailPage(obj._id)}
                        />
                      </Col>
                      <Col
                        lg={8}
                        xs={9}
                        className="d-flex align-items-center justify-content-end pr0"
                      >
                        <div className="d-flex">
                          {(() => {
                            if (obj.leadpurchased[0].status === "open") {
                              return (
                                <CmnButton
                                  type="square"
                                  text="Send Quote"
                                  className="btnTheme radius pl20 pt10 pb10 pr20 mr10"
                                  onClick={() => SendQuoteDetails(obj)}
                                />
                              );
                            } else if (obj.leadpurchased[0].status === "sent") {
                              return (
                                <CmnButton
                                  type="square"
                                  text="View Quote"
                                  className="btnTheme radius pl20 pt10 pb10 pr20 mr10"
                                  onClick={() => ViewQuoteDetails(obj)}
                                />
                              );
                            } else if (
                              obj.leadpurchased[0].status === "accepted"
                            ) {
                              return (
                                <CmnButton
                                  type="square"
                                  text="Create Invoice"
                                  className="btnTheme radius pl20 pt10 pb10 pr20 mr10"
                                  onClick={() => CreateInvoiceDetails(obj)}
                                />
                              );
                            }
                          })()}

                          <CmnButton
                            type="square"
                            text="Close"
                            className="btnTransparentBlack pt10 pb10"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </div>
            </section>
          );
        })}
    </>
  );
};

export default PurchasedLeads;

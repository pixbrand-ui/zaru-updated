import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import Auth from "../../../Helpers/Auth/Auth";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import PurchasedLeadDetails from "../PurchasedLeadDetails/PurchasedLeadDetails";

const ClosedLeads = (props) => {
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

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.post(
          API.getProviderClosedLead,
          {
            businessid: props.businessid,
          },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
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

  return (
    <>
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
            <section className="bgLightOrange  pb60" key={ind}>
              <div className="bgWhite radius pt30 pb30 pl20 pr20 mb20">
                <div className="d-flex align-items-center justify-content-between mb20">
                  <h1 className="fs24 fBold mb0">{obj.title}</h1>
                  {obj.iscancled && obj.providerid === props.businessid && (
                    <span className="fs16 colorBlack radius pl20 pr20 pt5 pb5 borderRed">
                      Rejected
                    </span>
                  )}

                  {obj.isopen === false && obj.providerid === null && (
                    <span className="fs16 colorBlack radius pl20 pr20 pt5 pb5 borderYellow">
                      Awaiting
                    </span>
                  )}

                  {obj.providerid === props.businessid && obj.iscompleted && (
                    <span className="fs16 colorBlack radius pl20 pr20 pt5 pb5 borderGreen">
                      Completed
                    </span>
                  )}

                  {obj.providerid === props.businessid &&
                    obj.iscompleted === false && (
                      <span className="fs16 colorBlack radius pl20 pr20 pt5 pb5 borderGreen">
                        Accepted
                      </span>
                    )}
                </div>
                <Row className="gy-3">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mb10">
                      <div className="mr10">
                        <img
                          src={
                            !obj.userid.profileimage ||
                            obj.userid.profileimage === null ||
                            obj.userid.profileimage === ""
                              ? Img.boy.default
                              : API.imageurl + obj.userid.profileimage
                          }
                          alt=""
                          className="radius100 w48 img-fluid"
                        />
                      </div>
                      <div>
                        <p className="fs14 mb0">POSTED BY</p>
                        <p className="fs16 mb0 colorOrange">
                          {obj.userid.firstname + " " + obj.userid.lastname}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <p className="fs14 text-capitalize">
                      <span className="mr3 iconWidth">
                        {Svg.locationPinGrey}
                      </span>{" "}
                      {obj.address}
                    </p>
                    <p className="fs14">
                      <span
                        className="mr3 iconWidth"
                        style={{ marginRight: "5px" }}
                      >
                        {Svg.calenderGrey}
                      </span>
                      {obj.fromdate}
                    </p>
                    <p className="fs14">
                      <span className="mr3 iconWidth">{Svg.clockgrey}</span>{" "}
                      {obj.timeslot}
                    </p>
                  </Col>
                  <Col lg={3}>
                    <p className="fs14">
                      <span
                        className="mr3 iconWidth"
                        style={{ marginRight: "5px" }}
                      >
                        {Svg.clockgrey}
                      </span>
                      {obj.isflexible ? "I am flexible" : obj.timeslot}
                    </p>
                    <div className="d-flex justify-content-between">
                      <p className="fs14">
                        <span
                          className="mr3 iconWidth"
                          style={{ marginRight: "5px" }}
                        >
                          {Svg.rd_phone}
                        </span>
                        {obj.userid.phone}
                      </p>
                      <span>{Svg.bgOrangeCall}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fs14">
                        <span
                          className="mr3 iconWidth"
                          style={{ marginRight: "5px" }}
                        >
                          {Svg.rd_email}
                        </span>
                        {obj.userid.email}
                      </p>
                      <span>{Svg.bgOrangeMail}</span>
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <div className="d-flex">
                      <CmnButton
                        onClick={(e) =>
                          AlertModal.show(
                            <PurchasedLeadDetails
                              taskid={obj._id}
                              businessid={props.businessid}
                            />,
                            "",
                            () => {},
                            "xl"
                          )
                        }
                        type="noBg"
                        text="View Details"
                        className="btnTransparentBlack radius pl20 pt10 pb10 pr20"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
          );
        })}
    </>
  );
};

export default ClosedLeads;

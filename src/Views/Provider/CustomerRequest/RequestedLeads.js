/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import PurchasedLeadDetails from "../PurchasedLeadDetails/PurchasedLeadDetails";
import ReactTimeago from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { ResetLeadPurchased } from "../CustomerRequest/request.action";
import NotInterested from "./NotInterested";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";

const RequestedLeads = (props) => {
  const updater = useSelector((state) => state.updateProviderDashboard);
  const dispatch = useDispatch();
  const [showProgress, setshowProgress] = useState(true);
  const [leadsData, setleadsData] = useState([]);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    loadLeads({ businessid: props.businessid }).then((res) => {
      if (res !== null) {
        setleadsData(res);
        setshowProgress(false);
      }
    });
  }, [props.businessid]);

  useEffect(() => {
    if (refresh) {
      loadLeads({ businessid: props.businessid }).then((res) => {
        if (res !== null) {
          setleadsData(res);
          setshowProgress(false);
          setrefresh(false);
        }
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (updater && updater.leadpurchased) {
      loadLeads({ businessid: props.businessid }).then((res) => {
        if (res !== null) {
          setleadsData(res);
          setshowProgress(false);
          dispatch(ResetLeadPurchased());
        }
      });
    }
  }, [updater]);

  const refreshData = () => {
    setrefresh(true);
  };

  useEffect(() => {
    if (props.reloadRequired) {
      loadLeads({ businessid: props.businessid }).then((res) => {
        if (res !== null) {
          setleadsData(res);
          setshowProgress(false);
          props.reloadReset(false);
        }
      });
    }
  }, [props.reloadRequired]);

  const loadLeads = async ({ businessid }) => {
    var result = null;
    setshowProgress(true);
    try {
      await HTTP.post(
        API.getProviderRequestedLead,
        { businessid: businessid },
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status) {
          if (res.status === 200) {
            if (res.data) {
              result = res.data;
              return result;
            }
            setshowProgress(false);
          } else if (res.status === 201) {
            AlertModal.show(res.message, "Oops!");
            setshowProgress(false);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
    return result;
  };
  return (
    <>
      <section className="bgLightOrange">
        {showProgress && (
          <div className="pageBody">
            <LoadinMsg message="Loading new leads.." />
          </div>
        )}
        {!showProgress && leadsData.length > 0 && (
          <Row className="pb40">
            <Col lg={12} xl={12} xxl={12}>
              {leadsData.length > 0 &&
                leadsData.map((obj, ind) => {
                  return (
                    <ListingLeads
                      key={ind}
                      data={obj}
                      businessid={props.businessid}
                      refreshData={refreshData}
                    />
                  );
                })}
            </Col>
          </Row>
        )}
        {!showProgress && leadsData.length <= 0 && (
          <>
            <div className="pageBody colorPara w-100 fs14 text-center">
              There is no any new leads.
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default RequestedLeads;

const ListingLeads = (props) => {
  const { data } = props;

  const openDetailPage = (id) => {
    AlertModal.show(
      <PurchasedLeadDetails
        taskid={id}
        businessid={props.businessid}
        refreshData={props.refreshData}
      />,
      "",
      () => {},
      "xl"
    );
  };
  return (
    <>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        <Row className="mb15 gy-3">
          <Col lg={3} md={6}>
            <div className="w128 text-center">
              <img
                className="img-fluid radius100"
                src={
                  data && data.userid.profileimage
                    ? API.imageurl + data.userid.profileimage
                    : Img.worker.default
                }
                alt=""
              />

              <div className="mt5 ">
                <Link to="#" className="colorOrange ">
                  {data.userid.firstname} {data.userid.lastname}
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={6} md={6}>
            <div className="wListingtext">
              <h3 className="fs20 fBold mb5">
                <Link
                  to="/service-provider-single"
                  className="colorBlack fBold"
                >
                  {data.title}
                </Link>
              </h3>
              <div className="rating colorPara fs20 mb0">
                R{data.minbudget} - R{data.maxbudget}
              </div>

              <ul className="noUl colorpara">
                <li className="mb2 colorPara fs15">
                  <span className="mr10 ">{Svg.locationPinGrey}</span>
                  {data.address}
                </li>
                <li className="mb2 colorPara fs15">
                  <span className="mr10 ">{Svg.calenderGrey}</span>
                  {new Date(data.createdAt).toUTCString()}
                </li>
                <li className="colorPara fs15">
                  <span className="mr10 colorPara">{Svg.clockgrey}</span>
                  {data.timeslot}
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={3} md={12}>
            <div className="priceSection text-end d-flex flex-wrap justify-content-end mobJustifyContentStart align-items-center">
              <h4 className="colorPara fs15 mb20 mobMb0 mobMr10">
                <ReactTimeago date={data.createdAt} />
              </h4>
            </div>
          </Col>
        </Row>

        <div className="bTop pt15">
          <div className="d-flex align-items-center flex-wrap justify-content-between mb10">
            <h4 className="fs18 fw600 colorBlack mb0">Request Description</h4>
          </div>

          <p className="fs15 mb20">{data.information}</p>
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            <div className="mobMb15">
              <span
                className="radius4 bgLightOrange pl15 pr15 pt4 pb4 fs13 colorGreen d-inline-block mr5"
                style={{ background: "#E1F5EB" }}
              >
                Requested to you
              </span>
              <span
                className="radius4 bgLightOrange pl15 pr15 pt4 pb4 fs13 colorGreen d-inline-block"
                style={{ background: "#E1F5EB" }}
              >
                {0} Credits
              </span>
            </div>

            <div className="d-flex align-items-center flex-wrap ">
              <CmnButton
                type="noBg"
                text="Not Interested"
                onClick={()=>FormModal.show(<NotInterested taskid={data._id}/>,"Are you not interested?",()=>{},"md")}
                className="fBold colorBlack mr10"
              />

              <CmnButton
                type="square"
                icon={Svg.bankCard}
                text="View & Purchase"
                className="fBold"
                onClick={() => openDetailPage(data._id)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import NewLeadsAside from "./NewLeadsAside";
import CmnPagination from "../../../Components/CmnPagination/CmnPagination";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import PurchasedLeadDetails from "../PurchasedLeadDetails/PurchasedLeadDetails";
import TimeAgo from "react-timeago";

const NewLeads = (props) => {
  const [showProgress, setshowProgress] = useState(true);
  const [leadsData, setleadsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const handleOnChange = (event, type = "other") => {
    if (type === "range") {
      setFilterData({
        ...filterData,
        minprice: event.minValue,
        maxprice: event.maxValue,
      });
    } else {
      const { name, value } = event.target;
      setFilterData({ ...filterData, [name]: value });
    }
  };
  const setCurrentPage = (pageno) => {
    setFilterData({ pageno });
  };

  useEffect(() => {
    loadLeads({ businessid: props.businessid }).then((res) => {
      if (res !== null) {
        setleadsData(res);
        setshowProgress(false);
      }
    });
  }, [props.businessid, filterData, page]);

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
        API.getProviderNewLead,
        {
          businessid: businessid,
          sort_by: filterData.sortby,
          timeslot: filterData.timeslot,
          minprice: filterData.minprice,
          maxprice: filterData.maxprice,
        },
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status) {
          if (res.status === 200) {
            if (res.data) {
              console.log(res.data);
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
          <Row>
            <Col lg={3} xl={3} xxl={3}>
              <button
                onClick={() =>
                  AlertModal.show(
                    <NewLeadsAside
                      onChange={handleOnChange}
                      filterData={filterData}
                    />,
                    "",
                    () => {},
                    "fullscreen"
                  )
                }
                className="dNoneXl dNoneLg btnTheme w-100 d-flex align-items-center flex-wrap justify-content-between mb15"
              >
                <span className=" fs16">Filter</span>
                <span className="barColorWhite">{Svg.bar}</span>
              </button>
              <div className="sticky dNoneMd dNoneXs sidebarHeight mb60">
                <NewLeadsAside
                  onChange={handleOnChange}
                  filterData={filterData}
                />
              </div>
            </Col>

            <Col lg={9} xl={9} xxl={9}>
              {leadsData.length > 0 &&
                leadsData.map((obj, ind) => {
                  return (
                    <ListingLeads
                      key={ind}
                      data={obj}
                      businessid={props.businessid}
                    />
                  );
                })}

              <CmnPagination number={1} totalPage={18} />
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

export default NewLeads;

const ListingLeads = (props) => {
  const { data } = props;
  const openDetailPage = (id) => {
    AlertModal.show(
      <PurchasedLeadDetails taskid={id} businessid={props.businessid} />,
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
                  data.userid.profileimage
                    ? API.imageurl + data.userid.profileimage
                    : Img.businessPlaceholder
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
                  onClick={(e) => openDetailPage(data._id)}
                  to="#"
                  className="colorBlack fBold"
                >
                  {data.title}
                </Link>
              </h3>
              <div className="rating colorPara fs20 mb10">{`R${data.minbudget} - R${data.maxbudget}`}</div>

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
                <TimeAgo date={data.createdAt} />
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
              <span className="fs15 colorPara mr5">Purchased</span>
              <span className="radius bgLightOrange pl5 pr5 pt6 pb6 fs14 mr5 d-inline-block">
                {data.interestcount}/5
              </span>
              <span
                className="radius bgLightOrange pl15 pr15 pt6 pb6 fs14 colorGreen d-inline-block"
                style={{ background: "#E1F5EB" }}
              >
                {data.creditpoints} Credits
              </span>
            </div>

            <div className="d-flex align-items-center flex-wrap ">
              <CmnButton
                type="noBg"
                text="Close"
                className="fBold colorRed mr10"
              />

              <CmnButton
                onClick={() => openDetailPage()}
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

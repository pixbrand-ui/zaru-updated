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
import CmnInputRange from "../../../Components/CmnInputRange/CmnInputRange";
import CmnRadio from "../../../Components/CmnRadio/CmnRadio";
import { useDispatch, useSelector } from "react-redux";
import { ResetLeadPurchased } from "./request.action";

const BroadcastLeads = (props) => {
  const updater = useSelector((state) => state.updateProviderDashboard);
  const dispatch = useDispatch();
  const [showProgress, setshowProgress] = useState(true);
  const [leadsData, setleadsData] = useState([]);
  const [filterData, setFilterData] = useState({
    sort_by: "Latest",
    timeslot: "",
    minprice: 10,
    maxprice: 500,
  });
  const [page, setPage] = useState(1);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.businessid) {
        loadLeads({ businessid: props.businessid }).then((res) => {
          if (res !== null) {
            const timer2 = setTimeout(() => {
              setleadsData(res);
              setshowProgress(false);
              setrefresh(false);
            }, 700);
            return () => clearTimeout(timer2);
          }
        });
      }
      return () => {
        clearTimeout(timer);
      };
    }, 45000);
  }, []);

  useEffect(() => {
    if (updater && updater.leadpurchased) {
      refreshData();
      dispatch(ResetLeadPurchased());
    }
  }, [updater]);

  const handleOnChange = (event, type = "other") => {
    if (type === "range") {
      // const timer = setTimeout(() => {

      // }, 1500);
      setFilterData({
        ...filterData,
        minprice: event.minValue,
        maxprice: event.maxValue,
      });
      //return () => clearTimeout(timer);
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
        const timer = setTimeout(() => {
          setleadsData(res);
          setshowProgress(false);
          setrefresh(false);
        }, 700);
        return () => clearTimeout(timer);
      }
    });
  }, [props.businessid, filterData, page, refresh]);

  useEffect(() => {
    if (props.reloadRequired) {
      loadLeads({ businessid: props.businessid }).then((res) => {
        if (res !== null) {
          const timer = setTimeout(() => {
            setleadsData(res);
            setshowProgress(false);
            props.reloadReset(false);
            setrefresh(false);
          }, 700);
          return () => clearTimeout(timer);
        }
      });
    }
  }, [props.reloadRequired]);

  const refreshData = () => {
    setrefresh(true);
  };

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

  const SidebarNewLeads = (props) => {
    return (
      <>
        <style jsx="true">
          {`
            .sidebarHeight {
              scrollbar-width: thin;
              scrollbar-color: #999 #ddd;
            }

            /* Works on Chrome/Edge/Safari */
            .sidebarHeight::-webkit-scrollbar {
              width: 12px;
            }
            .sidebarHeight::-webkit-scrollbar-track {
              background: #ddd;
            }
            .sidebarHeight::-webkit-scrollbar-thumb {
              background-color: #999;
              border-radius: 20px;
              border: 3px solid #ddd;
            }
          `}
        </style>
        <section className="filterDate border radius bgWhite pl20 pt30 pr20 pb20 mb15">
          <h4 className="fs18 fBold colorBlack mb15">Sort by</h4>

          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="sort_by"
              label="Latest"
              value="Latest"
              checked={props.filterData.sort_by === "Latest"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="Recommended"
              label="Recommended"
              value="Recommended"
              checked={props.filterData.sort_by === "Recommended"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="lowt0high"
              label="Price (lowest to highest)"
              value="Lowest"
              checked={props.filterData.sort_by === "Lowest"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="hightolow"
              label="Price (highest to lowest)"
              value="Highest"
              checked={props.filterData.sort_by === "Highest"}
              onChange={props.onChange}
            />
          </div>

          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="credit"
              label="Credit (lowest to highest)"
              value="CreditLowest"
              checked={props.filterData.sort_by === "CreditLowest"}
              onChange={props.onChange}
            />
          </div>

          <div className="mb5">
            <CmnRadio
              name="sort_by"
              id="creHighLow"
              label="Credit (highest to lowest)"
              value="CreditHighest"
              checked={props.filterData.sort_by === "CreditHighest"}
              onChange={props.onChange}
            />
          </div>
        </section>

        <section className="filterDate border radius bgWhite pl20 pt30 pr20 pb20 mb15">
          <h4 className="fs18 fBold colorBlack mb15">Time of day</h4>

          <div className="mb5">
            <CmnRadio
              label="Morning (8am - 12pm)"
              name="timeslot"
              value="Morning (8am - 12pm)"
              id="time"
              checked={props.filterData.timeslot === "Morning (8am - 12pm)"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              label="Afternoon (12pm - 5pm)"
              name="timeslot"
              value="Afternoon (12pm - 5pm)"
              id="time1"
              checked={props.filterData.timeslot === "Afternoon (12pm - 5pm)"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              label="Evening (5pm - 9:30pm)"
              name="timeslot"
              value="Evening (5pm - 9:30pm)"
              id="time2"
              checked={props.filterData.timeslot === "Evening (5pm - 9:30pm)"}
              onChange={props.onChange}
            />
          </div>
          <div className="mb5">
            <CmnRadio
              label="Flexible Timing"
              name="timeslot"
              value={true}
              id="time3"
              checked={props.filterData.timeslot === "true"}
              onChange={props.onChange}
            />
          </div>
        </section>

        <section className="filterDate border radius bgWhite pl25 pt30 pr25 pb22 mb30">
          <div className="d-flex align-items-center flex-wrap justify-content-between mb15">
            <div>
              <h4 className="fs18 fBold colorBlack mb0">Price </h4>
            </div>

            <div>
              <button className="colorOrange btnBlank fs14">Reset</button>
            </div>
          </div>
          <CmnInputRange
            filterData={props.filterData}
            callback={props.onChange}
          />
        </section>
      </>
    );
  };

  return (
    <>
      <section className="bgLightOrange">
        <Row>
          <Col lg={3} xl={3} xxl={3}>
            <button
              onClick={() =>
                AlertModal.show(
                  <SidebarNewLeads
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
              <SidebarNewLeads
                onChange={handleOnChange}
                filterData={filterData}
              />
              {/* <NewLeadsAside onChange={handleOnChange} filterData={filterData} /> */}
            </div>
          </Col>

          <Col lg={9} xl={9} xxl={9}>
            {showProgress && (
              <div className="pageBody">
                <LoadinMsg message="Fetching data.." />
              </div>
            )}
            {!showProgress &&
              leadsData.length > 0 &&
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

            {!showProgress && leadsData.length <= 0 && (
              <>
                <div className="pageBody colorPara w-100 fs14 text-center">
                  There is no any new leads.
                </div>
              </>
            )}
          </Col>
        </Row>
        {/* {!showProgress && leadsData.length <= 0 && (
          <>
            <div className="pageBody colorPara w-100 fs14 text-center">
              There is no any new leads.
            </div>
          </>
        )} */}
      </section>
    </>
  );
};

export default BroadcastLeads;

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

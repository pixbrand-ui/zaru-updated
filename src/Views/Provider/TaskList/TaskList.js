/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TaskerBanner from "./TaskerBanner";
import TaskerAside from "./TaskerAside";
import "./TaskerListing.scss";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import { Link } from "react-router-dom";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import GAlign from "../../../Components/GComponents/GAlign";
import { useParams, useHistory } from "react-router-dom";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";

const TaskList = (props) => {
  const history = useHistory();
  const { catID } = useParams();
  const { refid } = useParams();
  const [searchType, setsearchType] = useState(null);
  const [searchbyData, setsearchbyData] = useState(null);
  const [providersData, setprovidersData] = useState(null);
  const [allListing, setAllListing] = useState(null);
  const [pagination,setpagination]=useState({
    prevPage: 1,
    nextPage: 2,
    totalPages: 1
  });
  
  const [filterData, setFilterData] = useState({
    minprice: 10,
    maxprice: 1000,
    pagesize: 1,
    page: 1,

    
  });
  const getLatLong = history.location.state.latlong;
  
  useEffect(() => {
    console.log("path",history.location.pathname);
    setsearchType(null);
    setsearchbyData(null);
    setprovidersData(null);
    var searchtype = history.location.pathname.split("/")[2];
    setsearchType(searchtype);
    var apiSearchby = API.get_subcategoryinfo;
    var api = API.providersListbySubcategory;
    var data = { subcategory: refid };
    switch (history.location.pathname.split("/")[2]) {
      case "sc":
        api = API.providersListbySubcategory;
        apiSearchby = API.get_subcategoryinfo;
        data = { subcategory: refid };
        break;
      case "cc":
        api = API.providersListbyCategory;
        apiSearchby = API.get_categoryinfo;
        data = { category: refid };
        break;
      default:
        api = API.providersListbySubcategory;
        apiSearchby = API.get_subcategoryinfo;
        data = { subcategory: refid };
        break;
    }
    HTTP.get(apiSearchby + refid, false, false).then((res) => {
      //console.log(`res ${searchtype} : `, res);
      if (res && res.status && res.status === 200) {
        setsearchbyData(res.data);
      }
    });
    HTTP.post(api, data, false, false, "").then((res) => {
      //console.log("res : ", res);
      if (res && res.status && res.status === 200) {
        setprovidersData(res.data);
      } else {
        setprovidersData([]);
      }
    });
  }, [refid,filterData]);

  useEffect(() => {
    loadData().then((res) => {
      setAllListing(res);
    });

  }, [filterData]);

console.log("reff",refid);

  const handleOnChange = (event, type = "other") => {
    if (type === "range") {
     
      console.log("eve",event);
      // onChange
      setFilterData({
        ...filterData,
        minprice: event.minValue,
        maxprice: event.maxValue,
      });
    }
    else
    {
       const { name, value } = event.target;
       if (name==="isflexible") 
       {
         setFilterData({
           ...filterData,
           isflexible: true,
           timeslot: "",
         });
       }else if(name==="timeslot"){
         setFilterData({
           ...filterData,
           isflexible: false,
           [name]: value
         });
       }
       else {
         setFilterData({ ...filterData, [name]: value });
       }
    }
  
  };

  const loadData = async () => {
    let result = "";
    try {
      const iData = {
        subcategoryid: catID,
       // location: [getLatLong.latitude, getLatLong.longitude],
       location: [GLocalStorage.Get("latitude"), GLocalStorage.Get("longitude")],
        sort_by: filterData.sort_by,
        timeslot: filterData.timeslot,
        minprice: filterData.minprice,
        maxprice: filterData.maxprice,
        isflexible:  filterData.isflexible,
        pagesize: filterData.pagesize,
        page : filterData.page
      };
      await HTTP.post(API.taskSubCategoryWise, iData, false, false, "").then(
        (res) => {
          if (res && res.status.toString() === "200") {
            setpagination({
              ...pagination,
              prevPage: res.prevPage,
              nextPage: res.nextPage,
              totalPages: res.totalPages
            })
            if (res.data && res.data.length > 0) {
              return (result = res.data);
            }
          }
        }
      );
    } catch (e) {
      console.log(e, "There is a issue in task listing page");
    }
    return result;
  };

  const GenerateTitle = () => {
    return (
      <h1 className="fs28 fBold">
        {`Top ${
          searchbyData && searchType
            ? searchType === "sc"
              ? searchbyData.categoryid.category_name
              : searchType === "cc"
              ? searchbyData.category_name
              : ""
            : ""
        } service providers near you`}
      </h1>
    );
  };



  const GenerateSideBar = () => {
    return (
      <>
        {/* {providersData ? (
          providersData.length > 0 ? ( */}
        <>
          <button
            onClick={() =>
              AlertModal.show(
                <TaskerAside
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
          <div className="sticky dNoneMd dNoneXs">
            <TaskerAside onChange={handleOnChange} filterData={filterData} />
          </div>
        </>
        {/* ) : (
            <>There is no any provider listed.</>
          )
        ) : (
          <LoadinMsg />
        )} */}
      </>
    );
  };

  const GeneratePagination = () => {
    return (
      <div className="d-flex align-items-center flex-wrap justify-content-end pb50">
       
        {providersData && providersData.length > 0 && (
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs16 colorBlack">Page {filterData.page} of {pagination.totalPages}</p>
            <ul className="d-flex align-items-center flex-wrap noUl ml15 pagi">
              <li>
                <CmnButton
                  type="noBg"
                  dataprev="1"
                  onClick={(e)=>setFilterData(
                    {
                      ...filterData,
                      page: pagination.prevPage ? pagination.prevPage : filterData.page
                    }
                  )}
                  icon={Svg.angleLeft}
                  className="btnTransparentBlack radius4 mr10"
                />
              </li>

              <li className="mr10">
                <CmnButton
                  type="noBg"
                  text={filterData.page}
                  className="btnTransparentBlack radius4"
                
                />
              </li>

              <li>
                <CmnButton
                  type="noBg"
                  icon={Svg.angleRight}
                  className="btnTransparentBlack radius4"
                  onClick={(e)=>setFilterData(
                    {
                      ...filterData,
                      page:  pagination.nextPage ? pagination.nextPage : filterData.page
                    }
                  )}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="bgLightOrange">
        <TaskerBanner />
        <Container>
          <GAlign align="left" className="mt-4 mb-4">
            <GenerateTitle />
          </GAlign>
          <Row>
            <Col lg={4} xl={4} xxl={3}>
              <GenerateSideBar />
            </Col>
            <Col lg={8} xl={8} xxl={9}>
              {allListing ? (
                allListing.length > 0 ?
                allListing.map((elem, ind) => {
                  return <ListingTasker refid={refid} data={elem} key={ind} />;
                }) : "No Data Found"
              ) : (
                <h4 className="text-center">No result Found</h4>
              //  <LoadinMsg message="Loading Tasks List" />
              )}
            </Col>
          </Row>
          <GeneratePagination />
        </Container>
      </section>
    </>
  );
};

export default TaskList;

const ListingTasker = (props) => {
  return (
    <>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        <Row className="mb15 gy-3">
          <Col lg={3} md={6}>
            <div className="w128 text-center">
              <img
                className="img-fluid radius100"
                src={API.imageurl + props.data.users.profileimage}
                alt=""
              />

              <div className="mt5 ">
                <Link to="#" className="colorOrange ">
                  {props.data.users.firstname} {props.data.users.lastname}
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={6} md={6}>
            <div className="wListingtext">
              <h3 className="fs20 fBold mb5">
                <Link
                  to={`/provider/${props.refid}`}
                  className="colorBlack fBold"
                >
                  {props.data.title}
                </Link>
              </h3>
              <div className="rating colorPara fs20 mb10">
                R{props.data.minbudget} - R{props.data.maxbudget}
              </div>

              <ul className="noUl colorpara">
                <li className="mb2 colorPara fs15">
                  <span className="mr10 ">{Svg.locationPinGrey}</span>
                  {props.data.address}{" "}
                </li>
                <li className="mb2 colorPara fs15">
                  <span className="mr10 ">{Svg.calenderGrey}</span>
                  {new Date(props.data.fromdate).toDateString()}
                </li>
                <li className="colorPara fs15">
                  <span className="mr10 colorPara">{Svg.clockgrey}</span>
                  {props.data.timeslot}
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={3} md={12}>
            <div className="priceSection text-end d-flex flex-wrap justify-content-end mobJustifyContentStart align-items-center">
              <h4 className="colorPara fs15 mb20 mobMb0 mobMr10">
                13 hours ago
              </h4>
            </div>
          </Col>
        </Row>

        <div className="bTop pt15">
          <div className="d-flex align-items-center flex-wrap justify-content-between mb10">
            <h4 className="fs18 fw600 colorBlack mb0">Request Description</h4>

            <CmnButton
              type="noBg"
              className="colorOrange fs16"
              text="View Details"
            />
          </div>

          <p className="fs15 mb20">{props.data.information}</p>
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            <div className="mobMb15">
              <span className="fs15 colorPara mr5">Purchased</span>
              <span className="radius bgLightOrange pl5 pr5 pt6 pb6 fs14 mr5 d-inline-block">
                {props.data.interestcount}/{props.data.maxpurchaselimit}
              </span>
              <span
                className="radius bgLightOrange pl15 pr15 pt6 pb6 fs14 colorGreen d-inline-block"
                style={{ background: "#E1F5EB" }}
              >
                3 Credits
              </span>
            </div>

            <div className="d-flex align-items-center flex-wrap ">
              <CmnButton
                type="noBg"
                text="Close"
                className="fBold colorRed mr10"
              />

              <CmnButton
                type="square"
                icon={Svg.bankCard}
                text="Purchase Request"
                className="fBold"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


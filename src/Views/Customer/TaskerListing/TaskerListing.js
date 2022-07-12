/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tooltip } from "reactstrap";
import TaskerBanner from "./TaskerBanner";
import "./TaskerListing.scss";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import { Link } from "react-router-dom";
import GAlign from "../../../Components/GComponents/GAlign";
import { useParams, useHistory } from "react-router-dom";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import { Redirect } from "react-router-dom";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import Select from 'react-select';

const TaskerListing = (props) => {
  const history = useHistory();
  const { refid } = useParams();
  const [searchType, setsearchType] = useState(null);
  const [searchbyData, setsearchbyData] = useState(null);
  const [providersData, setprovidersData] = useState(null);
  const [sortbyData, setsortbyData] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginfationInfo, setPaginfationInfo] = useState([]);
  useEffect(() => {
    //console.log(history.location.state);
   
    setsearchType(null);
    setsearchbyData(null);
    setprovidersData(null);
    var searchtype = history.location.pathname.split("/")[2];
  
    var locationParams = history.location.state
      ? history.location.state.latlong
      : "";
      console.log("loc",locationParams);
    setsearchType(searchtype);
    var apiSearchby = API.get_subcategoryinfo;
    var api = API.providersListbySubcategory;
    var data = { subcategory: refid };
    switch (history.location.pathname.split("/")[2]) {
      case "sc":
        api = API.providersListbySubcategory;
        apiSearchby = API.get_subcategoryinfo;
        data = { subcategory: refid, location: locationParams, sort_by: sortbyData,
          pagesize: 10,
          page: 1
        };
        break;
      case "cc":
        api = API.providersListbyCategory;
        apiSearchby = API.get_categoryinfo;
        data = { category: refid, location: locationParams };
        break;
      default:
        api = API.providersListbySubcategory;
        apiSearchby = API.get_subcategoryinfo;
        data = { subcategory: refid, location: locationParams };
        break;
    }
    HTTP.get(apiSearchby + refid, false, false).then((res) => {
      //console.log(`res ${searchtype} : `, res);
      if (res && res.status && res.status === 200) {
        setsearchbyData(res.data);
      }
    });
    HTTP.post(api, data, false, false, "").then((res) => {
      if (res && res.status && res.status === 200) {
        console.log(res);
        setprovidersData(res.data);
        setPaginfationInfo(res);
      } else {
        setprovidersData([]);
      }
    });
  }, [refid,sortbyData]);

  const GenerateTitle = (props) => {
    
   // const [sortby,setsortby]=useState("");
    //sortby.value
    return (
      
      <div className="d-flex flex-wrap justify-content-between w-100">
        <h1 className="fs28 fBold mb0 mobMb10">
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
        <div className="w200">

        <Select
                      classNamePrefix="themeSelect"
                      className="themeSelect"
                      options={[
                        {value: "Lowest", label: "Lowest price"},
                        {value: "Highest", label: "Highest price"},
                        {value: "Review", label: "Review"},
                        {value: "Recommended", label: "Recommended"}
                      ]}
                      value={sortbyData}
                      placeholder={<div>Sorting</div>}
                      onChange={(e) => setsortbyData(e.value)}
                    />
        </div>
      </div>
    );

  };

  const GetCategoryID = () => {
    let catid = null;
    if (searchbyData && searchType) {
      if (searchType === "sc") {
        catid = searchbyData.categoryid.id;
      } else if (searchType === "cc") {
        catid = searchbyData.id;
      }
    }
    return catid;
  };

  const GenerateSideBar = () => {
    return (
      <>
        {providersData ? (
          providersData.length > 0 ? (
            <>
              {/* <button
                onClick={() =>
                  //AlertModal.show(<TaskerAside />, "", () => {}, "fullscreen")
                }
                className="dNoneXl dNoneLg btnTheme w-100 d-flex align-items-center flex-wrap justify-content-between mb15"
              >
                <span className=" fs16">Filter</span>
                <span className="barColorWhite">{Svg.bar}</span>
              </button>
              <div className="sticky dNoneMd dNoneXs">
                <TaskerAside />
              </div> */}
            </>
          ) : (
            <>There is no any provider listed.</>
          )
        ) : (
          <LoadinMsg />
        )}
      </>
    );
  };

  const GeneratePagination = () => {
    return (
    
      <div className="d-flex align-items-center flex-wrap justify-content-end pb50">
          {
        console.log("sss",paginfationInfo)
      }
        {providersData && providersData.length > 0 && (
          <div className="d-flex align-items-center flex-wrap">
            <p className="fs16 colorBlack">Page 1 of {paginfationInfo.totalPages}</p>
            <ul className="d-flex align-items-center flex-wrap noUl ml15 pagi">
              <li>
                <CmnButton
                  type="noBg"
                  icon={Svg.angleLeft}
                  className="btnTransparentBlack radius4 mr10"
                  onClick={
                    ()=>setcurrentPage(paginfationInfo.prevPage ? paginfationInfo.prevPage : 1)
                  }
                />
              </li>

              <li className="mr10">
                <CmnButton
                  type="noBg"
                  text={currentPage}
                  className="btnTransparentBlack radius4"
                />
              </li>

              <li>
                <CmnButton
                  type="noBg"
                  icon={Svg.angleRight}
                  className="btnTransparentBlack radius4"
                  onClick={
                    ()=>setcurrentPage(paginfationInfo.nextPage ? paginfationInfo.nextPage : 1)
                  }
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  console.log("ssse",sortbyData);
  return (
    <section className="bgLightOrange">
      <TaskerBanner GetCategoryID={GetCategoryID} />
      <Container>
        <GAlign align="left" className="mt-4 mb-4">
          <GenerateTitle />
        </GAlign>
        <Row className="pb30">
          <Col lg={4} xl={4} xxl={3}>
            <GenerateSideBar />
          </Col>

          <Col lg={12} xl={12} xxl={12}>
            {providersData ? (
              providersData.length > 0 ? (
                providersData.map((element, index) => {
                  return (
                    <ListingTasker
                      GetCategoryID={GetCategoryID}
                      key={index}
                      data={element}
                    />
                  );
                })
              ) : (
                <></>
              )
            ) : (
              <LoadinMsg message="loading providers" />
            )}
          </Col>
        </Row>
        {
          paginfationInfo.totalDocs > 10 &&
          <GeneratePagination />
        }
      
      </Container>
    </section>
  );
};

export default TaskerListing;

const ListingTasker = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpenTwo, setTooltipOpenTwo] = useState(false);
  const [excerpt, setexcerpt] = useState(false);
  const [gotopage, setgotopage] = useState(null);
  return (
    <>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        {gotopage === "task" && (
          <Redirect
            to={{
              pathname: "/tasks/task-details",
              state: { categoryid: props.GetCategoryID() },
            }}
          />
        )}
        <Row className="gy-3">
          <Col lg={3} md={3}>
            <div className="w128 h128 text-center">
              <img
                className="img-fluid radius100 h-100 cover"
                src={
                  props.data.logoimage
                    ? API.imageurl + props.data.logoimage
                    : Img.businessPlaceholder.default
                }
                alt=""
              />

              <div className="mt15 ">
                <Link
                  to={`/provider/profile/${props.data._id}`}
                  className="colorOrange "
                >
                  View Profile
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={6} md={9}>
            <div className="wListingtext">
              <h3 className="fs20 fBold mb2">
                <Link
                  to={`/provider/profile/${props.data._id}`}
                  className="colorBlack"
                >
                  {props.data.bussinessname}
                </Link>
              </h3>
              <div className="fs14 colorPara">
                {props.data.city}, {props.data.state}, {props.data.country}
              </div>
              <div className="rating colorPara fs16 mb10">
                <span className="colorPara fs14 fBold">
                  4.3
                  <span className="ml5 staryellow">
                    {Svg.fillStarYellowSmall}
                  </span>
                </span>

                <span className="fs14 ml10">Ratings</span>
              </div>

              <ul className="noUl">
                <li className="mb3 colorPara">
                  <span className="mr10 fs15">{Svg.checkedCircle}</span>
                  {props.data.taskcount + " "}
                  Tasks Completed
                </li>
                <li className="mb3 text-italic colorPara">
                  <span className="mr10 fs15">{Svg.blankStar}</span>
                  {props.data.positivescount > 0
                    ? Math.ceil(
                        (props.data.positivescount / props.data.reviewcount) *
                          100
                      )
                    : "0"}
                  % Positive Reviews
                  <span className="position-relative">
                    <button className="btnBlank" id="TooltipExample">
                      {Svg.info}
                    </button>

                    <Tooltip
                      isOpen={tooltipOpen}
                      placement="right"
                      target="TooltipExample"
                      toggle={() => {
                        setTooltipOpen(!tooltipOpen);
                      }}
                    >
                      It is a ratio of maximum positive reviews.
                    </Tooltip>
                  </span>
                </li>
                <li className="colorPara text-italic">
                  <span className="mr10 fs15 ">{Svg.verified}</span>
                  {props.data.docapproved.length >= 3
                    ? "Verified"
                    : "Not verifed"}{" "}
                  documents.
                  <span className="position-relative">
                    <button className="btnBlank" id="TooltipExample1">
                      {Svg.info}
                    </button>

                    <Tooltip
                      isOpen={tooltipOpenTwo}
                      placement="right"
                      target="TooltipExample1"
                      toggle={() => {
                        setTooltipOpenTwo(!tooltipOpenTwo);
                      }}
                    >
                      This provider have{" "}
                      {props.data.docapproved.length >= 3 ? "" : "not"} verified
                      address, registration, and other documents.
                    </Tooltip>
                  </span>
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={3} md={12}>
            <div className="priceSection text-end d-flex flex-wrap justify-content-end mobJustifyContentStart align-items-center">
              <h4 className="colorBlack fs18 mb0 mobMb0 mobMr10 mr10">
                <span className="fs18 colorOrange">R </span>
                {props.data.hourlyprice}/hr
              </h4>
              <CmnButton
                type="square"
                icon={Svg.book}
                text="Send Request"
                className="fBold"
                onClick={(e) => {
                  GLocalStorage.Add("c-task-tp", {
                    isb: false,
                    ic: props.GetCategoryID(),
                    ib: props.data._id,
                  });
                  setgotopage("task");
                }}
              />
            </div>
          </Col>
        </Row>

        <div className="bTop pt15">
          <h4 className="fs18 colorBlack">How I can help:</h4>
          <p className={`${excerpt ? "showFull" : ""} fs16 excerptTaskerList`}>
            {props.data.description}
          </p>
          <div>
            <Link
              to="#"
              className="fs16 colorOrange"
              onClick={() => setexcerpt(!excerpt)}
            >
              {excerpt ? "Read Less" : "Read More"}
            </Link>
          </div>

          <div className="bgLightOrange d-inline-block radius pt10 pl10 pr10 pb10 mt5">
            <span className="mr10">{Svg.infoFill}</span>
            <span className="fs16 colorPara">
              You can contact with your Tasker, adjust task details, or change
              task time after booking.
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

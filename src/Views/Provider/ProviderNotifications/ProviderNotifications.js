import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import ProAside from "../ProviderProfile/ProAside";
import "./CustomerNotifications.scss";

const ProviderNotifications = () => {
  const [showProgress, setshowProgress] = useState(false);
  const [notificationsList, setnotificationsList] = useState([]);
  const [notificationsData, setnotificationsData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    firstPage: 1,
    lastPage: 1,
    itemsPerPage: 5,
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    //console.log(notificationsList);
  }, [notificationsList]);

  const loadPagination = (
    dataNoti = [],
    current_page = 1,
    items_perpage = 5
  ) => {
    var data = [...dataNoti];
    var _totalItems = 0;
    var _totalPages = 0;
    var _currentPage = 0;
    var _firstPage = 0;
    var _lastPage = 0;
    var _itemsPerPage = items_perpage;
    if (data && data.length > 0) {
      _totalItems = data.length;
      _totalPages = Math.ceil(data.length / _itemsPerPage);
      _currentPage = current_page;
      _firstPage = 1;
      _lastPage = Math.ceil(data.length / _itemsPerPage);
      var startFrom = Math.round(_itemsPerPage * _currentPage - _itemsPerPage);
      var endTo = Math.round(_itemsPerPage);
      var filtereddata = data.splice(startFrom, endTo);
      setnotificationsList(filtereddata);
      setPaginationData({
        totalItems: _totalItems,
        totalPages: _totalPages,
        currentPage: _currentPage,
        firstPage: _firstPage,
        lastPage: _lastPage,
        itemsPerPage: items_perpage,
      });
    }
  };

  const prevPage = (originalData) => {
    loadPagination(
      originalData,
      paginationData.currentPage > 1 &&
        paginationData.currentPage <= paginationData.totalPages
        ? paginationData.currentPage - 1
        : paginationData.firstPage
    );
  };

  const nextPage = (originalData) => {
    loadPagination(
      notificationsData,
      paginationData.currentPage > 0 &&
        paginationData.currentPage < paginationData.totalPages
        ? paginationData.currentPage + 1
        : paginationData.lastPage
    );
  };

  const loadData = () => {
    setshowProgress(true);
    try {
      HTTP.get(API.getNotifications, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            if (res.data.length > 0) {
              loadPagination(res.data);
              setnotificationsData(res.data);
              setshowProgress(false);
            } else {
              setshowProgress(false);
            }
          }
        } else {
          setshowProgress(false);
        }
      });
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <h3 className="fs28 fBold">Notifications</h3>
              <section className="bgWhite radius mt20">
                {showProgress && (
                  <div className="pageBody">
                    <LoadinMsg message="Please wait" />
                  </div>
                )}
                {!showProgress && notificationsList.length > 0
                  ? notificationsList.map((element, index) => {
                      return (
                        <NotificationsListItem key={index} data={element} />
                      );
                    })
                  : !showProgress && <NoDataAvialable />}
              </section>
              {!showProgress && (
                <div className="w-100 pagination_fields mt20">
                  <button
                    className="pagination_prev"
                    onClick={(e) => prevPage(notificationsData)}
                  >
                    {"<"}
                  </button>
                  <span className="pagination_display">
                    {paginationData.currentPage +
                      "/" +
                      paginationData.totalPages}
                  </span>
                  <button
                    className="pagination_next"
                    onClick={(e) => nextPage(notificationsData)}
                  >
                    {">"}
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProviderNotifications;

const NoDataAvialable = () => {
  return (
    <div className="d-flex align-items-center justify-content-center pt120 pb120 text-center">
      <div>
        <span className="cn-notification d-block mb10">
          {Svg.blankNotification}
        </span>
        <p className="fs16 mb5 colorBlack">There are no notifications yet</p>
        <p className="fs14">Select a service that you need from the catalog.</p>
      </div>
    </div>
  );
};

const NotificationsListItem = (props) => {
  const { data } = props;
  return (
    <>
      <section className="pt10 pb10 pl20 pr20">
        <article className="bBottom pb0">
          <Row>
            <Col lg={10}>
              <div className="d-flex">
                <div className="w20 flex20 bgOrange opacity50 radius100 mr15" />
                <div className="noti_link">
                  <Link to="#">
                    <h3 className="fs18 fBold colorBlack">{data.type}</h3>
                  </Link>
                  <div className="fs15 mb10 colorPara">{data.title}</div>
                </div>
              </div>
            </Col>

            <Col lg={2}>
              <div className="d-flex justify-content-end">
                <p className="mb0 fs15">
                  {new Date(data.createdAt).toDateString()}
                </p>
              </div>
            </Col>
          </Row>
        </article>
      </section>
    </>
  );
};

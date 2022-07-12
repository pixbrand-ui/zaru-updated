/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import ConfirmModal02 from "../../../Components/ConfirmModal02/ConfirmModal02";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import CustomerAccountAside from "../CustomerAccountAside/CustomerAccountAside";
import "./CustomerFavouriteProviders.scss";

const CustomerFavouriteProviders = () => {
  const [showProgress, setshowProgress] = useState(false);
  const [favprofiverslist, setfavprofiverslist] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    setshowProgress(true);
    setfavprofiverslist([]);
    try {
      HTTP.get(API.getFavouriteProviders, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            if (res.data) {
              if (res.data.length > 0) {
                setfavprofiverslist(res.data);
              }
            }
            setshowProgress(false);
          } else {
            setshowProgress(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  const refreshData = () => {
    loadData();
  };

  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <CustomerAccountAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <h3 className="fs28 fBold">Favourite Providers</h3>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Please wait" />
                </div>
              )}
              {!showProgress && (
                <section className="bgWhite radius pt30 pb30 pr20 pl20  mb30 border">
                  {favprofiverslist.length > 0 ? (
                    favprofiverslist.map((element, index) => {
                      return (
                        <FavListing
                          key={index}
                          data={element}
                          callback={refreshData}
                        />
                      );
                    })
                  ) : (
                    <NoDataAvialable />
                  )}
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomerFavouriteProviders;

const NoDataAvialable = () => {
  return (
    <div className="d-flex align-items-center justify-content-center pt120 pb120 text-center ">
      <div>
        <span className="cfp-heart">{Svg.heartPink}</span>
        <p className="fs16 mb5 colorBlack">No favourite providers available</p>
      </div>
    </div>
  );
};

const FavListing = (props) => {
  const { data } = props;
  const history = useHistory();

  useEffect(() => {
    console.log("FAV : ", data);
  }, []);

  const removeFavouriteProvider = (providerId) => {
    if (providerId !== null && providerId !== "") {
      ConfirmModal02.show(
        "Are you sure to remove this favourite service provider?",
        () => {
          HTTP.post(
            API.removeFavouriteProvider,
            { businessid: providerId },
            true,
            false,
            Auth.getToken()
          ).then((res) => {
            if (res && res.status && res.status.toString() === "200") {
              AlertModal.show(
                "Service provider removed successfully.",
                "Done!"
              );
              props.callback();
            }
          });
        }
      );
    }
  };
  return (
    <>
      <Row className="bBottom mb25 pb15">
        <Col lg={9}>
          <div className="d-flex">
            <div>
              <img
                src={
                  data.logoimage !== ""
                    ? API.imageurl + data.logoimage
                    : Img.busPro1.default
                }
                alt=""
                className="w50 radius100"
              />
            </div>
            <div className="ml20">
              <p className="fs18 mb5 colorBlack">{data.bussinessname}</p>
              <div className="rating colorPara fs16 mb10">
                <span className="colorBlack fs16">
                  {data.rating}{" "}
                  <span className="staryellow">{Svg.fillStarYellow}</span>
                </span>
                <span className="ml10">Ratings</span>
              </div>
              <p className="fs16">{data.description}</p>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="d-flex align-items-center flex-wrap justify-content-end">
            <CmnButton
              onClick={(e) => {
                history.push({
                  pathname: "/provider/profile/" + data._id,
                  state: {},
                });
              }}
              type="noBg"
              text="View Profile"
              className="fBold mb10 btnTransparentGrey pt-1 pb-1 pl20 pr20 radius"
            />
            <CmnButton
              onClick={(e) => removeFavouriteProvider(data._id)}
              type="noBg"
              text="Remove from favourite"
              className="colorRed fs15"
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

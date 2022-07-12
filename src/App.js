/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./Helpers/Global/GCss/";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import RoutesList from "./Helpers/Routes/RoutesList";
import LoadingModal from "./Components/LoadingModal/LoadingModal";
import AlertModal from "./Components/AlertModal/AlertModal";
import Footer from "./Views/Comman/Footer/Footer";
import Notification, { notify } from "react-notify-toast";
import AlertModal02 from "./Components/AlertModal02/AlertModal02";
import FormModal from "./Components/FormModal/FormModal";
import Header from "./Views/Comman/Header/Header";
import CmnMegaMenu from "./Components/CmnMegaMenu/CmnMegaMenu";
import ConfirmModal02 from "./Components/ConfirmModal02/ConfirmModal02";
import { useDispatch } from "react-redux";
import { LoadMegaMenu } from "./Views/Comman/MegaMenu/Actions";
import HTTP from "./Helpers/Api/Api";
import ScrollToTop from "react-scroll-to-top";
import API from "./Helpers/Constants/Constants";
import GScrollToTop from "./Components/GComponents/GScrollToTop";
import GLocalStorage from "./Helpers/Global/GLocalStorage";
import OTPModal from "./Components/OTPModal/OTPModal";
import $ from "jquery";
import Auth from "./Helpers/Auth/Auth";
import AuthHelper from "./Helpers/Auth/AuthHelper";
import { Helmet } from "react-helmet";
import Img from "./Assets/Img/Img";

function App() {
  var dispatch = useDispatch();
  var histroty = useHistory();
  const [latlong, setlatlong] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (!GLocalStorage.IsExists("user-role")) {
      GLocalStorage.Add("user-role", "Customer");
    }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition, showError);
    // } else {
    //   $("#notify-location").html(
    //     "Geolocation is not supported by this browser. You can't search services/customers near by you."
    //   );
    // }
    loadData().then((res) => {
      dispatch(LoadMegaMenu(res));
    });
  }, []);

  function showPosition(position) {
    if (position) {
      setlatlong({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $("#notify-location").html(
          "You denied the request for Geolocation. Zaaruu can't show services/customers near by you.Please grant geolocation permission."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        $("#notify-location").html("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        $("#notify-location").html(
          "The request to get user location timed out."
        );
        break;
      case error.UNKNOWN_ERROR:
        $("#notify-location").html(
          "An unknown error occurred during getting location service."
        );
        break;
    }
  }

  const loadData = async () => {
    let fdata = [];
    try {
      await HTTP.get(API.megamenuData, false, "").then((res) => {
        if (res && res.status && res.status === 200) {
          fdata = res.data;
          return fdata;
        }
      });
    } catch (error) {
      console.error(error);
      return fdata;
    }
    return fdata;
  };
  return (
    <>
    <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={Img.favicon.default}
          sizes="16x16"
        />
      </Helmet>
      <GScrollToTop />
      <ScrollToTop smooth />
      <OTPModal />
      <CmnMegaMenu />
      <LoadingModal />
      <Notification />
      <ConfirmModal02 />
      <AlertModal/>
      <AlertModal02 />

      <FormModal />
      <div id="notify-location" className="notify-location">
      </div>
      <div className="wrapper">
        
        <Switch>
          {RoutesList.map((route, index) => {
            return (
              <Route
                exact={index === 0 ? true : false}
                key={index}
                path={route.path}
              >
                {!route.showHeaderFooder ? "" : <Header />}
                {route.element}
                {!route.showHeaderFooder ? "" : <Footer />}
              </Route>
            );
          })}
        </Switch>
      </div>
    </>
  );
}

export default App;



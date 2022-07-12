import React, { useEffect, useState } from "react";
import Img from "../../../Assets/Img/Img";
import { Link, Redirect } from "react-router-dom";
import HTTP from "../../../Helpers/Api/Api";

import {
  Row,
  Container,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./Header.scss";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import Auth from "../../../Helpers/Auth/Auth";
import { Badge } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import MegaMenu from "../MegaMenu/MegaMenu";
import CmnMegaMenu from "../../../Components/CmnMegaMenu/CmnMegaMenu";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import API from "../../../Helpers/Constants/Constants";
import { useSelector } from "react-redux";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import CategorySearch from "../Home/CategorySearch";
import TaskSearch from "../Home/TaskSearch";
import { useDispatch } from "react-redux";
import HeaderWallet from "../../../Components/Provider/HeaderWallet";

function Header(props) {
  const [gotopage, setgotopage] = useState("");
  const [stickyHeader, setstickyHeader] = useState("");
  const [userrole, setuserrole] = useState(
    GLocalStorage.IsExists("user-role")
      ? JSON.parse(GLocalStorage.Get("user-role"))
      : "Customer"
  );
  const [userdata, setuserdata] = useState("");

  useEffect(() => {
    let user_data = "";
    if (userrole !== "") {
      //means user auth is exists in local storage
      if (GLocalStorage.IsExists("zaaruuworkbench")) {
        user_data = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
        setuserdata(user_data);
      }
    }
  }, [userrole]);

  const changeUserRole = (role) => {
    // User role can be "Customer" or "Provider"
    if (role !== "") {
      setuserrole(role);
      GLocalStorage.Add("user-role", role);
    }
  };

  useEffect(() => {
    let pst = 0;
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY;

      if (pst < isTop) {
        pst = isTop;
        if (pst > 200) setstickyHeader("topDown");
      }
      if (pst > isTop) {
        setstickyHeader("topUp");
        pst = isTop;
      }
    });
  }, []);

  const megaMenu = () => {
    CmnMegaMenu.show(<MegaMenu />, "", () => {}, "lg", true);
  };

  const MobileMenu = () => {
    return (
      <>
        <section className="mobileMenu">
          <ul className="noUl mb0 d-flex align-items-center flex-wrap mb15">
            <li className="w-100 mb10">
              <Link
                mac={userdata}
                to="#"
                onClick={(e) => changeUserRole("Customer")}
                className="text-center f15 colorOrange btnTheme w-100"
              >
                Log In as Customer
              </Link>
            </li>

            <li className="w-100">
              <Link
                to="#"
                onClick={(e) => changeUserRole("Provider")}
                className="text-center f15 colorBlack btnTheme btnBlack w-100"
              >
                Log In as Provider
              </Link>
            </li>
          </ul>
          <ul className="noUl mb20">
            <li className="mb15">
              <Link
                to="#"
                onClick={(e) => megaMenu()}
                className="f16 colorBlack mr20"
              >
                Services
              </Link>
            </li>
            <li className="mb15">
              <Link to="/provider/signup" className="f16 colorBlack">
                Join as pro
              </Link>
            </li>
            <li>
              <Link to="/how-it-work" className="f16 colorBlack">
                How it works
              </Link>
            </li>
          </ul>

          <div>
            <Link to="#" className="f16  btnTheme mt20">
              Login
            </Link>
          </div>
        </section>
      </>
    );
  };

  const WebRightSideHeaderContentWithoutLogin = () => {
    return (
      <>
        <Col lg={3} xs={6}>
          <div className="d-flex align-items-center flex-wrap">
            <div className="logo mr20">
              <Link to="/">
                <img src={Img.logoBlack.default} alt="" />
              </Link>
            </div>
            <ul className="noUl mb0 d-flex align-items-center flex-wrap liSpacer dNoneMd dNoneXs dNoneLg fs14">
              <li className="mr20">
                <Link
                  to="/"
                  onClick={(e) => {
                    changeUserRole("Customer");
                    window.location.reload();
                  }}
                  className={`f16 ${
                    userrole === "Customer" ? "colorOrange" : "colorBlack"
                  }`}
                >
                  Customer
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    changeUserRole("Provider");
                    window.location.reload();
                  }}
                  className={`f16 ${
                    userrole === "Provider" ? "colorOrange" : "colorBlack"
                  }`}
                >
                  Provider
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        <Col lg={9} xs={6} className="d-flex justify-content-end">
          <ul className="noUl mb0 d-flex align-items-center flex-wrap dNoneXl">
            <li>
              <Link
                to="#"
                onClick={(e) => megaMenu()}
                className="f16 colorBlack mr20"
              >
                {Svg.heirarchy}
              </Link>
            </li>
          </ul>
          <button
            className="btnBlank dNoneXl"
            onClick={(e) => {
              AlertModal.show(<MobileMenu />, "", () => {}, "xl", true);
            }}
          >
            {Svg.bar}
          </button>

          <div className="d-flex align-items-center flex-wrap justify-content-end dNoneMd dNoneXs dNoneLg fs14">
            <ul className="noUl mb0 d-flex align-items-center flex-wrap ">
              <li>
                <Link
                  to="#"
                  onClick={(e) => megaMenu()}
                  className="f16 colorBlack mr20"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/provider/signup" className="f16 colorBlack mr20">
                  Join as pro
                </Link>
              </li>
              <li>
                <Link to="/how-it-work" className="f16 colorBlack mr20">
                  How it works
                </Link>
              </li>
            </ul>

            <Link
              onClick={(e) => setgotopage("login")}
              to="#"
              className="f16  btnTheme "
            >
              Login
            </Link>
          </div>
        </Col>
      </>
    );
  };

  const WebRightSideHeaderContentWithLogin = () => {
    return (
      <>
        <Col lg={3} xs={6}>
          <div className="d-flex align-items-center flex-wrap">
            <div className="logo mr20">
              <Link to="/">
                <img src={Img.logoBlack.default} alt="" />
              </Link>
            </div>
            <ul className="noUl mb0 d-flex align-items-center flex-wrap liSpacer dNoneMd dNoneXs dNoneLg fs14">
              <li>
                <Link to="#" className={`f16 colorOrange colorBlack`}>
                  {Auth.getLoginAuth()[0].role}
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        <Col lg={9} xs={6} className="d-flex justify-content-end">
          <ul className="noUl mb0 d-flex align-items-center flex-wrap dNoneXl">
            <li>
              <Link to="#" className="f16 colorBlack mr20">
                <Badge badgeContent={4} color="warning">
                  <NotificationsOutlined className="" />
                </Badge>
              </Link>
            </li>
          </ul>

          <button
            className="btnBlank dNoneXl"
            onClick={(e) => {
              AlertModal.show(<MobileMenu />, "", () => {}, "xl", true);
            }}
          >
            {Svg.bar}
          </button>

          {/* Customer Navigation */}
          {Auth.getLoginAuth()[0].role === "Customer" && <CustomerNav />}
          {/* Provider Navigation */}
          {Auth.getLoginAuth()[0].role === "Provider" && <ProviderNav />}
        </Col>
      </>
    );
  };

  const CustomerNav = () => {
    const [gotopage, setgotopage] = useState("");
    const [userData, setuserData] = useState(null);
    var reloadUserData = useSelector((state) => state.ReloadAuth);

    useEffect(() => {
      setuserData(Auth.getLoginAuth());
    }, [reloadUserData]);

    useEffect(() => {
      setuserData(Auth.getLoginAuth());
    }, []);

    const switchToProvder = async () => {
      try {
        // call api to change user role field
        await HTTP.post(
          API.changeUserRole,
          { usertype: "Provider" },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            // update local auth role (Local Storage)
            var userauthdata = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
            userauthdata[0].role = "Provider";
            GLocalStorage.Update("zaaruuworkbench", userauthdata);
            GLocalStorage.Update("user-role", "Provider");
            Auth.setToken(res.data.token);
            // then redirect to provder dashboard
            setgotopage("provider/dashboard");
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div className="d-flex align-items-center flex-wrap justify-content-end dNoneMd dNoneXs dNoneLg fs14">
        {gotopage === "provider/dashboard" && (
          <Redirect to="/provider/dashboard" />
        )}
        {/* <CmnSearch
          placeholder="What service you need"
          className="inputSolid radius pl38 pl20 pr20 mr15 w-100"
        /> */}
        <ul className="noUl mb0 d-flex align-items-center flex-wrap ">
          <li>
            <Link to="/customer/notifications" className="f16 colorBlack mr20">
              {/* <Badge badgeContent={""} color="warning"> */}
              <NotificationsOutlined className="" />
              {/* </Badge> */}
            </Link>
          </li>
        </ul>

        <ul className="noUl mb0 d-flex align-items-center flex-wrap ">
          <li>
            <Link
              to="#"
              onClick={(e) => megaMenu()}
              className="f16 colorBlack mr20"
            >
              Services
            </Link>
          </li>
          <li>
            <Link to="/customer/dashboard" className="f16 colorBlack mr20">
              My Tasks
            </Link>
          </li>
        </ul>

        <UncontrolledDropdown className="noBgonDropDown">
          <DropdownToggle>
            <div className="d-flex align-items-center">
              <div className="header_profile_img mr10">
                <img
                  className="radius100 w-100 h-100"
                  alt=""
                  src={
                    userData && userData[0].profileImage
                      ? API.imageurl + userData[0].profileImage
                      : Img.userplace.default
                  }
                />
              </div>
              <div className="colorBlack text-capitalize fw500 fs16">
                {userData && userData[0].name}
                <span className="ml5">{Svg.downArrowSmall}</span>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className="radius4 shadow noBorder">
            <DropdownItem>
              <ul className="noBg noUl mb0">
                <li className="mb10">
                  <Link
                    to="/customer/update-account-profile"
                    className="fs15 d-block w-100 colorPara"
                  >
                    My Profile
                  </Link>
                </li>
                <li className="mb10">
                  <Link
                    to="#"
                    onClick={(e) => switchToProvder()}
                    className="fs15 d-block w-100 colorPara"
                  >
                    Switch to Provider
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="fs15 d-block w-100 colorPara">
                    Logout
                  </Link>
                </li>
              </ul>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const ProviderNav = () => {
    const [points, setpoints] = useState(0);
    const [gotopage, setgotopage] = useState("");
    const [userData, setuserData] = useState(null);
    var reloadUserData = useSelector((state) => state.ReloadAuth);
    const dispatch = useDispatch();
    useEffect(() => {
      setuserData(Auth.getLoginAuth());
    }, [reloadUserData]);

    // useEffect(() => {
    //   dispatch(getWallet());
    //   setuserData(Auth.getLoginAuth());
    // }, []);

    // const getPoints =async () => {
    //   try {
    //    await HTTP.get(API.getBalancePoints,false, Auth.getToken()).then((res) => {
    //       if(res && res.status && res.status.toString()==="200"){
    //         setpoints(res.data.points);
    //       }
    //     });
    //   } catch (e) {
    //     console.log(e, "Issue in the header");
    //   }
    // };

    const getPoints = async () => {
      try {
        await HTTP.get(API.getBalancePoints, false, Auth.getToken()).then(
          (res) => {
            if (res && res.status && res.status.toString() === "200") {
              setpoints(res.data.points);
            }
          }
        );
      } catch (e) {
        console.log(e, "Issue in the header");
      }
    };

    const switchToCustomer = async () => {
      try {
        // call api to change user role field
        await HTTP.post(
          API.changeUserRole,
          { usertype: "Customer" },
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            // update local auth role (Local Storage)
            var userauthdata = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
            userauthdata[0].role = "Customer";
            GLocalStorage.Update("zaaruuworkbench", userauthdata);
            GLocalStorage.Update("user-role", "Customer");
            Auth.setToken(res.data.token);
            // then redirect to provder dashboard
            setgotopage("customer/dashboard");
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div className="d-flex align-items-center flex-wrap justify-content-end dNoneMd dNoneXs dNoneLg fs14">
        {gotopage === "customer/dashboard" && (
          <Redirect to="/customer/dashboard" />
        )}
        {/* <CmnSearch
          placeholder="What service you need"
          className="inputSolid radius pl38 pl20 pr20 mr15 w-100"
        /> */}

        <ul className="noUl mb0 d-flex align-items-center flex-wrap ">
          <li>
            <div className="pointsElem d-flex">
              <span className="mr7">{Svg.points}</span>
              <span className="colorWhite">
                <HeaderWallet />
              </span>
            </div>
          </li>
          <li>
            <CmnButton
              onClick={() => {
                AlertModal02.show(
                  <TaskSearch />,
                  "",
                  () => {},
                  "lg",
                  "Cancel",
                  false,
                  false
                );
              }}
              icon={Svg.search}
              className="no-link"
              type="noBg"
            />
          </li>
          <li>
            <Link to="/provider/notifications" className="f16 colorBlack mr20">
              {/* <Badge badgeContent={4} color="warning"> */}
              <NotificationsOutlined className="" />
              {/* </Badge> */}
            </Link>
          </li>
        </ul>

        <ul className="noUl mb0 d-flex align-items-center flex-wrap ">
          <li>
            <Link to="/provider/dashboard" className="f16 colorBlack mr20">
              Dashboard
            </Link>
          </li>
          {/* <li>
            <Link to="#" className="f16 colorBlack mr20">
              <Badge badgeContent={4} color="warning">
                <NotificationsOutlined className="" />
              </Badge>
            </Link>
          </li> */}
        </ul>

        <UncontrolledDropdown className="noBgonDropDown">
          <DropdownToggle>
            <div className="d-flex align-items-center">
              <div className="header_profile_img mr10">
                {console.log("userData", userData)}
                <img
                  className="radius100 w-100 h-100"
                  alt=""
                  src={
                    userData && userData[0].profileImage
                      ? API.imageurl + userData[0].profileImage
                      : Img.userplace.default
                  }
                />
              </div>
              <div className="colorBlack fw500 fs16">
                {userData && userData[0].name}
                <span className="ml5">{Svg.downArrowSmall}</span>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className="radius4 shadow noBorder">
            <DropdownItem>
              <ul className="noBg noUl mb0">
                <li className="mb10">
                  <Link
                    to="/provider/business-profile"
                    className="fs15 d-block w-100 colorPara"
                  >
                    My Profile
                  </Link>
                </li>
                <li className="mb10">
                  <Link
                    to="#"
                    onClick={(e) => switchToCustomer()}
                    className="fs15 d-block w-100 colorPara"
                  >
                    Switch to Customer
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="fs15 d-block w-100 colorPara">
                    Logout
                  </Link>
                </li>
              </ul>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  return (
    <header className={`siteHeader bgWhite pt10 pb10 ${stickyHeader}`}>
      {gotopage === "login" && <Redirect to="/login" />}
      {gotopage === "logout" && <Redirect to="/logout" />}
      <Container>
        <Row className="align-items-center">
          {!Auth.isUserLoggedIn() ? (
            <WebRightSideHeaderContentWithoutLogin />
          ) : (
            <WebRightSideHeaderContentWithLogin />
          )}
        </Row>

        {/* <div className="w-100 mt15 srcWrapperHead dNoneXl">
          <CmnSearch
            placeholder="What service you need"
            className="inputSolid radius pl38 pl20 pr20"
          />
        </div> */}
      </Container>
    </header>
  );
}

export default Header;

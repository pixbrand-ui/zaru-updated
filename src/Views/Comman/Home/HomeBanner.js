/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import GAutoComplete from "../../../Components/GComponents/GAutoComplete/GAutoComplete/GAutoComplete";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import { Link, useHistory } from "react-router-dom";

const HomeBanner = () => {
  const [showSearchProgress, setshowSearchProgress] = useState(true);
  const [locationdata, setlocationdata] = useState("");
  const [subcategory, setsubcategory] = useState([]);
  const [subcatnameonly, setsubcatnameonly] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [latlong, setlatlong] = useState({
    latitude: "",
    longitude: "",
  });
  const [searchSelectedData, setSearchSelectedData] = useState(null);
  const history = useHistory();

  const sendData = () => {
    // sub category ID is in searchSelectedData
    // latitude and long data is in latlong
    // location is in locationdata
    //--------------------------------------------------
    // console.log("locationdata : ", locationdata);
    // console.log("subcategory : ", subcategory);
    // console.log("searchSelectedData : ", searchSelectedData);
    // console.log("latlong : ", latlong);
    history.push({
      pathname: "/providers/sc/" + searchSelectedData.id,
      state: {
        categoryid: searchSelectedData.id,
        latlong: [latlong.latitude, latlong.longitude],
      },
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        if (val) {
          setlatlong({
            latitude: val.geometry.location.lat(),
            longitude: val.geometry.location.lng(),
          });
        }
      });
    }
    loadSubCat();
  }, []);

  const onSearchChanged = (data) => {
    setSearchSelectedData(data);
  };

  const loadSubCat = async () => {
    setshowSearchProgress(true);
    
    try {
      await HTTP.get(API.get_subcategory, false, Auth.getToken()).then(
        (res) => {
          
          setshowSearchProgress(false);
          if (res && res.status && res.status === 200) {
            if (res.data.length > 0) {
              if (res.data) {
                setsubcategory(res.data);
                if (res.data.length > 0) {
                  const temp = [];
                  res.data && res.data.forEach((elem) => {
                    console.log("myelem",elem);
                    temp.push({
                      id: elem._id,
                      data: elem?.subcategory_name +
                        " > " +
                        elem.subcategory_name,
                    });
                  });
                  const temp2 = [];
                  res.data && res.data.forEach((elem) => {
                    temp2.push(
                      elem?.subcategory_name+
                        " > " +
                        elem.subcategory_name
                    );
                  });

                  console.log("temp",temp);
                  setsubcatnameonly(temp2);
                  setsubcatdata(temp);
                }
              }
            }
          }
        }
      );
    } catch (e) {
      setshowSearchProgress(false);
      console.log(e, "home banner section");
    }
  };

  return (
    <>
      <style jsx="true">
        {`
          .disabledBtn {
            background: #ddd;
            color: #5a5a5a;
            pointer-events: none;
          }
        `}
      </style>
     
      <section
        className="homeBanner d-flex align-items-center flex-wrap position-relative"
        style={{ backgroundImage: "url(" + Img.hBanner.default + ")" }}
      >
        <div className="overlayBanner" />
        <Container>
          <div className="text-center d-flex align-items-center flex-wrap justify-content-center width60 tabWidth100 tabLgWidth100 mx-auto mobWidth100">
            <h3 className="colorBlack fs45 fBold mb30 mobColorWhite textShadow mobFs32">
              Find local professionals for just about anything.
            </h3>
            <div className="">
              <Row className="gx-2 mobMb10">
                {showSearchProgress && (
                  <Col lg={12}>
                    <div className="position-relative mobMb10">
                      <LoadinMsg message="" />
                    </div>
                  </Col>
                )}
                {!showSearchProgress && (
                  <>
                    <Col lg={4}>
                      <div className="position-relative mobMb10">
                        <Autocomplete
                          options={{
                            types: ["(regions)"],
                          }}
                          apiKey={process.env.REACT_APP_SECRET_KEY}
                          onPlaceSelected={(place) => {
                            setlocationdata(place);
                            setlatlong({
                              latitude: place.geometry.location.lat(),
                              longitude: place.geometry.location.lng(),
                            });
                          }}
                          className="w-100 inputTransparent  outlineNone mobRadius7 pl30"
                        />
                        <span className="iconElement iconLeft">
                          {Svg.locationPin}
                        </span>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <div className="d-flex align-items-center flex-wrap">
                        <GAutoComplete
                          button={true}
                          placeholder="What service you need"
                          className="mobMb10 bgWhite radiusLeft mobRadius7 pl38 pl20 pr20 width100 mobWidth100"
                          suggestions={subcatnameonly}
                          suggestionsdata={subcatdata}
                          selectedData={onSearchChanged}
                          onEnterCallback={sendData}
                        />

                        <CmnButton
                          onClick={(e) => sendData()}
                          className={`${
                            searchSelectedData !== null ? "" : "disabledBtn"
                          } btnTheme pt15 pb15 h47 radiusRight mobRadius7`}
                          text="Search"
                          type="square"
                        />
                      </div>
                    </Col>
                  </>
                )}
              </Row>
              <div className="text-center playerBtn mt20 d-flex align-items-center flex-wrap justify-content-center mobJustifyContentStart">
                {/* <CmnButton
                  type="noBg"
                  className="colorBlack mobColorWhite childWhite"
                  text="See How it's works"
                  icon={Svg.triangle}
                /> */}
                {/* <div></div> */}
                <span className="mr10">{Svg.triangle}</span>
                <Link to="/how-it-work" className="colorBlack mobColorWhite childWhite">See How it's works</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomeBanner;

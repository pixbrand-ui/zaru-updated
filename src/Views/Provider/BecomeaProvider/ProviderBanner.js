import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import GAutoComplete from "../../../Components/GComponents/GAutoComplete/GAutoComplete/GAutoComplete";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import Autocomplete from "react-google-autocomplete";
import { useHistory } from "react-router-dom";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";

const ProviderBanner = () => {
  var history = useHistory();

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

  const sendData = () => {
    //   // sub category ID is in searchSelectedData
    //   // latitude and long data is in latlong
    //   // location is in locationdata
    // console.log("locationdata : ", locationdata);
    // console.log("subcategory : ", subcategory);
    // console.log("searchSelectedData : ", searchSelectedData);
    // console.log("latlong : ", latlong);
    history.push({
      pathname: "/task-lists/" + searchSelectedData.id,
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
          GLocalStorage.Add("latitude", val.coords.latitude);
          GLocalStorage.Add("longitude", val.coords.longitude);
          setlatlong({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude,
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
                  let temp = [];
                  res.data.forEach((elem) => {
                    temp.push({
                      id: elem._id,
                      data:
                        elem.categoryid.category_name +
                        " > " +
                        elem.subcategory_name,
                    });
                  });
                  let temp2 = [];
                  res.data.forEach((elem) => {
                    temp2.push(
                      elem.categoryid.category_name +
                        " > " +
                        elem.subcategory_name
                    );
                  });
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
        className="homeBanner d-flex align-items-center flex-wrap position-relative mb70"
        style={{ backgroundImage: "url(" + Img.becomeBanner.default + ")" }}
      >
        <div className="overlayBanner" />
        <Container>
          {console.log("latt", latlong)}
          <div className="text-center d-flex align-items-center flex-wrap justify-content-center width50 tabWidth100 tabLgWidth100 mx-auto mobWidth100">
            <h3 className="colorWhite fs45 fBold mb30 mobColorWhite textShadow mobFs32">
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
                          apiKey="AIzaSyB4XcAQ0lfyPPnF4W1xAZ3zDLJU9uiIo1k"
                          onPlaceSelected={(place) => {
                            console.log("aa", place);
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
                          placeholder="Search customer requests"
                          className="mobMb10 bgWhite radiusLeft mobRadius7 pl38 pl20 pr20 width100 mobWidth100"
                          suggestions={subcatnameonly}
                          suggestionsdata={subcatdata}
                          selectedData={onSearchChanged}
                        />

                        <CmnButton
                          className={`${
                            searchSelectedData !== null ? "" : "disabledBtn"
                          } btnTheme pt15 pb15 h47 radiusRight mobRadius7`}
                          text="Search"
                          type="square"
                          onClick={() => sendData()}
                        />
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProviderBanner;

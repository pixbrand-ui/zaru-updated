/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import GAutoComplete from "../../../Components/GComponents/GAutoComplete/GAutoComplete/GAutoComplete";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import { useHistory } from "react-router-dom";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";

const CategorySearch = () => {
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
      state: { categoryid: searchSelectedData.id, latlong : latlong },
    });
    AlertModal02.hide();
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        if (val) {
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
      <section className="CategorySearch d-flex align-items-center flex-wrap position-relative">
        <Container>
          <div className="d-flex align-items-center flex-wrap  tabWidth100 tabLgWidth100 mx-auto mobWidth100 justify-content-center">
            <p className="fs16 colorBlack">
              Give us a few details and we'll match you with the rights service
              provider.
            </p>
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
                    <Col lg={4} md={12}>
                      <div className="position-relative mobMb10 tabMb10">
                        <Autocomplete
                         options={{
                          types: ["(regions)"],
                        }}
                          apiKey="AIzaSyB4XcAQ0lfyPPnF4W1xAZ3zDLJU9uiIo1k"
                          onPlaceSelected={(place) => {
                            setlocationdata(place);
                          }}
                          className="w-100 inputTransparent  outlineNone mobRadius7 pl30"
                        />
                        <span className="iconElement iconLeft">
                          {Svg.locationPin}
                        </span>
                      </div>
                    </Col>
                    <Col lg={8} md={12}>
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategorySearch;

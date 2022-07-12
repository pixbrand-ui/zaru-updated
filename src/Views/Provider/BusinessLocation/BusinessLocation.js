import React, { useEffect, useState } from "react";
import BusinessAside from "../BusinessAside/BusinessAside";
import { Col, Container, Row } from "reactstrap";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "./BusinessLocation.scss";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import Autocomplete from "react-google-autocomplete";

const BusinessLocation = () => {
  const [area, setArea] = useState("");
  const [AddressLine, setAddressLine] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [radius, setradius] = useState("");
  const [gotonext, setgotonext] = useState(false);
  const [latlong, setlatlong] = useState([]);

  useState(() => {
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
  }, []);






  const saveData = () => {
    try {
      const iData = {
        address: area,
        addressline2: AddressLine,
        country: country,
        state: state,
        city: city,
        zipcode: zip,
        latitude: "22.703538",
        longitude: "75.871013",
        radiusofservice: "200",
        location: { coordinates: [latlong.latitude, latlong.longitude] },
      };
      const businessID = JSON.parse(GLocalStorage.Get("c-bref"));
      const completeUrl = API.businessUpdateLocation + businessID;
      HTTP.put(completeUrl, iData, true, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          setgotonext(true);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {gotonext && <Redirect to="/business/business-reviews"></Redirect>}
      <section className="bgLightOrange pt60 pb60">
        
        <Container>
          <Row>
            <Col lg={3} md={3} xl={3}>
              <BusinessAside />
            </Col>
            <Col lg={9} md={9} xl={9}>
              <h3 className="fs24 colorBlack fBold mb30">
                What's Your Business Location ?
              </h3>
              <section className="bgWhite radius pt30 pb30 mb30 border">
                <div className="pl30 pr30">
                  <h3 className="fs20 colorBlack">Address</h3>
                  <p className="fs16">
                    We will send you jobs from your neighborhood and nearby
                    areas.
                  </p>
                  <CmnInput
                    className=""
                    label="Area"
                    type="text"
                    placeholder="Street address"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <CmnInput
                    className=""
                    label="Address Line 2 "
                    type="text"
                    placeholder="Address Line 2 "
                    value={AddressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                  />
                  <div className="mb15">
                    <label className="fs16 mb7">Location *</label>
                    <Autocomplete
                     options={{
                      types: ["(regions)"],
                    }}
                      apiKey="AIzaSyB5DozhssD2YsMZV6aOfdznWqqbR6dM6_w"
                      onPlaceSelected={(locationData) => {
                        console.log("yyyy",locationData);
                        setcity(locationData.address_components[0].long_name);
                        setstate(locationData.address_components[2].long_name);
                        setcountry(
                          locationData.address_components[3].long_name
                        );
                        setlatlong({
                          latitude: locationData.geometry.location.lat(),
                          longitude: locationData.geometry.location.lng(),
                        });
                      }}
                      className="w-100 inputTransparent  outlineNone mobRadius7"
                      placeholder="Type your location"
                    />
                  </div>

                  <Row>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        label="City*"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        readOnly={true}
                      />
                    </Col>
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        label="ZIP or Postcode *"
                        type="text"
                        placeholder="ZIP or Postcode"
                        value={zip}
                        onChange={(e) => setzip(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb20">
                    <Col lg={6}>
                      <CmnInput
                        className=""
                        label="State or Province *"
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                        readOnly={true}
                      />
                    </Col>
                    <Col lg={6}>
                      <div className="position-relative">
                        <CmnInput
                          className=""
                          label="Country *"
                          type="text"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setcountry(e.target.value)}
                          readOnly={true}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mapList mb30">
                   
                  <iframe
  key={latlong}
  title="542313431asd45"
  src={`https://maps.google.com/maps?q=${latlong.latitude},${latlong.longitude}&z=15&output=embed`}
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
></iframe>
            
                  </div>
                </div>
                <div className="bBottom mb20"></div>
                <div className="pl30 pr30">
                  <h3 className="fs20 mb15 colorBlack">
                    Radius for Service Area
                  </h3>
                  <p className="fs16">
                    Set the radius from your City which covers your service
                    area, we'll only send you customer requests within this
                    coverage.
                  </p>
                  <div className="position-relative">
                    <Select
                      options={[
                        { label: "20kms", value: "20kms" },
                        { label: "50kms", value: "50kms" },
                        { label: "100kms", value: "100kms" },
                        { label: "200kms", value: "200kms" },
                      ]}
                      classNamePrefix="themeSelect"
                      className="themeSelect"
                      value={radius}
                      onChange={(e) => setradius(e)}
                    />
                  </div>
                  <div className="d-flex justify-content-end mt20">
                    <CmnButton
                      onClick={saveData}
                      type="square"
                      text="Continue"
                      className=""
                    />
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BusinessLocation;

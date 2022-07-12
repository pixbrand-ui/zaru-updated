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
import GAlign from "../../../Components/GComponents/GAlign";
import { useParams } from "react-router-dom";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";

const EditBusinessLocation = () => {
  const { refid } = useParams();
  const [showProgress, setshowProgress] = useState(true);
  const [area, setArea] = useState("");
  const [AddressLine, setAddressLine] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [radius, setradius] = useState("");
  const [location, setlocation] = useState("");
  const [gotonext, setgotonext] = useState(false);
  const [latlong, setlatlong] = useState({
    latitude: 0,
    longitude: 0,
  });




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
    if (refid) {
      loadData().then((res) => {
        if (res) {
          console.log("On load : ", res);
          setArea(res.address);
          setAddressLine(res.addressline2);
          setcity(res.city);
          setcountry(res.country);
          setstate(res.state);
          setzip(res.zipcode);
          setlocation(res.city + ", " + res.state + ", " + res.country);
          setradius({ label: res.radiusofservice, value: res.radiusofservice });
          // setlatlong({
          //   latitude: res.location.coordinates[0],
          //   longitude: res.location.coordinates[1],
          // });
        }
        setshowProgress(false);
      });
    }
  }, []);

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.get(
          API.getBusinessInfo + refid,
          false,
          Auth.getToken()
        ).then((res) => {
          console.log("data on load", res);
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
            return result;
          } else {
            result = null;
            setshowProgress(false);
            return result;
          }
        });
      }
    } catch (error) {
      console.error(error);
      setshowProgress(false);
    }
    return result;
  };

  const saveData = () => {
    try {
      const iData = {
        address: area,
        addressline2: AddressLine,
        country: country,
        state: state,
        city: city,
        zipcode: zip,
        latitude: latlong.latitude,
        longitude: latlong.longitude,
        radiusofservice: radius.value,
        location: { coordinates: [latlong.latitude, latlong.longitude] },
      };
      const completeUrl = API.businessUpdateLocation + refid;
      HTTP.put(completeUrl, iData, true, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          AlertModal02.show(
            "Your address & location details updated successfully.",
            "Success!"
          );
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-2">
      <Row>
        <Col lg={12} md={12} xl={12}>
          <GAlign align="between" className="mb-2">
            <h3 className="fs24 colorBlack fBold">Edit Business Location</h3>
            <CmnButton
              type="square"
              onClick={(e) => saveData()}
              text="Update"
            />
          </GAlign>
          {showProgress && (
            <div className="pageBody">
              <LoadinMsg message="Please wait" />
            </div>
          )}
          {!showProgress && (
            <section className="bgWhite radius pt30 pb30 border">
              <div className="pl30 pr30">
                <h3 className="fs20 colorBlack">Address</h3>
                <p className="fs16">
                  We will send you jobs from your neighborhood and nearby areas.
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
                    apiKey="AIzaSyB4XcAQ0lfyPPnF4W1xAZ3zDLJU9uiIo1k"
                    defaultValue={location}
                    onPlaceSelected={(locationData) => {
                      setlatlong({
                        latitude: locationData.geometry.location.lat(),
                        longitude: locationData.geometry.location.lng(),
                      });
                      setcity(locationData.address_components[0].long_name);
                      setstate(locationData.address_components[2].long_name);
                      setcountry(locationData.address_components[3].long_name);
                      setlocation(
                        locationData.address_components[0].long_name +
                          ", " +
                          locationData.address_components[2].long_name +
                          ", " +
                          locationData.address_components[3].long_name
                      );
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
                  Radius for Service Area (in KM)
                </h3>
                <p className="fs16">
                  Set the radius from your City which covers your service area,
                  we'll only send you customer requests within this coverage.
                </p>
                <div className="position-relative">
                  <Select
                    options={[
                      { label: "200", value: "200" },
                      { label: "100", value: "100" },
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
                    text="Update"
                    className=""
                  />
                </div>
              </div>
            </section>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EditBusinessLocation;

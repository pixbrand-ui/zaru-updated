import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Select from "react-select";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import LoadinMsg from "../../../../Components/LoadingModal/LoadingMsg";
import ProAside from "../ProAside";
import HTTP from "../../../../Helpers/Api/Api";
import API from "../../../../Helpers/Constants/Constants";
import Auth from "../../../../Helpers/Auth/Auth";
import CmnInput from "../../../../Components/CmnInput/CmnInput";
import CmnTextarea from "../../../../Components/CmnTextarea/CmnTextarea";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import Autocomplete from "react-google-autocomplete";

const accountTypes = [
  { value: "Saving", label: "Saving" },
  { value: "Current", label: "Current" },
];

const ProviderBillingDetails = () => {
  const [latlong, setlatlong] = useState({
    latitude: 35.856737,
    longitude: 10.606619,
  });
  const [showProgress, setshowProgress] = useState(false);
  const [streetAddress, setstreetAddress] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [state, setstate] = useState({ value: "", label: "" });
  //const [stateList, setstateList] = useState([]);
  const [country, setcountry] = useState({ value: "", label: "" });
  const [bankName, setbankName] = useState("");
  const [accountnum, setaccountnum] = useState("");
  const [accountName, setaccountName] = useState("");
  const [branchCode, setbranchCode] = useState("");
  const [accountType, setaccountTypee] = useState({ value: "", label: "" });
  const [additionalInfo, setadditionalInfoe] = useState("");
  const [latitude, setlatitudee] = useState("");
  const [longitude, setlongitudee] = useState("");
  //const [countryList, setcountryList] = useState([]);
  const [userdata, setuserdata] = useState("");

  // Get account data from user info api
  // then manage states
  // apply validations
  // update account details

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
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setshowProgress(true);
    try {
      HTTP.get(API.getUserInfo, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          console.log(res);
          if (res.data) {
            setuserdata(res.data);
            // now load states according to data;
            setstreetAddress(res.data.address || "");
            setAddressLine2(res.data.address2 || "");
            setcity(res.data.city || "");
            setzip(res.data.zipcode || "");
            setstate(
              res.data.state
                ? { value: res.data.state, label: res.data.state }
                : { value: "", label: "" }
            );
            setcountry(
              res.data.country
                ? { value: res.data.country, label: res.data.country }
                : { value: "", label: "" }
            );
            if (res.data.bankdetails.length > 0) {
              setbankName(res.data.bankdetails[0].bankname || "");
              setaccountName(res.data.bankdetails[0].accountname || "");
              setaccountnum(res.data.bankdetails[0].accountno || "");
              setbranchCode(res.data.bankdetails[0].branchcode || "");
              setaccountTypee(
                res.data.bankdetails[0].accounttype
                  ? {
                      value: res.data.bankdetails[0].accounttype,
                      label: res.data.bankdetails[0].accounttype,
                    }
                  : { value: "", label: "" }
              );
              setadditionalInfoe(res.data.bankdetails[0].moreinfo || "");
            }
            if (res.data.latitude && res.data.latitude !== "") {
              setlatitudee(res.data.latitude);
              setlongitudee(res.data.longitude);
            } else {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (val) => {
                    if (val) {
                      setlatitudee(val.coords.latitude);
                      setlongitudee(val.coords.longitude);
                    }
                  },
                  () => {},
                  { enableHighAccuracy: true, maximumAge: 10 }
                );
              }
            }
            setshowProgress(false);
          } else {
            setshowProgress(false);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setshowProgress(false);
    }
  };

  const saveData = () => {
    try {
      if (streetAddress.trim().length <= 0) {
        return AlertModal.show(
          "Address is required for providing services.",
          "Oops!"
        );
      }
      if (city.trim().length <= 0) {
        return AlertModal.show("city name is required.", "Oops!");
      }
      if (zip.trim().length <= 0) {
        return AlertModal.show("Zip code is required.", "Oops!");
      }
      if (country.value.trim().length <= 0) {
        return AlertModal.show("Country name is required.", "Oops!");
      }
      if (state.value.trim().length <= 0) {
        return AlertModal.show("state name is required.", "Oops!");
      }
      if (bankName.trim().length <= 0) {
        return AlertModal.show("Bank name is required.", "Oops!");
      }
      if (accountName.trim().length <= 0) {
        return AlertModal.show("Account holder name is required.", "Oops!");
      }
      if (accountnum.trim().length <= 0) {
        return AlertModal.show("Account number is required.", "Oops!");
      }
      if (accountType.value.trim().length <= 0) {
        return AlertModal.show("Please select account type.", "Oops!");
      }
      if (branchCode.trim().length <= 0) {
        return AlertModal.show("Please enter branch or IFSC code.", "Oops!");
      }
      const iData = {
        address: streetAddress,
        address2: AddressLine2,
        city: city,
        zipcode: zip,
        state: state.value,
        country: country.value,
        latitude: latitude,
        longitude: longitude,
        bankname: bankName,
        accountname: accountName,
        accountno: accountnum,
        branchcode: branchCode,
        accounttype: accountType.value,
        moreinfo: additionalInfo,
      };
      HTTP.post(
        API.updateUserBilling,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          AlertModal.show(
            `${userdata.firstname} ${userdata.lastname} your billing details has updaetd successfully.`,
            "Success"
          );
        }
        if (res && res.status && res.status === 201) {
          AlertModal.show(res.message, "Oops!");
        }
      });
    } catch (error) {
      console.log(error);
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
              <h3 className="fs28 fBold">Billing Details</h3>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Please wait" />
                </div>
              )}
              {!showProgress && (
                <div className="">
                  <section className="bgWhite radius mb30 border">
                    <div className="pt20 pb20 pl30 pr30">
                      <h3 className="fs18 colorBlack mb0">Address Details</h3>
                    </div>
                    <div className="bBottom"></div>
                    <div className="pt30 pb30 pl30 pr30">
                      <CmnInput
                        className=""
                        label="Street Address *"
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        onChange={(e) => setstreetAddress(e.target.value)}
                      />
                      <CmnInput
                        className=""
                        label="Address Line 2 "
                        type="text"
                        placeholder="Address Line 2 "
                        value={AddressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                      <div className="mb15">
                        <label className="fs16 mb7">Location *</label>
                        <Autocomplete
                         options={{
                          types: ["(regions)"],
                        }}
                          apiKey="AIzaSyB4XcAQ0lfyPPnF4W1xAZ3zDLJU9uiIo1k"
                          onPlaceSelected={(locationData) => {
                            setlatlong({
                              latitude: locationData.geometry.location.lat(),
                              longitude: locationData.geometry.location.lng(),
                            });
                            setcity(
                              locationData.address_components[0].long_name
                            );
                            setstate(
                              locationData.address_components[2].long_name
                            );
                            setcountry(
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
                            label="City or Town *"
                            type="text"
                            placeholder="City or Town"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
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
                      <Row>
                        <Col lg={6}>
                          {
                            console.log("stt",state)
                          }
                          <CmnInput
                            className=""
                            label="State *"
                            type="text"
                            placeholder="State"
                            value={state.value==="" ? "" : state}
                            onChange={(e) => setstate(e.target.value)}
                          />
                        </Col>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="Country *"
                            type="text"
                            placeholder="Country"
                            value={country.value==="" ? "" : country}
                            onChange={(e) => setcountry(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <div className="mapList mt30">
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
                  </section>
                  <section className="bgWhite radius mb30 border">
                    <div className="pt20 pb20 pl30 pr30">
                      <h3 className="fs18 colorBlack mb0">Referral Bonus</h3>
                    </div>
                    <div className="bBottom"></div>
                    <div className="pt20 pb20 pl30 pr30">
                      <CmnInput
                        className=""
                        label="Bank name *"
                        type="text"
                        placeholder="Bank name"
                        value={bankName}
                        onChange={(e) => setbankName(e.target.value)}
                      />
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="Account number *"
                            type="number"
                            placeholder="e.g. 1234567890"
                            value={accountnum}
                            onChange={(e) => setaccountnum(e.target.value)}
                          />
                        </Col>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="Account name *"
                            type="text"
                            placeholder="Account"
                            value={accountName}
                            onChange={(e) => setaccountName(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            className=""
                            label="Branch/IFSC code *"
                            type="number"
                            placeholder="e.g. 1234567890"
                            value={branchCode}
                            onChange={(e) => setbranchCode(e.target.value)}
                          />
                        </Col>
                        <Col lg={6}>
                          <p className="fs16 colorBlack mb7">Account Type</p>
                          <div className="">
                            <Select
                              label="Account type *"
                              className="w-100 themeSelect"
                              classNamePrefix="themeSelect"
                              options={accountTypes}
                              value={accountType}
                              onChange={(e) => setaccountTypee(e)}
                            />
                          </div>
                        </Col>
                      </Row>
                      <CmnTextarea
                        className="heightVh20 colorPara "
                        label="Any additional information type below in text box "
                        placeholder="Write your information"
                        value={additionalInfo}
                        onChange={(e) => setadditionalInfoe(e.target.value)}
                      />
                    </div>
                  </section>
                  <div className="d-flex justify-content-end">
                    {/* <CmnButton type="noBg" text="Cancel" className="mr10" onClick={e => setgotoPage("customer/dashboard")}/> */}
                    <CmnButton
                      type="square"
                      text="Update Info"
                      className=""
                      onClick={(e) => saveData()}
                    />
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProviderBillingDetails;

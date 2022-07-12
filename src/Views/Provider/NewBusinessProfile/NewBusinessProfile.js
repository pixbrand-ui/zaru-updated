/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BusinessAside from "../BusinessAside/BusinessAside";
import { Col, Container, Row } from "reactstrap";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import { Redirect, useParams } from "react-router-dom";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnRadioBorder from "../../../Components/CmnRadioBorder/CmnRadioBorder";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "./NewBusinessProfile.scss";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import ConfirmModal from "../../../Components/ConfirmModal/ConfirmModal";

const NewBusinessProfile = () => {
  const { refid } = useParams();
  const [gotoPage, setgotoPage] = useState("");
  const [formMode, setformMode] = useState("insert");
  const [showProgress, setshowProgress] = useState(false);
  const [bussTime, setBussTime] = useState("24/7");
  const [bussName, setBussName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [businessStarted, setBusinessStarted] = useState("");
  const [noOFEmployees, setNoOFEmployees] = useState("");
  const [vat, setVat] = useState("");
  const [pan, setPan] = useState("");
  const [regID, setRegID] = useState("");
  const [bHours, setBhours] = useState("");
  const [gotonext, setgotonext] = useState(false);
  const [isflexible, setisflexible] = useState(false);
  const [monday, setMonday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });

  const [tuesday, setTuesday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });

  const [wednesday, setWednesday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });

  const [thursday, setThursday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });

  const [friday, setFriday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });
  const [saturday, setSaturday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });
  const [sunday, setSunday] = useState({
    opening: null,
    closing: null,
    closed: false,
  });

  useEffect(() => {
    if (refid) {
      console.log(refid);
      loadData().then((res) => {
        if (res) {
          setBussName(res.bussinessname);
          setEmail(res.email);
          setPhoneNo(res.phone);
          setWebsite(res.website || "");
          setBusinessStarted(res.startedyear.toString() || "");
          setNoOFEmployees(res.noofemployee || "");
          setVat(res.taxno || "");
          setRegID(res.registrationid || "");
          setPan(res.panno || "");
          setBhours(res.hourlyprice.toString() || "");
          setisflexible(res.isflexible);
          console.log("res.isflexible", res.monday);

          if (!res.isflexible) {
            setBussTime("businessTime");
            setMonday({
              opening: res.monday[0].opening,
              closing: res.monday[0].closing,
              closed: res.monday[0].closed,
            });
            setTuesday({
              opening: res.tuesday[0].opening,
              closing: res.tuesday[0].closing,
              closed: res.tuesday[0].closed,
            });
            setWednesday({
              opening: res.wednesday[0].opening,
              closing: res.wednesday[0].closing,
              closed: res.wednesday[0].closed,
            });
            setThursday({
              opening: res.thursday[0].opening,
              closing: res.thursday[0].closing,
              closed: res.thursday[0].closed,
            });
            setFriday({
              opening: res.friday[0].opening,
              closing: res.friday[0].closing,
              closed: res.friday[0].closed,
            });
            setSaturday({
              opening: res.saturday[0].opening,
              closing: res.saturday[0].closing,
              closed: res.saturday[0].closed,
            });
            setSunday({
              opening: res.sunday[0].opening,
              closing: res.sunday[0].closing,
              closed: res.sunday[0].closed,
            });
          }
          setformMode("update");
        }

        setshowProgress(false);
        console.log("Business info : ", res);
      });
    } else {
      setformMode("insert");
    }
  }, []);

  const handleChange = (event) => {
    if (event.target.id === "other") {
      setisflexible(false);
    } else {
      setisflexible(true);
    }
    setBussTime(event.target.value);
  };

  const openModal = () => {
    AlertModal02.show(
      <ConfirmModal />,
      "",
      () => {
        setgotoPage("provider/business-profile");
      },
      "sm",
      "Sure"
    );
  };

  const timeHandleChange = (e, day, type) => {
    switch (day) {
      case "monday":
        type === "o" && setMonday({ ...monday, opening: e.target.value });
        type === "c" && setMonday({ ...monday, closing: e.target.value });
        type === "e" && setMonday({ ...monday, closed: !monday.closed });
        break;

      case "tuesday":
        type === "o" && setTuesday({ ...tuesday, opening: e.target.value });
        type === "c" && setTuesday({ ...tuesday, closing: e.target.value });
        type === "e" && setTuesday({ ...tuesday, closed: !tuesday.closed });

        break;

      case "wednesday":
        type === "o" && setWednesday({ ...wednesday, opening: e.target.value });
        type === "c" && setWednesday({ ...wednesday, closing: e.target.value });
        type === "e" &&
          setWednesday({ ...wednesday, closed: !wednesday.closed });

        break;

      case "thursday":
        type === "o" && setThursday({ ...thursday, opening: e.target.value });
        type === "c" && setThursday({ ...thursday, closing: e.target.value });
        type === "e" && setThursday({ ...thursday, closed: !thursday.closed });

        break;

      case "friday":
        type === "o" && setFriday({ ...friday, opening: e.target.value });
        type === "c" && setFriday({ ...friday, closing: e.target.value });
        type === "e" && setFriday({ ...friday, closed: !friday.closed });

        break;

      case "saturday":
        type === "o" && setSaturday({ ...saturday, opening: e.target.value });
        type === "c" && setSaturday({ ...saturday, closing: e.target.value });
        type === "e" && setSaturday({ ...saturday, closed: !saturday.closed });

        break;

      case "sunday":
        type === "o" && setSunday({ ...sunday, opening: e.target.value });
        type === "c" && setSunday({ ...sunday, closing: e.target.value });
        type === "e" && setSunday({ ...sunday, closed: !sunday.closed });

        break;

      default:
        break;
    }
  };

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
          console.log(res);
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
    if (bussName.trim() === "" || bussName.trim() === null) {
      return AlertModal02.show(
        "Please Fill Bussiness Name field.",
        "Fill required fields"
      );
    }
    if (email.trim() === "" || email.trim() === null) {
      return AlertModal02.show(
        "Please Fill Email field.",
        "Fill required fields"
      );
    }
    if (phoneNo.trim() === "" || phoneNo.trim() === null) {
      return AlertModal02.show(
        "Please Fill Phone number field.",
        "Fill required fields"
      );
    }
    if (bHours.toString().trim() === "" || bHours.trim() === null) {
      return AlertModal02.show(
        "Please input price field.",
        "Fill required fields"
      );
    }

    if (businessStarted.trim().length > 4) {
      return AlertModal02.show(
        "Please Enter 4 Digits only in year business started field"
      );
    }

    const iData = {
      bussinessname: bussName,
      phone: phoneNo,
      email: email,
      website: website,
      startedyear: businessStarted,
      noofemployee: noOFEmployees,
      taxno: vat,
      panno: pan,
      registrationid: regID,
      isflexible: isflexible,
      monday: [
        {
          opening: monday.opening,
          closing: monday.closing,
          closed: monday.closed,
        },
      ],
      tuesday: [
        {
          opening: tuesday.opening,
          closing: tuesday.closing,
          closed: tuesday.closed,
        },
      ],
      wednesday: [
        {
          opening: wednesday.opening,
          closing: wednesday.closing,
          closed: wednesday.closed,
        },
      ],
      thursday: [
        {
          opening: thursday.opening,
          closing: thursday.closing,
          closed: thursday.closed,
        },
      ],
      friday: [
        {
          opening: friday.opening,
          closing: friday.closing,
          closed: friday.closed,
        },
      ],
      saturday: [
        {
          opening: saturday.opening,
          closing: saturday.closing,
          closed: saturday.closed,
        },
      ],
      sunday: [
        {
          opening: sunday.opening,
          closing: sunday.closing,
          closed: sunday.closed,
        },
      ],
      hourlyprice: bHours,
    };

    try {
      //console.log("without api",iData);
      if (formMode === "insert") {
        HTTP.post(API.addBusiness, iData, true, false, Auth.getToken()).then(
          (res) => {
            if (res && res.status && res.status === 200) {
              console.log("save ID", res);
              GLocalStorage.Add("c-bref", res.data._id);
              setTimeout(() => {
                setgotonext(true);
              }, 1000);
            }
            console.log("api", res);
          }
        );
      } else if (formMode === "update") {
        console.log("idata on update : ", iData);
        HTTP.put(
          API.updateBusinessInfo + refid,
          iData,
          true,
          false,
          Auth.getToken()
        ).then((res) => {
          if (res && res.status && res.status === 200) {
            GLocalStorage.Add("c-bref", res.data._id);
            setTimeout(() => {
              setgotonext(true);
            }, 1000);
          }
          console.log("api", res);
        });
      }
    } catch (e) {
      console.log(e, "Error in profile business");
    }
  };

  return (
    <>
      {gotonext && (
        <Redirect
          to={{
            pathname: "/business/services-and-documents",
            state: { refid: refid ? refid : null },
          }}
        ></Redirect>
      )}
      {gotoPage === "provider/business-profile" && (
        <Redirect to="/provider/business-profile" />
      )}
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={3} xl={3}>
              <BusinessAside />
            </Col>
            <Col lg={9} md={9} xl={9}>
              <h3 className="fs24 colorBlack fBold mb30">
                Add Your New Business to Your Profile
              </h3>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Please wait" />
                </div>
              )}
              {!showProgress && (
                <section className="bgWhite radius pt30 pb30 border">
                  <div className="pl30 pr30 mb15">
                    <h3 className="fs20 colorBlack mb30">Contact Details</h3>
                    <Row>
                      <Col lg={6}>
                        <CmnInput
                          className="mr10"
                          label="Business Name *"
                          type="text"
                          placeholder="Enter your business name"
                          onChange={(e) => setBussName(e.target.value)}
                          value={bussName}
                        />
                        <p className="fs14">
                          No business name? Use your personal name.
                        </p>
                      </Col>

                      <Col lg={6}>
                        <CmnInput
                          className="mr10"
                          label="Email*"
                          placeholder="Email Address"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="Business phone number *"
                          type="number"
                          placeholder="Business phone number"
                          onChange={(e) => setPhoneNo(e.target.value)}
                          value={phoneNo}
                          pattern="^[0-9]*$"
                        />
                      </Col>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="Website (optional)"
                          type="text"
                          placeholder="Enter website url e.g. example.com"
                          onChange={(e) => setWebsite(e.target.value)}
                          value={website}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="bBottom mb15"></div>
                  <div className="pl30 pr30 mb15">
                    <h3 className="fs20 colorBlack mb30">General</h3>
                    <Row>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="Year business started"
                          type="text"
                          placeholder="Year business started"
                          onChange={(e) => setBusinessStarted(e.target.value)}
                          value={businessStarted}
                          maxLength="4"
                          pattern="^[0-9]*$"
                        />
                      </Col>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="No of Employees"
                          type="text"
                          placeholder="No of Employees"
                          onChange={(e) => setNoOFEmployees(e.target.value)}
                          value={noOFEmployees}
                          maxLength="3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="VAT Number"
                          type="text"
                          placeholder="VAT Number"
                          onChange={(e) => setVat(e.target.value)}
                          value={vat}
                          maxLength="25"
                        />
                      </Col>
                      <Col xl={6}>
                        <CmnInput
                          className="mr10"
                          label="Registration or ID Number"
                          type="text"
                          placeholder="Registration or ID Number"
                          onChange={(e) => setRegID(e.target.value)}
                          value={regID}
                          maxLength="25"
                        />
                      </Col>

                      <Col xl={12}>
                        <CmnInput
                          className="mr10"
                          label="PAN"
                          type="number"
                          placeholder="PAN Number"
                          onChange={(e) => setPan(e.target.value)}
                          value={pan}
                          maxLength="10"
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="bBottom mb15"></div>
                  <div className="pl30 pr30 mb15">
                    <div className="position-relative ratePer">
                      <CmnInput
                        className="mr10 pl35"
                        label="Price per hour *"
                        type="text"
                        placeholder="15"
                        icon="R"
                        maxLength="5"
                        postionLeft={true}
                        onChange={(e) => setBhours(e.target.value)}
                        value={bHours}
                      />
                      <div className="new-bsn pr30">
                        <div className="fs16 colorOrange">/hour</div>
                      </div>
                    </div>
                    <h3 className="fs20 colorBlack">Business Hours</h3>
                    <div className="position-relative">
                      <CmnRadioBorder
                        id="24"
                        name="businessTime"
                        label="Open 24 x 7"
                        checked={bussTime === "24/7"}
                        onChange={handleChange}
                        value="24/7"
                      />
                      <CmnRadioBorder
                        id="other"
                        name="businessTime"
                        label="Has business hours"
                        checked={bussTime === "businessTime"}
                        onChange={handleChange}
                        value="businessTime"
                      />
                    </div>

                    {bussTime === "businessTime" && (
                      <div className="table-responsive">
                        <table className="table noBorder notablePadding">
                          <tr>
                            <th>Days</th>
                            <th>Opening</th>
                            <th>Closing</th>
                            <th>Closed?</th>
                          </tr>

                          <tr>
                            <td>Monday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={monday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "monday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={monday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "monday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="MondayCheck"
                                value="MondayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "monday", "e")
                                }
                                checked={monday.closed || false}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Tuesday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={tuesday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "tuesday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={tuesday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "tuesday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="tuesdayCheck"
                                value="tuesdayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "tuesday", "e")
                                }
                                checked={tuesday.closed || false}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Wednesday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={wednesday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "wednesday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={wednesday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "wednesday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="wednesdayCheck"
                                value="wednesdayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "wednesday", "e")
                                }
                                checked={wednesday.closed || false}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Thursday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={thursday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "thursday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={thursday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "thursday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="thursdayCheck"
                                value="thursdayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "thursday", "e")
                                }
                                checked={thursday.closed || false}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Friday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={friday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "friday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={friday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "friday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="fridayCheck"
                                value="fridayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "friday", "e")
                                }
                                checked={friday.closed || false}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Saturday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={saturday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "saturday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={saturday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "saturday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="saturdayCheck"
                                value="saturdayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "saturday", "e")
                                }
                                checked={saturday.closed || false}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Sunday</td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="08:00"
                                value={sunday.opening || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "sunday", "o")
                                }
                                name="opening"
                              />
                            </td>
                            <td>
                              <CmnInput
                                type="text"
                                className="w100"
                                placeholder="16:00"
                                value={sunday.closing || ""}
                                onChange={(e) =>
                                  timeHandleChange(e, "sunday", "c")
                                }
                                name="closing"
                              />
                            </td>
                            <td>
                              <CmnCheckbox
                                id="sundayCheck"
                                value="sundayCheck"
                                className="w100"
                                name="closed"
                                onChange={(e) =>
                                  timeHandleChange(e, "sunday", "e")
                                }
                                checked={sunday.closed || false}
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                    )}
                    <div className="d-flex align-items-center flex-wrap justify-content-end">
                      <CmnButton
                        className="btnTheme mr5 btnBlack"
                        type="square"
                        onClick={(e) => openModal()}
                        text="Cancel"
                      />
                      <CmnButton
                        type="square"
                        onClick={(e) => saveData()}
                        text="Continue"
                      />
                    </div>
                  </div>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewBusinessProfile;

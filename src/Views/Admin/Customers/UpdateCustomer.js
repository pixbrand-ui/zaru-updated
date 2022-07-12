import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Autocomplete from "react-google-autocomplete";
import "react-datepicker/dist/react-datepicker.css";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import API from "../../../Helpers/Constants/Constants";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import { Svg } from "../../../Assets/Svgs/Svg";
import GImageUpload from "../../../Components/Provider/GImageUpload/GImageUpload";

const UpdateCustomer = (props) => {
  const { customerID } = props;
  const [viewPassword, setViewPassword] = useState(false);
  const [dob, setdob] = useState("");
  const togglePassword = (value) => {
    setViewPassword(value);
  };

  useEffect(() => {

  },[customerID]);


  const clearAll = () => {
    setlocation({
      ...location,
      address: "",
      city: "",
      state: "",
      country: "",
    });
    setData({
      ...data,
      firstname: "",
      lastname: "",
      zipcode: "",
      phone: "",
      email: "",
      password: "",
      profileimage: "",
      contacts: "",
      dob: "",
      gender: "",
    });
  };

  const [location, setlocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    zipcode: "",
    phone: "",
    email: "",
    password: "",
    profileimage: "",
    contacts: "",
    dob: "",
    gender: "",
  });

  const dateConverter = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const getImgUrl = (e) => {
    setData({
      ...data,
      profileimage: e.file,
    });
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveData = () => {
    const iData = new FormData();
    iData.append("firstname", data.firstname);
    iData.append("lastname", data.lastname);
    iData.append("zipcode", data.zipcode);
    iData.append("phone", data.phone);
    iData.append("email", data.email);
    iData.append("password", data.password);
    iData.append("image", data.profileimage);
    iData.append("dob", data.dob);
    iData.append("gender", data.gender);
    iData.append("address", location.address);
    iData.append("city", location.city);
    iData.append("state", location.state);
    iData.append("country", location.country);

    if (data.firstname.trim() === "" || data.firstname.trim() === null) {
      return AlertModal02.show(
        "Please fill firstname",
        "Oops!",
        () => {},
        "md"
      );
    }

    if (data.lastname.trim() === "" || data.lastname.trim() === null) {
      return AlertModal02.show("Please fill lastname", "Oops!", () => {}, "md");
    }

    if (data.phone.trim() === "" || data.phone.trim() === null) {
      return AlertModal02.show(
        "Please fill phone number",
        "Oops!",
        () => {},
        "md"
      );
    }

    if (data.email.trim() === "" || data.email.trim() === null) {
      return AlertModal02.show(
        "Please fill email field",
        "Oops!",
        () => {},
        "md"
      );
    }

    if (data.profileimage === null || data.profileimage === "") {
      return AlertModal02.show(
        "Please upload profile image",
        "Oops!",
        () => {},
        "md"
      );
    }

    if (data.zipcode.trim() === "" || data.zipcode.trim() === null) {
      return AlertModal02.show("Please fill zipcode", "Oops!", () => {}, "md");
    }
    if (data.password.trim() === "" || data.password.trim() === null) {
      return AlertModal02.show("Please fill password", "Oops!", () => {}, "md");
    }

    try {
      HTTP.put(
        API.customerupdate + customerID,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          AlertModal02.show(
            "Customer updated successfully",
            "Success Message",
            () => {},
            "md"
          );
          AlertModal.hide();
          clearAll();
        }
      });
    } catch (e) {
      console.log(e, "Error in the add new customer");
    }
  };

  return (
    <div className="pt10">
      <Row>
        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="First Name"
              name="firstname"
              placeholder="First Name"
              id="firstname"
              className=""
              value={data.firstname}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="Last Name"
              name="lastname"
              placeholder="Last Name"
              id="lastname"
              className=""
              value={data.lastname}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="Phone"
              name="phone"
              placeholder="Phone"
              id="phone"
              className=""
              value={data.phone}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="Email"
              name="email"
              placeholder="Email"
              id="email"
              value={data.email}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <label className="fs16 mb7" htmlFor="email">
              Gender
            </label>
            <Select
              className="w-100 themeSelect themeSelectSm"
              classNamePrefix="themeSelect themeSelectSm"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              onChange={(e) =>
                setData({
                  ...data,
                  gender: e.value,
                })
              }
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <label className="fs16 mb7 mr5" htmlFor="email">
              DOB
            </label>
            {dob}
            <DatePicker
              className="w-100 inputTransparent pl10 outlineNone"
              onChange={(dobe) => setdob(dateConverter(dobe))}
              selected=""
              locale="es"
              placeholderText="Choose Date"
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <label className="fs16 mb7" htmlFor="email">
              Address
            </label>
            <Autocomplete
             options={{
              types: ["(regions)"],
            }}
              apiKey="AIzaSyB5DozhssD2YsMZV6aOfdznWqqbR6dM6_w"
              onPlaceSelected={(place) => {
                setlocation({
                  ...location,
                  address: place.formatted_address
                    ? place.formatted_address
                    : "",
                  city: place.address_components[1].long_name
                    ? place.address_components[1].long_name
                    : "",
                  state: place.address_components[2].long_name
                    ? place.address_components[2].long_name
                    : "",
                  country: place.address_components[3].long_name
                    ? place.address_components[3].long_name
                    : "",
                });
              }}
              className="w-100 inputTransparent  outlineNone mobRadius7 pl10"
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="City"
              name="city"
              placeholder="City"
              id="city"
              className=""
              value={location.city}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="Zipcode"
              name="zipcode"
              placeholder="zipcode"
              id="zipcode"
              className=""
              value={data.zipcode}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="State"
              name="state"
              placeholder="State"
              id="state"
              className=""
              value={location.state}
              onChange={handleInputChange}
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb10">
            <CmnInput
              label="Country"
              name="country"
              placeholder="Country"
              id="country"
              className=""
              value={location.country}
              onChange={handleInputChange}
            />
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb10">
            <label className="fs16 mb7" htmlFor="email">
              Add Profle Image
            </label>
            <GImageUpload getImage={getImgUrl} />
          </div>
        </Col>

        <Col lg={8}>
          <div className="position-relative">
            <CmnInput
              label="Password *"
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              id="password"
              className=""
              value={data.password}
              onChange={handleInputChange}
            />
            <button
              className="btnBlank eyeIcon"
              onClick={(e) => togglePassword(!viewPassword)}
            >
              {viewPassword ? Svg.eyeCut : Svg.eye}
            </button>
          </div>
        </Col>
      </Row>
      <div className="mt40">
        <CmnButton
          type="square"
          text="Update Customer"
          className=""
          onClick={saveData}
        />
      </div>
    </div>
  );
};

export default UpdateCustomer;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GCard from "../../../Components/GComponents/GCard";
import GInput from "../../../Components/GComponents/GInput";
import GTextarea from "../../../Components/GComponents/GTextarea";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";

export default function AdminContactInfoPage() {
  const [formdata, setformdata] = useState({
    telephone: "",
    email: "",
    address: "",
    maxpurchaselimit: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    LoadingModal.show("Please wait...");
    try {
      HTTP.get(API.adminContactInfo, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setformdata({
              ...formdata,
              email: res.data.email,
              telephone: res.data.telephone,
              address: res.data.address,
              maxpurchaselimit: res.data.maxpurchaselimit
            });
            LoadingModal.hide();
          }
        } else {
          LoadingModal.hide();
        }
      });
    } catch (error) {
      console.log(error);
      LoadingModal.hide();
    }
  };

  const saveData = () => {
    LoadingModal.show("Please wait...");
    if (formdata.email.trim().length <= 0) {
      return AlertModal02.show("Please enter email id.", "Oops!");
    }
    if (formdata.telephone.trim().length <= 0) {
      return AlertModal02.show("Please enter telephone/mobile no.", "Oops!");
    }
    if (formdata.address.trim().length <= 0) {
      return AlertModal02.show("Please enter address.", "Oops!");
    }
    try {
      HTTP.post(
        API.updateAdminSetting,
        formdata,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            LoadingModal.hide();
            AlertModal02.show("Contact info updated successfully.", "Success!");
          }
        } else {
          LoadingModal.hide();
        }
      });
    } catch (error) {
      console.log(error);
      LoadingModal.hide();
    }
  };
  return (
    <div className="row flex-grow justify-content-center align-items-top w-100 m-3">
      <div className="col-lg-6">
        <GCard direction="column" boxShadow="0px 1px 5px rgba(0, 0, 0, 0.3)">
          <div className="p-3">
            <h5 className="fw-bold mb-3">Update Contact Details</h5>
            <p className="text-secondary fs-6 fw-normal">
              This contact details will shown on customer/provder support page.
              and as well as it will also shown on query/message submit page.
            </p>
            <label htmlFor="telephone" className="fs-6 p-2 pb-1 text-secondary">
              Contact No. <span className="text-danger">*</span>
            </label>
            <GInput
              id="telephone"
              className="w-100"
              placeholder="Telephone"
              value={formdata.telephone}
              onChange={(e) =>
                setformdata({ ...formdata, telephone: e.target.value })
              }
            />
            {/* --- */}
            <label htmlFor="email" className="fs-6 p-2 pb-1 text-secondary">
              Email Id <span className="text-danger">*</span>
            </label>
            <GInput
              id="email"
              className="w-100"
              placeholder="Email Id"
              value={formdata.email}
              onChange={(e) =>
                setformdata({ ...formdata, email: e.target.value })
              }
            />

            <label htmlFor="email" className="fs-6 p-2 pb-1 text-secondary">
              Max Purchase Limit <span className="text-danger">*</span>
            </label>
            <GInput
              type="number"
              id="maxlimit"
              name="maxpurchaselimit"
              className="w-100"
              placeholder="Max Purchase Limit"
              value={formdata.maxpurchaselimit}
              onChange={(e) =>
                setformdata({ ...formdata, maxpurchaselimit: e.target.value })
              }
            />
            {/* --- */}
            <label htmlFor="address" className="fs-6 p-2 pb-1 text-secondary">
              Address <span className="text-danger">*</span>
            </label>

            <GTextarea
              id="address"
              className="w-100"
              placeholder="Address"
              maxLength={250}
              value={formdata.address}
              onChange={(e) =>
                setformdata({ ...formdata, address: e.target.value })
              }
            />
            <p className="fs-8 ps-2 mt-1 color-orange">
              Enter your address in max 250 characters.
            </p>
            <GAlign align="right" className="mt-3">
              <GButton onClick={saveData}>Update</GButton>
            </GAlign>
          </div>
        </GCard>
      </div>
    </div>
  );
}

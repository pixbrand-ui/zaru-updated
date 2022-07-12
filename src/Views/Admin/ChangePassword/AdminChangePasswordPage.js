import React, { useState, useEffect } from "react";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GCard from "../../../Components/GComponents/GCard";
import GInput from "../../../Components/GComponents/GInput";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";

export default function AdminChangePasswordPage() {
  const [formdata, setformdata] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  useEffect(() => {
    document.getElementById("currentpassword").focus();
  }, []);

  const saveData = () => {
    LoadingModal.show("Please wait...");
    try {
      const iData = {
        oldpassword: formdata.currentpassword,
        password: formdata.confirmpassword,
      };
      if(formdata.newpassword!==formdata.confirmpassword){
        return AlertModal02.show("New password and confirm password is not matching");
      }
      HTTP.post(
        API.changePasswordAuth,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if(res && res.status && res.status.toString()==="200"){
          LoadingModal.hide();
          AlertModal.show("Your password has been changed successfully","Success!")
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row flex-grow justify-content-center align-items-top w-100 m-3">
      <div className="col-lg-6">
        {console.log("formdata", formdata)}
        <GCard direction="column" boxShadow="0px 1px 5px rgba(0, 0, 0, 0.3)">
          <div className="p-3">
            <h5 className="fw-bold mb-3">Change Password</h5>
            <p className="text-secondary fs-6 fw-normal">
              Update your login password.
            </p>
            <label
              htmlFor="currentpassword"
              className="fs-6 p-2 pb-1 text-secondary"
            >
              Current Password <span className="text-danger">*</span>
            </label>
            <GInput
              id="currentpassword"
              className="w-100"
              placeholder="Current Password"
              value={formdata.currentpassword}
              onChange={(e) =>
                setformdata({ ...formdata, currentpassword: e.target.value })
              }
            />
            {/* --- */}
            <label
              htmlFor="newpassword"
              className="fs-6 p-2 pb-1 text-secondary"
            >
              New Password<span className="text-danger">*</span>
            </label>
            <GInput
              id="newpassword"
              className="w-100"
              placeholder="Enter new password"
              type="password"
              value={formdata.newpassword}
              onChange={(e) =>
                setformdata({ ...formdata, newpassword: e.target.value })
              }
            />
            {/* --- */}
            <label
              htmlFor="confirmpassword"
              className="fs-6 p-2 pb-1 text-secondary"
            >
              Confirm Password <span className="text-danger">*</span>
            </label>
            <GInput
              id="confirmpassword"
              className="w-100"
              type="password"
              placeholder="Confirm new password"
              maxLength={250}
              value={formdata.confirmpassword}
              onChange={(e) =>
                setformdata({ ...formdata, confirmpassword: e.target.value })
              }
            />
            <p className="fs-8 ps-2 mt-1 color-orange">
              Password should be alpha numeric.
            </p>
            <GAlign align="right" className="mt-3">
              <GButton onClick={saveData}>Change</GButton>
            </GAlign>
          </div>
        </GCard>
      </div>
    </div>
  );
}

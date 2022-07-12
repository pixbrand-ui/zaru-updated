import React, { useEffect, useState } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GCard from "../../../Components/GComponents/GCard";
import GInput from "../../../Components/GComponents/GInput";
import GSelect from "../../../Components/GComponents/GSelect";
import OptionDataItem from "./OptionDataItem";
import $ from "jquery";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";

export default function EditQuestionForm(props) {
  const inputRef = React.createRef();
  const [formdata, setformdata] = useState({
    qusTitle: "",
    qusName: "",
    qusType: "",
    isRequired: false,
    isMultiple: false,
  });
  const [selectedid, setSelectedId] = useState(props.id || "");
  const addOptionRef = React.createRef();
  useEffect(() => {
    inputRef.current.focus();
    loadData(selectedid);
  }, [selectedid]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const loadData = (selectedid) => {
    LoadingModal.show("Please wait...");
    try {
      HTTP.get(API.adminQuestionInfo + selectedid, false, Auth.getToken()).then((res) => {
          console.log(res)
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setformdata({
              ...formdata,
              qusTitle: res.data.qusTitle,
              qusType: res.data.qusType,
              qusName: res.data.qusName,
              isRequired: res.data.isRequired,
              isMultiple: res.data.isMultiple,
            });
            LoadingModal.hide();
          }
        } else {
          LoadingModal.hide();
        }
      });
    } catch (e) {
      console.log("error", e);
      LoadingModal.hide();
    }
  };

  const saveData = () => {
    try {
      if (formdata.qusTitle.trim().length <= 0) {
        return AlertModal02.show(
          "Please enter question title.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (formdata.qusType.trim().length <= 0) {
        return AlertModal02.show(
          "Please select question type.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      HTTP.put(API.adminQuestioUpdate + selectedid, formdata, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            AlertModal02.show(
              "Question set update successfully.",
              "Done!",
              () => {
                FormModal.hide();
              },
              "sm"
            );
          }
        }
      );
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <div className="w-100 p-2">
        <div className="d-flex-col justify-content-center">
          {/* field 01 */}
          <label htmlFor="que_name" className="p-1 fs16 fw600">
            Question Title
          </label>
          <GInput
            id="que_name"
            name="qusTitle"
            className="w-100 mb-1"
            placeholder="like : How many rooms in your house ?"
            value={formdata.qusTitle}
            onChange={(e) => handleInputChange(e)}
            ref={inputRef}
          />

          {/* field 02 */}
          <label htmlFor="que_type" className="p-1 fs16 fw600">
            Type
          </label>
          <GSelect
            id="que_required"
            className="w-100 mb-1"
            name="qusType"
            value={formdata.qusType}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="SingleChoice">SingleChoice</option>
            <option value="MultiChoice">MultiChoice</option>
            {/* <option value="Dropdown">Dropdown</option> */}
            <option value="Number">Number</option>
            {/* <option value="Text">Text</option> */}
            {/* <option value="Date">Date</option> */}
            {/* <option value="Time">Time</option> */}
            {/* <option value="Info">Info</option> */}
          </GSelect>

          {/* field 03 */}
          <label htmlFor="que_required" className="p-1 fs16 fw600">
            Is Required
          </label>
          <GSelect
            id="que_required"
            className="w-100 mb-1"
            name="isRequired"
            value={formdata.isRequired}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </GSelect>
          {/*  Fields closed */}
        </div>
        <label className="text-danger w-100"></label>
        <GAlign align="right">
          <GButton
            onClick={(e) => FormModal.hide()}
            backgroundColor="#C64756"
            hoverColor="#D83A56"
          >
            Close
          </GButton>
          <GButton onClick={(e) => saveData()}>Save</GButton>
        </GAlign>
      </div>
    </>
  );
}

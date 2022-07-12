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

export default function AddQUestionsPage(props) {
  const inputRef = React.createRef();
  const addOptionRef = React.createRef();
  const [optionsData, setOptionsData] = useState([]);
  const [addOptionData, setaddOptionData] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionType, setQuestionType] = useState("SingleChoice");
  const [isReqired, setIsReqired] = useState(true);
  const [isMultiple, setIsMultiple] = useState(true);

  useEffect(() => {
    //inputRef.current.focus();
  });

  useEffect(() => {
    let initdata = [];
    initdata = [...optionsData];
    let isExists = false;
    if (addOptionRef.current.value.trim() !== "") {
      initdata.forEach((element) => {
        if (element === addOptionRef.current.value.trim()) {
          isExists = true;
        }
      });
      !isExists
        ? initdata.push(addOptionRef.current.value.trim())
        : AlertModal02.show(
            "Option is already exists in list.",
            "Oops!",
            () => {},
            "sm"
          );
    }
    setOptionsData(initdata);
    if (addOptionRef.current.value.trim() !== "") addOptionRef.current.focus();
    addOptionRef.current.value = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOptionData]);

  const deleteSelectedOptionData = (data) => {
    let initdata = [];
    initdata = [...optionsData];
    let index = optionsData.indexOf(data);
    initdata.splice(index, 1);
    setOptionsData(initdata);
  };

  const onTypeChange = (e) => {
    setQuestionType(e.target.value);
    switch (e.target.value) {
      case "Number":
        setIsMultiple(false);
        $(".optionAddingCard").addClass("d-none");
        return false;
      default:
        setIsMultiple(true);
        $(".optionAddingCard").removeClass("d-none");
        return true;
    }
  };

  const saveData = () => {
    try {
      let quesData = [];
      if (questionTitle.trim().length <= 0) {
        return AlertModal02.show(
          "Please enter question title.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (questionType.trim().length <= 0) {
        return AlertModal02.show(
          "Please select question type.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (isMultiple) {
        if (optionsData.length <= 1) {
          return AlertModal02.show(
            "Please add at least 02 options.",
            "Oops!",
            () => {},
            "sm"
          );
        }
      }
      optionsData.map((i, ind) => {
        quesData.push(i);
        return <span key={ind}></span>;
      });
      const iData = {
        qusTitle: questionTitle,
        qusType: questionType,
        qusName: new Date().getTime() + questionType,
        isRequired: isReqired,
        isMultiple: isMultiple,
        qusData: quesData,
      };

      HTTP.post(API.add_question, iData, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            AlertModal02.show(
              "Question set created successfully.",
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
            className="w-100 mb-1"
            placeholder="like : How many rooms in your house ?"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            ref={inputRef}
          />

          {/* field 02 */}
          <label htmlFor="que_type" className="p-1 fs16 fw600">
            Type
          </label>
          <GSelect
            id="que_required"
            className="w-100 mb-1"
            onChange={(e) => onTypeChange(e)}
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
            onChange={(e) => setIsReqired(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </GSelect>

          <GCard
            className="optionAddingCard mt-3"
            direction="column"
            boxShadow="0px 1px 5px #00000050"
          >
            <span className="card-title">Options</span>
            <GAlign align="between" className="mb-3">
              <GInput
                className="w-100"
                placeholder="enter options like : 05 Rooms?"
                ref={addOptionRef}
              />
              <GButton onClick={(e) => setaddOptionData(!addOptionData)}>
                Add
              </GButton>
            </GAlign>
            <GAlign align="center" className="options-data-list">
              {optionsData &&
                optionsData.length > 0 &&
                optionsData.map((i, ind) => {
                  return (
                    <OptionDataItem
                      key={ind}
                      value={i}
                      onDeleteClick={deleteSelectedOptionData}
                    />
                  );
                })}
            </GAlign>
          </GCard>

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

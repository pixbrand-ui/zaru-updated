/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CmnCheckboxBorderQue from "../../../../Components/CmnCheckboxBorderQue/CmnCheckboxBorderQue";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";

const MultiSelect = ({
  title = "Multiselect Title",
  name = "multiselect2000",
  questionSetId = "Q20002",
  values = [],
  selectedIndexes = [0],
  callback = () => {},
  ...rest
}) => {
  const [datac, setDatac] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);

  useEffect(() => {
    //console.log("its reloaded", datac);
    var isexists_in_localstorage = false;
    var selected_ans_ids = [];
    var select_options = [];
    if (GLocalStorage.IsExists("c-task-ansset")) {
      var ls_ansdata = JSON.parse(GLocalStorage.Get("c-task-ansset"));
      ls_ansdata.forEach((element, index) => {
        if (element.questionSetId === questionSetId) {
          //console.log("its element in ls", element);
          setDatac([element]);
          isexists_in_localstorage = true;
          selected_ans_ids = element.answerIds;
          return;
        }
      });
    }
    if (isexists_in_localstorage) {
      if (values.length > 0) {
        values.forEach((element, index) => {
          selected_ans_ids.forEach((kelement, kindex) => {
            if (kelement === element.questionDataid) {
              select_options.push(index);
            }
          });
        });
      }
    }
    return setselectedOptions(select_options);
  }, []);

  const f1callback = (value, questionDataid, index, checked) => {
    // console.log(
    //   "callback index : ",
    //   index + " | " + value + " | " + questionDataid
    // );
    let prevState = [];
    var selectedOptionsState = [];
    selectedOptionsState = [...selectedOptions];
    const data_first = {
      questionSetId: questionSetId,
      answerIds: [questionDataid],
      labelText: value,
      answerText: value,
    };
    // setected option set
    //console.log("selectedOptionsState", selectedOptionsState.length);
    if (selectedOptionsState.length <= 0) {
      if (checked) {
        selectedOptionsState.push(index);
        setselectedOptions(selectedOptionsState);
      } else {
        let ibn = selectedOptionsState.indexOf(index);
        if (ibn > -1) {
          selectedOptionsState.splice(ibn, 1);
          setselectedOptions(selectedOptionsState);
        }
      }
    } else if (selectedOptionsState.length > 0) {
      if (checked) {
        let ibn = selectedOptionsState.indexOf(index);
        if (ibn > -1) {
          selectedOptionsState.splice(ibn, 1);
          setselectedOptions(selectedOptionsState);
        }
        selectedOptionsState.push(index);
        setselectedOptions(selectedOptionsState);
      } else {
        let ibn = selectedOptionsState.indexOf(index);
        if (ibn > -1) {
          selectedOptionsState.splice(ibn, 1);
          setselectedOptions(selectedOptionsState);
        }
      }
    }

    // data set
    if (datac.length <= 0) {
      prevState.push(data_first);
      setDatac(prevState);
    } else {
      prevState = [...datac];
      if (checked) {
        //console.log("checked : ", prevState);
        prevState[0].answerIds.push(questionDataid);
        setDatac(prevState);
      } else {
        //console.log("unchecked : ", prevState);
        let eindex = -1;
        if (prevState.length > 0) {
          prevState[0].answerIds.forEach((element, findex) => {
            if (element === questionDataid) {
              eindex = findex;
              return eindex;
            }
          });
        }
        if (eindex > -1) {
          prevState[0].answerIds.splice(eindex, 1);
        }
        setDatac(prevState);
      }
    }

    callback(prevState[0]);
  };

  const checkedOrNot = (index) => {
    let result = false;
    // check the index is exists in selectedIndexes variable
    // if exists then return true
    if (selectedOptions.length > 0) {
      selectedOptions.forEach((element, eindex) => {
        if (element === index) {
          result = true;
          return result;
        }
      });
    }
    return result;
  };

  return (
    <section className="mb30">
      <h3 className="fs20 colorBlack mb20">{title}</h3>
      {values && values.length > 0 ? (
        <>
          {values.map((i, ind) => {
            return (
              <CmnCheckboxBorderQue
                key={ind}
                id={i.id}
                questionDataid={i.questionDataid}
                name={name}
                label={i.label}
                index={ind}
                checked={checkedOrNot(ind)}
                callback={f1callback}
              />
            );
          })}
        </>
      ) : (
        <div className="w-100">No values found.</div>
      )}
    </section>
  );
};

export default MultiSelect;

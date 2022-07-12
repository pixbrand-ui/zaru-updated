/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CmnRadioBorderQueClass from "../../../../Components/CmnRadioBorderQue/CmnRadioBorderQueClass";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";

const SingleSelect = ({
  title = "Title",
  name = "singleselect1000",
  questionSetId = "Q10001",
  values = [],
  selectedIndex = 0,
  callback = () => {},
  ...rest
}) => {
  const [datac, setDatac] = useState(null);
  const [selectedOption, setselectedOption] = useState(selectedIndex);
  // const [temp_onlyonetime, settemp_onlyonetime] = useState(true);

  const f1callback = (value, questionDataid, index) => {
    setselectedOption(index);
    const data = {
      questionSetId: questionSetId,
      answerIds: [questionDataid],
      labelText: value,
      answerText: value,
    };
    setDatac(data);
    callback(data);
  };

  useEffect(() => {
    var isexists_in_localstorage = false;
    var selected_ans_ids = [];
    if (GLocalStorage.IsExists("c-task-ansset")) {
      var ls_ansdata = JSON.parse(GLocalStorage.Get("c-task-ansset"));
      ls_ansdata.forEach((element, index) => {
        if (element.questionSetId === questionSetId) {
          isexists_in_localstorage = true;
          selected_ans_ids = element.answerIds;
          return;
        }
      });
    }
    if (isexists_in_localstorage) {
      if (values.length > 0) {
        values.forEach((element, index) => {
          if (element.questionDataid === selected_ans_ids[0]) {
            return setselectedOption(index);
          }
        });
      }
    }
  }, []);

  return (
    <section id={questionSetId} name={questionSetId} className="mb30">
      <h3 className="fs20 colorBlack mb20">{title}</h3>
      {values && values.length > 0 ? (
        <>
          {values.map((i, ind) => {
            return (
              <CmnRadioBorderQueClass
                mac={datac}
                key={ind}
                id={i.id}
                questionDataid={i.questionDataid}
                name={name}
                label={i.label}
                index={ind}
                checked={selectedOption === ind}
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

export default SingleSelect;

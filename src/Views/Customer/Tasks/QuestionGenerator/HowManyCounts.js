/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CmnInputIncDec from "../../../../Components/CmnInputIncDec/CmnInputIncDec";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";

const HowManyCounts = ({
  title = "Title",
  name = "singleselect1000",
  questionSetId = "Q10001",
  values = [],
  callback = () => {},
  ...rest
}) => {
  const [datac, setDatac] = useState(null);
  const [dataCount, setdataCount] = useState(0);

  useEffect(() => {
    var selected_ans = 0;
    if (GLocalStorage.IsExists("c-task-ansset")) {
      var ls_ansdata = JSON.parse(GLocalStorage.Get("c-task-ansset"));
      ls_ansdata.forEach((element, index) => {
        if (element.questionSetId === questionSetId) {
          setDatac([element]);
          selected_ans = element.answerText;
          return setdataCount(selected_ans);
        }
      });
    }
    return setdataCount(selected_ans);
  }, []);

  const f1callback = (count) => {
    setdataCount(count);
    const data = {
      questionSetId: questionSetId,
      answerIds: [],
      labelText: count,
      answerText: count,
    };
    setDatac(data);
    callback(data);
  };

  return (
    <section className="mb30">
      <h3 mac={datac} className="fs20 colorBlack mb20">
        {title}
      </h3>
      {/* {values && values.length > 0 ? ( */}
      <>
        <CmnInputIncDec
          callback={f1callback}
          count={dataCount}
          className="radius"
        />
      </>
      {/* ) : (
        <div className="w-100">No values found.</div>
      )} */}
    </section>
  );
};

export default HowManyCounts;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CmnRadioBorderQueClass from "../../../../Components/CmnRadioBorderQue/CmnRadioBorderQueClass";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";

const SingleSelectSubcategory = ({
  title = "Title",
  name = "singleselect1000",
  categoryId = "Q10001",
  values = [],
  selectedIndex = 0,
  callback = () => {},
  ...rest
}) => {
  const [datac, setDatac] = useState(null);
  const [selectedOption, setselectedOption] = useState(selectedIndex);

  useEffect(() => {
    if (selectedIndex > -1) {
      setselectedOption(selectedIndex);
      f1callback(
        values[selectedIndex].label,
        values[selectedIndex].questionDataid,
        selectedIndex
      );
    }
  }, [selectedIndex]);

  const f1callback = (value, questionDataid, index) => {
    GLocalStorage.Remove("ansSet");
    setselectedOption(index);
    const data = {
      categoryId: categoryId,
      subcategoryId: [questionDataid],
      labelText: value,
      answerText: value,
    };
    setDatac(data);
    callback(data);
  };

  return (
    <section className="mb30">
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

export default SingleSelectSubcategory;

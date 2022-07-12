/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./CmnCheckboxBorderQue.scss";

const CmnCheckboxBorderQue = (props) => {
  const handleChange = (e) => {
    props.callback(props.label, props.questionDataid, props.index, e.target.checked);
  };

  return (
    <div className="checkboxWrapper mb20">
      <input
        name={props.name}
        className={props.className}
        type="checkbox"
        id={props.id}
        checked={props.checked}
        onChange={handleChange}
      />
      <label className="f16" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default CmnCheckboxBorderQue;

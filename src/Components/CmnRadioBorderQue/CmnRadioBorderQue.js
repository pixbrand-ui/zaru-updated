/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./CmnRadioBorderQue.scss";

const CmnRadioBorderQue = (props) => {
  useEffect(() => {
    props.checked && console.log(`use effect ${props.label}`)
  }, [props.checked])
  const handleChange = (e) => {
    props.callback(props.label, props.questionDataid, props.index);
  };
  return (
    <div className="cmnRadioQue mb20">
      <input
        type="radio"
        id={props.id}
        data-id={props.questionDataid}
        name={props.name}
        className={props.className}
        value={props.label}
        checked={props.checked}
        onChange={handleChange}
      />
      <label htmlFor={props.id} className="bRadio">
        {props.label}
      </label>
    </div>
  );
};

export default CmnRadioBorderQue;

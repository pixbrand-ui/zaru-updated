import React from "react";
import "./CmnRadio.scss";

const CmnRadio = (props) => {
  return (
    <div className={`cmnRadioOnly ${props.parentClass}`}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        className={props.className}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default CmnRadio;

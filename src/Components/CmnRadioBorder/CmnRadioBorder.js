import React from "react";
import "./CmnRadioBorder.scss";

const CmnRadioBorder = (props) => {
  return (
    <div className="cmnRadioBorder mb20">
      <input
        type="radio"
        id={props.id}
        data-id={props.questionDataid}
        value={props.value}
        name={props.name}
        className={props.className}
        checked={props.checked}
        onChange={props.onChange}

      />
      <label htmlFor={props.id} className="bRadio fs15">{props.label}</label>
    </div>
  );
};

export default CmnRadioBorder;

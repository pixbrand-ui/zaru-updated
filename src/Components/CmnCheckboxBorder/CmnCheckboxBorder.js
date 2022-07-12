import React from "react";
import "./CmnCheckboxBorder.scss";

const CmnCheckboxBorder = (props) => {
  return (
    <div className="checkboxWrapper mb20">
      <input
        name={props.name}
        className={props.className}
        type="checkbox"
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />
      <label className="fs15" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default CmnCheckboxBorder;

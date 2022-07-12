import React from "react";
import "./CmnCheckbox.scss";

const CmnCheckbox = (props) => {
  return (
    <div className="checkboxWrapperOnly">
      <input name={props.name} checked={props.checked} className={props.className} type="checkbox" id={props.id} onChange={props.onChange} />
      <label className="f16" htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default CmnCheckbox;

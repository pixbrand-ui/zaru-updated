import React from "react";

const CmnTextarea = (props) => {
  return (
    <div className="input-group mb15 position-relative">
    {props.label !== "" && props.label !== null && (
      <label className="f16 mb7" htmlFor={props.id}>
        {props.label}
      </label>
    )}
      <textarea
        className={`w-100 inputTransparent  outlineNone pl15 pr15 pt20 pb20  ${props.className}`}
        placeholder={`${props.placeholder}`}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        maxLength={props.maxLength}
      ></textarea>
    </div>
  );
};

export default CmnTextarea;

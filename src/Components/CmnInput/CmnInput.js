import React from "react";
import "./CmnInput.scss";

const CmnInput = (props) => {
  return (
    <>
      <div className="input-group mb15 position-relative">
        {props.label && (
          <label className="fs16 mb7" htmlFor={props.id}>
            {props.label}
          </label>
        )}

        <input
          type={props.type}
          className={`w-100 inputTransparent  outlineNone ${props.className} ${
            props.postionLeft && "pl30"
          }`}
          placeholder={props.placeholder}
          name={props.name}
          id={props.id}
          value={props.value}
          autoComplete="Off"
          onChange={props.onChange}
          readOnly={props.readOnly || false}
          disabled={props.disabled || false}
        />

        {props.icon && (
          <div className={`iconElement ${props.postionLeft && "iconLeft"}`}>
            <button className="btnBlank" onClick={props.onClick}>
              {props.icon}
            </button>
          </div>
        )}
      </div>
      {props.validationText && (
        <div
          className={`validationElement text-start mb15 ${props.validationClass}`}
          id={props.validationID}
        >
          {props.validationText}
        </div>
      )}
    </>
  );
};

export default CmnInput;

import React from "react";
import {Svg} from "../../Assets/Svgs/Svg";

const CmnSearch = (props) => {
  return (
    <>
    <style jsx='true'>
    {
      `
      .h47{
        height:47px;
      }`
    }
    </style>
      <div className="src position-relative">
        <div className="d-flex align-items-center flex-wrap">
        <input
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
          className={`mobMb10 ${props.className}`}
          type="search"
        />
        {props.button && (
          <button className={`btnTheme pt15 pb15 h47 radiusRight mobRadius7`} onClick={props.onClick}>
            Search
          </button>
        )}
        </div>
     

        <div className="iconOverInput">{Svg.search}</div>
      </div>
    </>
  );
};

export default CmnSearch;

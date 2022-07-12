import React from "react";
import { Svg } from "../../Assets/Svgs/Svg";
const ConfirmModal = (props) => {
  return (
    <>
      <div className="text-center">
        <div className="mb15">{Svg.circleQue}</div>

        <p className="fs16 colorBlack">
          Are you sure to want to exit this process ?
        </p>
      </div>
    </>
  );
};

export default ConfirmModal;

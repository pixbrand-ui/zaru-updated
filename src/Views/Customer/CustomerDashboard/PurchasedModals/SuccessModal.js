import React from "react";
import { Svg } from "../../../../Assets/Svgs/Svg";
import "./PurchasedModals.scss";

const SuccessModal = () => {
  return (
    <div className="text-center">
    <div className="mb15">
     {Svg.tickGreen}
    </div>
    <p className="fs18 colorBlack">
      Your cancel request has been done
      successfully.
    </p>
  </div>
  );
};

export default SuccessModal;



import React, {useState} from "react";
import Img from "../../../../Assets/Img/Img";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CancelJobRequest from "./CancelJobRequest";
import "./PurchasedModals.scss";

const CancelModal = () => {
  return (
    <section className="mb20">
    <div className="bgWhite radius pl30 pt30 pb30 pr30 mobWidth100 mx-auto">
      <div className="text-center">
        <span>{Svg.red_ques_mark}</span>
        <p className="fs18 pt20 colorBlack">
          Are you sure you want to <br/>cancel your task?
        </p>
        <div className="d-flex justify-content-center mb30">
          {/* <CmnButton type="noBg" text="Cancel" className="mr10 btnTransparentGrey radius4 pl20 pr20 pt10 pb10" /> */}
          <CmnButton onClick={()=>AlertModal.show(<CancelJobRequest/>)} type="square" text="Submit" className="bgRed pt10 pb10" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default CancelModal;



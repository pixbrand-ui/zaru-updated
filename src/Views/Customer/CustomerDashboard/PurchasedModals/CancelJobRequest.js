import React, { useEffect, useState } from "react";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../../Components/CmnTextarea/CmnTextarea";
import FormModal from "../../../../Components/FormModal/FormModal";
import HTTP from "../../../../Helpers/Api/Api";
import Auth from "../../../../Helpers/Auth/Auth";
import API from "../../../../Helpers/Constants/Constants";
import "./PurchasedModals.scss";
import SuccessModal from "./SuccessModal";

const CancelJobRequest = (props) => {

  const [enter, setenter] = useState("");
  const [manualReview, setmanualReview] = useState("");
  const[taskID,setTaskID]=useState("");
  const handleChange = (e) => {
  if(e.target.checked){
    setenter(e.target.value);
  }
  };

  const clearState=()=>{
    setenter("");
    setmanualReview("");
    setTaskID("");
  }
  useEffect(()=>{
    setTaskID(props.taskID);
  },[props.taskID])

  const iData = {
    taskid: taskID,
    cancelReson: enter,
    cancelInfo: manualReview,
  };

  const cancelTask=()=>{
    try {
      HTTP.post(API.canceltask, iData, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            if(props.callback) props.callback();
            FormModal.hide();
            AlertModal.show(<SuccessModal/>);
            clearState();
          }
        }
      );
    } catch (e) {}
  }



  return (
    <>
      <section className="mb20 cancel-job-request">
        <div className="bgWhite mobWidth100 mx-auto">
          <div className="text-end">
            <span>{Svg.close}</span>
          </div>
          <div className=" pl15 pb30 pr15">
            <div className="text-center">
            
              <h3 className="fs20 fBold mb20">
                Why do you want to cancel <br/> your task request?
              </h3>
            </div>

            <div className="wrapperRad">
              <input type="radio" id="agreed" name="option" className="d-none" value="Agreed" onChange={(e)=>handleChange(e)} />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="agreed"
              >
                <span>
                Agreed with an offer outside this website.
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

            <div className="wrapperRad">
              <input onChange={(e)=>handleChange(e)} type="radio" id="highrate" name="option" className="d-none" value="The rates are too high" />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="highrate"
              >
                <span>
                The rates are too high
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

            <div className="wrapperRad">
              <input onChange={(e)=>handleChange(e)} type="radio" id="noEnoughOffer" name="option" className="d-none" value="Not enough offers" />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="noEnoughOffer"
              >
                <span>
                Not enough offers
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

            <div className="wrapperRad">
              <input onChange={(e)=>handleChange(e)} type="radio" id="answersNot" name="option" className="d-none" value="Couldn't get answers to my queries" />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="answersNot"
              >
                <span>
                Couldn't get answers to my queries
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

            <div className="wrapperRad">
              <input onChange={(e)=>handleChange(e)} type="radio" id="noRequire" name="option" className="d-none" value="I no longer require this service" />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="noRequire"
              >
                <span>
                I no longer require this service
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

            <div className="wrapperRad">
              <input onChange={(e)=>handleChange(e)} type="radio" id="qualityIssue" name="option" className="d-none" value="Not sure about the quality" />
              <label
                className="fs16 radius4 pointer d-flex align-items-center flex-wrap justify-content-between border colorBlack pt10 pl15 pr15 pb10 mb8 w-100 opt-check"
                htmlFor="qualityIssue"
              >
                <span>
                Not sure about the quality
                </span>
              <span className="dNone checked">
                {Svg.CheckRed}
              </span>
              </label>
            </div>

         
         
            <div className="mb8">
              <CmnTextarea
                onChange={(e)=>setmanualReview(e.target.value)}
                name="msg"
                id="msg"
                placeholder="Can you share some more details?"
                className="pt10 pl15 pb10 radius w-100 border opt-msg"
                value={manualReview}
              />

            </div>
            <div>
              <CmnButton
              onClick={()=>cancelTask()}
                type="square"
                text="Cancel Job Request"
                className="w-100 btnRed bgRed"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CancelJobRequest;

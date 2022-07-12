import React, {useState} from "react";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import Svg from "../../../Assets/Img/svg/Svg";
import Img from "../../../Assets/Img/Img";
import "./PurchasedModals.scss";

const PurchasedModals = () => {
  return (
    <div className="bgLightOrange pt60 pb60">
      <CancelModal />
      <CancelJobRequest />
      <InteriorPainting />
    </div>
  );
};

export default PurchasedModals;

const CancelModal = () => {
  return (
    <>
      <section className="mb20">
        <div className="bgWhite radius pl30 pt30 pb30 pr30 width35 mobWidth100 mx-auto">
          <div className="text-center">
            <span>{Svg.red_ques_mark}</span>
            <p className="fs16 pt20 colorBlack">
              Are you sure you want to cancel your task?
            </p>
            <div className="d-flex justify-content-center mb30">
              <CmnButton type="noBg" text="Cancel" className="mr10" />
              <CmnButton type="square" text="Submit" className="bgRed" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const CancelJobRequest = () => {

  const [enter, setenter] = useState("")
    console.log(enter)

  const handleChange = (e) => {
    // setenter({value:e.target.value})
    console.log(enter)
  setenter(e.target.value)
  }
  return (
    <>
      <section className="mb20 cancel-job-request">
        <div className="bgWhite width35 mobWidth100 mx-auto">
          <div className="text-end">
            <span>{Svg.close}</span>
          </div>
          <div className=" pl30 pb30 pr30">
            <div className="text-center">
              <h3 className="fs20 fBold mb20">
                Why do you want to cancel your task request?
              </h3>
            </div>
            <div>
              <input type="radio" id="agreed" name="option" value="Agreed" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="agreed"
              >
                Agreed with an offer outside this website.
              </label>
            </div>
            <div>
              <input type="radio" id="rates" name="option" value="rates" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="rates"
              >
                The rates are too high
              </label>
            </div>
            <div>
              <input type="radio" id="offers" name="option" value="offers" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="offers"
              >
                Not enough offers
              </label>
            </div>
            <div>
              <input type="radio" id="answers" name="option" value="answers" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="answers"
              >
                Couldn't get answers to my queries
              </label>
            </div>
            <div>
              <input type="radio" id="require" name="option" value="require" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="require"
                // onClick={()=>{console.log("Radio Clicked")}}
              >
                I no longer require this service.
              </label>

            </div>
            <div>
              <input type="radio" id="quality" name="option" value="quality" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="quality"
              >
                Not Sure about the quality
              </label>
            </div>
            <div>
              <input type="radio" id="other" name="option" value="other" />
              <label
                className="fs16 radius colorBlack pt10 pl15 pb10 mb8 w-100 opt-check"
                htmlFor="other"
              >
                Other
              </label>
            </div>
            <div className="mb8">
              <textarea
                name="msg"
                id="msg"
                rows="2"
                placeholder="Can you share some more details?"
                className="pt10 pl15 pb10 radius w-100 border opt-msg"
                onChange={handleChange}
                value={enter.value}
              >
              </textarea>
            </div>
            <div>
              <CmnButton
                type="square"
                text="Cancel Job Request"
                className=" bgRed"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const InteriorPainting = () => {
  return (
    <>
      <section>
        <div className="bgWhite radius pl30 pt30 pb30 pr30 width35 mobWidth100 mx-auto">
          <div className="text-center">
            <div className="mb15">
              <img src={Img.tick.default} alt="" />
            </div>
            <p className="fs16 colorBlack">
              Your Home Interior Painting job request has been cancelled
              successfully.
            </p>
            <div className="d-flex justify-content-center">
              <CmnButton type="square" text="OK" className="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
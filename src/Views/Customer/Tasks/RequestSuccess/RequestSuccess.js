import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Img from "../../../../Assets/Img/Img";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import FormModal from "../../../../Components/FormModal/FormModal";
import "./RequestSuccess.scss";

const RequestSuccess = () => {
  const [gotostep, setgotostep] = useState(0);
  return (
    <section className="otpSection mobPt40 mobPb40 p-2">
      {gotostep === 1 && <Redirect to="/customer/dashboard" />}
      {gotostep === 2 && <Redirect to="/tasks/task-details" />}
      <div className="pt30 pb15  radius bgWhite mx-auto">
        <div className="text-center">
          <div className="mb15">
            <img src={Img.tick.default} alt="" />
          </div>
          <h2 className="fs24 mb10 colorBlack">
            We've received your quote request!
          </h2>
          <p className="paraColor fs16">
            We will notify you via email and SMS when your request receives
            quotes from pros. You can follow your request easily,{" "}
          </p>
          <div className="d-flex justify-content-center mb20">
            <CmnButton
              onClick={(e) => {
                setgotostep(1);
                FormModal.hide();
              }}
              type="square"
              text="Go to my task"
              className="mr10"
            />
          </div>
        </div>
        <div className="bBottom mb25"></div>

        <h2 className="fs24 colorBlack mb15">What happens next?</h2>
        <div>
          <div className="d-flex align-items-center mb20 trss-flex-div">
            <div className="mr15 colorOrange">
              <div className="trss-no">1</div>
            </div>
            <p className="fs16 paraColor mb0">
              Receive multiple quotes within a few hours.
            </p>
          </div>
          <div className="d-flex align-items-center mb20 trss-flex-div">
            <div className="mr15 colorOrange">
              <div className="trss-no">2</div>
            </div>
            <p className="fs16 paraColor mb0">
              Compare prices, check past projects and read reviews.
            </p>
          </div>
          <div className="d-flex align-items-center mb20 trss-flex-div">
            <div className="mr15 colorOrange">
              <div className="trss-no">3</div>
            </div>
            <p className="fs16 paraColor mb0">
              Call or text the pros to ask questions or work out any details.
            </p>
          </div>
          <div className="d-flex align-items-center mb20 trss-flex-div">
            <div className="mr15 colorOrange">
              <div className="trss-no">4</div>
            </div>
            <p className="fs16 paraColor mb0">
              When you're ready, hire the pro you like and get your project
              done.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestSuccess;

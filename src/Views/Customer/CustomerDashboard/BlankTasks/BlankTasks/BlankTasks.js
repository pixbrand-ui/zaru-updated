import React from "react";
import { Container } from "reactstrap";
import {Svg} from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";

const BlankTasks = () => {
  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <div className="d-flex justify-content-between mb10">
            <h3 className="fs28 fBold colorBlack">My Tasks</h3>
            <CmnButton
              type="square"
              text="+ Create New Task"
              className="fBold mobBtnSm tabMb10"
            />
          </div>
          <div className="bgWhite radius">
            <div className="pl30 pr30 pt10 pb10">
              <span className="fs16 colorOrange mr20">Open</span>
              <span className="fs16 colorBlack">Booked</span>
            </div>
            <div className="bBottom"></div>
            <div className="d-flex justify-content-center align-items-center heightVh60 text-center">
              <div>
                <span>{Svg.blanTaskIcon}</span>
                <p className="fs18 mt20 mb2 colorBlack">
                  You have not posted any recent quote requests.
                </p>
                <p className="fs16">
                  Select a service that you need from the catalog.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BlankTasks;

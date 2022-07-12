import React from "react";
import "./Menubar.scss";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
const Menubar = () => {
  return (
    <>
      <Container>
        <div className="text-center mb30">
          <div>
            <ul className="d-flex justify-content-between mb5 width35 mobWidth100 tabWidth100 mx-auto noUl new-quote position-relative">
              <li>
                <NavLink
                  to="/provider/create-quote"
                  className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no"
                  activeclassname="active"
                >
                  1
                </NavLink>

                <div className="fs16 colorBlack mt15">Setup</div>
              </li>
              <li activeclassname="active">
                <NavLink
                  to="/provider/create-quote-invoice"
                  className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no"
                  activeclassname="active"
                >
                  2
                </NavLink>

                <div className="fs16 colorBlack mt15">Review</div>
              </li>

              <li>
                <NavLink
                  to="/provider/send-quote"
                  className="colorOrange circleArea radius100 d-flex align-items-center justify-content-center quote_no leftDecline"
                  activeclassname="active"
                >
                  3
                </NavLink>
                <div className="fs16 colorBlack mt15">Send</div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Menubar;

import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";

const NewQuoteMsg = () => {
  return (
    <>
     <section className="bgLightOrange pt60 pb60">
     <Container>
     <div className="text-center">
            <h2 className="f24 f700 colorBlack fBold mb25">
              Create New Quote
            </h2>
          </div>
          <div className="text-center mb30">
          <div>
            <ul className="d-flex justify-content-between mb5 width35 mobWidth100 tabWidth100 mx-auto noUl new-quote position-relative">
              <li>
                <NavLink
                  to="/provider/create-quote"
                  className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no"
                >
                  1
                </NavLink>

                <div className="fs16 colorBlack mt15">Setup</div>
              </li>
              <li >
                <NavLink
                  to="/provider/create-quote-invoice"
                  className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no active"
                  
                >
                  2
                </NavLink>

                <div className="fs16 colorBlack mt15">Review</div>
              </li>

              <li>
                <NavLink
                  to="/provider/send-quote"
                  className="colorOrange circleArea radius100 d-flex align-items-center justify-content-center quote_no leftDecline active"
                  activeclassname="active"
                >
                  3
                </NavLink>
                <div className="fs16 colorBlack mt15">Send</div>
              </li>
            </ul>
          </div>
        </div>
          <Row>
            <Col>
              <section className="bgWhite width50 mobWidth100 mx-auto radius pt30 pl30 pb30 pr30">
                <div className="text-center">
                  <div className="mb15">
                    {Svg.tickGreen}
                  </div>
                  <h2 className="fs24 mb10 colorBlack">
                    Invoice Sent Successfully
                  </h2>
                  <p className="fs16">
                    Your Invoice has been sent to the customer. You can view the
                    status of the Invoice on your dashboard
                  </p>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
     </section>
 
    </>
  );
};

export default NewQuoteMsg;

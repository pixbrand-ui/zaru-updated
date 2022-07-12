import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import Menubar from "../Menubar/Menubar";
import NewQuoteMsg from "./NewQuoteMsg";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import Global from "../../../Helpers/Global/Global";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import FormModal from "../../../Components/FormModal/FormModal";

const QuoteSuccess = (props) => {

  const { data } = props;
 
  return (
    <>
      <style jsx="true">
        {`
          .invoiceTr.firstTr td {
            padding-top: 20px;
          }
          .invoiceTr td {
            padding-top: 5px;
            padding-bottom: 5px;
            border: none;
          }
        `}
      </style>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <div className="text-center">
            <h2 className="f24 f700 colorBlack fBold mb25">Create New Quote</h2>
          </div>
          <div className="text-center mb30">
            <div>
              <ul className="d-flex justify-content-between mb5 width35 mobWidth100 tabWidth100 mx-auto noUl new-quote position-relative">
                <li>
                  <NavLink
                    to="/provider/create-quote"
                    className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no active"
                    activeclassname="active"
                  >
                    1
                  </NavLink>

                  <div className="fs16 colorBlack mt15">Setup</div>
                </li>
                <li activeclassname="active">
                  <NavLink
                    to="/provider/create-quote-invoice"
                    className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no active"
                    activeclassname="active"
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
                  <div className="fs16 colorBlack mt15">Sent</div>
                </li>
              </ul>
            </div>
          </div>
          <Row className="justify-content-center">
            <Col lg={12} md={12} xl={9}>
              <section className="bgWhite border">
              <section className="bgWhite width50 mobWidth100 mx-auto radius pt30 pl30 pb30 pr30">
                <div className="text-center">
                  <div className="mb15">
                    {Svg.tickGreen}
                  </div>
                  <h2 className="fs24 mb10 fw700 colorBlack">
                    Quote has been sent successfully
                  </h2>
                  <p className="fs16">
                    Your Invoice has been sent to the customer. You can view the
                    status of the Invoice on your dashboard
                  </p>
                </div>
              </section>
          

              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default QuoteSuccess;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import Menubar from "../Menubar/Menubar";

const SendQuote = () => {
  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
        <div className="text-center">
            <h2 className="f24 f700 colorBlack fBold mb25">Create New Quote</h2>
          </div>
          <Menubar />
          <Row>
            <Col>
              <section className="bgWhite width50 mobWidth100 mx-auto radius pt30 pl30 pb30 pr30">
                <div className="text-center">
                  <div className="mb15">
                    {Svg.tickGreen}
                  </div>
                  <h2 className="fs24 mb10 colorBlack">
                    Quote Send Successfully
                  </h2>
                  <p className="fs16">
                    Your quote has been sent to the customer. You can view the
                    status of the quote on your dashboard
                  </p>
                  <div className="d-flex justify-content-center">
                    <CmnButton type="square" text="ok" className="" />
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SendQuote;

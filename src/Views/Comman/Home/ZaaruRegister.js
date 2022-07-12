import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";

const ZaaruRegister = () => {
  return (
    <>
      <style jsx="true">
        {`
          .stuckDown {
            position: absolute;
            bottom: 27px;
          }
        `}
      </style>
      <section className="bgOrange">
        <Container>
          <Row className="pt100 pb100 align-items-center mobPt50 mobPb50">
            <Col lg={6} xs={12} md={12}>
              <div>
                <h1 className="fs32 fBold mb20 colorWhite home_ta_left">
                  Give Zaaruu a try for free
                </h1>
                <p className="fs16 mb20 colorWhite maxWidth80">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The
                </p>
              </div>
            </Col>
            <Col lg={6} xs={12} md={12} className="">
              <Row>
                <Col lg={6} xs={12} md={6} className="">
                  <div className="radius pt50 pl30 pr30 pb60 bgWhite borVertical position-relative mb10 ">
                    <div className="mb30">
                      <span className="pt20 pr20 pb20 pl20 bgOrange radius100">
                        {Svg.gallery}
                      </span>
                    </div>
                    <h2 className="fs20 fBold">I am a Customer</h2>
                    <p className="fs16">
                      You need to find new customers for my services. You want
                      to You need to find new customers for my services.
                    </p>
                    <Link to="/login" className="no-link colorOrange stuckDown">
                      {" "}
                      Register Now{" "}
                    </Link>
                  </div>
                </Col>
                <Col lg={6} xs={12} md={6} className="  mb10">
                  <div className="radius pt50 pl30 pr30 pb60 position-relative bgWhite h-100">
                    <div className="mb30">
                      <span className="pt20 pr20 pb20 pl20 bgOrange radius100">
                        {Svg.gallery}
                      </span>
                    </div>
                    <h2 className="fs20 fBold">You are a service provider</h2>
                    <p className="fs16 ">
                      Register and find the right experts for your project.
                    </p>
                    <Link
                      to="/provider/signup"
                      className="no-link colorOrange stuckDown"
                    >
                      Become a Pro
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ZaaruRegister;

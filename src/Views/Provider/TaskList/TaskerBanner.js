import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const TaskerBanner = () => {
  return (
    <>
      <style jsx="true">
        {`
          .btnLg {
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 20px;
            display: inline-block;
            font-weight: 700;
          }
        `}
      </style>
      <section className="bannerTasker bgBlack pt120 pb120">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="fs40 colorWhite fBold">
              Create Your Free  Pro Account
              </h2>
              <p className="colorWhite fs18">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </Col>

            <Col lg={4}>
              <div className="d-flex align-items-center flex-wrap mobJustifyContentStart justify-content-end">
                <Link to="#" className="btnTheme btnGreen btnLg">
                  Broadcast Task
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TaskerBanner;

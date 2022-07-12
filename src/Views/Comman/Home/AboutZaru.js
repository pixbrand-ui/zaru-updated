import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Img from '../../../Assets/Img/Img';
import { Svg } from '../../../Assets/Svgs/Svg';

const AboutZaru = () => {
    return (
        <section className="mb100 mobPt50 mobPb50">
        <Container>
          <Row className="align-items-center">
            <div className="text-center mb60">
              <h1 className="fs32 fBold mb20">Get things done with Zaaruu</h1>
              <p className="fs16 ">
                You will get offers from the best experts near you.
              </p>
            </div>
            <Col lg={6} md={6} xs={12} className="mb20">
              <ul className="list-unstyled dashedVertical">
                <li>
                  <div className="d-flex align-items-start mb30">
                    <span className="pt15 pr15 pb15 pl15 mr30 radius100 gtz-bor das-bef">
                      {Svg.orange_gallery}
                    </span>
                    <div>
                      <h3 className="fs24 fw800 colorBlack">
                        Tell us what you need
                      </h3>
                      <p className="fs16 ">
                        Answer a Few Questions About what kind of service you
                        need.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start mb30">
                    <span className="pt15 pr15 pb15 pl15 mr30 radius100 gtz-bor das-bef">
                      {Svg.orange_gallery}
                    </span>
                    <div>
                      <h3 className="fs24 fw800 colorBlack">Receive Quotes</h3>
                      <p className="fs16 ">
                        We will find the most qualified experts that fit yours
                        needs needs
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start mb30">
                    <span className="pt15 pr15 pb15 pl15 mr30 radius100 gtz-bor ">
                      {Svg.orange_gallery}
                    </span>
                    <div>
                      <h3 className="fs24 fw800 colorBlack">
                        Hire the right professional
                      </h3>
                      <p className="fs16 ">
                        Compare different offers and choose from the best rated
                        experts
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <Link to="/tasks/task-details" className="btnTheme">Post a Job </Link>
            </Col>
            <Col lg={6} md={6} xs={12} className="mb20">
              <img src={Img.rectangle2558.default} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    );
};

export default AboutZaru;
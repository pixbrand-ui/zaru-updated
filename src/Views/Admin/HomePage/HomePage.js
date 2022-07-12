import React from "react";
import GInfoBox from "../../../Components/GComponents/GInfoBox";
import * as Icon from "react-bootstrap-icons";
import { Col, Row } from "reactstrap";
import GContainer from "../../../Components/GComponents/GContainer";

export default function HomePage() {
  return (
    <>
      <GContainer>
        <span className="container-title">Business Overview</span>
        <Row className="w-100 m-0">
          <Col md={6} lg={6} xl={3} className="mb-2">
            <GInfoBox iconBackground="#F58840">
              <span className="icon">
                <Icon.Person />
              </span>
              <span className="info">
                <span className="title">Customers</span>
                <span className="subtitle">2104</span>
                {/* <span className="progressbar">
                  <span className="progressslide"></span>
                  <span className="progress"></span>
                  <span>70% Increase in 30 Days</span>
                </span> */}
              </span>
            </GInfoBox>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <GInfoBox iconBackground="#519259">
              <span className="icon">
                <Icon.ShopWindow />
              </span>
              <span className="info">
                <span className="title">Service Provider</span>
                <span className="subtitle">5504</span>
              </span>
            </GInfoBox>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <GInfoBox iconBackground="#009DAE">
              <span className="icon">
                <Icon.ListStars />
              </span>
              <span className="info">
                <span className="title">Categories</span>
                <span className="subtitle">235</span>
              </span>
            </GInfoBox>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <GInfoBox iconBackground="#6B7AA1">
              <span className="icon">
                <Icon.ListNested />
              </span>
              <span className="info">
                <span className="title">Sub Categories</span>
                <span className="subtitle">587</span>
              </span>
            </GInfoBox>
          </Col>
        </Row>
      </GContainer>
      <GContainer>
        <span className="container-title">Revenue & Future Business</span>
        <Row className="w-100 m-0">
          <Col md={12} lg={6} xl={3} className="mb-3">
            <GInfoBox
              backgroundColor="#4AA96C"
              progressColor="#FFF"
              color="#FFF"
              iconBackground="#4AA96C"
            >
              <span className="icon">
                <Icon.CurrencyDollar />
              </span>
              <span className="info">
                <span className="title">Revenue</span>
                <span className="subtitle">$ 55412</span>
                <span className="progressbar">
                  <span className="progressslide"></span>
                  <span className="progress"></span>
                  <span>$459 Increase in last 30 Days</span>
                </span>
              </span>
            </GInfoBox>
          </Col>
          <Col md={12} lg={6} xl={3} className="mb-3">
            <GInfoBox
              backgroundColor="#FF5F7E"
              progressColor="#FFF"
              color="#FFF"
              iconBackground="#FF5F7E"
            >
              <span className="icon">
                <Icon.Wallet />
              </span>
              <span className="info">
                <span className="title">Points Sold</span>
                <span className="subtitle">5541200</span>
                <span className="progressbar">
                  <span className="progressslide"></span>
                  <span className="progress"></span>
                  <span>4590 Sold in last 30 Days</span>
                </span>
              </span>
            </GInfoBox>
          </Col>

          <Col md={12} lg={6} xl={3} className="mb-3">
            <GInfoBox
              backgroundColor="#7952B3"
              progressColor="#FFF"
              color="#FFF"
              iconBackground="#7952B3"
            >
              <span className="icon">
                <Icon.Handbag />
              </span>
              <span className="info">
                <span className="title">Open Tasks</span>
                <span className="subtitle">1247</span>
                <span className="progressbar">
                  <span className="progressslide"></span>
                  <span className="progress"></span>
                  <span>198 Created in last 30 Days</span>
                </span>
              </span>
            </GInfoBox>
          </Col>

          <Col md={12} lg={6} xl={3} className="mb-3">
            <GInfoBox
              backgroundColor="#6F9EAF"
              progressColor="#FFF"
              color="#FFF"
              iconBackground="#6F9EAF"
            >
              <span className="icon">
                <Icon.Handbag />
              </span>
              <span className="info">
                <span className="title">Completed Tasks</span>
                <span className="subtitle">4780</span>
                <span className="progressbar">
                  <span className="progressslide"></span>
                  <span className="progress"></span>
                  <span>524 Completed in last 30 Days</span>
                </span>
              </span>
            </GInfoBox>
          </Col>
        </Row>
      </GContainer>
    </>
  );
}

import React from "react";
import { Col, Row } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import GContainer from "../../../Components/GComponents/GContainer";
import GInfoBox from "../../../Components/GComponents/GInfoBox";

export default function Overview({
  title,
  first_icon,
  first_title,
  first_subtitle,
  first_tooltip,
  second_icon,
  second_title,
  second_subtitle,
  second_tooltip,
  third_icon,
  third_title,
  third_subtitle,
  third_tooltip,
  fourth_icon,
  fourth_title,
  fourth_subtitle,
  fourth_tooltip,
}) {
  return (
    <>
      {/* <GContainer>
        <span className="container-title">{title}</span>
        <Row className="w-100 m-0">
          <Col md={6} lg={6} xl={3} className="mb-2">
            <Tooltip title={first_tooltip}>
              <GInfoBox iconBackground="#F58840">
                <span className="icon">
                  {first_icon}
                </span>
                <span className="info">
                  <span className="title">{first_title}</span>
                  <span className="subtitle">{first_subtitle}</span>
                </span>
              </GInfoBox>
            </Tooltip>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <Tooltip title={second_tooltip}>
              <GInfoBox iconBackground="#519259">
                <span className="icon">{second_icon}</span>
                <span className="info">
                  <span className="title">{second_title}</span>
                  <span className="subtitle">{second_subtitle}</span>
                </span>
              </GInfoBox>
            </Tooltip>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <Tooltip title={third_tooltip}>
              <GInfoBox iconBackground="#009DAE">
                <span className="icon">{third_icon}</span>
                <span className="info">
                  <span className="title">{third_title}</span>
                  <span className="subtitle">{third_subtitle}</span>
                </span>
              </GInfoBox>
            </Tooltip>
          </Col>
          <Col md={6} lg={6} xl={3} className="mb-2">
            <Tooltip title={fourth_tooltip}>
              <GInfoBox iconBackground="#6B7AA1">
                <span className="icon">{fourth_icon}</span>
                <span className="info">
                  <span className="title">{fourth_title}</span>
                  <span className="subtitle">{fourth_subtitle}</span>
                </span>
              </GInfoBox>
            </Tooltip>
          </Col>
        </Row>
      </GContainer> */}
    </>
  );
}

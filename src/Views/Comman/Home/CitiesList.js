import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Img from '../../../Assets/Img/Img';
const TopServiceData = [
    {
      title: "Istanbul",
      img: Img.nopath.default,
    },
    {
      title: "Ankara",
      img: Img.nopath1.default,
    },
    {
      title: "london",
      img: Img.nopath2.default,
    },
    {
      title: "Budapest",
      img: Img.nopath3.default,
    },
    {
      title: "athens",
      img: Img.nopath4.default,
    },
    {
      title: "Helsinki",
      img: Img.nopath5.default,
    },
    {
      title: "istanbul",
      img: Img.nopath.default,
    },
    {
      title: "Ankara",
      img: Img.nopath1.default,
    },
    {
      title: "london",
      img: Img.nopath2.default,
    },
    {
      title: "Budapest",
      img: Img.nopath3.default,
    },
    {
      title: "athens",
      img: Img.nopath4.default,
    },
    {
      title: "Helsinki",
      img: Img.nopath5.default,
    },
  ];

  
const CitiesList = () => {
    return (
        <Container className="mb60">
        <Row>
          <div className="text-center mb30">
            <h1 className="fs32 fBold mt60 mb20 home_ta_left">
              Browse Top Service Professionals in India
            </h1>
            <p className="fs16 width50 mx-auto bts-para">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
            </p>
          </div>

          {TopServiceData.map((el, ind) => {
            return (
              <Col key={ind} lg={2} xs={6} md={4}>
                <div className="text-center" key={el.title}>
                  <div className="bgLightOrange pt35 pb35 mb10">
                    <img src={el.img} alt="" />
                  </div>
                  <div className="colorBlack mb25">{el.title}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
};

export default CitiesList;
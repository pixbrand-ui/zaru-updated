import React from "react";
import { Container, Col, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import "./About.scss";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import GAccordion from "../../../Components/GComponents/GAccordion/GAccordion/GAccordion";
const About = () => {
  return (
    <>
      <Prescribe />
      <Looking />
      <Details />
      <Act />
      <Gallery />
      <FAQ />
    </>
  );
};

export default About;

const Prescribe = () => {
  return (
    <>
      <section className="pt100 pb100 mobPt40 pb10Mob">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={6} className="mb10">
              <div>
                <img src={Img.group54236.default} alt="" className="w-100" />
              </div>
            </Col>
            <Col lg={6} md={6} className="mb10">
              <div className="ml60 mobMl0 ml0Tab">
                <span className="fs14 colorOrange fw700">About Us</span>
                <h1 className="fs45 fBold colorBlack">Who is Zaaruu?</h1>
                <p className="fs16 colorBlack">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quiz. Iaculis urna id volutpat
                  lacus laoreet. Mauris vitae ultricies leo integer malesuada.
                  Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu
                  cursus euismod. Dictum
                </p>
                <p className="fs16 colorBlack">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quis.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Looking = () => {
  return (
    <>
      <section className="bgLightOrange pt100 pb100 mb100 mobPt40 mobPb40 mb30Mob">
        <Container>
          <div className="text-center mb60 mobMb10 width74 mx-auto mobWidth100 smTabWidth100">
            <h2 className="fs32 fBold colorBlack mb15 mob_t_left">
              Can't find what you're looking for?
            </h2>
            <p className="fs16 colorBlack mob_t_left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{" "}
            </p>
          </div>
          <Row>
            <Col lg={4} md={4}>
              <div className="width70 mobWidth100 smTabWidth100">
                <h3 className="fs24 colorOrange fBold">
                  6 million+ monthly active on Zaaruu
                </h3>
                <p className="fs16">
                  Browse our community of experts to find the right one for you.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className="width70 mobWidth100 smTabWidth100">
                <h3 className="fs24 colorOrange fBold">
                  200,000+ Experts on Zaaruu
                </h3>
                <p className="fs16">
                  Browse our community of experts to find the right one for you.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className="width70 mobWidth100 smTabWidth100">
                <h3 className="fs24 colorOrange fBold">
                  $2 billion paid out to Experts
                </h3>
                <p className="fs16">
                  Browse our community of experts to find the right one for you.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Details = () => {
  return (
    <>
      <section className="mb100 mb30Mob">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={6}>
              <h2 className="fs32 fBold colorBlack">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h2>
              <p className="fs16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Bibendum est ultricies integer quis. Iaculis urna id volutpat
                lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac
                odio tempor orci dapibus ultrices in. Egestas diam in arcu
                cursus euismod. Dictum fusce ut placerat orci nulla. Tincidunt
                ornare massa eget egestas
              </p>
            </Col>
            <Col lg={6} md={6}>
              <div className="ml60 mobMl0 ml0Tab">
                <img src={Img.blackWomen.default} alt="" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Act = () => {
  return (
    <>
      <section className="mb100 mb30Mob">
        <Container>
          <div className="text-center">
            <div>
              <h2 className="fs32 fBold colorBlack width40 mx-auto mobWidth100 mb15 smTabWidth100 mob_t_left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h2>
              <p className="fs16 width75 mx-auto mobWidth100 mb65 mobMb10 smTabWidth100 mob_t_left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Bibendum est ultricies integer quis. Iaculis urna id volutpat
                lacus laoreet
              </p>
            </div>
          </div>
          <div>
            <img src={Img.rectangle13152.default} alt="" className="w-100" />
          </div>
        </Container>
      </section>
    </>
  );
};

const Gallery = () => {
  return (
    <>
      <section className="mb100 mb30Mob">
        <Container>
          <div className="text-center mb50 mobMb10">
            <h2 className="fs32 fBold colorBlack mb15 mob_t_left mobMb10">
              Our Team
            </h2>
            <p className="fs16 width70 mx-auto smTabWidth100 mobWidth100 mob_t_left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Bibendum est ultricies integer quis.
            </p>
          </div>
          <div>
            <Row>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((obj, ind) => {
                return (
                  <Col lg={3} md={4} xs={6} className="mb20">
                    <div>
                      <div className="mb10">
                        <img
                          src={Img.rectangle5.default}
                          alt=""
                          className="img-fluid radius"
                        />
                      </div>
                      <div>
                        <p className="fs18 mb0 colorBlack">Monica Geller</p>
                        <p className="fs16 mb0 colorPara">-Co-Founder</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

const FAQ = () => {
  return (
    <>
      <section className="pt100 pb100 bgLightOrange">
        <h1 className="fs32 colorBlack fBold text-center mb40">Frequently Asked Questions</h1>
        <GAccordion
          data={[
            {
              title: "What is Zaaruu? ",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
            },
            {
              title: "How trustworthy is Zaaruu?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
            {
              title: "Why should I register?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
            {
              title:
                "I didn't receive a confirmation e-mail, what should I do?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
          ]}
        />
        <div className="d-flex justify-content-center">
          <CmnButton
            type="square"
            text="Frequently asked question"
            className="mt50"
          />
        </div>
      </section>
    </>
  );
};

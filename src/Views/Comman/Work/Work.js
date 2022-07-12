import React from "react";
import { Container, Col, Row } from "reactstrap";
// import Img from "../../Assets/Img/Img";
import Img from "../../../Assets/Img/Img";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import GAccordion from "../../../Components/GComponents/GAccordion/GAccordion/GAccordion";
// import CmnButton from "../../Components/CmnButton/CmnButton";
import "./Work.scss";

const Work = () => {
  return (
    <>
      <Head />
      <Want />
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
      <FAQ />
    </>
  );
};

export default Work;

const Head = () => {
  return (
    <>
      <section className="bgLightOrange pt60 pb120 mobPt40 pb60Mob work-section">
        <Container>
          <div className="text-center ">
            <p className="fs16 mb5 mob_t_left_w">How it's works</p>
            <h1 className="fs45 fBold colorBlack mb15 mob_t_left_w">
              How does Zaaruu work?
            </h1>
            <p className="fs16 width83 mx-auto mb25 mobMb10 mob_t_left_w mobWidth100">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-center mb30 mobMb10">
              <CmnButton type="square" text="I want to start" className="" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const Want = () => {
  return (
    <>
      <section>
        <Container>
          <div>
            <img
              src={Img.rectangle5225.default}
              alt=""
              className="w-100 work-img mb60 mobMb10"
            />
          </div>
        </Container>
      </section>
    </>
  );
};

const Step1 = () => {
  return (
    <>
      <section className="mb60 pt40 pb40 mobMb10">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb10">
              <div>
                <img src={Img.blackWomen.default} alt="" className="w-100" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="ml60 mobMl0">
                <p className="fs16 mb3">STEP 1</p>
                <h2 className="fs32 fBold colorBlack">
                  We've helped 35,000+ pros to successfully grow their business.
                </h2>
                <p className="fs16">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quis. Iaculis urna id volutpat
                  lacus laoreet. Mauris vitae ultricies leo integer malesuada.
                  Ac odio tempor
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Step2 = () => {
  return (
    <>
      <section className="bgLightOrange mb60 pt100 pb100 mobPt40 mobPb40 mobMb10">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div>
                <p className="fs16">STEP 2</p>
                <h2 className="fs32 fBold colorBlack">
                  We've helped 35,000+ pros to successfully grow their business.
                </h2>
                <p className="fs16">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quis. Iaculis urna id volutpat
                  lacus laoreet. Mauris vitae ultricies leo integer malesuada.
                  Ac odio tempor
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="ml60 mobMl0">
                <img src={Img.blackWomen.default} alt="" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <section className="mb80 pt40 pb40 mobMb10">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb10">
              <div>
                <img src={Img.blackWomen.default} alt="" className="w-100" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="ml60 mobMl0">
                <p className="fs16">STEP 3</p>
                <h2 className="fs32 fBold colorBlack">
                  We've helped 35,000+ pros to successfully grow their business.
                </h2>
                <p className="fs16">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quis. Iaculis urna id volutpat
                  lacus laoreet. Mauris vitae ultricies leo integer malesuada.
                  Ac odio tempor
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Step4 = () => {
  return (
    <>
      <section className="bgLightOrange mb80 pt100 pb100 mobPt40 mobPb40 mobMb10">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div>
                <p className="fs16">STEP 4</p>
                <h2 className="fs32 fBold colorBlack">
                  We've helped 35,000+ pros to successfully grow their business.
                </h2>
                <p className="fs16">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Bibendum est ultricies integer quis. Iaculis urna id volutpat
                  lacus laoreet. Mauris vitae ultricies leo integer malesuada.
                  Ac odio tempor
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="ml60 mobMl0">
                <img src={Img.blackWomen.default} alt="" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const Step5 = () => {
  return (
    <>
      <section className="bgOrange pt100 pb100 mb60">
        <Container>
          <div className="text-center step5-img">
            <h3 className="fs24 mb15 colorWhite mob_t_left_w">
              91% of users submitted a positive rating for the app and its
              usefulness.
            </h3>
            <h1 className="fs45 colorWhite fBold width90 mx-auto mb30 mob_t_left_w mobWidth100 smTabWidth100_w">
              Come on and simply solve your projects with Zaaruu.
            </h1>
            <div className="d-flex justify-content-center">
              <CmnButton
                type="square"
                text="Let's Start"
                className="bg-dark"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const FAQ = () => {
  return (
    <>
      <section className="pt60 pb100">
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

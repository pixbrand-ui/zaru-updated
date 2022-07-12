import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./BecomeaProvider.scss";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Img from "../../../Assets/Img/Img";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import ProviderBanner from "./ProviderBanner";
import { Helmet } from "react-helmet";

const BecomeaProvider = () => {


  return (
    <div>
         <Helmet>
           <title>Home - Zaaruu</title>
      </Helmet>
        <ProviderBanner/>
      

      <section className="mb60">
        <Container>
          <Row className="gx-5">
            <Col lg={4} md={4} xs={12}>
              <div className="bgGreen radius bap mb8"></div>
              <h2 className="fs24 fw600">Be Your Own Boss</h2>
              <p className="fs16">
                Sign up for free to receive quote requests from customers
                looking for your service.
              </p>
            </Col>
            <Col lg={4} md={4} xs={12}>
              <div className="bgGreen radius bap mb8"></div>
              <h2 className="fs24 fw600">Set Your Own Rates</h2>
              <p className="fs16">
                When a quote request matches your interest and availability, pay
                to respond to the customer.
              </p>
            </Col>
            <Col lg={4} md={4} xs={12}>
              <div className="bgGreen radius bap mb8"></div>
              <h2 className="fs24 fw600">Grow Your Business</h2>
              <p className="fs16">
                If you’re a good fit for the customer, you get hired. Complete
                the job and request a review from the customer.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mb80">
        <Container>
          <Row className="align-items-center gx-5">
            <Col lg={6} md={6} xs={12} className="mb20">
              <h1 className="fs32 fBold mb20 ">What Is Zaaruu?</h1>
              <p className="fs16">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </Col>
            <Col lg={6} md={6} xs={12} className="mb20">
              <img src={Img.rectangle2558.default} alt="" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mb60">
        <Container>
          <Row className="gx-5 gy5">
            <h1 className="fs32 fBold text-center mb40">Getting Started</h1>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53341.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20">1. Sign Up</h2>
                <p className="fs16">
                  When a quote request matches your interest and availability,
                  pay to respond to the customer.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53342.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20">2. Build Your Profile</h2>
                <p className="fs16">
                  When a quote request matches your interest and availability,
                  pay to respond to the customer.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53343.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20">
                  3. Verify Your Eligibility to Task
                </h2>
                <p className="fs16">
                  If you’re a good fit for the customer, you get hired. Complete
                  the job and request a review from the customer.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53341.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20 ">4. Buy Credit Points</h2>
                <p className="fs16">
                  When a quote request matches your interest and availability,
                  pay to respond to the customer.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53342.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20">
                  5. Set your schedule and work area
                </h2>
                <p className="fs16">
                  When a quote request matches your interest and availability,
                  pay to respond to the customer.
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} xs={6}>
              <div>
                <div className="mb10">
                  <img src={Img.group53343.default} alt="" />
                </div>
                <h2 className="fs24 fw600 mobFs20">6. Start Getting Jobs</h2>
                <p className="fs16">
                  If you’re a good fit for the customer, you get hired. Complete
                  the job and request a review from the customer.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mb60">
        <Container>
          <Row className="align-items-center gx-5">
            <Col lg={6} md={6} xs={12} className="mb20">
              <div>
                <img
                  src={Img.rectangle13380.default}
                  alt=""
                  className="w-100"
                />
              </div>
            </Col>
            <Col lg={6} md={6} xs={12} className="mb20">
              <div className="mb20">{Svg.quotes}</div>
              <p className="fs24 colorBlack">
                I Love Zaaruu! I Was Able to Get out of Debt, Tackle Bills,
                Provide for My Family, and Still Have Enough Room to save for
                Future Goals.
              </p>
              <p className="fs16 colorBlack">Karsheem W., New York, NY</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="container mb80">
        <h1 className="fs32 fBold text-center mb50">
          Frequently Asked Questions
        </h1>

        <Accordion >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                What’s Required to Become a Provider?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>How Do I Get Jobs?</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Where Does Zaaruu Operate?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                How Long Does It Take for My Registration to Be Processed?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Do I Need Experience to Task?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>How Do I Get Paid?</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                What Categories Can I Task in on Zaaruu?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>

        <div className="text-center d-flex align-items-center flex-wrap justify-content-center mt40">
          <CmnButton
            type="square"
            text="Frequently asked question"
            className=""
          />
        </div>
      </section>

      <section
        className="pt120 pb120 bgCover position-relative"
        style={{ backgroundImage: "url(" + Img.group.default + ")" }}
      >
        <Container className="zIndex1 position-relative">
          <Row>
            <Col lg={6}>
              <h1 className="fs32 fBold mb20 home_ta_left">
                Zaaruu App For Android/ iOS Coming soon!
              </h1>
              <p className="fs16">Mobile App Coming Soon</p>
              <div className="d-flex ">
                <CmnInput
                  className="mr10"
                  type="text"
                  placeholder="Enter your email address"
                  onChange={(e) => {}}
                />

                <div>
                  <CmnButton type="square" text="Send" className="" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="overlayBanner" />
      </section>
    </div>
  );
};

export default BecomeaProvider;


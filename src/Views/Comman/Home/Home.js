import React from "react";
import { Container, Row, Col } from "reactstrap";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import HomeBanner from "./HomeBanner";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./Home.scss";
import ParentCatCarousel from "./ParentCatCarousel";
import PopularCat from "./PopularCat";
import AboutZaru from "./AboutZaru";
import Testimonials from "./Testimonials";
import CitiesList from "./CitiesList";
import PopularCategory from "./PopularCategory";
import ZaaruRegister from "./ZaaruRegister";
import { Helmet } from "react-helmet";

const Filter = () => {
  return (
    <>
      <HomeBanner />
      <ParentCatCarousel />
      <PopularCat />
      <AboutZaru />
      <ZaruApp />
      <Testimonials />
      <CitiesList />
      <PopularCategory />
      <ZaaruRegister />
    </>
  );
};

export default Filter;

const ZaruApp = () => {
  return (
    <>
      <Helmet>
        <title>Home - Zaaruu</title>
      </Helmet>
      <section className="zaru-app pt120 pb120 mb50 mobPt50 mobPb50">
        <Container>
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
                  <CmnButton
                    className="pt15 pb15 h47"
                    type="square"
                    text="Send"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Img from "../../../Assets/Img/Img";
import "./Footer.scss";
import { Svg } from "../../../Assets/Svgs/Svg";
import { Filter } from "@mui/icons-material";

const Footer = () => {
  const items=["a1","a2","a3"];
  const prev=(event)=>{
    event.preventDefault();
    console.log(event);

  


  }

  useEffect(()=>{
    abc();

  },[]);

  const abc=()=>{
    // items.forEach((element, index, array) => {
    //   console.log("elem",array);
    //   index.filter();
    // })
  
  }
  return (
    <>
  
      <footer className="siteFooter bgBlack pt80 mobPt50">
        <Container>
          <Row className="gx-5 gy-5">
            <Col lg={3} md={6}>
              <div className="fLogo mb15">
                <Link to="#" onClick={(e)=>prev(e)}>
                  <img src={Img.logoWhite.default} alt="" />
                </Link>
              </div>

              <p className="colorParaLight f16 mb20">
                I work in project management and joined Zaaruu because I get
                great for less.
              </p>

              <ul className="noUl d-flex align-items-center flex-wrap">
                <li className="mr20" rel="noreferrer">
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    {Svg.fb}
                  </a>
                </li>
                <li className="mr20">
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    {Svg.instagram}
                  </a>
                </li>
                <li className="mr20">
                  <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer">
                    {Svg.twitter}
                  </a>
                </li>
                <li className="mr20">
                  <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                    {Svg.youtube}
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6} xs={6}>
              <h6 className="text-uppercase colorWhite f16 fw600 mb18">
                Links
              </h6>

              <ul className="noUl mb0">
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/">
                    Home
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/how-it-work">
                    How it works
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/provider/become-provider">
                    Become a Pro
                  </Link>
                </li>
                <li>
                  <Link className="f16 mr20 colorParaLight" to="/create-project">
                    How to create a demand
                  </Link>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6} xs={6}>
              <h6 className="text-uppercase colorWhite f16 fw600 mb18">Help</h6>
              <ul className="noUl mb0">
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/termandcondition">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/privacypolicy">
                    Privacy & Policy
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/cancellationpolicy">
                    Cancellation Policy
                  </Link>
                </li>
                <li className="mb8">
                  <Link className="f16 mr20 colorParaLight" to="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="f16 mr20 colorParaLight" to="/contact-us">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link className="f16 mr20 colorParaLight" to="/admin">
                    Admin
                  </Link>
                </li>

            
              </ul>
            </Col>

            <Col lg={2} md={6}>
              <h6 className="text-uppercase colorWhite f16 fw600 mb18">
                Download app
              </h6>

              <ul className="noUl mb0 mobDflex">
                <li className="mb8 mb15 mobMr10">
                  <a href="#" target="_blank" rel="noreferrer" >
                    <img className="img-fluid" src={Img.gPlay.default} alt="" />
                  </a>
                </li>

                <li className="mb8 mb15">
                  <a href="#" target="_blank" rel="noreferrer">
                    <img
                      className="img-fluid"
                      src={Img.aStore.default}
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="fBottom text-center pt11 pb14 mt80 mt25MobFooter">
          <Container>
            <p className="colorPara f14 mb0">
              Copyright © Zaaruu . All rights reserved.
            </p>
          </Container>
        </div>

        {/* 03-01-2022 */}
        {/* <div className="bgBlack pt35 pb25">
          <Container>
            <div className="d-flex align-items-center justify-content-between flex-wrap pb10">
              <div className="fLogo">
                <Link to="/">
                  <img src={Img.logoWhite.default} alt="" />
                </Link>
              </div>
              <div className="text-end">
                <ul className="noUl d-flex flex-wrap mb0">
                  <li className="mb5">
                    <Link className="f16 mr20 colorWhite" to="/termandcondition">
                      Terms
                    </Link>
                  </li>
                  <li className="mb5">
                    <Link className="f16 mr20 colorWhite" to="/privacypolicy">
                      Privacy
                    </Link>
                  </li>
                  <li className="mb5">
                    <Link className="f16 mr20 colorWhite" to="/cookiepolicy">
                      Cookies Policy
                    </Link>
                  </li>
                  <li className="mb5">
                    <Link className="f16 mr20 colorWhite" to="/provider/become-provider">
                      Pro Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fBottom pt11">
              <p className="colorWhite f14 mb0">
                By continuing past this page, you agree to our Terms of Service,
                Cookie Policy, Privacy Policy and Content Policies. All
                trademarks are properties of their respective owners. 2012-2021
                © Zaaru Pvt Ltd. All rights reserved.
              </p>
            </div>
          </Container>
        </div> */}
      </footer>
    </>
  );
};

export default Footer;

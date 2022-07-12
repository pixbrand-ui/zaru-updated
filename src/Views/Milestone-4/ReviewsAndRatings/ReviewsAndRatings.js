import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProviderAside from "../ProviderAside/ProviderAside";
import Select from "react-select";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import Svg from "../../../Assets/Img/svg/Svg";
import Img from "../../../Assets/Img/Img";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";

const options = [
  { value: "Recommended", label: "Recommended" },
  { value: "Price (lowest to highest)", label: "Price (lowest to highest)" },
  { value: "Price (highest to lowest)", label: "Price (highest to lowest)" },
  { value: "% of positive reviews", label: "% of positive reviews" },
  { value: "# of completed tasks", label: "# of completed tasks" },
];

const ReviewsAndRatings = () => {
  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProviderAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <div className="d-flex align-items-center justify-content-between mb15">
                <h2 className="fs28 colorBlack fBold">Review & Ratings</h2>
                <p className="fs16 mb0 ">Business Profile:</p>
                <Select
                  className="w-50 themeSelect"
                  classNamePrefix="themeSelect"
                  options={options}
                />
              </div>
              <section className="bgWhite radius border mb20">
                <div className="d-flex align-items-center justify-content-center heightVh30 text-center">
                  <div>
                    <p className="fs16 ">
                      Getting Customer Reviews Make You Twice as Likely to Be
                      Hired on Zaaru.
                    </p>
                    <div className="d-flex justify-content-center">
                      <CmnButton
                        type="square"
                        text="Get Customers Reviews"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="bgWhite radius border">
                <div className="pl20 pr20 pt10 pb10">
                  <h3 className="fs18 mb0 colorBlack">Reviews</h3>
                </div>
                <div className="bBottom "></div>
                <div className="pl25 pr25 pb30 pt30 ">
                  <section className="dotted_border pb15 mb20">
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className="d-flex">
                        <div>
                          <img
                            src={Img.busPro.default}
                            alt=""
                            className="w48 radius100 mr15"
                          />
                        </div>
                        <div className="mb5">
                          <p className="fs16 colorBlack mb4">
                            Kimberly S. 083 ****156
                          </p>
                          <div>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr15">
                              {Svg.fillStar}
                            </span>
                            <span className="fs16 colorGreen mr5">
                              Excellent
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="fs14 colorPara mb5">24 July,2020</span>
                      </div>
                    </div>
                    <div className="ml63 mobMl0">
                      <p className="fs16 mb5">
                        Great experience. Took 2 months for house plans and 4
                        months to construct . Currently living in our new home
                        and we are very happy with the service recieved during
                        our engagement .
                      </p>
                      <p className="fs14 colorOrange mb7">
                        <span className="mr10">{Svg.orange_leftarrow}</span>
                        Respond
                      </p>
                    </div>
                  </section>

                  <section className="dotted_border pb15 mb20">
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className="d-flex">
                        <div>
                          <img
                            src={Img.busPro.default}
                            alt=""
                            className="w48 radius100 mr15"
                          />
                        </div>
                        <div className="mb5">
                          <p className="fs16 colorBlack mb4">
                            Kimberly S. 083 ****156
                          </p>
                          <div className="red-rating-div">
                            <span className="mr5">{Svg.redStar}</span>
                            <span className="mr5">{Svg.greyStar}</span>
                            <span className="mr5">{Svg.greyStar}</span>
                            <span className="mr5">{Svg.greyStar}</span>
                            <span className="mr15">{Svg.greyStar}</span>
                            <span className="fs16 colorRed mr5">Bad</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="fs14 colorPara mb5">24 July,2020</span>
                      </div>
                    </div>
                    <div className="ml63 mobMl0">
                      <p className="fs16 ">
                        Great experience. Took 2 months for house plans and 4
                        months to construct . Currently living in our new home
                        and we are very happy with the service recieved during
                        our engagement .
                      </p>
                      <div className="pl20 pt20 pr20 pb20 bgLightOrange radius">
                        <div className="d-flex justify-content-between">
                          <h3 className="fs16 colorBlack">Your Response</h3>
                          <span className="fs14 colorPara mb5">
                            24 July,2020
                          </span>
                        </div>
                        <p className="fs16 mb0">
                          Great experience . Took 2 months for house plans and 4
                          months to construct . Currently living in our new home
                          and we are very happy with the service received.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="pb15 mb20">
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className="d-flex">
                        <div>
                          <img
                            src={Img.busPro.default}
                            alt=""
                            className="w48 radius100 mr15"
                          />
                        </div>
                        <div className="mb5">
                          <p className="fs16 colorBlack mb4">
                            Kimberly S. 083 ****156
                          </p>
                          <div className="red-rating-div">
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="staryellow mr5">
                              {Svg.fillStar}
                            </span>
                            <span className="mr15">{Svg.greyStar}</span>
                            <span className="fs16 colorGreen mr5">Good</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="fs14 colorPara mb5">24 July,2020</span>
                      </div>
                    </div>
                    <div className="ml63 mobMl0">
                      <p className="fs16 ">
                        Great experience. Took 2 months for house plans and 4
                        months to construct . Currently living in our new home
                        and we are very happy with the service recieved during
                        our engagement .
                      </p>
                      <CmnTextarea
                        className="heightVh20 colorPara"
                        placeholder="Your Response"
                        onChange={(e) => {}}
                      />
                      <CmnButton type="square" text="Send" className="" />
                    </div>
                  </section>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ReviewsAndRatings;

import React from 'react';
import { Container } from 'reactstrap';
import Img from '../../../Assets/Img/Img';
import Slider from "react-slick";

var SuccessStoriesSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    lazyLoad: true,
    centerMode: false,
    className: "react__slick__slider__parent_1",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 10,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

const Testimonials = () => {
    return (
        <section className="pt60 pb60 mobPt50 mobPb50">
        <Container>
          <div className="text-center">
            <p className="fs16">What customers are saying</p>
            <h1 className="fs32 fBold colorBlack mb30">Our Success Stories</h1>
          </div>
          <Slider {...SuccessStoriesSlider}>
            <div>
              <div className="bgLightOrange pt25 pr20 pb20 pl30 radius success-story-slider slider_box mb15">
                {/* <div></div> */}
                <p className="fs14 colorBlack">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
                <div className="d-flex">
                  <div className="mr20">
                    <img src={Img.client.default} alt="" />
                  </div>
                  <div>
                    <h3 className="fs18 colorBlack">Betty Cooker</h3>
                    <p className="fs13">Business Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bgLightOrange pt25 pr20 pb20 pl30  radius success-story-slider slider_box mb15">
                <p className="fs14 colorBlack">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
                <div className="d-flex">
                  <div className="mr20">
                    <img src={Img.client.default} alt="" />
                  </div>
                  <div>
                    <h3 className="fs18 colorBlack">Betty Cooker</h3>
                    <p className="fs13">Business Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bgLightOrange pt25 pr20 pb20 pl30  radius success-story-slider slider_box mb15">
                <p className="fs14 colorBlack">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
                <div className="d-flex">
                  <div className="mr20">
                    <img src={Img.client.default} alt="" />
                  </div>
                  <div>
                    <h3 className="fs18 colorBlack">Betty Cooker</h3>
                    <p className="fs13">Business Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bgLightOrange pt25 pr20 pb20 pl30  radius success-story-slider slider_box mb15">
                <p className="fs14 colorBlack">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
                <div className="d-flex">
                  <div className="mr20">
                    <img src={Img.client.default} alt="" />
                  </div>
                  <div>
                    <h3 className="fs18 colorBlack">Betty Cooker</h3>
                    <p className="fs13">Business Consultant</p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </Container>
      </section>

    );
};

export default Testimonials;
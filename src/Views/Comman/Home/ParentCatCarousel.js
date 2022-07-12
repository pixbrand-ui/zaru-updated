import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import Slider from "react-slick";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { Link } from "react-router-dom";

var SliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  lazyLoad: true,
  centerMode: false,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
  className: "react__slick__slider__parent",
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 10,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
      },
    },
  ],
};

const ParentCatCarousel = (props) => {
  const [parentcat, setparentcat] = useState([]);
  const [latlong, setlatlong] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        if (val) {
          setlatlong({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude,
          });
        }
      });
    }
    loadParentCat();
    //console.log("onloadd par",parentcat)
  }, []);

  const loadParentCat = async () => {
    try {
      await HTTP.get(API.get_categories, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          if (res.data.length > 0) {
            setparentcat(res.data);
          }
        }
      });
    } catch (e) {}
  };
  return (
    <>
      <style jsx="true">
        {`
          .parentCatCarousel img {
            height: 140px;
            object-fit: cover;
            border-radius: 4px;
          }
        `}
      </style>
      <section className="position-relative">
        <div className="home-slider">
          <Container>
            <div className="bgWhite radius pt30 pb30 pl30 pr30 shadow">
              <h3 className="fs24 fBold colorBlack text-center mb30">
                Explore the market place
              </h3>
              <Slider {...SliderSettings}>
                {parentcat.map((elem, ind) => (
                  <Link
                    key={ind}
                    to={{
                      pathname: `/providers/cc/${elem._id}`,
                      state: { latlong: latlong },
                    }}
                  >
                    <div>
                      <div className="wrapperImg parentCatCarousel">
                        <div>
                          <img
                            src={`${API.imageurl}${elem.category_image}`}
                            alt={elem.category_name}
                            crossOrigin="anonymous"
                            className="w-100"
                          />
                        </div>
                        <p className="fs14 colorBlack text-center">
                          {elem.category_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default ParentCatCarousel;

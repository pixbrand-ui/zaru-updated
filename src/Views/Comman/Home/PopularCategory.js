import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";

const PopularCategory = () => {
  const [popularcat, setpopularcat] = useState([]);
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
    loadPopCat();
  }, []);


  const loadPopCat = async () => {
    try {
      await HTTP.get(API.get_categories, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          if (res.data.length > 0) {
            setpopularcat(res.data);
          }
        }
      });
    } catch (e) {}
  };
  return (
    <section className="bgLightOrange pt100 pb100 mobPt50 mobPb50">
      <Container>
        <div className="text-center mb30">
          <h1 className="fs32 fBold mb20 home_ta_left">Popular Categories</h1>
          <p className="fs16 width50 mx-auto bts-para mb60">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The
          </p>
        </div>
        <Row>
          {popularcat.map((elem, ind) => {
            return (
              <Col key={ind} lg={3} xs={6} md={3} className="fs14 ">
                <div className="mb15">
                  <Link
                    to={{
                      pathname: `/providers/cc/${elem._id}`,
                      state: { latlong: latlong },
                    }}
                    className="colorBlack hov_undln text-capitalize"
                  >
                    {elem.category_name}
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default PopularCategory;

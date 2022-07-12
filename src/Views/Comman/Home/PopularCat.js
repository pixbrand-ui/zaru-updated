import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";

const PopularCat = () => {
  const [loadsubcat, setloadsubcat] = useState([]);
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
    loadSubCat();
  }, []);

  //console.log(loadsubcat);

  const loadSubCat = async () => {
    try {
      await HTTP.get(API.get_subcategory, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status === 200) {
            if (res.data.length > 0) {
              setloadsubcat(res.data);
            }
          }
        }
      );
    } catch (e) {}
  };
  return (
    <>
      <style jsx="true">
        {`
          .imgSize {
            height: 200px;
            -webkit-object-fit: cover;
            object-fit: cover;
          }
        `}
      </style>

      <section className="mb100 mt220 mb_mt0">
        <Container>
          <h1 className="fs32 fBold mt60 mb20">Browse popular categories</h1>
          <Row>
            {loadsubcat.splice(0, 8).map((el, ind) => {
              return (
                <Col key={ind} lg={3} xs={6} md={4}>
                  <Link
                    to={{
                      pathname: `/providers/sc/${el._id}`,
                      state: { latlong: latlong },
                    }}
                  >
                    <div>
                      <div className="mb10">
                        <img
                          src={`${API.imageurl}${el.subcategory_image}`}
                          alt= {el.subcategory_name}
                          className="w-100 radius imgSize"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <p className="fs16 mb20 colorBlack text-capitalize ">
                        {el.subcategory_name}
                      </p>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PopularCat;

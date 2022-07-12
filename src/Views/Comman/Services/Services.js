import React from "react";
import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { useState } from "react";

const Services = () => {
  const [service, setservice] = useState([]);
  useEffect(() => {
    loadData().then((res) => {
      setservice(res);
    });
  }, []);

  const loadData = async () => {
    let temp = "";
    try {
      await HTTP.get(API.subcategorygroup, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            return (temp = res.data);
          }
        }
      );
    } catch (e) {}
    return temp;
  };

  return (
    <>
      <section className="pt60 pb80 bgLightOrange">
        <Container>
          {service.map((obj, ind) => {
            return (
              <section className="mb30">
                <h2 className="fs20 fBold colorBlack"> <Link to={"/tasker-listing/"+obj.id} className="colorBlack">{obj.category_name}</Link> </h2>
                {
                  obj.subcategory.length > 0 &&
                  <div className="pt20 pl30 pr30 bgWhite radius">
                  <Row>
                    {obj.subcategory.map((obj, ind) => {
                      return (
                        <Col lg={3} className="mb20">
                          <div className="mb5">
                            <Link to={"/tasker-listing/"+obj.categoryid} className="fs16 colorPara">
                              {obj.subcategory_name}
                            </Link>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                }
              
              </section>
            );
          })}
        </Container>
      </section>
    </>
  );
};

export default Services;

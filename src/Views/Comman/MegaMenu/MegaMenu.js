import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import CmnMegaMenu from "../../../Components/CmnMegaMenu/CmnMegaMenu";
import "./MegaMenu.scss";

const MegaMenu = () => {
  var megamenuitems = useSelector((state) => state.UpdateMegaMenuData);
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
  }, []);

  const onLinkClick = (e) => {
    CmnMegaMenu.hide();
  };

  return (
    <section>
      {
        console.log(megamenuitems)
      }
      <Container className="mt30">
        <div className="masonry">
          {megamenuitems !== null &&
          
            megamenuitems.length > 0 &&
            megamenuitems.map((element, index) => {
              if (element.subcategory.length >= 0) {
                return (
                  <div className="masonry-item" key={index}>
                    <Link
                      onClick={onLinkClick}
                      to={{
                        pathname: `/providers/cc/${element._id}`,
                        state: { latlong: latlong },
                      }}
                      className="colorBlack"
                    >
                      <h6 className="fs16">{element.category_name}</h6>
                    </Link>
                    {element.subcategory.length > 0 &&
                      element.subcategory.map((ele, ind) => {
                        return (
                          <Link
                            onClick={onLinkClick}
                            to={{
                              pathname: `/providers/sc/${ele._id}`,
                              state: { latlong: latlong },
                            }}
                            className="colorPara"
                          >
                            <div className="fs16">{ele.subcategory_name}</div>
                          </Link>
                        );
                      })}
                  </div>
                );
              } else {
                return <React.Fragment key={index}></React.Fragment>;
              }
            })}
        </div>
      </Container>
    </section>
  );
};

export default MegaMenu;

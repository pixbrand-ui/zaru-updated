import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {Svg} from "../../../Assets/Svgs/Svg";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import ConfirmModal from "../../../Components/ConfirmModal/ConfirmModal";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import "./BusinessAside.scss";

const BusinessAside = () => {
  const [gotoPage, setgotoPage] = useState("");
  const openModal = () => {
    AlertModal02.show(
      <ConfirmModal />,
      "",
      () => {
        GLocalStorage.Remove("c-bref");
        setgotoPage("provider/business-profile");
      },
      "sm",
      "Sure"
    );
  };

  return (
    <>
      {gotoPage === "provider/business-profile" && (
        <Redirect to="/provider/business-profile" />
      )}
      <aside className="sticky mb30">
        <div className="mb25">
          <CmnButton type="noBg" icon={Svg.cross} onClick={() => openModal()} />
        </div>
        <h3 className="fs20 fBold mb30">Setup Business Profile</h3>

        <div className="noUl taskAside position-relative pl30">
          <NavLink
            to="/business/business-info"
            className="pb15 position-relative colorPara fs18 d-block pointer_none"
            activeclassname="active "
          >
            Info
          </NavLink>

          <NavLink
            to="/business/services-and-documents"
            className="pb15 position-relative colorPara fs18 d-block pointer_none"
            activeclassname="active"
          >
            Services
          </NavLink>

          <NavLink
            to="/business/business-media"
            className="pb15 position-relative colorPara fs18 d-block pointer_none"
            activeclassname="active"
          >
            Media
          </NavLink>

          <NavLink
            to="/business/business-location"
            className="pb15 position-relative colorPara fs18 d-block pointer_none"
            activeclassname="active"
          >
            Location
          </NavLink>

          <NavLink
            to="/business/business-reviews"
            className="pb15 position-relative colorPara fs18 d-block pointer_none"
            activeclassname="active"
          >
            Reviews
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default BusinessAside;

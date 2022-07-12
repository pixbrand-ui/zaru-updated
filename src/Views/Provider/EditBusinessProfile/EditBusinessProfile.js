import React, { useEffect } from "react";
import $ from "jquery";
import "./customTabs.css";
import { useState } from "react";
import EditNewBusinessProfile from "../NewBusinessProfile/EditNewBusinessProfile";
import { Svg } from "../../../Assets/Svgs/Svg";
import { useHistory } from "react-router-dom";
import EditServicesAndDocuments from "../ServicesAndDocuments/EditServicesAndDocuments";
import EditBusinessMedia from "../BusinessMedia/EditBusinessMedia";
import EditBusinessLocation from "../BusinessLocation/EditBusinessLocation";

export default function EditBusinessProfile() {
  const [selectedTab, setSelectedTab] = useState(null);
  const history = useHistory();
  

  useEffect(() => {
    setSelectedTab(0);
  }, []);


  return (
    <div className="wrapper">
      <div className="container">
        <div className="custom_tabs">
          <ul>
            <span
              onClick={(e) => {
                history.goBack();
              }}
              style={{ cursor: "pointer", marginRight: "8px" }}
            >
              {Svg.backArrowSmall}
            </span>
            <li className={`${selectedTab===0 && "custom_tab_active"}`} onClick={()=>{setSelectedTab(0)}}>
              Info
            </li>
            <li className={`${selectedTab===1 && "custom_tab_active"}`} onClick={()=>{setSelectedTab(1)}}>
              Services & Docs
            </li>
            <li className={`${selectedTab===2 && "custom_tab_active"}`} onClick={()=>{setSelectedTab(2)}}>
              Media
            </li>
            <li className={`${selectedTab===3 && "custom_tab_active"}`} onClick={()=>{setSelectedTab(3)}}>
              Location
            </li>
          </ul>
        </div>
        <div className="custom_tabdata">
          {selectedTab === 0 && <EditNewBusinessProfile />}
          {selectedTab === 1 && <EditServicesAndDocuments />}
          {selectedTab === 2 && <EditBusinessMedia />}
          {selectedTab === 3 && <EditBusinessLocation />}
        </div>
      </div>
    </div>
  );
}

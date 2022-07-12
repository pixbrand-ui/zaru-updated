import React from "react";
import { NavLink } from "react-router-dom";
import "./CustomerAccountAside.scss";

const CustomerAccountAside = () => {
  return (
    <>
      <aside className="sticky mb30 bgWhite pt30 pb20">
        <div className="noUl taskAside position-relative pl30 pr30">
          <NavLink
            to="/customer/update-account-profile"
            className="pb15 position-relative colorPara fs18 d-block"
            activeclassname="active "
          >
            Account Profile
          </NavLink>

          <NavLink
            to="/customer/update-billing-details"
            className="pb15 position-relative colorPara fs18 d-block"
            activeclassname="active"
          >
            Billing Details
          </NavLink>

          <NavLink
            to="/customer/change-password"
            className="pb15 position-relative colorPara fs18 d-block bBottom mb15"
            activeclassname="active"
          >
            Change Password
          </NavLink>

          <NavLink
            to="/customer/favourite-providers"
            className="pb15 position-relative colorPara fs18 d-block bBottom mb15"
            activeclassname="active"
          >
            Favourite Providers
          </NavLink>

          <NavLink
            to="/customer/notifications"
            className="pb15 position-relative colorPara fs18 d-block bBottom mb15"
            activeclassname="active"
          >
            Notifications
          </NavLink>
          <NavLink
            to="/customer/referral-bonus"
            className="pb15 position-relative colorPara fs18 d-block bBottom mb15"
            activeclassname="active"
          >
            Referral Bonus
          </NavLink>
          <NavLink
            to="/customer/support"
            className="pb15 position-relative colorPara fs18 d-block"
            activeclassname="active"
          >
            Support
          </NavLink>

          <NavLink
            to="/logout"
            className="pb15 position-relative colorPara fs18 d-block"
            activeclassname="active"
          >
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default CustomerAccountAside;

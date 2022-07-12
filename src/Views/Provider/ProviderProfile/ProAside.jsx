import React from "react";
import { Link } from "react-router-dom";

const ProAside = () => {
  return (
    <section className="bgWhite radius accountAsideList">
      <ul className="noUl pt30 pb30 mb0 pl33 pr33">
        <li className="mb15 active position-relative">
          <Link
            to="/provider/business-profile"
            className="colorPara hoverColorOrange f17"
          >
            Business Profile
          </Link>
        </li>
        <li className="mb15 position-relative">
          <Link
            to="/provider/account-profile"
            className="colorPara hoverColorOrange f17"
          >
            Account Profile
          </Link>
        </li>
        <li className="mb15 position-relative">
          <Link
            to="/provider/billing-details"
            className="colorPara hoverColorOrange f17"
          >
            Billing Details
          </Link>
        </li>
        <li className="mb15 seperator mt15 mb15 pb15 position-relative">
          <Link
            to="/provider/change-password"
            className="colorPara hoverColorOrange f17"
          >
            Change Password
          </Link>
        </li>

        <li className="seperator mt15 mb15 pb15 position-relative">
          <Link to="/provider/reviews-ratings" className="colorPara hoverColorOrange f17">
            Review & Ratings
          </Link>
        </li>

        <li className="pb15 position-relative">
          <Link to="/business/buy-credit" className="colorPara hoverColorOrange f17">
            Buy Credits
          </Link>
        </li>
        <li className="mb15 mb15 pb15  seperator position-relative">
          <Link to="/provider/transaction-history" className="colorPara hoverColorOrange f17">
            Transaction History
          </Link>
        </li>
        <li className="mb15 seperator mt15 mb15 pb15 position-relative">
          <Link to="/provider/notifications" className="colorPara hoverColorOrange f17">
            Notifications
          </Link>
        </li>

        <li className="mb15 seperator mt15 mb15 pb15 position-relative">
          <Link to="#" className="colorPara hoverColorOrange f17">
            Referral Bonus
          </Link>
        </li>
        <li className="mb15 position-relative">
          <Link
            to="/provider/support"
            className="colorPara hoverColorOrange f17"
          >
            Support
          </Link>
        </li>
        <li className="mb15 position-relative">
          <Link to="#" className="colorPara hoverColorOrange f17">
            Logout
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ProAside;

import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { func } from "../Admin";
import { Redirect, useHistory } from "react-router-dom";
import { Badge } from "@mui/material";
import { Logout, Notifications } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

export default function AdminHeader(props) {
  const history = useHistory();
  const [logout, setlogout] = useState(false);
  const Loggedout = () => {
    setlogout(true);
    //history.push("logout");
  };
  return (
    <>
      {logout && <Redirect to="/logout" />}
      <div className="admin-header">
        <div className="admin-header-logo-area">
          <div className="admin-bars">
            <button
              id="admin-bars-button"
              onClick={(e) => func.togglemenu()}
              className="admin-nobutton  "
            >
              <Icon.List color={"#fff"} />
            </button>
          </div>
          <div className="admin-logo">
            <span>{props.logo}</span>
          </div>
        </div>

        <div>
          <Tooltip title="Notifications">
            <button className="transparent-button">
              <Badge badgeContent={4} color="warning">
                <Notifications className="color-halfwhite" />
              </Badge>
            </button>
          </Tooltip>
          <Tooltip title="Logout">
            <button className="transparent-button" onClick={Loggedout}>
              <Logout className="color-halfwhite" />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

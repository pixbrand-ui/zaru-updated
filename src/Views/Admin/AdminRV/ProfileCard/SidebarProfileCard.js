import React from "react";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

export default function SideBarProfileCard(
  title = "User Name",
  subtitle = "user@admin.com",
  imageSrc
) {
  return (
    <>
      <div className="admin-sidebar-profile">
        <div className="profilePic">
          <img
            src={imageSrc ? imageSrc : "https://i.stack.imgur.com/34AD2.jpg"}
            alt=""
          />
        </div>
        <div className="profileInfo">
          <label>{title}</label>
          <label>{subtitle}</label>
        </div>
        <div className="profileIcon">
          <Tooltip title="Logout">
            <button className="transparent-button">
              <Logout className="color-halfwhite" />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

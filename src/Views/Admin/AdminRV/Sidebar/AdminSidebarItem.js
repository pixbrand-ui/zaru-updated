import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { func } from "../Admin";

export default function Item({
  id,
  title,
  icon = <Icon.Record />,
  to = "/",
  isnested = false,
  itemsfor = null,
  screenWidth = 0,
}) {
  return (
    <div
      id={id}
      data-itemsfor={itemsfor ? itemsfor : id}
      className={isnested ? "admin-sidebar-item-nested" : "admin-sidebar-item"}
      onClick={(e) => {
        func.togglesubitems(e);
        to !== "#" && screenWidth < 991 && func.togglemenu();
      }}
    >
      {icon}
      <Link to={to}>{title}</Link>
    </div>
  );
}

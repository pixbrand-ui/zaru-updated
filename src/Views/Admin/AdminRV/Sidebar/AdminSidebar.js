import React, { useEffect, useState } from "react";
import * as $ from "jquery";

import "./AdminSidebar.css";
import Item from "./AdminSidebarItem";

export default function AdminSidebar({ Items, profileCard, ...rest }) {
  const [showsidebar, setShowsidebar] = useState(false);
  let width = $(window).width();
  useEffect(() => {
    if (width > 991) {
      setShowsidebar(true);
    }
  }, [width]);
  return (
    <div
      data-id={showsidebar ? "sidebar-open" : "sidebar-close"}
      className="admin-sidebar"
    >
      <div className="sidebar-container">
        {profileCard ? profileCard : <></>}
        <div className="admin-sidebar-item_container">
          {Items ? (
            Items.length > 0 &&
            Items.map((i, ind) => {
              return (
                <Item
                  key={ind}
                  id={i.id}
                  icon={i.icon}
                  title={i.title}
                  to={i.to}
                  isnested={i.isnested}
                  itemsfor={i.itemsfor}
                  screenWidth={rest.screenWidth}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

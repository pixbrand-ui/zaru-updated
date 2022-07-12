import * as $ from "jquery";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import "./AdminResponsive.css";
import AdminHeader from "./Header/AdminHeader";
import AdminSidebar from "./Sidebar/AdminSidebar";

var width = $(window).width();
if (width <= 991) {
  $(".admin-sidebar").attr("data-id", "sidebar-close");
  $(".admin-body-container").attr("data-id", "c-sidebar-close");
} else {
  $(".admin-sidebar").attr("data-id", "sidebar-open");
  $(".admin-body-container").attr("data-id", "c-sidebar-open");
}

$(window).on("resize", function () {
  var width = $(window).width();
  if (width <= 991) {
    $(".admin-sidebar").attr("data-id", "sidebar-close");
    $(".admin-body-container").attr("data-id", "c-sidebar-close");
  } else {
    $(".admin-sidebar").attr("data-id", "sidebar-open");
    $(".admin-body-container").attr("data-id", "c-sidebar-open");
  }
});

export let func = {
  togglemenu: () => {
    let rootElement = $(".admin-sidebar").attr("data-id");
    if (rootElement == null || rootElement === "sidebar-close") {
      $(".admin-sidebar").attr("data-id", "sidebar-open");
      $(".admin-body-container").attr("data-id", "c-sidebar-open");
    } else {
      $(".admin-sidebar").attr("data-id", "sidebar-close");
      $(".admin-body-container").attr("data-id", "c-sidebar-close");
    }
  },
  togglesubitems: (e) => {
    let id = $(e.target.parentElement).attr("id");
    let cc = $(`[data-itemsfor='${id}'].admin-sidebar-item-nested`).get();
    cc.forEach((element) => {
      element.classList.toggle("admin-slidbar-nested-show");
    });
  },
};

export default function Admin({ Items, profileCard, ...rest }) {
  const [showsidebar, setShowsidebar] = useState(false);
  let width = $(window).width();
  $(window).on("resize", function () {
    width = $(window).width();
  });
  useEffect(() => {
    if (width > 991) {
      setShowsidebar(true);
    }
  }, [width]);
  return (
    <div className="admin-wrapper">
      <AdminHeader logo={rest.logo} />
      <div
        data-id={showsidebar ? "c-sidebar-open" : "c-sidebar-close"}
        className="admin-body-container"
      >
        <AdminSidebar
          profileCard={profileCard}
          Items={Items}
          screenWidth={width}
        />
        <div className="admin-body">{rest.children}</div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useLocation, Redirect, useHistory } from "react-router-dom";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal02 from "../../../../Components/AlertModal02/AlertModal02";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import ConfirmModal from "../../../../Components/ConfirmModal/ConfirmModal";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import "./TaskAside.scss";

const TaskAside = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [gotoPage, setgotoPage] = useState("");

  const removeLSData = () => {
    GLocalStorage.Remove("ansSet");
    GLocalStorage.Remove("c-task-category");
    GLocalStorage.Remove("c-task-subcategory");
    GLocalStorage.Remove("c-task-describe");
    GLocalStorage.Remove("c-task-location");
    GLocalStorage.Remove("c-task-minmax");
    GLocalStorage.Remove("c-task-startdate");
    GLocalStorage.Remove("c-task-enddate");
    GLocalStorage.Remove("c-task-timetable");
    GLocalStorage.Remove("task-pending");
    GLocalStorage.Remove("c-task-images");
    GLocalStorage.Remove("c-task-ansset");
    GLocalStorage.Remove("c-task-tp");
  };
  const openModal = () => {
    AlertModal02.show(
      <ConfirmModal />,
      "",
      () => {
        removeLSData();
        var val = GLocalStorage.IsExists("zaaruuworkbench");
        var authdata = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
        if (val) {
          if (authdata[0].role === "Customer") {
            history.push("/customer/dashboard");
          } else if (authdata[0].role === "Provider") {
            history.push("/provider/dashboard");
          }
        } else {
          history.push("/");
        }
      },
      "sm",
      "Sure"
    );
  };
  return (
    <aside className="sticky mb30">
      {gotoPage === "customer/dashboard" && (
        <Redirect to="/customer/dashboard" />
      )}
      <div className="mb25">
        <CmnButton type="noBg" icon={Svg.cross} onClick={() => openModal()} />
      </div>
      <h3 className="fs20 fBold mb30">Fill Task Details</h3>

      <ul className="noUl taskAside position-relative pl30">
        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/task-details" && "active"
          }`}
        >
          {/* /tasks/task-details */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/task-details"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Task Detail
          </Link>
        </li>

        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/task-description" && "active"
          }`}
        >
          {/* /tasks/task-description */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/task-description"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Description
          </Link>
        </li>

        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/task-location" && "active"
          }`}
        >
          {/* /tasks/task-location */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/task-location"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Location
          </Link>
        </li>

        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/budget" && "active"
          }`}
        >
          {/* /tasks/budget */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/budget"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Budget
          </Link>
        </li>
        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/task-date-time" && "active"
          }`}
        >
          {/* /tasks/task-date-time */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/task-date-time"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Date & Time
          </Link>
        </li>
        <li
          className={`pb15 position-relative ${
            location.pathname === "/tasks/image-upload" && "active"
          }`}
        >
          {/* /tasks/image-upload */}
          <Link
            to="#"
            className={`colorPara fs18 ${
              location.pathname === "/tasks/image-upload"
                ? "active_sidebar"
                : "pointer_none"
            }`}
          >
            Upload Images
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default TaskAside;

import React from "react";

export default function LoadinMsg({
  message = "",
  type = "spinner",
  size = null,
  ...rest
}) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {type === "spinner" && (
        <div
          className={`spinner-border loadingmodal_color_spinner ${
            size && size === "small" && "spinner-border-sm"
          }`}
          role="status"
        ></div>
      )}
      {type === "grow" && (
        <div
          className={`spinner-grow loadingmodal_color_spinner ${
            size && size === "small" && "spinner-grow-sm"
          }`}
          role="status"
        ></div>
      )}
      {message && (
        <div style={{ color: "#7E7474" }} className="p-3 text-center">
          {message}
        </div>
      )}
    </div>
  );
}

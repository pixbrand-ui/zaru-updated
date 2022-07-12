/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import "./CmnProgressbar.css";

export default function CmnProgressbar({ label, progressPercentage = 0 }) {
  let progressTextClass = "cmn_progresstext cmnprogressbar_colorblack";
  if (progressPercentage > 0) {
    progressTextClass = "cmn_progresstext";
  }
  useEffect(() => {
    if (progressPercentage > 0) {
      progressTextClass = "cmn_progresstext";
    }
  }, [progressPercentage]);
  return (
    <div className="cmnprogressbar_container">
      <div className="cmn_label mb2">{label}</div>
      <div className="cmn_progress">
        <div
          className={`cmn_progressstatus ${
            progressPercentage >= 100 && "cmnprogressbar_bggreen"
          }`}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className={progressTextClass}>{progressPercentage} %</span>
        </div>
      </div>
    </div>
  );
}

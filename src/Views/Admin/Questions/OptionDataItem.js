import {  DeleteOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import "./Questions.css";

export default function OptionDataItem(props) {
  return (
    <div className="option-data-item-cont">
      <div className="option-data-delete-text">{props.value}</div>
      <Tooltip title="Delete this item.">
        <button onClick={(e) => props.onDeleteClick(props.value)} className="option-data-delete-button">
          <DeleteOutline color="red" />
        </button>
      </Tooltip>
    </div>
  );
}

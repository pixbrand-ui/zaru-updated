import React from "react";
import FormModal from "../../../Components/FormModal/FormModal";

export default function IncompleteTaskMsg(props) {
  return (
    <div className="d-flex flex-column justify-content-center text-center w-100 p-3">
        <p className="fs16">You recently created a task, which is un-published. Do you want to publish it? </p>
        <div className="d-flex flex-row justify-content-center">
            <button onClick={e => {props.callback(); FormModal.hide();}} className="btnTheme">Publish Task</button>
        </div>
    </div>
  );
}

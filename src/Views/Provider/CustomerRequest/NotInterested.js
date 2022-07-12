import React, { useState } from "react";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import FormModal from "../../../Components/FormModal/FormModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";

const NotInterested = (props) => {
  const { taskid } = props;
  const [msg, setmsg] = useState("");
  const [success, setsuccess] = useState(false);

  
  const onSubmit = () => {
    const iData = {
      taskid: taskid,
      cancelInfo: msg,
    };
    try {
        if(msg.trim()==="" || msg.trim()===null){
            return AlertModal.show("Please fill message box","Oops!",()=>{},"sm");
        }
      HTTP.post(API.declinetask, iData, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            setsuccess(true);
            setmsg("");
            setTimeout(FormModal.hide(), 5000);
          }
        }
      );
    } catch (e) {
      console.log(e, "Error in the Not interested.js file");
    }
  };
  return (
    <div className="pt20 pb20 pl15 pr15">
      <CmnTextarea
        label="Please send us Reason"
        onChange={(e) => setmsg(e.target.value)}
        placeholder="Your Message..."
      />

      <CmnButton type="square" text="Submit" onClick={onSubmit} />
      {success && (
        <div className="alert alert-success mt20" role="alert">
          Your request has been sent.
        </div>
      )}
    </div>
  );
};

export default NotInterested;

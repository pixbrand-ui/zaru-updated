import React from "react";
import { useState } from "react";
import { Svg } from "../../Assets/Svgs/Svg";
import GButton from "../GComponents/GButton";
import GTextarea from "../GComponents/GTextarea";
import TimeAgo from 'react-timeago'; 
import API from "../../Helpers/Constants/Constants";
import { responseReviews } from '../../Helpers/Backend/providerhelper'
const CmnReviews = (props) => {
  const { data , bussinessid } = props;

  return (
    <>
      <style jsx="true">
        {`
          .ml63 {
            margin-left: 63px;
          }
        `}
      </style>
      <div className="pl25 pr25 pt30 ">
        {data && data.length > 0 ? (
          data.map((elem, ind) => {
            return <ReviewList key={ind} data={elem} bussinessid ={bussinessid} />;
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center heightvh100 w-100">
            <p className="text-center">There is no any reviews yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CmnReviews;

const ReviewList = (props) => {
  
  const { data, bussinessid } = props;
  const [showRespond, setshowRespond] = useState(false);
  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [toggleReplyInput, setToggleReplyInput] = useState(false);
  const sendReply = () => {
    var iData = { bussinessid : bussinessid, reviewid : data._id , response : replyMessage}
    responseReviews(iData).then((result) => {

    })
    .catch((err) => {

    });
    setShowReplyMessage(!showReplyMessage);
    setToggleReplyInput(true);
  };
  return (
    <section className="dotted_border pb15 mb20">
      <div className="d-flex flex-wrap justify-content-between">
        <div className="d-flex">
          <div>
            <img
              src={API.imageurl+data.userid.profileimage}
              alt=""
              className="w48 radius100 mr15"
            />
          </div>
          <div className="mb5">
            <p className="fs16 colorBlack mb4">
              {data.userid.firstname + " " + data.userid.lastname}
            </p>
            <div>
              <span className="mr3">{data.rating}</span>
              <span className="staryellow mr5">{Svg.fillStar}</span>
              {data.rating === 5 && (
                <span className="fs16 colorGreen mr5">Excellent</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <span className="fs14 colorPara mb5">
            <TimeAgo datetime={data.createdAt} />
          </span>
        </div>
      </div>
      <div className="ml63 mobMl0">
        <p className="fs16 mb5 ">{data.review}</p>
        {toggleReplyInput ? (
          ""
        ) : (
          <p
            className="fs14 colorOrange mb7 d-inline pointer"
            onClick={() => setshowRespond(!showRespond)}
          >
            <span className="mr10">{Svg.orange_leftarrow}</span>
            {showRespond === false ? "Respond" : "Cancel"}
          </p>
        )}

        {showReplyMessage && (
          <div className="pl20 pt20 pr20 pb20 bgLightOrange radius mt10">
            <div className="d-flex justify-content-between">
              <h3 className="fs16 colorBlack">Your Response</h3>
              <span className="fs14 colorPara mb5">24 July,2020</span>
            </div>
            <p className="fs16 mb0">{replyMessage}</p>
          </div>
        )}

        {showRespond &&
          (toggleReplyInput ? (
            ""
          ) : (
            <>
              <div>
                <div className="mb10 mt10">
                  <GTextarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Reply..."
                  />
                </div>
                <div className="d-flex">
                  <GButton
                    backgroundColor="#fd7e14"
                    hoverColor="#222"
                    onClick={() => sendReply()}
                  >
                    Send
                  </GButton>
                </div>
              </div>
            </>
          ))}
      </div>
    </section>
  );
};

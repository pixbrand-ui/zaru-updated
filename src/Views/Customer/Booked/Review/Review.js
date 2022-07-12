import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Img from "../../../../Assets/Img/Img";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import AlertModal02 from "../../../../Components/AlertModal02/AlertModal02";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CmnRadio from "../../../../Components/CmnRadio/CmnRadio";
import CmnTextarea from "../../../../Components/CmnTextarea/CmnTextarea";
import FormModal from "../../../../Components/FormModal/FormModal";
import HTTP from "../../../../Helpers/Api/Api";
import Auth from "../../../../Helpers/Auth/Auth";
import API from "../../../../Helpers/Constants/Constants";
import "./Review.scss";

const BookedReview = (props) => {
  const [reviewInput, setreviewInput] = useState("");
  const [inputLength, setinputLength] = useState("");
  const [type, setType] = useState("");
  const [success, setsuccess] = useState(false);

  const [dataState, setdataState] = useState({
    rating: 0,
    review: "",
    businessid: props.providerID._id,
    taskid: props.taskID
  });
  const inputHandle = (e) => {
    setreviewInput(e.target.value);
    setinputLength(e.target.value.length);
  };
  useEffect(() => {}, [props.businessID]);

  const clearState = () => {
    setdataState({
      ...dataState,
      rating: "",
      review: "",
      businessid: "",
      type: type,
    });
  };

  const saveData = () => {
    try {
      if (type === null || type === "") {
        return AlertModal02.show("Please select status", "Oops!");
      }
      if (dataState.rating <= 0) {
        return AlertModal02.show("Please give star ratings", "Oops!");
      }
      if (dataState.review === null || dataState.review === "") {
        return AlertModal02.show("Please fill input field", "Oops!");
      }

      HTTP.post(API.writeTaskReview, dataState, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            setTimeout(function () {
              AlertModal.hide();
            }, 2000);
            setsuccess(true);
            clearState();
          }
        }
      );
    } catch (e) {}
  };
  return (
    <>
      <div className="radius bgWhite mobWidth100">
        <div className="text-end">
          <span>{Svg.close}</span>
        </div>
        <div className="pb40 pl40 pr40">
          <div className="text-center">
            <h3 className="fs20 fBold mb30">Choose Task Status</h3>
            <div className="d-flex justify-content-center bBottom pb30">
              <CmnRadio
                onChange={(e) => setType("Completed")}
                parentclassName="mr20"
                value={type}
                id="completed"
                name="reviewStatus"
                label="Completed"
              />
              <CmnRadio
                onChange={(e) => setType("Incompleted")}
                id="incompleted"
                value={type}
                name="reviewStatus"
                label="Incompleted"
              />
            </div>

            <h3 className="fs20 fBold mt20 mb30">Write a Review</h3>
            <div className="mb15">
              <img
                  src={props.providerID.logoimage ? API.imageurl+props.providerID.logoimage : Img.busPro1.default}
                alt=""
                className="radius100 w90"
              />
            </div>
            <h2 className="fs24">
            {props.providerID.bussinessname}


            </h2>
            <span className="fs16 colorPara">Overall Rating</span>
            <div className="mb20 ratings-div mt8">
              <span
                onClick={(e) =>
                  setdataState({
                    ...dataState,
                    rating: 1,
                  })
                }
                className={`${
                  dataState.rating > 0 && dataState.rating <= 5
                    ? "staryellow"
                    : "stargrey"
                }  mr5 pointer`}
              >
                {Svg.fillStar}
              </span>
              <span
                onClick={(e) =>
                  setdataState({
                    ...dataState,
                    rating: 2,
                  })
                }
                className={`${
                  dataState.rating > 1 && dataState.rating <= 5
                    ? "staryellow"
                    : "stargrey"
                }  mr5 pointer`}
              >
                {Svg.fillStar}
              </span>
              <span
                onClick={(e) =>
                  setdataState({
                    ...dataState,
                    rating: 3,
                  })
                }
                className={`${
                  dataState.rating > 2 && dataState.rating <= 5
                    ? "staryellow"
                    : "stargrey"
                }  mr5 pointer`}
              >
                {Svg.fillStar}
              </span>
              <span
                onClick={(e) =>
                  setdataState({
                    ...dataState,
                    rating: 4,
                  })
                }
                className={`${
                  dataState.rating > 3 && dataState.rating <= 5
                    ? "staryellow"
                    : "stargrey"
                }  mr5 pointer`}
              >
                {Svg.fillStar}
              </span>
              <span
                onClick={(e) =>
                  setdataState({
                    ...dataState,
                    rating: 5,
                  })
                }
                className={`${
                  dataState.rating > 4 && dataState.rating <= 5
                    ? "staryellow"
                    : "stargrey"
                }  mr5 pointer`}
              >
                {Svg.greyStar}
              </span>
            </div>

            <CmnTextarea
              className="heightVh20 colorPara"
              placeholder="Describe the service you were provided, what went well, What could have been better?"
              value={dataState.review}
              onChange={(e) =>
                setdataState({
                  ...dataState,
                  review: e.target.value,
                })
              }
              maxLength={250}
            />
          </div>
          <div className="text-end mb10">
            <span className="fs14 colorPara">
              {dataState.review.length}/250
            </span>
          </div>
          <CmnButton
            onClick={() => saveData()}
            type="square"
            text="Submit Review"
            className="w-100"
          />
          {
            success &&
            <div className="alert alert-success mt20" role="alert">
            Thankyou, Your Review has been added.
          </div>
          }
         
        </div>
      </div>
    </>
  );
};

export default BookedReview;

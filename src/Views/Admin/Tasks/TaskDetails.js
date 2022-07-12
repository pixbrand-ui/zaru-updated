import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import Moment from "react-moment";

const TaskDetails = (props) => {
  const { taskID } = props;
  const [data, setdata] = useState([]);

  useEffect(() => {
    loadData();
  }, [taskID]);
  const loadData = async () => {
    try {
      LoadingModal.show("Please wait...");
      await HTTP.get(API.adminTaskInfo + taskID, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            setdata(res.data);
            LoadingModal.hide();
          }
        }
      );
    } catch (e) {
      console.log(e, "Error in the Customer Detail page");
    }
    LoadingModal.hide();
  };
  return (
    <>
      <style jsx={true}>
        {`
          .commaSep:last-child i {
            display: none;
          }
        `}
      </style>
      <div>
        <div className="mb20 bBottom">
          <h4 className="fs22 mb15 fw700">Title</h4>
          <Row>
            <h5>{data && data.title}</h5>
            <p>{data && data.information}</p>
          </Row>
        </div>
        <div className="bBottom pb0 mb15">
          <h4 className="fs22 mb15 fw700">User Info</h4>
          <Row>
            <Col lg={2}>
              <div className="mb30">
                <h6 className="fw500 mb10">Profile Picture</h6>
                <div className="w110">
                  <img
                    className="img-fluid w-100 h-100 cover radius100"
                    src={
                      data.userid && data.userid.profileimage !== null
                        ? API.imageurl + data.userid.profileimage
                        : Img.userplace.default
                    }
                    alt=""
                  />
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb30">
                <h6 className="fw500 mb3">Name</h6>
                <p className="text-capitalize">
                  {data.userid && data.userid.fullname}
                </p>
              </div>
            </Col>

            <Col lg={3}>
              <div className="mb30">
                <h6 className="fw500 mb3">Email</h6>
                <p>{data.userid && data.userid.email}</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb30">
                <h6 className="fw500 mb3">Phone</h6>
                <p>{data.userid && data.userid.phone}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bBottom mb15">
          <Row>
            <h4 className="fs22 mb15 fw700">Location</h4>
            <Col lg={6}>
              <div className="mb30">
                <h6 className="fw500 mb3">Address</h6>
                <p className="text-capitalize">{data && data.address}</p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="bBottom mb15">
          <Row>
            <h4 className="fs22 mb15 fw700">More Details</h4>
            <Col lg={6}>
              <div className="mb30 ">
                <QueAns data={data.catqueans} />
              </div>
            </Col>
          </Row>
        </div>
        <div className="bBottom mb15">
          <BudgetTime data={data && data} />
        </div>
        <Status data={data && data} />

        {/* <Leadpurchased data={data && data}/> */}
      </div>
    </>
  );
};

export default TaskDetails;
const QueAns = (props) => {
  return (
    <ul className="ques">
      {props.data &&
        props.data.map((elem, ind) => {
          return (
            <li key={ind.toString()}>
              Que: {elem.questionSetId.qusTitle}
              <p>
                Ans:
                {elem.questionSetId.ansdata &&
                  elem.questionSetId.ansdata.map((elem1, ind) => {
                    return (
                      <span key={ind.toString()} className="commaSep mr2">
                        {elem1.data}
                        <i>,</i>
                      </span>
                    );
                  })}
              </p>
            </li>
          );
        })}
    </ul>
  );
};

const BudgetTime = (props) => {
  return (
    <div className="bBottom">
      <h4 className="fs22 mb15 fw700">Budget & Time</h4>
      <Row>
        <Col lg={4}>
          <ul>
            <li>
              <strong className="mr5">Min Budget:</strong>
              {props.data.minbudget}
            </li>
            <li>
              <strong className="mr5">Max Budget:</strong>
              {props.data.maxbudget}
            </li>
          </ul>
        </Col>

        <Col lg={4}>
          <ul>
            <li>
              <strong className="mr5">From Date:</strong>
              {props.data.fromdate}
            </li>
            <li>
              <strong className="mr5">To Date:</strong>
              {props.data.todate}
            </li>
          </ul>
        </Col>
        <Col lg={4}>
          <ul>
            <li>
              <strong className="mr5">Time slot:</strong>
              {props.data.timeslot}
            </li>
            <li>
              <strong className="mr5">Flexible Timing:</strong>
              {props.data.isflexible && "Yes"}
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const Status = (props) => {
  //console.log("statusInfo",props.data.leadpurchased[0].statusInfo)
  return (
    <div className="bBottom">
      <h4 className="fs22 mb15 fw700">Status Info</h4>
      <Row>
        <Col lg={3}>
          <ul>
            <li>
              <strong className="mr5">Status:</strong>
              {props.data.status && props.data.status}
            </li>
            <li>
              <strong className="mr5">Flexible Timing:</strong>
              {props.data.isflexible && "Yes"}
            </li>
          </ul>
        </Col>
        <Col lg={3}>
          <ul>
            <li>
              <strong className="mr5">Active:</strong>
              {props.data.active && props.data.active === true ? "Yes" : "No"}
            </li>
            <li>
              <strong className="mr5">Is Broadcast:</strong>
              {props.data.isBroadcast && props.data.isBroadcast === true
                ? "Yes"
                : "No"}
            </li>
          </ul>
        </Col>
        <Col lg={3}>
          <ul>
            <li>
              <strong className="mr5">Interest Count:</strong>
              {props.data.interestcount && props.data.interestcount}
            </li>
            <li>
              <strong className="mr5">Credit points:</strong>
              {props.data.creditpoints && props.data.creditpoints}
            </li>
          </ul>
        </Col>
        <Col lg={3}>
          <ul>
            <li>
              <strong className="mr5">Max Purchase Limit:</strong>
              {props.data.maxpurchaselimit && props.data.maxpurchaselimit}
            </li>
            <li>
              <strong className="mr5">Admin Approved:</strong>
              {props.data.creditpoints && props.data.creditpoints}
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const Leadpurchased = (props) => {
  console.log("statusInfo",props.data.leadpurchased && props.data.leadpurchased)
  return (
    <div className="bBottom">
      <h4 className="fs22 mb15 fw700">Lead Purchased</h4>
      <Row>
        <Col lg={3}>
          <ul>
            <li>
              <strong className="mr5">Bussiness Name:</strong>
              {/* {props.data.leadpurchased.businessid && props.data.leadpurchased.businessid.bussinessname} */}
            </li>
            <li>
              <strong className="mr5">Flexible Timing:</strong>
              {props.data.isflexible && "Yes"}
            </li>
          </ul>
        </Col>
   
      </Row>
    </div>
  );
};
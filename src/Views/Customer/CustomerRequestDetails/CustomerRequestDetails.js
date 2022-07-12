/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// import Img from "../../../Assets/Img/Img"
// import Svg from "../../../Assets/Img/svg/Svg"
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import "./CustomerRequestDetails.scss";
import TimeAgo from "react-timeago";
import API from "../../../Helpers/Constants/Constants";
import ConfirmModal02 from "../../../Components/ConfirmModal02/ConfirmModal02";
import { Redirect, useParams } from "react-router-dom";
import AlertModal from "../../../Components/AlertModal/AlertModal";

const CustomerRequestDetails = ({ taskId = "6204ea4eff419b39480ef39a" }) => {
  const history = useHistory();

  const [data, setData] = useState([]);
  useEffect(() => {
    loadData().then((res) => {
      setData(res.data);
    });
  }, []);

  const loadData = async () => {
    let result = "";
    try {
      const urlWithTaskId = API.taskInfo + taskId;
      await HTTP.get(urlWithTaskId, false, Auth.getToken()).then((res) => {
        if (res && res.status.toString() === "200") {
          return (result = res);
        }
      });
    } catch (e) {
      console.log(e, "Error in the CustomerRequestDetails page");
    }
    return result;
  };

  return (
    <div>
      {console.log("jsx", data.userid)}
      <section className="">
        <Container>
          <Row>
            <section className="bgWhite pt30 mobPl0 mobPr0 pb30 pl35 pr35 radius">
              <div>
                <h1 className="fs24 fBold mb20">Request for House Cleaning</h1>
                <Row>
                  <Col lg={9} className="xsOrder2">
                    <div className="d-flex mb15 align-items-end justify-content-between">
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src={Img.rectangle2548.default}
                            alt=""
                            className="pur-rd-logo mr10 radius100"
                          />
                        </div>
                        <div>
                          <p className="fs14 mb0">POSTED</p>
                          <p className="fs16 mb0 colorOrange">{data.userid.firstname + " "+ data.userid.lastname}</p>
                        </div>
                      </div>
                      <p className="fs14 mb0">13 hours ago</p>
                    </div>
                    <div className="bBottom mb15"></div>
                    <div className="d-flex mb15">
                      <div className="mr10">{Svg.rd_location}</div>
                      <div>
                        <p className="fs14 mb0">LOCATION</p>
                        <p className="fs16 mb0 colorBlack">
                          Caribbean Blvd, Cutler Bay, FL, USA
                        </p>
                      </div>
                    </div>
                    <div className="bBottom mb15"></div>
                    <div className="d-flex mb15">
                      <div className="mr10">{Svg.due_date}</div>
                      <div>
                        <p className="fs14 mb0">DUE DATE</p>
                        <p className="fs16 mb0 colorBlack">
                          April 26, 2021 Thursday | Afternoon (2pm - 6pm)
                        </p>
                      </div>
                    </div>
                    <div className="bBottom mb30"></div>
                    <div className="mb20">
                      <h3 className="fs20 fw700">Customer Details</h3>
                      <div className="d-flex mb7">
                        <span className="mr10">{Svg.clockgrey}</span>
                        <p className="fs16 colorBlack mb0">
                          Service Required by: I am Flexible
                        </p>
                      </div>
                      <div className="d-flex mb7">
                        <span className="mr10">{Svg.peopleGrey}</span>
                        <p className="fs16 colorBlack mb0">Robin R</p>
                      </div>
                      <div className="d-flex justify-content-between mb7">
                        <div className="d-flex">
                          <span className="mr10">{Svg.rd_phone}</span>
                          <p className="fs16 colorBlack mb0">0740000426</p>
                        </div>
                        {/* <span className="fs16 radius colorGreen pl15 pr15 bgGreenOpacity">Verified</span> */}
                      </div>
                      <div className="d-flex justify-content-between mb7">
                        <div className="d-flex">
                          <span className="mr10">{Svg.rd_email}</span>
                          <p className="fs16 colorBlack mb0">
                            magubokhushhua@gmail.com
                          </p>
                        </div>
                        {/* <span className="fs16 radius colorGreen pl15 pr15 bgGreenOpacity">Verified</span> */}
                      </div>
                    </div>
                    <div className="mb20">
                      <h3 className="fs20 fw700">Request Description</h3>
                      <p className="fs16">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <h3 className="fs20 fw700 mb13">More Details</h3>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        What type of cleaning do you need?
                      </p>
                      <p className="fs16 mb0 colorBlack">House Cleaning</p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        How many rooms are in your home?
                      </p>
                      <p className="fs16 mb0 colorBlack">3 Rooms</p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        How many bathrooms are in your home?
                      </p>
                      <p className="fs16 mb0 colorBlack">3 Bathrooms</p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        What kind of cleaning service would you like?
                      </p>
                      <p className="fs16 mb0 colorBlack">Standard Cleaning</p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        Are there any cats or dogs in your house?
                      </p>
                      <p className="fs16 mb0 colorBlack">
                        Yes, I have a cat or dog
                      </p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        Which additional services do you need, if any?
                        (optional)
                      </p>
                      <p className="fs16 mb0 colorBlack">No</p>
                    </div>
                    <div className="mb15">
                      <p className="fs14 mb1">
                        How often would you like your house cleaned?
                      </p>
                      <p className="fs16 mb0 colorBlack">Just Once</p>
                    </div>
                    <div className="mb30">
                      <p className="fs14 mb1">
                        Choose the status for this project.
                      </p>
                      <p className="fs16 mb0 colorBlack">Ready to hire</p>
                    </div>
                  </Col>
                  <Col lg={3} className="xsOrder1">
                    <div className="border radius pt15 pb15 mb15">
                      <p className="fs14 mb10 text-center">TASK BUDGET</p>
                      <div className="bBottom mb20"></div>
                      <h1 className="fs38 fw700 mb20 text-center">R70-R100</h1>
                      <div className="bBottom mb15"></div>
                      <div className="d-flex justify-content-center">
                        <CmnButton
                          type="square"
                          icon={Svg.briefcase}
                          text="Purchased"
                          className="fBold mobBtnSm tabMb10"
                        />
                      </div>
                    </div>
                    <div className=" text-end">
                      <p className="fs16 mb5 line-through">
                        Send Quote to Customer
                      </p>
                      <p className="fs16 colorOrange">Create Invoice</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="bBottom mb30"></div>
              <Row>
                <div className="mb20">
                  <Col lg={9}>
                    <h3 className="fs20 fw700 mb13">Purchase Details</h3>
                    <div className="d-flex justify-content-between mb7">
                      <p className="fs16 mb0">Pros Purchased</p>
                      <span className="fs16 radius colorPara bgPara pl20 pr20 bgGreyOpacity">
                        3/5
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb7">
                      <p className="fs16 mb0">Cost to Quote</p>
                      <span className="fs16 radius colorGreen bgGreenOpacity pl15 pr15 ">
                        3 Credits
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb7">
                      <p className="fs16 mb0">Status</p>
                      <p className="fs16 mb0">Lead Purchased</p>
                    </div>
                  </Col>
                  <Col lg={3}></Col>
                </div>
              </Row>
              <div className="bBottom mb30"></div>

              <Row>
                <div className="mb30">
                  <Col lg={9}>
                    <h3 className="fs20 fw700 mb13">Quote Request Number</h3>
                    <p className="fs16 mb0">1510724</p>
                  </Col>
                  <Col lg={3}></Col>
                </div>
              </Row>
              <div className="bBottom mb30"></div>

              <Row>
                <div className="mb30">
                  <Col lg={9}>
                    <h3 className="fs20 fw700 mb13">Project History</h3>
                    <div className="d-flex justify-content-between mb8 flex-wrap">
                      <p className="fs16 mb0">April 26, 2021 7:26 am</p>
                      <p className="fs16 mb0">Task Created</p>
                    </div>
                    <div className="d-flex justify-content-between mb8 flex-wrap">
                      <p className="fs16 mb0">April 26, 2021 7:26 am</p>
                      <p className="fs16 mb0">Lead Purchased</p>
                    </div>
                    <div className="d-flex justify-content-between mb8 flex-wrap">
                      <p className="fs16 mb0">April 26, 2021 7:26 am</p>
                      <p className="fs16 mb0">Quotation Accepted</p>
                    </div>
                    <div className="d-flex justify-content-between mb8 flex-wrap">
                      <p className="fs16 mb0">April 26, 2021 7:26 am</p>
                      <p className="fs16 mb0">Close Lead</p>
                    </div>
                  </Col>
                  <Col lg={3}></Col>
                </div>
              </Row>
            </section>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CustomerRequestDetails;

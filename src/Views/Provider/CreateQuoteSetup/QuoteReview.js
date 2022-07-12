import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import Menubar from "../Menubar/Menubar";
import NewQuoteMsg from "./NewQuoteMsg";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import Global from "../../../Helpers/Global/Global";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import FormModal from "../../../Components/FormModal/FormModal";
import QuoteSuccess from "./QuoteSuccess";

const QuoteReview = (props) => {
  const { data } = props;
  const  [success,setsuccess]=useState("");
  const history = useHistory();
  const SuccessMsg = () => {
    AlertModal.show(<NewQuoteMsg />, "", () => {}, "lg");
  };
  const createQuoteSubmit = () => {
    const iData = {
      businessid: data.businessid,
      taskid: data.taskid,
      quotedate: data.quoteDate,
      validupto: data.validTo,
      customerEmail: data.email,
      customerName: data.name,
      customerPhone: data.ContactNumber,
      customerAddress: data.address,
      subtotal: data.subtotal,
      discount: data.discountinput,
      grandtotal: data.grandtotal,
      notes: data.notes,
      quoteitem: data.quotesItems,
    };

    if (data.name === null || data.name === "") {
      return AlertModal.show("Please fill Name field", "Oops!");
    }
    if (data.quoteDate === null || data.quoteDate === "") {
      return AlertModal.show("Please fill Quote Date field", "Oops!");
    }
    if (data.ContactNumber === null || data.ContactNumber === "") {
      return AlertModal.show("Please fill Quote Contact Number field", "Oops!");
    }
    if (data.validTo === null || data.validTo === "") {
      return AlertModal.show("Please fill valid to field", "Oops!");
    }
    if (data.email === null || data.email === "") {
      return AlertModal.show("Please fill email field", "Oops!");
    }
    if (data.quotesItems <= 0) {
      return AlertModal.show("Please fill Quote fields", "Oops!");
    }
    HTTP.post(API.taskQuotation, iData, true, false, Auth.getToken()).then(
      (res) => {
        if (res && res.status && res.status === 200) {
          console.log("appy",res);
          setsuccess(true);
          GLocalStorage.Remove("quoteInfo");
          //FormModal.hide();
          props.refreshData();
          // AlertModal.show("Your Quote has been sent", "Success!", () => {
          //   props.refreshData();
          //   GLocalStorage.Remove("quoteInfo");
          //   history.push("/provider/dashboard");
          //   FormModal.hide();
          // });
          //history.push("/provider/dashboard");
        } else {
        }
      }
    );
  };

  return (
    <>
      <style jsx="true">
        {`
          .invoiceTr.firstTr td {
            padding-top: 20px;
          }
          .invoiceTr td {
            padding-top: 5px;
            padding-bottom: 5px;
            border: none;
          }
        `}
      </style>
      {
        !success &&
        <section className="bgLightOrange pt60 pb60">
        <Container>
          <div className="text-center">
            <h2 className="f24 f700 colorBlack fBold mb25">Create New Quote</h2>
          </div>
          <div className="text-center mb30">
            <div>
              <ul className="d-flex justify-content-between mb5 width35 mobWidth100 tabWidth100 mx-auto noUl new-quote position-relative">
                <li>
                  <NavLink
                    to="/provider/create-quote"
                    className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no active"
                    activeclassname="active"
                  >
                    1
                  </NavLink>

                  <div className="fs16 colorBlack mt15">Setup</div>
                </li>
                <li activeclassname="active">
                  <NavLink
                    to="/provider/create-quote-invoice"
                    className="colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no active"
                    activeclassname="active"
                  >
                    2
                  </NavLink>

                  <div className="fs16 colorBlack mt15">Review</div>
                </li>

                <li>
                  <NavLink
                    to="/provider/send-quote"
                    className="colorOrange circleArea radius100 d-flex align-items-center justify-content-center quote_no leftDecline"
                    activeclassname="active"
                  >
                    3
                  </NavLink>
                  <div className="fs16 colorBlack mt15">Send</div>
                </li>
              </ul>
            </div>
          </div>
          <Row className="justify-content-center">
            <Col lg={12} md={12} xl={9}>
              <section className="bgWhite border">
                <div className="pro-invoice pt30 pb30 pl30 pr30 mb40">
                  <div className="d-flex justify-content-between">
                    <div>
                      <Link to="#" onClick={() => props.callback(false)}>
                        <span>{Svg.backArrow}</span>
                      </Link>
                    </div>
                    <div>
                      <h3 className="fs24 fBold mb3">QUOTE</h3>
                    </div>
                  </div>
                  <div className="pl40">
                    <div className="mb20">
                      <img
                        src={data.businessData.logoimage ? API.imageurl + data.businessData.logoimage : Img.rectangle13488.default}
                        alt=""
                        className="radius100"
                      />
                    </div>
                    <h2 className="fs22">{data.businessData.bussinessname}</h2>
                    <p className="fs16">
                      {data.businessData.phone} <br /> {data.businessData.email},
                    </p>
                  </div>
                </div>
                <div className="pl40 pr40">
                  <h3 className="fs20 colorBlack">Customer Information</h3>
                  <div className="d-flex justify-content-between ">
                    <p className="fs16 colorBlack mb0 fw700">{data.name}</p>
                    <div>
                      <span className="fs16 colorPara">Invoice Date: </span>
                      <span className="fs16 colorBlack">
                        {Global.Date(data.quoteDate)}
                      </span>
                    </div>
                  </div>
                  <p className="fs16 mb0">{data.ContactNumber}</p>
                  <div className="d-flex justify-content-between mb20">
                    <p className="fs16 mb0">{data.email}</p>
                   
                  </div>
                  <div className="mb7 dot-border-b"></div>

                  <div className="table-responsive mb30">
                    <table className="table notablePadding ">
                      <thead className="colorPara">
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.quotesItems &&
                          data.quotesItems.length > 0 &&
                          data.quotesItems.map((elem, ind) => {
                            return (
                              <tr className="dot-border-b" key={ind}>
                                <td className="bBottom">{elem.description}</td>
                                <td>{elem.qty}</td>
                                <td>R {elem.price}.00</td>
                                <td>R {elem.amount}.00</td>
                              </tr>
                            );
                          })}
                        <tr className="invoiceTr firstTr">
                          <td></td>
                          <td></td>
                          <td className="fw700">Sub Total</td>
                          <td>R {data.subtotal}.00</td>
                        </tr>
                        <tr className="invoiceTr">
                          <td></td>
                          <td></td>
                          <td className="fw700">Discount</td>
                          <td>R {data.discountinput}.00</td>
                        </tr>
                        <tr className="invoiceTr">
                          <td></td>
                          <td></td>
                          <td className="fw700">Total</td>
                          <td>R {data.grandtotal}.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="">
                    <p className="fs16 mobWidth100 w_md_100">
                      {data.notes}
                    </p>
                    <div className="d-flex justify-content-end mobJustifyContentStart mb20">
                      <CmnButton
                        type="square"
                        text="Send to Customer"
                        className=""
                        onClick={(e) => createQuoteSubmit()}
                      />
                    </div>
                  </div>
                </div>

             
              </section>
            </Col>
          </Row>
        </Container>
      </section>
      }
  

      { 
      success &&
        <QuoteSuccess/>
      }
    </>
  );
};

export default QuoteReview;

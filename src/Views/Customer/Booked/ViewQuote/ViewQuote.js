import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../../Assets/Img/Img";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import ConfirmModal02 from "../../../../Components/ConfirmModal02/ConfirmModal02";
import FormModal from "../../../../Components/FormModal/FormModal";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../../Helpers/Api/Api";
import Auth from "../../../../Helpers/Auth/Auth";
import API from "../../../../Helpers/Constants/Constants";
import "./CreateQuoteInvoice.scss";

const ViewQuote = (props) => {
  // const data={
  //   businessi: "61c19c925a25b2dbb1bf20e5",
  //   taskid: "61bc4c2010dea2d865fcc7ed",
  //   name: "Demo Name",
  //   quoteDate: "02-5-2022",
  //   ContactNumber: "+919770454545",
  //   validTo: "02-10-2022",
  //   email: "dev@gmail.com",
  //   address: "Palasia, Indore",
  //   quotesItems: [],
  //   notes: "Lorem ipsum data",
  //   subtotal: 1000,
  //   grandtotal: 1000,
  //   discountinput: 10,
  //   discount: 10,
  // };
  const { data } = props;
  useEffect(() => {
    console.log(data);
  }, []);

  const acceptQuote = (taskid, businessid) => {
    ConfirmModal02.show(
      "Are you sure to accept the quote?",
      () => {
        try {
          // alert(taskid);
          // alert(businessid);
          LoadingModal.show("");
          HTTP.post(
            API.acceptQuoteTask,
            { taskid: taskid, businessid: businessid, info: "Quote accepted." },
            true,
            false,
            Auth.getToken()
          ).then((res) => {
            if (res && res.status && res.status.toString() === "200") {
              AlertModal.show("Quote accecpted successfully.", "Success!");
              LoadingModal.hide();
              FormModal.hide();
            } else {
              AlertModal.show(
                "Quote accepting failed. Please contact admin.",
                "Error!"
              );
              LoadingModal.hide();
              FormModal.hide();
            }
          });
        } catch (error) {
          LoadingModal.hide();
          console.error(error);
        }
      },
      () => {
        FormModal.hide();
      }
    );
  };

  const rejectQuote = (taskid, businessid) => {
    ConfirmModal02.show(
      <p className="colorRed">Are you sure to reject the quote?</p>,
      () => {
        try {
          // alert(taskid);
          // alert(businessid);
          LoadingModal.show("");
          HTTP.post(
            API.rejectQuoteTask,
            {
              taskid: taskid,
              businessid: businessid,
              info: "Quote rejected by user.",
            },
            true,
            false,
            Auth.getToken()
          ).then((res) => {
            if (res && res.status && res.status.toString() === "200") {
              AlertModal.show("Quote rejected successfully.", "Success!");
              LoadingModal.hide();
              FormModal.hide();
            } else {
              AlertModal.show(
                "Quote rejecting failed. Please contact admin.",
                "Error!"
              );
              LoadingModal.hide();
              FormModal.hide();
            }
          });
        } catch (error) {
          LoadingModal.hide();
          console.error(error);
        }
      },
      () => {
        FormModal.hide();
      }
    );
  };
  return (
    <>
      {!data && <p className="w-100 text-center mt60 mb60">Invalid quote</p>}
      {data && (
        <section className="">
          <Row>
            <Col lg={12} md={12} xl={12}>
              <section className="bgWhite border">
                <div className="pro-invoice pt30 pb30 pl10 pr30 mb40">
                  <div className="d-flex justify-content-between mb30">
                    <div className="pointer" onClick={(e) => window.print()}>
                      <span className="pr10">{Svg.print}</span>
                      <span className="fs16 colorBlack">Print</span>
                    </div>
                    <h3 className="fs24 fBold">Quotation </h3>
                  </div>
                  <div className="pl40">
                    <div className="mb20 img80">
                      <img
                        src={
                          data.businessData.logoimage
                            ? API.imageurl + data.businessData.logoimage
                            : Img.busPro.default
                        }
                        alt=""
                        className="radius100 img-fluid"
                      />
                    </div>
                    <h2 className="fs22">{data.businessData.bussinessname}</h2>
                    <p className="fs16">
                      {data.businessData.email} <br /> {data.businessData.phone}
                      ,
                    </p>
                  </div>
                </div>
                <div className="pl30 pr30">
                  <h3 className="fs20 colorBlack">Customer Information</h3>
                  <div className="d-flex justify-content-between ">
                    <p className="fs16 colorBlack mb0 fw700">
                      {data.quoteData.customerName}
                    </p>
                    <div>
                      <span className="fs16 colorPara">Invoice Date:</span>
                      <span className="fs16 colorBlack">
                        {new Date(data.quoteData.quotedate).toDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="fs16 mb0">{data.quoteData.customerPhone}</p>
                  <p className="fs16 mb0">{data.quoteData.customerAddress}</p>
                  <div className="d-flex justify-content-between mb20">
                    <p className="fs16 mb0">{data.quoteData.customerEmail}</p>
                    <p className="fs16">Quote #{data.quoteData._id} </p>
                  </div>
                  <div className="mb7 dot-border-b"></div>

                  <div className="table-responsive mb60">
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
                        {data.quoteData.quoteitem &&
                        data.quoteData.quoteitem.length > 0 ? (
                          data.quoteData.quoteitem.map((element, index) => {
                            return (
                              <tr>
                                <td>{element.description}</td>
                                <td>{element.qty}</td>
                                <td>{element.price}</td>
                                <td>{element.amount}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <p>No data found</p>
                        )}
                        <tr className="noBorder">
                          <td></td>
                          <td></td>
                          <td>Sub Total:</td>
                          <td>R {data.quoteData.grandtotal}.00</td>
                        </tr>
                        <tr className="noBorder">
                          <td></td>
                          <td></td>
                          <td>Discount:</td>
                          <td>R {data.quoteData.discount}.00</td>
                        </tr>
                        <tr className="noBorder">
                          <td></td>
                          <td></td>
                          <td className="fw700">Total:</td>
                          <td>R {data.quoteData.subtotal}.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="fs16 mobWidth100 w_md_100 ">
                    {data.quoteData.notes}
                  </p>
                </div>

                <div className="dot-border-b"></div>
                <div className="d-flex  justify-content-around">
                  <Link
                    to="#"
                    onClick={(e) =>
                      acceptQuote(data.taskData, data.businessData._id)
                    }
                  >
                    <p className="fs16 colorGreen pt15">
                      <span className="mr10">{Svg.accept}</span>Accept Quote
                    </p>
                  </Link>
                  <div className="d-b-right"></div>
                  <Link
                    to="#"
                    onClick={(e) =>
                      rejectQuote(data.taskData, data.businessData._id)
                    }
                  >
                    <p className="fs16 colorRed pt15">
                      <span className="mr10">{Svg.reject}</span>Reject Quote
                    </p>
                  </Link>
                </div>
              </section>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default ViewQuote;

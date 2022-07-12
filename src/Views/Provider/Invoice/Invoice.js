import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import { Svg } from "../../../Assets/Svgs/Svg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import "./Invoice.scss";

const Invoice = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadData();
  }, [props.transactionID]);

  const loadData = async () => {
    const iData = {
      transectionid: props.transactionID,
    };
    try {
      await HTTP.post(
        API.paymentTransactionDetail,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setData(res.data);              
          }
        }
      });
    } catch (e) {
      console.log(e, "Error in the Transaction History comp.");
    }
  };
  return (
    <>
   
      <section className="">
        <Container>
          <Row>
            {
              console.log("data 454",data)
            }
            <Col lg={12} md={12} xl={12}>
              <section className="bgWhite border">
                <div className="pro-invoice pt30 pb30 pl10 pr30 mb40">
                  <div className="d-flex justify-content-between">
                    <div className="pointer" onClick={e=>window.print()}>
                      <span className="pr10">{Svg.print}</span>
                      <span className="fs16 colorBlack">Print</span>
                    </div>
                    <h3 className="fs24 fBold">INVOICE </h3>
                  </div>
                  <div className="pl40">
                    <div className="mb20">
                      <img
                        src={Img.busPro1.default}
                        alt=""
                        className="radius100"
                      />
                    </div>
                    <h2 className="fs22 text-capitalize">{data.name}</h2>
                    <p className="fs16 text-capitalize">
                    {data.address}
                    </p>
                  </div>
                </div>
                <div className="pl40 pr40">
                  <h3 className="fs20 colorBlack">Customer Information 33</h3>
                  <div className="d-flex align-items-end justify-content-between mb25">
                    <div>
                      <p className="fs16 colorBlack mb0">{data.users && data.users.firstname+ " "+ data.users.lastname}</p>
                      <p className="fs16 mb0">{data.phone}</p>
                      <p className="fs16 mb0">{data.email}</p>
                    </div>
                    <div>
                      <span className="fs16 colorPara">Invoice Date:</span>
                      <span className="fs16 colorBlack">{data.orderdate}</span>
                    </div>
                  </div>
                  <div className="mb7 dot-border-b"></div>
                  
                  <div className="table-responsive">
                    <table className="table noBorder notablePadding">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Credits</th>
                          <th>Amount</th>
                          <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr className="dot-border-b">
                              <td>#{data.orderid}</td>
                              <td>{data.plans && data.plans.title}, {data.plans && data.plans.subtitle}</td>
                              <td>{data.amount}</td>
                              <td>{data.points}</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className="pl40 pr40">
                  <p className="fs16">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                  <div className="d-flex justify-content-end">
                    <CmnButton type="square" text="Send Invoice to Customer" className="" />
                  </div>
                </div> */}

              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Invoice;

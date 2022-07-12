import React from "react";
import { Col, Container, Row } from "reactstrap";
import Svg from "../../../../src/Assets/Img/svg/Svg";
import Img from "../../../../src/Assets/Img/Img";
import { Link } from "react-router-dom";

const MultiInvoice = () => {
  return (
    <>
      <section className="mb20">
        <Container>
          <Row>
            <Col lg={12} md={12} xl={12}>
              <section className="bgWhite border">
                <div className="pro-invoice pt30 pb30 pl10 pr30 mb40">
                  <div className="d-flex justify-content-between">
                    <div className="pointer" onClick={e=>window.print()}>
                      <span className="pr10">{Svg.print}</span>
                      <span className="fs16 colorBlack">Print</span>
                    </div>
                      <h3 className="fs24 fBold">INVOICE</h3>
                  </div>
                  <div className="pl40">
                    <div className="mb20">
                      <img
                        src={Img.buspro.default}
                        alt=""
                        className="radius100"
                      />
                    </div>
                    <h2 className="fs22">UrbanClab Cleaning Services</h2>
                    <p className="fs16">
                      Caribbean Blvd, Cutler Bay, FL, USA <br /> 060 606 6660,
                    </p>
                  </div>
                </div>
                <div className="pl30 pr30">
                  <h3 className="fs20 colorBlack">Customer Information</h3>
                  <div className="d-flex justify-content-between ">
                    <p className="fs16 colorBlack mb0 fw700">Petro Botha</p>
                    <div>
                      <span className="fs16 colorPara">Invoice Date:</span>
                      <span className="fs16 colorBlack">18 Nov 2021</span>
                    </div>
                  </div>
                  <p className="fs16 mb0">0617277364</p>
                  <div className="d-flex justify-content-between mb20">
                    <p className="fs16 mb0">petrobotha555@gmail.com</p>
                    <p className="fs16">Quote # 1 </p>
                  </div>
                  <div className="mb7 dot-border-b"></div>

                  <div className="table-responsive mb60">
                    <table className="table noBorder notablePadding ">
                      <thead className="colorPara">
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="dot-border-b">
                          <td>Lorem Ipsum text</td>
                          <td>4</td>
                          <td>R 120.00</td>
                          <td>R 480.00</td>
                        </tr>
                        <tr className="dot-border-b">
                          <td>Lorem Ipsum text</td>
                          <td>4</td>
                          <td>R 120.00</td>
                          <td>R 480.00</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Sub Total</td>
                          <td>R 960.00</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Discount</td>
                          <td>R 50.00</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td className="fw700">Total</td>
                          <td>R 910.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="fs16 mobWidth100 w_md_100 ">
                    
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>

                <div className="dot-border-b"></div>
                <div className="d-flex  justify-content-around">
                  <Link to="#">
                  <p className="fs16 colorGreen pt8">
                    <span className="mr10">{Svg.accept}</span>Accept Quote
                  </p>
                  </Link>
                  <div className="d-b-right"></div>
                  <Link to="#">
                  <p className="fs16 colorRed pt8">
                    <span className="mr10">{Svg.reject}</span>Reject Quote
                  </p>
                </Link>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MultiInvoice;

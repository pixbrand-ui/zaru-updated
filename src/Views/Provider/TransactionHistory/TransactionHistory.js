import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import "./TransactionHistory.scss";
import Invoice from "../Invoice/Invoice";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import ProAside from "../ProviderProfile/ProAside";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";

const opt = [
  {
    label: "Last Month",
    val: "Last Month",
  },
  {
    label: "Last 3 Months",
    val: "Last 3 Months",
  },
  {
    label: "Last 6 Months",
    val: "Last 6 Months",
  },
  {
    label: "Last 9 Months",
    val: "Last 9 Months",
  },
  {
    label: "Last 12 Months",
    val: "Last 12 Months",
  },
];

const TransactionHistory = () => {
  const [monthfilter, setmonthfilter] = useState("");
  const [data, setData] = useState([]);
  const [currentPage,setcurrentPage]=useState(1);
  const [pagi,setpagi]=useState({
    totalItems: data.totalDocs,
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage
  });


  useEffect(() => {
    loadData();
  }, [currentPage,monthfilter]);

 
  const loadData = async () => {
    const iData = {
      filterwith : monthfilter.val,
      pagesize: 10,
      page: currentPage,
    };
    try {
      await HTTP.post(
        API.paymentTransectionList,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data.length > 0) {
            setData(res.data);
            setpagi({
              ...pagi,
              totalItems: res.totalDocs,
              totalPages: res.totalPages,
              prevPage: res.prevPage,
              nextPage: res.nextPage

            })
              
          }
        }
      });
    } catch (e) {
      console.log(e, "Error in the Transaction History comp.");
    }
  };

  const viewInvoice = (transID) => {
    AlertModal.show(<Invoice transactionID={transID} />, "", () => {}, "xl", false);
  };
  return (
    <>
    {
      console.log(monthfilter.val)
    }
      <style jsx="true">
        {`
          body table td,
          body table th {
            padding: 14px 15px !important;
          }
          tbody {
            border-top: 1px solid #ddd !important;
          }
        `}
      </style>
      <section className="bgLightOrange pt60 pb60">
       
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <Row className="mb20 align-items-center ">
                <Col lg={8}>
                  <h3 className="fs28 fBold mb0">Transaction History</h3>
                </Col>
                <Col lg={4}>
                  <Select
                    className="w-100 themeSelect"
                    classNamePrefix="themeSelect"
                    options={opt}
                    placeholder={<div>Last 12 Months</div>}
                    onChange={(e) => setmonthfilter(e)}
                    value={monthfilter}
                  />
                </Col>
              </Row>

              <section className="bgWhite radius border">
                <div className="table-responsive">
                  <table className="table bBottom notablePadding">
                    <thead>
                      <tr>
                        <th className="th-fdata">Order Id</th>
                        <th>Credits</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="colorPara">
                      {data &&
                        data.length > 0 &&
                        data.map((elem, ind) => {
                          return (
                            <tr key={ind}>
                              <td className="th-fdata">{elem.orderid}</td>
                              <td>{elem.points} Credits</td>
                              <td>R {elem.amount} </td>
                              <td>{elem.orderdate}
                              </td>
                              <td
                                className={`${
                                  elem.status === "success"
                                    ? "colorGreen"
                                    : "colorRed"
                                }`}
                              >
                                {elem.status}
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  className="th-view-link colorPara"
                                  onClick={(e) => viewInvoice(elem._id)}
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {
                  pagi.totalItems > 10 &&
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                  <p className="fs16 colorBlack">Page {currentPage} of 18</p>
                  <ul className="d-flex align-items-center flex-wrap noUl ml15 pagi">
                    <li>
                      <CmnButton
                        type="noBg"
                        dataprev="1"
                        icon={Svg.angleLeft}
                        className="btnTransparentBlack radius4 mr10"
                        onClick={()=>setcurrentPage(pagi.prevPage ? pagi.prevPage : 1)}
                      />
                    </li>

                    <li className="mr10">
                      <CmnButton
                        type="noBg"
                        text={currentPage}
                        className="btnTransparentBlack radius4"
                      />
                    </li>
                    
                    <li>
                      <CmnButton
                        type="noBg"
                        icon={Svg.angleRight}
                        className="btnTransparentBlack radius4"
                        onClick={()=>setcurrentPage(pagi.nextPage ? pagi.nextPage : 1)}
                      />
                    </li>
                  </ul>
                </div>
                }
               
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TransactionHistory;

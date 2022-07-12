/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { Svg } from "../../../Assets/Svgs/Svg";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../Components/CmnInput/CmnInput";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import Menubar from "../Menubar/Menubar";
import "./CreateQuote.scss";
import DatePicker from "react-datepicker";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import QuoteReview from "./QuoteReview";
import $ from "jquery";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import FormModal from "../../../Components/FormModal/FormModal";

const CreateQuoteNew = (props) => {
  let history = useHistory();
  var quoteInfo = GLocalStorage.IsExists("quoteInfo")
    ? JSON.parse(GLocalStorage.Get("quoteInfo"))
    : null;

  const [goToNextPage, setGoToNextPage] = useState(null);

  const [quoteData, setquoteData] = useState({
    businessData: props.businessData,
    businessid: props.businessid,
    taskid: props.taskid,
    userData: props.userData,
    name: props.userData
      ? props.userData.firstname + " " + props.userData.lastname
      : "",
    quoteDate: Date.now(),
    ContactNumber: props.userData ? props.userData.phone : "",
    validTo: Date.now(),
    email: props.userData ? props.userData.email : "",
    address: "",
    quotesItems: [],
    notes: "",
    subtotal: 0,
    grandtotal: 0,
    discountinput: 0,
    discount: 0,
  });

  useEffect(() => {
    if (quoteData.taskid === null) {
      history.push({
        pathname: "provider/dashboard",
      });
    }
  }, []);

  const saveData = () => {
    try {
      const iData = {
        businessid: quoteData.businessid,
        taskid: quoteData.taskid,
        quotedate: quoteData.quoteDate,
        validupto: quoteData.validTo,
        customerEmail: quoteData.email,
        customerName: quoteData.name,
        customerPhone: quoteData.ContactNumber,
        customerAddress: quoteData.address,
        subtotal: quoteData.subtotal,
        discount: quoteData.discountinput,
        grandtotal: quoteData.grandtotal,
        notes: quoteData.notes,
        quoteitem: quoteData.quotesItems,
      };
      if (quoteData.name === null || quoteData.name === "") {
        return AlertModal.show("Please fill Name field", "Oops!");
      }
      if (quoteData.quoteDate === null || quoteData.quoteDate === "") {
        return AlertModal.show("Please fill Quote Date field", "Oops!");
      }
      if (quoteData.ContactNumber === null || quoteData.ContactNumber === "") {
        return AlertModal.show(
          "Please fill Quote Contact Number field",
          "Oops!"
        );
      }
      if (quoteData.validTo === null || quoteData.validTo === "") {
        return AlertModal.show("Please fill valid to field", "Oops!");
      }
      if (quoteData.email === null || quoteData.email === "") {
        return AlertModal.show("Please fill email field", "Oops!");
      }
      if (quoteData.quotesItems <= 0) {
        return AlertModal.show("Please fill Quote fields", "Oops!");
      }
      setGoToNextPage(true);

      //console.log("quote data",quoteData)

      // HTTP.post(API.taskQuotation, iData, true, false, Auth.getToken()).then(
      //   (res) => {
      //     if (res && res.status && res.status === 200) {
      //       AlertModal.show("Your Quote has been sent", "Success!");
      //     } else {
      //     }
      //   }
      // );
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e, target = null) => {
    if (target !== null) {
      switch (target) {
        case "fromDate":
          setquoteData({ ...quoteData, quoteDate: e });
          break;
        case "validTo":
          setquoteData({ ...quoteData, validTo: e });
          break;
        case "discountinput":
          var applyDiscount = quoteData.subtotal - e.target.value;
          setquoteData({
            ...quoteData,
            discountinput: e.target.value,
            grandtotal: applyDiscount,
          });
          break;
        default:
          setquoteData({ ...quoteData });
          break;
      }
    } else {
      setquoteData({ ...quoteData, [e.target.name]: e.target.value });
    }
  };

  const deleteItem = (e) => {
    let initData = [];
    initData = [...quoteData.quotesItems];
    var _subtotal = 0;
    var _grandtotal = 0;
    initData.splice(e, 1);

    var items = initData;
    if (items.length > 0) {
      items.forEach((elem, ind) => {
        _subtotal = _subtotal + elem.amount;
      });
    }

    _grandtotal = _subtotal - quoteData.discountinput;

    setquoteData({
      ...quoteData,
      quotesItems: initData,
      subtotal: _subtotal,
      grandtotal: _grandtotal,
    });
  };

  const addItemsInState = (data) => {
    if (data.amount > 0) {
      if (data.description.length <= 0) {
        return alert("Please add description.");
      }
      var items = [...quoteData.quotesItems];
      var isExists = false;
      var _subtotal = 0;
      if (items.length > 0) {
        items.forEach((element, index) => {
          if (element.description === data.description) {
            isExists = true;
            return AlertModal.show("Item already exists in list.", "Oops!");
          }
        });
        if (!isExists) {
          items.push(data);
          if (items.length > 0) {
            items.forEach((elem, ind) => {
              _subtotal = _subtotal + elem.amount;
            });
          }
        }
      } else {
        items.push(data);
        _subtotal = data.amount;
      }
      var discountTotal = _subtotal - quoteData.discountinput;
      setquoteData({
        ...quoteData,
        quotesItems: items,
        subtotal: _subtotal,
        grandtotal: discountTotal,
      });
    }
  };

  const QuoteItemInsert = (props) => {
    const [itemdata, setitemdata] = useState({
      description: "",
      qty: 0,
      price: 0,
      amount: 0,
    });

    const handleChange = (e) => {
      try {
        var qty = itemdata.qty;
        var price = itemdata.price;
        var amount = 0;

        if (e.target.value) {
          if (e.target.value.trim() !== "" && e.target.name === "qty") {
            qty = e.target.value;
          }
          if (e.target.value.trim() !== "" && e.target.name === "price") {
            price = e.target.value;
          }
        } else {
          if (e.target.name === "qty") qty = 0;
          if (e.target.name === "price") price = 0;
        }

        amount = Number.parseInt(qty) * Number.parseFloat(price);

        setitemdata({
          ...itemdata,
          [e.target.name]: e.target.value,
          amount: amount,
        });
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      $("#quoteitemdescription").keyup(function (e) {
        if (e.keyCode === 13) {
          var val = $(this).attr("value");
          if (val.length <= 0) {
            alert("Please enter description.");
          } else {
            $("#quoteItemQty").focus();
          }
        }
      });

      $("#quoteItemQty").keyup(function (e) {
        if (e.keyCode === 13) {
          var val = $(this).attr("value");
          if (val.length <= 0) {
            alert("Please enter quantity.");
          } else {
            $("#quoteItemPrice").focus();
          }
        }
      });

      $("#quoteItemPrice").keyup(function (e) {
        if (e.keyCode === 13) {
          var val = $(this).attr("value");
          if (val.length <= 0) {
            alert("Please enter price.");
          } else {
            addItem();
            $("#quoteitemdescription").focus();
          }
        }
      });
    }, [itemdata]);

    const addItem = () => {
      props.onAddClick(itemdata);
    };

    return (
      <>
        <tr className="bBottom">
          <td>
            <CmnInput
              id="quoteitemdescription"
              type="text"
              name="description"
              placeholder="Description"
              value={itemdata.description}
              onChange={handleChange}
            />
          </td>
          <td>
            <CmnInput
              id="quoteItemQty"
              type="number"
              name="qty"
              placeholder="Qty"
              value={itemdata.qty}
              onChange={handleChange}
            />
          </td>
          <td>
            <CmnInput
              id="quoteItemPrice"
              type="number"
              name="price"
              placeholder="Unit Price"
              value={itemdata.price}
              onChange={handleChange}
            />
          </td>
          <td>
            <CmnInput
              type="number"
              name="amount"
              placeholder="Total"
              readonly={true}
              disabled={true}
              value={itemdata.amount}
              onChange={handleChange}
            />
          </td>
          <td className="colorRed">
            <CmnButton
              text="+ Add"
              onClick={(e) => props.onAddClick(itemdata)}
              type="noBg"
            />
          </td>
        </tr>
      </>
    );
  };

  const QuoteItem = (props) => {
    let index = props.index;
    const { data } = props;
    return (
      <tr className="bBottom">
        <td>{data.description}</td>
        <td>{data.qty}</td>
        <td>R{data.price}</td>
        <td>R{data.amount}.00</td>
        <td>
          <CmnButton
            type="noBg"
            icon={Svg.red_cross}
            onClick={(e) => props.onRemoveItem(index)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      {!goToNextPage && (
        <section className="bgLightOrange pt60 pb60">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} className="position-relative">
                {/* Back Button */}
                {/* <div className="postion-absolute backArrow">
                  <Link
                    to="#"
                    onClick={() => {
                      if (!goToNextPage) {
                        FormModal.hide();
                      } else {
                        setGoToNextPage(false);
                      }
                    }}
                  >
                    {Svg.backArrow}
                  </Link>
                </div> */}
                <h2 className="f24 f700 text-center colorBlack fBold mb25">
                  Create New Quote
                </h2>

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
                          className={`colorOrange circleArea d-flex align-items-center justify-content-center radius100 quote_no ${
                            goToNextPage && "active"
                          }`}
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
                        <div className="fs16 colorBlack mt15">Sent</div>
                      </li>
                    </ul>
                  </div>
                </div>

                <Row>
                  <Col>
                    <section className="bgWhite mx-auto radius pt30 pl30 pb30 pr30">
                      <div className="d-flex align-items-center justify-content-between mb30">
                        <h3 className="fs22 colorBlack mb0">
                          Who's your customer? 
                        </h3>
                        {/* <p className="fs16 colorOrange mb0">
                          View Customer Request Detail
                        </p> */}
                      </div>
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            label="Customer name *"
                            type="text"
                            name="name"
                            value={quoteData.name}
                            placeholder="Robin Rathore"
                            onChange={changeHandler}
                          />
                        </Col>
                        <Col lg={6}>
                          <label className="fs16 mb7">Quote Date*</label>
                          <DatePicker
                            className="w-100 inputTransparent  outlineNone"
                            selected={quoteData.quoteDate}
                            name="fromDate"
                            onChange={(e) => changeHandler(e, "fromDate")}
                            dateFormat="yyyy-M-dd"
                            locale="es"
                            placeholderText="From Date"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            label="Contact Number*"
                            className=""
                            type="number"
                            name="ContactNumber"
                            value={quoteData.ContactNumber}
                            onChange={changeHandler}
                            placeholder="0740000426"
                          />
                        </Col>
                        <Col lg={6}>
                          <label className="fs16 mb7">
                            Invoice Validation*
                          </label>
                          <DatePicker
                            className="w-100 inputTransparent  outlineNone"
                            selected={quoteData.validTo}
                            name="validTo"
                            onChange={(e) => changeHandler(e, "validTo")}
                            dateFormat="yyyy-M-dd"
                            locale="es"
                            placeholderText="Valid up to..."
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <CmnInput
                            label="Email Address*"
                            className=""
                            type="email"
                            name="email"
                            placeholder="magubokhushhua@gmail.com"
                            value={quoteData.email}
                            onChange={changeHandler}
                          />
                        </Col>
                        <Col lg={6}>
                          <CmnInput
                            label="Address (Optional)"
                            className=""
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={quoteData.address}
                            onChange={changeHandler}
                          />
                        </Col>
                      </Row>
                      <h3 className="fs22 colorBlack mt20 mb20">
                        What Are You Quoting
                      </h3>

                      <div className="table-responsive">
                        <table className="table notablePadding quoteTable">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Qty</th>
                              <th>Unit Price</th>
                              <th>Amount</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className="colorPara ">
                            {quoteData.quotesItems.length > 0 &&
                              quoteData.quotesItems.map((element, index) => {
                                return (
                                  <QuoteItem
                                    key={index}
                                    data={element}
                                    index={index}
                                    onRemoveItem={deleteItem}
                                  />
                                );
                              })}
                            <QuoteItemInsert
                              onAddClick={(data) => {
                                addItemsInState(data);
                              }}
                            />
                            <tr className="noBorderTd">
                              <td></td>
                              <td></td>
                              <td>Sub Total</td>
                              <td>R {quoteData.subtotal}</td>
                              <td></td>
                            </tr>
                            <tr className="noBorderTd">
                              <td></td>
                              <td></td>
                              <td>Discount</td>
                              <td>
                                <CmnInput
                                  className=""
                                  type="number"
                                  name="discountinput"
                                  placeholder="50.00"
                                  value={quoteData.discountinput}
                                  onChange={(e) =>
                                    changeHandler(e, "discountinput")
                                  }
                                />
                              </td>
                              <td></td>
                            </tr>
                            <tr className="">
                              <td></td>
                              <td></td>
                              <td>Total</td>
                              <td>R {quoteData.grandtotal}</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <CmnTextarea
                        className="heightVh20 colorPara"
                        placeholder="Notes (Optional)"
                        name="notes"
                        value={quoteData.notes}
                        onChange={changeHandler}
                      />
                      <div className="d-flex justify-content-end mb30">
                        <CmnButton
                          onClick={(e) => FormModal.hide()}
                          type="noBg"
                          text="Cancel"
                          className="mr10 btnLightOrange pl25 pr25 radius"
                        />
                        <CmnButton
                          type="square"
                          text="Save & Continue"
                          className=""
                          onClick={saveData}
                        />
                      </div>
                    </section>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {goToNextPage && (
        <QuoteReview data={quoteData} callback={setGoToNextPage} refreshData={props.refreshData} />
      )}
    </>
  );
};

export default CreateQuoteNew;

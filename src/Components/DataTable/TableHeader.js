import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./DataTable.css";

import DatePicker from "react-datepicker";
const TableHeader = (props) => {
  const [searchText, setSearchChange] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [goClicked, setGoClicked] = useState(false);

  useEffect(() => {
    if (searchText.trim().length <= 0) {
      props.onSearchClick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const clearDates = () => {
    setFromDate("");
    setToDate("");
    props.onClearClick();
  };

  return (
    <>
      <div className="bg_light_grey p-2 mb-2">
        <div className="row gy-2">
          <div className="col-md-5">
            <div className="row gx-1 justify-content-center justify-content-md-start">
              <div className="col-8">
                <input
                  className="form-control"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchChange(e.target.value)}
                />
              </div>
              <div className="col-4">
                <button
                  className="btn btn-success w-100"
                  onClick={(e) => {
                    props.onSearchClick(searchText, fromDate, toDate);
                  }}
                >
                  <span className="d-none d-md-none d-xl-block">Find</span>
                  <span className="d-md-block d-xl-none">
                    <Icon.Search />
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* ---------------------- */}
          <div className="col-md-7">
            {props.headerComponent == null ? (
              <div className="row gx-1 gy-2 justify-content-center justify-content-md-end">
                <div className="col-5 col-md-4 col-lg-3">
                  <DatePicker
                    className="date_picker"
                    selected={fromDate}
                    name="fromDate"
                    onChange={(e) => setFromDate(e)}
                    dateFormat="yyyy-M-dd"
                    locale="es"
                    placeholderText="From Date"
                  />
                </div>
                <div className="col-5 col-md-4 col-lg-3">
                  <DatePicker
                    className="date_picker"
                    selected={toDate}
                    name="fromDate"
                    onChange={(e) => setToDate(e)}
                    dateFormat="yyyy-M-dd"
                    locale="es"
                    placeholderText="To Date"
                  />
                </div>
                <div className="col-2 col-md-2 col-lg-2">
                  <button
                    className="btn btn-success w-100"
                    onClick={(e) => {
                      goClicked
                        ? clearDates()
                        : props.onGoClick(searchText, fromDate, toDate);
                      fromDate.length > 0 && setGoClicked(!goClicked);
                    }}
                  >
                    <span className="d-none d-md-none d-xl-block">
                      {goClicked ? "Clear" : "Go"}
                    </span>
                    <span className="d-md-block d-xl-none">
                      <Icon.ArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              props.headerComponent
            )}
          </div>
        </div>
      </div>
    </>
  );
};

TableHeader.defaultProps = {
  onSearchClick: () => {},
  onClearClick: () => {},
  onGoClick: () => {},
  headerComponent: null,
};

export default TableHeader;

import React from "react";
import Select from "react-select";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnRadio from "../../../Components/CmnRadio/CmnRadio";

const opt = [
  {
    label: "Sunday",
    val: "Sunday",
  },
  {
    label: "Monday",
    val: "Monday",
  },
  {
    label: "Tuesday",
    val: "Tuesday",
  },
];

const TaskerAside = () => {
  return (
    <>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        <h4 className="f16 fBold colorBlack mb15">Date</h4>

        <div>
          <Select
            className="w-100 themeSelect"
            classNamePrefix="themeSelect"
            options={opt}
          />
        </div>
      </section>

      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        <h4 className="f16 fBold colorBlack mb15">Time of day</h4>

        <div className="mb15">
          <CmnCheckbox label="Morning (8am - 12pm)" name="time" id="time" />
        </div>
        <div className="mb15">
          <CmnCheckbox label="Afternoon (12pm - 5pm)" name="time" id="time1" />
        </div>
        <div>
          <CmnCheckbox label="Evening (5pm - 9:30pm)" name="time" id="time2" />
        </div>

        <p className="mb0 sepLeftRight text-center position-relative mt20">
          <span>or choose a specific time</span>
        </p>

        <div className="mt20">
          <Select
            className="w-100 themeSelect"
            classNamePrefix="themeSelect"
            options={opt}
          />
        </div>
      </section>

      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb30">
        <div className="d-flex align-items-center flex-wrap justify-content-between mb15">
          <div>
            <h4 className="f16 fBold colorBlack mb0">Price</h4>
          </div>

          <div>
            <button className="colorOrange btnBlank f16">Reset</button>
          </div>
        </div>

        <div className="mb15">
          <CmnRadio name="price" id="lowest" label="Lowest Price" />
        </div>
        <div className="mb15">
          <CmnRadio name="price" id="highest" label="Highest Price" />
        </div>
        <div>
          <CmnRadio name="price" id="range" label="Price by range" />
        </div>
      </section>
    </>
  );
};

export default TaskerAside;

import React from "react";
import CmnInputRange from "../../../Components/CmnInputRange/CmnInputRange";
import CmnRadio from "../../../Components/CmnRadio/CmnRadio";

const TaskerAside = (props) => {
  return (
    <>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb15">
        <h4 className="f16 fBold colorBlack mb15">Sort by</h4>

        <div className="mb5">
          <CmnRadio
            label="Latest"
            name="sort_by"
            value="Latest"
            id="latest"
            checked={props.filterData.sort_by === "Latest"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Recommended"
            name="sort_by"
            value="Recommended"
            id="Recommended"
            checked={props.filterData.sort_by === "Recommended"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            id="slowesttohighest"
            label="Price (lowest to highest)"
            name="sort_by"
            checked={props.filterData.sort_by === "Lowest"}
            onChange={props.onChange}
            value="Lowest"
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Price (highest to lowest)"
            name="sort_by"
            value="Highest"
            id="highesttoHighest234"
            checked={props.filterData.sort_by === "Highest"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Credit (lowest to highest)"
            name="sort_by"
            value="CreditLowest"
            id="sortbycred_lh"
            checked={props.filterData.sort_by === "CreditLowest"}
            onChange={props.onChange}
          />
        </div>

        <div>
          <CmnRadio
            label="Credit (highest to lowest)"
            name="sort_by"
            value="CreditHighest"
            id="sortbyCreditHighest"
            checked={props.filterData.sort_by === "CreditHighest"}
            onChange={props.onChange}
          />
        </div>
      </section>

      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb15">
        <h4 className="f16 fBold colorBlack mb15">Time of day</h4>

        <div className="mb5">
          <CmnRadio
            label="Morning (8am - 12pm)"
            name="timeslot"
            value="Morning (8am - 12pm)"
            id="time"
            checked={props.filterData.timeslot === "Morning (8am - 12pm)"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Afternoon (12pm - 5pm)"
            name="timeslot"
            value="Afternoon (12pm - 5pm)"
            id="time1"
            checked={props.filterData.timeslot === "Afternoon (12pm - 5pm)"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Evening (5pm - 9:30pm)"
            name="timeslot"
            value="Evening (5pm - 9:30pm)"
            id="time2"
            checked={props.filterData.timeslot === "Evening (5pm - 9:30pm)"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            label="Flexible Timing"
            name="isflexible"
            value={true}
            id="isflexible"
            checked={props.filterData.isflexible === true}
            onChange={props.onChange }
          />
        </div>

        {/* {formData.map((obj, index) => (
          <div className="mb5" key={index}>
            <CmnRadio
              label={obj.name}
              name="time"
              value={obj.name}
              id={"checkbox" + index}
              onChange={changeHandler}
            />
          </div>
        ))} */}
      </section>
      <section className="filterDate border radius bgWhite pl30 pt30 pr30 pb30 mb15">
        <h4 className="f16 fBold colorBlack mb15">Price</h4>
        <CmnInputRange callback={props.onChange} filterData={props.filterData} />
      </section>
    </>
  );
};

export default TaskerAside;


import React, { useState , useEffect} from "react";
import CmnCheckbox from "../../../Components/CmnCheckbox/CmnCheckbox";
import CmnInputRange from "../../../Components/CmnInputRange/CmnInputRange";
import CmnRadio from "../../../Components/CmnRadio/CmnRadio";

const NewLeadsAside = (props) => {
  const [range, setRange] = useState({
    minprice: 10,
    maxprice: 900,
  });

  return (
    <>
      <style jsx="true">
        {`
          .sidebarHeight {
            scrollbar-width: thin;
            scrollbar-color: #999 #ddd;
          }

          /* Works on Chrome/Edge/Safari */
          .sidebarHeight::-webkit-scrollbar {
            width: 12px;
          }
          .sidebarHeight::-webkit-scrollbar-track {
            background: #ddd;
          }
          .sidebarHeight::-webkit-scrollbar-thumb {
            background-color: #999;
            border-radius: 20px;
            border: 3px solid #ddd;
          }
        `}
      </style>
      <section className="filterDate border radius bgWhite pl20 pt30 pr20 pb20 mb15">
        <h4 className="fs18 fBold colorBlack mb15">Sort by</h4>

        <div className="mb5">
          <CmnRadio name="sort_by" id="sort_by" label="Latest"  value="Latest" checked={props.filterData.sort_by === "Latest"}  onChange={props.onChange}/>
        </div>
        <div className="mb5">
          <CmnRadio name="sort_by" id="Recommended" label="Recommended" value="Recommended" checked={props.filterData.sort_by === "Recommended"} onChange={props.onChange} />
        </div>
        <div className="mb5">
          <CmnRadio
            name="sort_by"
            id="lowt0high"
            label="Price (lowest to highest)"
            value="Lowest"
            checked={props.filterData.sort_by === "Lowest"}
            onChange={props.onChange}
          />
        </div>
        <div className="mb5">
          <CmnRadio
            name="sort_by"
            id="hightolow"
            label="Price (highest to lowest)"
            value="Highest"
            checked={props.filterData.sort_by === "Highest"}
            onChange={props.onChange}
          />
        </div>

        <div className="mb5">
          <CmnRadio
            name="sort_by"
            id="credit"
            label="Credit (lowest to highest)"
            value="CreditLowest"
            checked={props.filterData.sort_by === "CreditLowest"}
            onChange={props.onChange}
          />
        </div>

        <div className="mb5">
          <CmnRadio
            name="sort_by"
            id="creHighLow"
            label="Credit (highest to lowest)"
            value="CreditHighest"
            checked={props.filterData.sort_by === "CreditHighest"}
            onChange={props.onChange}
          />
        </div>
      </section>

      <section className="filterDate border radius bgWhite pl20 pt30 pr20 pb20 mb15">
        <h4 className="fs18 fBold colorBlack mb15">Time of day</h4>

        <div className="mb5">
          <CmnRadio label="Morning (8am - 12pm)" name="timeslot"  value="Morning (8am - 12pm)" id="time" checked={props.filterData.timeslot === "Morning (8am - 12pm)"}  onChange={props.onChange}/>
        </div>
        <div className="mb5">
          <CmnRadio label="Afternoon (12pm - 5pm)" name="timeslot"  value="Afternoon (12pm - 5pm)" id="time1" checked={props.filterData.timeslot === "Afternoon (12pm - 5pm)"} onChange={props.onChange} />
        </div>
        <div className="mb5">
          <CmnRadio label="Evening (5pm - 9:30pm)" name="timeslot"  value="Evening (5pm - 9:30pm)" id="time2" checked={props.filterData.timeslot === "Evening (5pm - 9:30pm)"} onChange={props.onChange} />
        </div>
        <div className="mb5">
          <CmnRadio label="Flexible Timing" name="isflexible"  value="true" id="time3" checked={props.filterData.isflexible === "true"} onChange={props.onChange} />
        </div>
      </section>

      <section className="filterDate border radius bgWhite pl25 pt30 pr25 pb22 mb30">
        <div className="d-flex align-items-center flex-wrap justify-content-between mb15">
          <div>
            <h4 className="fs18 fBold colorBlack mb0">Price</h4>
          </div>

          <div>
            <button className="colorOrange btnBlank fs14">Reset</button>
          </div>
        </div>
        <CmnInputRange callback={props.onChange} />
      </section>
    </>
  );
};

export default NewLeadsAside;

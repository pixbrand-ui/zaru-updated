import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TaskAside from "../TaskAside/TaskAside";
import { Link, Redirect } from "react-router-dom";
import {Svg} from "../../../../Assets/Svgs/Svg";
import "./TaskDateTime.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CmnRadio from "../../../../Components/CmnRadio/CmnRadio";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import AlertModal from "../../../../Components/AlertModal/AlertModal";

const TaskDateTime = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  let [startDate, endDate] = dateRange;
  const [timeTable, setTimeTable] = useState("");
  const [budget, setBudget] = useState("0 - 0");
  const [location, setLocation] = useState("");
  const [taskDescribe, setTaskDescribe] = useState("");
  const [gotoStep, setgotoStep] = useState(5);
  const [taskDetails, settaskDetails] = useState([]);

  useEffect(() => {
    loadTaskDetails();
    loadDescribeDetails();
    loadLocationDetails();
    loadBudgetDetails();
    loadDateDetails();
  }, []);

  useEffect(() => {
    document.getElementById("cdaterange").focus();
  }, [taskDetails]);

  const loadTaskDetails = () => {
    try {
      if (
        GLocalStorage.IsExists("ansSet") &&
        GLocalStorage.IsExists("c-task-category") &&
        GLocalStorage.IsExists("c-task-subcategory")
      ) {
        let gcategory = JSON.parse(GLocalStorage.Get("c-task-category"));
        let gsubcategory = JSON.parse(GLocalStorage.Get("c-task-subcategory"));
        let task_details = "";
        task_details = `You select ${gsubcategory.labelText}, under ${gcategory.category_name} service,  and replied on relative questions. If you want to modify it, please click edit (pencil) button to go back.`;
        settaskDetails(task_details);

        if (GLocalStorage.IsExists("c-task-describe")) {
          setTaskDescribe(JSON.parse(GLocalStorage.Get("c-task-describe")));
        }
      } else {
        AlertModal.show("Please mention tast details.", "Required", () => {
          setgotoStep(1);
        });
        setgotoStep(1);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadDescribeDetails = () => {
    try {
      if (GLocalStorage.IsExists("c-task-describe")) {
        let gtaskdescribe = JSON.parse(GLocalStorage.Get("c-task-describe"));
        let task_describe = "";
        task_describe = `Described : ${gtaskdescribe}, If you want to modify it, please click edit (pencil) button to go back.`;
        setTaskDescribe(task_describe);
      } else {
        AlertModal.show("Please describe your task.", "Required", () => {
          setgotoStep(2);
        });
        setgotoStep(2);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadLocationDetails = () => {
    try {
      if (GLocalStorage.IsExists("c-task-location")) {
        let gtasklocation = JSON.parse(GLocalStorage.Get("c-task-location"));
        let task_location = "";
        task_location = `Location : ${gtasklocation}, If you want to modify it, please click edit (pencil) button to go back.`;
        setLocation(task_location);
      } else {
        AlertModal.show(
          "Please mention location of your task.",
          "Required",
          () => {
            setgotoStep(3);
          }
        );
        setgotoStep(3);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadBudgetDetails = () => {
    try {
      if (GLocalStorage.IsExists("c-task-minmax")) {
        let gminmax = JSON.parse(GLocalStorage.Get("c-task-minmax"));
        setBudget(`Range : ${gminmax.min}R - ${gminmax.max}R`);
      } else {
        AlertModal.show(
          "Please mention budgetn of your task.",
          "Required",
          () => {
            setgotoStep(4);
          }
        );
        setgotoStep(4);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadDateDetails = () => {
    try {
      if (
        GLocalStorage.IsExists("c-task-startdate") &&
        GLocalStorage.IsExists("c-task-enddate")
      ) {
        let start_date = JSON.parse(GLocalStorage.Get("c-task-startdate"));
        let end_date = JSON.parse(GLocalStorage.Get("c-task-enddate"));
        console.log("aa", start_date);
        setDateRange([new Date(start_date), new Date(end_date)]);

        if (GLocalStorage.IsExists("c-task-timetable")) {
          setTimeTable(JSON.parse(GLocalStorage.Get("c-task-timetable")));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const continueTONextPage = () => {
    const [startDate1, endDate1] = dateRange;
    if (startDate1 != null && endDate1 != null) {
      GLocalStorage.Add("c-task-startdate", startDate1);
      GLocalStorage.Add("c-task-enddate", endDate1);
      setgotoStep(6);
    } else {
      AlertModal.show(
        "Please select valid date range and time schedule.",
        "Required"
      );
      document.getElementById("cdaterange").focus();
    }
  };

  const handleSetTimeTable = (e) => {
    setTimeTable(e.target.value);
    GLocalStorage.Add("c-task-timetable", e.target.value);
  };

  return (
    <section className="bgLightOrange pt60 pb60">
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 2 && <Redirect to="/tasks/task-description" />}
      {gotoStep === 3 && <Redirect to="/tasks/task-location" />}
      {gotoStep === 4 && <Redirect to="/tasks/budget" />}
      {gotoStep === 6 && <Redirect to="/tasks/image-upload" />}
      <Container>
        <Row>
          <Col lg={3} md={3} xl={3}>
            <TaskAside />
          </Col>

          <Col lg={9} md={9} xl={9}>
            <section className="bgWhite radius pt30 pl30 pr30 pb30 mb30 border">
              <div className=" position-relative">
                <Link className="pTopRight" to="/tasks/task-details">
                  {Svg.pencilBlack}
                </Link>

                <h3 className="fs24 colorBlack fBold">
                  Tell us the details of your task
                </h3>
                <p className="mb0">{taskDetails}</p>
              </div>
            </section>

            <section className="bgWhite radius pt30 pl30 pr30 pb30  border mb30">
              <div className=" position-relative">
                <Link className="pTopRight" to="/tasks/task-description">
                  {Svg.pencilBlack}
                </Link>
                <h3 className="fs24 colorBlack fBold">Describe your task</h3>
                <p className="mb20">{taskDescribe}</p>
              </div>
            </section>

            <section className="bgWhite radius pt30 pl30 pr30 pb30 mb30 border">
              <div className=" position-relative">
                <Link className="pTopRight" to="/tasks/task-location">
                  {Svg.pencilBlack}
                </Link>

                <h3 className="fs24 colorBlack fBold">Location</h3>
                <p className="mb0">{location}</p>
              </div>
            </section>

            <section className="bgWhite radius pt30 pl30 pr30 pb30 mb30 border">
              <div className=" position-relative">
                <Link className="pTopRight" to="/tasks/budget">
                  {Svg.pencilBlack}
                </Link>

                <h3 className="fs24 colorBlack fBold">
                  Budget to Complete Task
                </h3>
                <p className="mb0">{budget}</p>
              </div>
            </section>

            <section className="bgWhite radius pt30 pl30 pr30 pb30 mb30 border">
              <div className=" position-relative">
                <h3 className="fs24 colorBlack fBold mb20">Date & Time</h3>

                <div className="mb20">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                      console.log("upodate", update);
                      GLocalStorage.Add(
                        "c-task-startdate",
                        new Date(update[0]).toString()
                      );
                      GLocalStorage.Add(
                        "c-task-enddate",
                        new Date(update[1]).toString()
                      );
                    }}
                    withPortal
                    isClearable={true}
                    monthsShown={2}
                    className="w-100 inputTransparent  outlineNone"
                    placeholderText="12/20/2021 - 12/31/2021 Tentative date to complete task."
                  />
                </div>

                <div className="mb20">
                  <CmnRadio
                    id="cdaterange"
                    name="tasktime"
                    label="Morning (8am - 12pm)"
                    onChange={handleSetTimeTable}
                    value="Morning (8am - 12pm)"
                    checked={timeTable === "Morning (8am - 12pm)"}
                  />
                </div>

                <div className="mb20">
                  <CmnRadio
                    name="tasktime"
                    label="Afternoon (12pm - 5pm)"
                    id="morning12am-5pm"
                    onChange={handleSetTimeTable}
                    value="Afternoon (12pm - 5pm)"
                    checked={timeTable === "Afternoon (12pm - 5pm)"}
                  />
                </div>

                <div className="mb20">
                  <CmnRadio
                    name="tasktime"
                    label="Evening (5pm - 9:30pm)"
                    id="morning5am-9pm"
                    onChange={handleSetTimeTable}
                    value="Evening (5pm - 9:30pm)"
                    checked={timeTable === "Evening (5pm - 9:30pm)"}
                    mac={timeTable}
                  />
                </div>

                <div className="mb20">
                  <CmnRadio
                    name="tasktime"
                    label="I'm flexible"
                    id="Imflexible"
                    onChange={handleSetTimeTable}
                    value="I'm flexible"
                    checked={timeTable === "I'm flexible"}
                  />
                </div>

                <div className="d-flex align-items-center flex-wrap justify-content-end mt30">
                  <Link
                    to="#"
                    onClick={continueTONextPage}
                    className="btnTheme"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaskDateTime;

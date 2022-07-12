import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TaskAside from "../TaskAside/TaskAside";
import "./Budget.scss";
import { Link, Redirect } from "react-router-dom";
import {Svg} from "../../../../Assets/Svgs/Svg";
import CmnInput from "../../../../Components/CmnInput/CmnInput";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import AlertModal from "../../../../Components/AlertModal/AlertModal";

const Budget = (props) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMax, setminMax] = useState({ min: 0, max: 0 });
  const [location, setLocation] = useState("");
  const [taskDescribe, setTaskDescribe] = useState("");
  const [gotoStep, setgotoStep] = useState(4);
  const [taskDetails, settaskDetails] = useState([]);

  useEffect(() => {
    loadTaskDetails();
    loadDescribeDetails();
    loadLocationDetails();
    loadBudgetDetails();
  }, []);

  useEffect(() => {
    document.getElementById("cminbudget").focus();
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
        setminMax(gminmax);
        setMinPrice(gminmax.min);
        setMaxPrice(gminmax.max);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const continueTONextPage = () => {
    if (
      Number.parseFloat(minPrice) > 0 &&
      Number.parseFloat(maxPrice) > 0 &&
      Number.parseFloat(minPrice) <= Number.parseFloat(maxPrice)
    ) {
      GLocalStorage.Add("c-task-minmax", minMax);
      setgotoStep(5);
    } else {
      AlertModal.show("Please mention valid budget range.", "Required");
      setMaxPrice(minPrice);
      setminMax({ ...minMax, max: Number.parseFloat(minPrice) });
      GLocalStorage.Add("c-task-minmax", {
        ...minMax,
        max: Number.parseFloat(minPrice),
      });
      document.getElementById("cminbudget").focus();
    }
  };

  const handleChange = (e, field) => {
    if (field === "min") {
      setMinPrice(Number.parseFloat(e.target.value));
      setminMax({ ...minMax, min: Number.parseFloat(e.target.value) });
      GLocalStorage.Add("c-task-minmax", {
        ...minMax,
        min: Number.parseFloat(e.target.value),
      });
    } else if (field === "max") {
      setMaxPrice(Number.parseFloat(e.target.value));
      setminMax({ ...minMax, max: Number.parseFloat(e.target.value) });
      GLocalStorage.Add("c-task-minmax", {
        ...minMax,
        max: Number.parseFloat(e.target.value),
      });
    }
  };

  return (
    <section className="bgLightOrange pt60 pb60">
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 2 && <Redirect to="/tasks/task-description" />}
      {gotoStep === 3 && <Redirect to="/tasks/task-location" />}
      {gotoStep === 5 && <Redirect to="/tasks/task-date-time" />}
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
                <h3 className="fs24 colorBlack fBold">
                  The price is non-binding and we will never show it to
                  providers. It has only an information value for Zaaruu.
                </h3>

                <Row>
                  <Col lg={5}>
                    <CmnInput
                      id="cminbudget"
                      type="number"
                      placeholder="Minimum price"
                      value={minPrice}
                      icon={"R"}
                      onChange={(e) => handleChange(e, "min")}
                    />
                  </Col>

                  <Col lg={5}>
                    <CmnInput
                      type="number"
                      placeholder="Maximum price"
                      value={maxPrice}
                      icon={"R"}
                      onChange={(e) => handleChange(e, "max")}
                    />
                  </Col>

                  <div className="d-flex align-items-center flex-wrap justify-content-end mt30">
                    <Link
                      className="btnTheme"
                      to="#"
                      onClick={continueTONextPage}
                    >
                      Continue
                    </Link>
                  </div>
                </Row>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Budget;

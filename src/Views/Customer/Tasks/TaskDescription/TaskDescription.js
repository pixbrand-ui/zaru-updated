import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import {Svg} from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnTextarea from "../../../../Components/CmnTextarea/CmnTextarea";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import TaskAside from "../TaskAside/TaskAside";
import "./TaskDescription.scss";

const TaskDescription = (props) => {
  const [taskDescribe, setTaskDescribe] = useState("");
  const [gotoStep, setgotoStep] = useState(2);
  const [taskDetails, settaskDetails] = useState([]);

  useEffect(() => {
    loadTaskDetails();
  }, []);

  useEffect(() => {
    document.getElementById("ctaskdescription").focus();
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

        if(GLocalStorage.IsExists("c-task-describe")){
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

  const continueTONextPage = () => {
    if (taskDescribe.trim().length >= 100) {
      GLocalStorage.Add("c-task-describe", taskDescribe);
      setgotoStep(3);
    } else {
      AlertModal.show(
        "Please describe your task in minimum 100 character.",
        "Required"
      );
      document.getElementById("ctaskdescription").focus();
    }
  };
  return (
    <>
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 3 && <Redirect to="/tasks/task-location" />}
      <section className="bgLightOrange pt60 pb60">
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

              <section className="bgWhite radius pt30 pl30 pr30 pb30  border">
                <div className=" position-relative">
                  <h3 className="fs24 colorBlack fBold">Describe your task</h3>
                  <p className="mb20">
                    Start the conversation and tell your Tasker what you need
                    done. This helps us show you only qualified and available
                    Taskers for the job. Don't worry, you can edit this later.
                  </p>

                  <CmnTextarea
                    id="ctaskdescription"
                    className="height250"
                    placeholder="Hi! Looking for help updating my 650 sq ft apartment. I’m on the 2nd floor up a short flight of stairs. Please bring an electric drill and ring doorbell number 3. Thanks!"
                    onChange={(e) => {setTaskDescribe(e.target.value); GLocalStorage.Add("c-task-describe", e.target.value)}}
                    value={taskDescribe}
                  />
                  <p className="fs12" style={{ color: "orange" }}>
                    Please describe your task. (Minimum 100 character. and
                    Maximum 2000 characters)
                  </p>
                  <p>
                    If you need two or more Taskers, please post additional
                    tasks for each Tasker needed.
                  </p>
                </div>
                <div className="d-flex align-items-center flex-wrap justify-content-end">
                  <Link
                    className="btnTheme"
                    to="#"
                    onClick={continueTONextPage}
                  >
                    Continue
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

export default TaskDescription;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CmnFileUpload from "../../../../Components/CmnFileUpload/CmnFileUpload";
import FormModal from "../../../../Components/FormModal/FormModal";
import HTTP from "../../../../Helpers/Api/Api";
import Auth from "../../../../Helpers/Auth/Auth";
import API from "../../../../Helpers/Constants/Constants";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import { TaskCreated } from "../../../../Store/CommonActions/TaskCustomerActions";
import LoginAskPage from "../../Login/LoginAskPage";
import RequestSuccess from "../RequestSuccess/RequestSuccess";
import TaskAside from "../TaskAside/TaskAside";

const ImageUpload = () => {
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [timeTable, setTimeTable] = useState("");
  const [budget, setBudget] = useState("0 - 0");
  const [location, setLocation] = useState("");
  const [taskDescribe, setTaskDescribe] = useState("");
  const [gotoStep, setgotoStep] = useState(6);
  const [taskDetails, settaskDetails] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [latlong, setlatlong] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        if (val) {
          setlatlong({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude,
          });
        }
      });
    }
    loadTaskDetails();
    loadDescribeDetails();
    loadLocationDetails();
    loadBudgetDetails();
    loadDateDetails();
  }, []);

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
        setstartDate(new Date(start_date).toDateString());
        setendDate(new Date(end_date).toDateString());

        if (GLocalStorage.IsExists("c-task-timetable")) {
          setTimeTable(JSON.parse(GLocalStorage.Get("c-task-timetable")));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSelectedImages = (fileUploadData) => {
    if (fileUploadData != null && fileUploadData.length > 0) {
      console.log("fileUploadData", fileUploadData);
      setImagesData(fileUploadData);
      GLocalStorage.Add("c-task-images", fileUploadData);
    }
  };

  const saveData = () => {
    // first check user is logged in
    // if not logged in then goto login screen (modal login)
    // if user not have login details then sign up screen (modal signup)
    // after submit signup/signin task will created
    // remove LS data
    // goto task page

    //-------- check login ---------
    if (Auth.getToken() !== null) {
      if (checkData()) {
        let categoryInfo = JSON.parse(GLocalStorage.Get("c-task-category"));
        let subcategoryInfo = JSON.parse(
          GLocalStorage.Get("c-task-subcategory")
        );
        let taskInfo = JSON.parse(GLocalStorage.Get("ansSet"));
        let describeInfo = JSON.parse(GLocalStorage.Get("c-task-describe"));
        let locationInfo = JSON.parse(GLocalStorage.Get("c-task-location"));
        let budgetInfo = JSON.parse(GLocalStorage.Get("c-task-minmax"));
        let startdateInfo = JSON.parse(GLocalStorage.Get("c-task-startdate"));
        let enddateInfo = JSON.parse(GLocalStorage.Get("c-task-enddate"));
        let timeInfo = JSON.parse(GLocalStorage.Get("c-task-timetable"));
        let broadcastDetails = JSON.parse(GLocalStorage.Get("c-task-tp"));
        //console.log("taskInfo", {taskInfo : taskInfo})
        const iData = new FormData();
        iData.append("categoryid", categoryInfo._id);
        iData.append("subcategoryid", subcategoryInfo.subcategoryId[0]);
        taskInfo.forEach((e, i) => {
          if (e.answerIds.length > 0) {
            e.answerIds.forEach((k, ki) => {
              iData.append(`catqueans[${i}][answerIds][${ki}]`, k);
            });
          }
          iData.append("catqueans[" + i + "][answerText]", e.answerText);
          iData.append("catqueans[" + i + "][labelText]", e.labelText);
          iData.append("catqueans[" + i + "][questionSetId]", e.questionSetId);
        });
        //iData.append("catqueans[]", JSON.stringify(taskInfo));
        iData.append("information", describeInfo);
        
        iData.append("location", {
          coordinates: [latlong.latitude, latlong.longitude],
        });
        iData.append("address", locationInfo);
        iData.append("latitude", locationInfo);
        iData.append("longitude", locationInfo);
        iData.append("minbudget", budgetInfo.min);
        iData.append("maxbudget", budgetInfo.max);
        iData.append("fromdate", new Date(startdateInfo).toDateString());
        iData.append("todate", new Date(enddateInfo).toDateString());
        iData.append("timeslot", timeInfo);
        iData.append("isflexible", timeInfo === "I'm flexible" ? true : false);
        iData.append(
          "title",
          `${categoryInfo.category_name} - ${subcategoryInfo.labelText}`
        );
        iData.append("relased", true);
        iData.append(
          "isBroadcast",
          broadcastDetails ? broadcastDetails.isb : true
        );
        iData.append(
          "requestedfor",
          broadcastDetails ? broadcastDetails.ib : ""
        );
        iData.append("files", "");
        if (imagesData.length > 0) {
          imagesData.forEach((element, index) => {
            iData.append("files", element.file);
          });
        }

        console.log("iData",latlong);

        HTTP.postimage(API.addTask, iData, true, false, Auth.getToken()).then(
          (res) => {
           console.log(res);
            if (res && res.status && res.status.toString() === "200") {
           
              // dispatch(TaskCreated(res.data));
              FormModal.show(
                <RequestSuccess callback={setgotoStep} />,
                "",
                () => {},
                "xs",
                "",
                false,
                false
              );
              removeLSData();
            }
          }
        );
      } else {
        AlertModal.show(
          "Invalid information founded in your task. Please review your task.",
          "Oops!",
          () => {
            setgotoStep(1);
          }
        );
      }
    } else {
      // go to login/signup screen
      FormModal.show(
        <LoginAskPage />,
        //"You are not logged in, Please login to your account. If you not have registered account please Signup.",
        "Login Required",
        () => {
          // open login/signup modal
        },
        "md"
      );
    }

    //AlertModal.show(<RequestSuccess />, "", () => {}, "lg");
  };

  const checkData = () => {
    let result = false;
    if (
      GLocalStorage.IsExists("ansSet") &&
      GLocalStorage.IsExists("c-task-category") &&
      GLocalStorage.IsExists("c-task-subcategory") &&
      GLocalStorage.IsExists("c-task-describe") &&
      GLocalStorage.IsExists("c-task-location") &&
      GLocalStorage.IsExists("c-task-minmax") &&
      GLocalStorage.IsExists("c-task-startdate") &&
      GLocalStorage.IsExists("c-task-enddate") &&
      GLocalStorage.IsExists("c-task-timetable")
    )
      result = true;
    return result;
  };

  const removeLSData = () => {
    GLocalStorage.Remove("ansSet");
    GLocalStorage.Remove("c-task-category");
    GLocalStorage.Remove("c-task-subcategory");
    GLocalStorage.Remove("c-task-describe");
    GLocalStorage.Remove("c-task-location");
    GLocalStorage.Remove("c-task-minmax");
    GLocalStorage.Remove("c-task-startdate");
    GLocalStorage.Remove("c-task-enddate");
    GLocalStorage.Remove("c-task-timetable");
    GLocalStorage.Remove("task-pending");
    GLocalStorage.Remove("c-task-images");
    GLocalStorage.Remove("c-task-ansset");
  };

  return (
    <>
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 2 && <Redirect to="/tasks/task-description" />}
      {gotoStep === 3 && <Redirect to="/tasks/task-location" />}
      {gotoStep === 4 && <Redirect to="/tasks/budget" />}
      {gotoStep === 5 && <Redirect to="/tasks/task-date-time" />}
      {gotoStep === 7 && <Redirect to="/customer/dashboard" />}
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
                  <Link className="pTopRight" to="/tasks/task-date-time">
                    {Svg.pencilBlack}
                  </Link>

                  <h3 className="fs24 colorBlack fBold">Schedule Time</h3>
                  <p className="mb0">{`Scheduled between ${startDate} - ${endDate}, at ${timeTable}`}</p>
                </div>
              </section>

              <section className="bgWhite radius pt30 pl30 pr30 pb30 border">
                <div className=" position-relative">
                  <h3 className="fs24 colorBlack fBold">
                    Upload Images (Optional)
                  </h3>
                  <p className="mb25">
                    Upload images which is related or describe your task.
                  </p>
                </div>

                <CmnFileUpload
                  id="fielUpload"
                  name="fielUpload"
                  callback={getSelectedImages}
                />

                <div className="d-flex align-items-center flex-wrap justify-content-end mt30">
                  <CmnButton
                    type="square"
                    icon={Svg.book}
                    text="Send Request"
                    onClick={(e) => {
                      saveData();
                    }}
                  />
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ImageUpload;

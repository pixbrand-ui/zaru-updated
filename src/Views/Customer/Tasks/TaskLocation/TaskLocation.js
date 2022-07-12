import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Svg } from "../../../../Assets/Svgs/Svg";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import CmnButton from "../../../../Components/CmnButton/CmnButton";
import CmnInput from "../../../../Components/CmnInput/CmnInput";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import TaskAside from "../TaskAside/TaskAside";
import Autocomplete from "react-google-autocomplete";
import "./TaskLocation.scss";

const TaskLocation = (props) => {
  const [location, setLocation] = useState("");
  const [taskDescribe, setTaskDescribe] = useState("");
  const [gotoStep, setgotoStep] = useState(3);
  const [taskDetails, settaskDetails] = useState([]);
  const [latlong, setlatlong] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    console.log("location is : ", location);
    console.log("lat-long is : ", latlong);
  });

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
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((val) => {
  //       if (val) {
  //         setlatitude(val.coords.latitude);
  //         setlongitude(val.coords.longitude);
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    document.getElementById("clocation").focus();
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
        setLocation(gtasklocation);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const continueTONextPage = () => {
    if (location.trim().length > 0) {
      GLocalStorage.Add("c-task-location", location);
      setgotoStep(4);
    } else {
      AlertModal.show("Please mention your location.", "Required");
      document.getElementById("clocation").focus();
    }
  };


  const getLocation = () => {
    // #aaqib
 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val) => {
        console.log("lattt",val);
        // if (val) {
        //   setlatlong({
        //     latitude: val.geometry.location.lat(),
        //     longitude: val.geometry.location.lng(),
        //   });
        // }
      });
    }
    console.log("location is : ", location);
    console.log("lat-long is : ", latlong.latitude);
  };

  return (
    <section className="bgLightOrange pt60 pb60">
      {gotoStep === 1 && <Redirect to="/tasks/task-details" />}
      {gotoStep === 2 && <Redirect to="/tasks/task-description" />}
      {gotoStep === 4 && <Redirect to="/tasks/budget" />}
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
                <h3 className="fs24 colorBlack fBold">Your task location</h3>
                <p className="mb0">
                  Don't worry, your address will only be seen by the winning
                  service provider.
                </p>

                <div className="mapArea mt30">
                  {/* <CmnButton
                    type="noBg"
                    className="btnBorder w-100 d-block pt10 pb10 border radius d-flex align-items-center flex-wrap justify-content-center colorBlackspan mb15"
                    icon={//Svg.locationMap}
                    text="Use my location"
                    onClick={getLocation}
                  /> */}
                  <div className="position-relative iconLeft">
                    <Autocomplete
                     options={{
                      types: ["(regions)"],
                    }}
                      apiKey="AIzaSyB5DozhssD2YsMZV6aOfdznWqqbR6dM6_w"
                      onPlaceSelected={(place) => {
                        // #aaqib
                        setLocation(place.formatted_address);
                        setlatlong({
                          latitude: place.geometry.location.lat(),
                          longitude: place.geometry.location.lng(),
                        });
                      }}
                      className="w-100 inputTransparent  outlineNone mobRadius7 pl30"
                    />
                  </div>

                  <CmnInput
                    id="clocation"
                    type="text"
                    className="d-none"
                    placeholder="Location"
                    postionLeft={true}
                    icon=""
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  <div className="mapList mb30">
                 
                    <iframe
                      key={latlong}
                      title="542313431asd48"
                      // #aaqib
                      src={`https://maps.google.com/maps?q=${latlong.latitude},${latlong.longitude}&z=15&output=embed`}
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
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
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaskLocation;

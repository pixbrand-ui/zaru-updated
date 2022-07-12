/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import SingleSelect from "../QuestionGenerator/SingleSelect";
import TaskAside from "../TaskAside/TaskAside";
import "./TaskDetails.scss";
import { Link } from "react-router-dom";
import GLocalStorage from "../../../../Helpers/Global/GLocalStorage";
import HTTP from "../../../../Helpers/Api/Api";
import API from "../../../../Helpers/Constants/Constants";
import SingleSelectSubcategory from "../QuestionGenerator/SingleSelectSubcategory";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";
import MultiSelect from "../QuestionGenerator/MultiSelect";
import HowManyCounts from "../QuestionGenerator/HowManyCounts";
import AlertModal from "../../../../Components/AlertModal/AlertModal";
import AlertModal02 from "../../../../Components/AlertModal02/AlertModal02";
import ConfirmModal from "../../../../Components/ConfirmModal/ConfirmModal";

const TaskDetails = (props) => {
  const [selectedSubcategory, setselectedSubcategory] = useState(null);
  const [ansSet, setAnsSet] = useState(
    JSON.parse(GLocalStorage.Get("ansSet")) || []
  );
  const [category, setcategory] = useState(null);
  const [subcategorieslist, setsubcategorieslist] = useState([]);
  const [subcat_selectedindex, setsubcat_selectedindex] = useState(-1);
  const [questionslist, setquestionslist] = useState([]);
  const [stepsDone, setstepsDone] = useState(0);
  const [gotoPage, setgotoPage] = useState("");

  const location = useLocation();
  const history = useHistory();

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
    GLocalStorage.Remove("c-task-tp");
  };
  const openModal = () => {
    AlertModal02.show(
      <ConfirmModal />,
      "",
      () => {
        removeLSData();
        var val = GLocalStorage.IsExists("zaaruuworkbench");
        var authdata = JSON.parse(GLocalStorage.Get("zaaruuworkbench"));
        if (val) {
          if (authdata[0].role === "Customer") {
            history.push("/customer/dashboard");
          } else if (authdata[0].role === "Provider") {
            history.push("/provider/dashboard");
          }
        } else {
          history.push("/");
        }
      },
      "sm",
      "Sure"
    );
  };

  useEffect(() => {
    // pass props.categoryid here
    //console.log("only one time...");
    if (GLocalStorage.IsExists("c-task-category")) {
      let cat = JSON.parse(GLocalStorage.Get("c-task-category"));
      if (location.state && location.state.categoryid) {
        if (location.state.categoryid === cat._id) {
          loadCategories(cat._id);
        } else {
          loadCategories(
            location.state.categoryid || "61d59c0220c94fa23a6041a9"
          );
        }
      }
      loadCategories(cat._id);
    } else {
      //console.log(location.state);
      loadCategories(
        location.state && location.state.categoryid
          ? location.state.categoryid
          : "61d59c0220c94fa23a6041a9"
      );
    }
  }, []);

  useEffect(() => {
    if (category != null) {
      GLocalStorage.Add("c-task-category", category);
      loadSubCategories(category._id).then((res) => {
        setsubcategorieslist(res);
        if (GLocalStorage.IsExists("c-task-subcategory")) {
          let subcat = JSON.parse(GLocalStorage.Get("c-task-subcategory"));
          res.forEach((element, i) => {
            if (element.id === subcat.subcategoryId[0]) {
              setsubcat_selectedindex(i);
            }
          });
        }
      });
    }
  }, [category]);

  useEffect(() => {
    if (selectedSubcategory !== null) {
      GLocalStorage.Add("c-task-subcategory", selectedSubcategory);
      loadQuestions(selectedSubcategory.subcategoryId[0]).then((res) => {
        setquestionslist(res);
        //console.log("Questions rendered...");

        let new_c_ans_data = [];
        if (GLocalStorage.IsExists("c-task-ansset")) {
          var ls_ansdata = JSON.parse(GLocalStorage.Get("c-task-ansset"));
          ls_ansdata.forEach((element, index) => {
            res.forEach((ele, ind) => {
              if (element.questionSetId === ele._id) {
                new_c_ans_data.push(element);
              }
            });
          });
          setAnsSet(new_c_ans_data);
          GLocalStorage.Update("c-task-ansset", new_c_ans_data);
        }
      });
    }
  }, [selectedSubcategory]);

  useEffect(() => {}, [questionslist]);

  const loadCategories = async (id = "") => {
    LoadingModal.show("Please wait...");
    await HTTP.get(API.get_categoryinfo + id, "", false).then((res) => {
      if (res && res.status && res.status.toString() === "200") {
        if (res.data) {
          setcategory(res.data);
        } else {
          setcategory(null);
        }
      }
    });
    LoadingModal.hide();
  };

  const loadSubCategories = async (id) => {
    let data = [];
    let iData = {
      categoryid: id,
    };
    LoadingModal.show("Please wait...");
    await HTTP.post(API.getSubCategoryByCategory, iData, false, false, "").then(
      (res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data && res.data.length > 0) {
            res.data.map((i, ind) => {
              data.push({
                id: i._id,
                questionDataid: i._id,
                label: i.subcategory_name,
              });
              return <span key={ind}></span>;
            });
          } else {
            setsubcategorieslist([]);
            data = [];
          }
        }
      }
    );
    LoadingModal.hide();
    return data;
  };

  const loadQuestions = async (id) => {
    let data = [];
    let iData = {
      subcategoryid: id,
    };
    setquestionslist([]);
    LoadingModal.show("Please wait...");
    await HTTP.post(API.questionBySubcat, iData, false, false, "").then(
      (res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data && res.data.length > 0) {
            res.data.map((i, ind) => {
              data = res.data;
              return <span key={ind}></span>;
            });
          } else {
            setquestionslist([]);
            data = [];
          }
        }
      }
    );
    //setAnsSet([]);
    LoadingModal.hide();
    return data;
  };

  const addModifyAnswerSet = (data) => {
    //console.log("data on tasks", data);
    let currentSet = [];
    currentSet = ansSet;
    let isexists = false;
    let index = 0;
    if (currentSet.length > 0) {
      currentSet.forEach((element) => {
        if (element.questionSetId === data.questionSetId) {
          //modify it
          isexists = true;
          index = currentSet.indexOf(element);
        }
      });
      if (!isexists) {
        currentSet.push(data);
      } else {
        currentSet[index].answerIds = data.answerIds;
        currentSet[index].labelText = data.labelText;
        currentSet[index].answerText = data.answerText;
      }
    } else {
      currentSet.push(data);
    }
    //console.log("currentSet", currentSet);
    GLocalStorage.Add("c-task-ansset", currentSet);
    setAnsSet(currentSet);
  };

  const getSelectedSubcategory = (data) => {
    setselectedSubcategory(data);
  };

  useEffect(() => {
    return () => {
      continueTONextPage();
    };
  }, []);

  const continueTONextPage = () => {
    // get questions list
    // apply loop
    // check which field is required
    // then check that required field is exists in ansSet
    let total_required_fields = 0;
    let check_required_fields = 0;
    let checked_status = false;
    let list_of_required_fields = [];
    let remain_fields = [];
    if (questionslist.length > 0) {
      questionslist.forEach((ele, ind) => {
        if (ele.isRequired) {
          total_required_fields = total_required_fields + 1;
          list_of_required_fields.push(ele);
        }
      });
      if (total_required_fields > 0) {
        list_of_required_fields.forEach((ele, ind) => {
          checked_status = false;
          if (ansSet.length > 0) {
            ansSet.forEach((kle, knd) => {
              if (ele._id === kle.questionSetId) {
                check_required_fields = check_required_fields + 1;
                checked_status = true;
              }
            });
          }
          if (!checked_status) {
            remain_fields.push(ele);
          }
        });
      }

      // console.log("total_required_fields", total_required_fields);
      // console.log("check_required_fields", check_required_fields);
      // console.log("list_of_required_fields", list_of_required_fields);
      // console.log("remain_fields", remain_fields);

      if (total_required_fields !== check_required_fields) {
        if (remain_fields.length > 0) {
          AlertModal.show(
            `Please mention ${remain_fields[0].qusTitle}.`,
            "Request - Required fields",
            () => {}
          );
        }
      } else {
        setstepsDone(1);
        GLocalStorage.Add("ansSet", ansSet);
      }
    }
  };

  return (
    <section className="bgLightOrange pt60 pb60">
      {gotoPage === "customer/dashboard" && (
        <Redirect to="/customer/dashboard" />
      )}
      <Container>
        <Row>
          <Col lg={3} md={3} xl={3}>
            <TaskAside />
          </Col>

          <Col lg={9} md={9} xl={9}>
            <section className="bgWhite radius pt30 pl30 pr30 pb30 border">
              <div className="mb30">
                <h3 className="fs24 colorBlack fBold">
                  Tell us the details of your task
                </h3>
                <p>
                  Start the conversation and tell your Tasker what you need
                  done. This helps us show you only qualified and available
                  Taskers for the job. Don't worry, you can edit this later.
                </p>
              </div>

              {/* Render sub categories of selcted category */}
              {/* whenever user click on any sub category, Questions of selected subcategory will load below */}
              {subcategorieslist.length > 0 && (
                <SingleSelectSubcategory
                  title={`What type of ${
                    category.category_name ? category.category_name : "service"
                  } do you need?`}
                  name={"selsubcategory#10105478"}
                  categoryId={category._id}
                  callback={getSelectedSubcategory}
                  selectedIndex={subcat_selectedindex}
                  values={subcategorieslist}
                />
              )}

              {/* Render questions of selected sub category */}

              {questionslist.length > 0 ? (
                questionslist.map((i, ind) => {
                  if (i.qusType === "SingleChoice") {
                    return (
                      <SingleSelect
                        key={ind}
                        title={i.qusTitle}
                        name={i.qusName}
                        questionSetId={i.id}
                        callback={addModifyAnswerSet}
                        selectedIndex={-1}
                        values={
                          i.ansdata &&
                          i.ansdata.length > 0 &&
                          i.ansdata.map((k, knd) => {
                            return {
                              key: { knd },
                              id: k._id,
                              questionDataid: k._id,
                              label: k.data,
                            };
                          })
                        }
                      />
                    );
                  } else if (i.qusType === "MultiChoice") {
                    return (
                      <MultiSelect
                        key={ind}
                        title={i.qusTitle}
                        name={i.qusName}
                        questionSetId={i.id}
                        callback={addModifyAnswerSet}
                        selectedIndexes={[-1]}
                        values={
                          i.ansdata &&
                          i.ansdata.length > 0 &&
                          i.ansdata.map((k, knd) => {
                            return {
                              key: { knd },
                              id: k._id,
                              questionDataid: k._id,
                              label: k.data,
                            };
                          })
                        }
                      />
                    );
                  } else if (i.qusType === "Number") {
                    return (
                      <HowManyCounts
                        key={ind}
                        title={i.qusTitle}
                        name={i.qusName}
                        questionSetId={i.id}
                        callback={addModifyAnswerSet}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })
              ) : (
                <></>
              )}
              {stepsDone > 0 && <Redirect to="/tasks/task-description" />}
              <div className="d-flex align-items-center flex-wrap justify-content-end">
                <Link
                  onClick={openModal}
                  className="btnTheme mr5 btnBlack"
                  to="#"
                >
                  Cancel
                </Link>
                <Link
                  onClick={(e) => continueTONextPage()}
                  className="btnTheme"
                  to="#"
                >
                  Continue
                </Link>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaskDetails;

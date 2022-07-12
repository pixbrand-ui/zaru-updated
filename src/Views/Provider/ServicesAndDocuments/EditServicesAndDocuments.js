/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col,  Row } from "reactstrap";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import Img from "../../../Assets/Img/Img";
import CmnFileUploadFile from "../../../Components/CmnFileUploadFile/CmnFileUploadFile";
import Select from "react-select";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import {  useParams } from "react-router-dom";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import GAlign from "../../../Components/GComponents/GAlign";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";

const EditServicesAndDocuments = (props) => {
  const { refid } = useParams();
  const [showProgress, setshowProgress] = useState(false);
  const [serCategory, setserCategory] = useState("");
  const [serCategoryList, setserCategoryList] = useState([]);
  const [serSubCategory, setserSubCategory] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [serDescription, setserDescription] = useState("");
  const [addressproffFile, setaddressproffFile] = useState("");
  const [displayAddressproffFile, setdisplayAddressproffFile] = useState("");
  const [indentityFile, setindentityFile] = useState("");
  const [displayIndentityDoc, setdisplayIndentityDoc] = useState("");
  const [businessRegFile, setbusinessRegFile] = useState("");
  const [bussinessregdoc, setbussinessregdoc] = useState("");
  const [displayInsurance, setdisplayInsurance] = useState("");
  const [insuranceFile, setinsuranceFile] = useState("");
  const [displayOtherdoc, setdisplayOtherdoc] = useState("");

  const [otherFile, setotherFile] = useState("");

  useEffect(() => {
    loadParentCategories();
    if (refid) {
      loadData().then((res) => {
        if (res) {
          setserCategory({
             label: res.workingcategories.category_name,
             value: res.workingcategories.id,
          });
          setTimeout(() => {
            if (res.subcategory && res.subcategory.length > 0) {
              let subcategorydata = [];
              res.subcategory.forEach((element) => {
                subcategorydata.push({
                  value: element._id,
                  label: element.subcategory_name,
                });
              });
              setserSubCategory(subcategorydata);
            }
          }, 1000);
          setdisplayIndentityDoc(res.identitydoc);
          setdisplayAddressproffFile(res.addressdoc);
          setserDescription(res.description);
          setbussinessregdoc(res.bussinessregdoc);
          setdisplayInsurance(res.insurancedoc);
          setdisplayOtherdoc(res.insurancedoc);
        }

        setshowProgress(false);
        //console.log("Business info : ", res);
      });
    }
  }, []);

  useEffect(() => {
    setSubCategoryList([]);
    loadSubCategories();
  }, [serCategory]);

  useEffect(() => {
    setserSubCategory([]);
  }, [subCategoryList]);

  const getExtension = (url) => {
    let fileName = url;
    let fileExtension = fileName.split(".").pop();
    return fileExtension;
  };

  const loadData = async () => {
    let result = "";
    try {
      if (Auth.getToken() !== null) {
        setshowProgress(true);
        await HTTP.get(
          API.getBusinessInfo + refid,
          false,
          Auth.getToken()
        ).then((res) => {
          console.log("data on load", res);
          if (res && res.status && res.status.toString() === "200") {
            result = res.data;
            return result;
          } else {
            result = null;
            setshowProgress(false);
            return result;
          }
        });
      }
    } catch (error) {
      console.error(error);
      setshowProgress(false);
    }
    return result;
  };

  const loadParentCategories = async () => {
    let fdata = [];
    setserSubCategory("");
    setSubCategoryList("");
    await HTTP.get(API.get_categories, false).then((res) => {
      if (res && res.status && res.status.toString() === "200") {
        //console.log("ress",res);
        res.data.forEach((element, index) => {
          fdata.push({ value: element._id, label: element.category_name });
        });
        setserCategoryList(fdata);
      }
    });
    return fdata;
  };

  const loadSubCategories = async () => {
    const iData = {
      categoryid: serCategory.value,
    };
    let subData = [];
    await HTTP.post(
      API.subCatByParentCat,
      iData,
      true,
      false,
      Auth.getLoginAuth()
    ).then((res) => {
      if (res && res.status && res.status.toString() === "200") {
        res.data.forEach((element, index) => {
          subData.push({ value: element._id, label: element.subcategory_name });
        });
        setSubCategoryList(subData);
      }
    });
    return subData;
  };

  const getFile_Identity = (data) => {
    if (data != null) {
      setindentityFile(data);
    }
  };

  const getFile_AddressProff = (data) => {
    if (data != null) {
      setaddressproffFile(data);
    }
  };

  const getFile_BusinessReg = (data) => {
    if (data != null) {
      setbusinessRegFile(data);
    }
  };

  const getFile_Insurance = (data) => {
    if (data != null) {
      setinsuranceFile(data);
    }
  };

  const getFile_Other = (data) => {
    if (data != null) {
      setotherFile(data);
    }
  };

  const saveData = () => {
    try {
      console.log("file: ", indentityFile);

      if (
        serCategory === "" ||
        serCategory.value === null ||
        serCategory.value === ""
      ) {
        return AlertModal.show(
          "Please select your working category.",
          "Fill required fields"
        );
      }
      if (serCategory.length <= 0) {
        return AlertModal.show(
          "Please select your working category.",
          "Fill required fields"
        );
      }
      if (serDescription === "") {
        return AlertModal.show(
          "Please fill description field.",
          "Fill required fields"
        );
      }
      /// if form mode is update, then we dont need to check and pass documents
      /// if user want to change documents the he can re-upload it
      // if (formMode !== "update") {
      //   if (indentityFile === "" || indentityFile === null) {
      //     return AlertModal.show(
      //       "Please upload indentity file",
      //       "Upload required file"
      //     );
      //   }

      //   if (addressproffFile === "" || addressproffFile === null) {
      //     return AlertModal.show(
      //       "Please upload address profile file",
      //       "Upload required file"
      //     );
      //   }

      //   if (businessRegFile === "" || businessRegFile === null) {
      //     return AlertModal.show(
      //       "Please upload business register file",
      //       "Upload required file"
      //     );
      //   }
      // }
      // set idata
      const iData = new FormData();
      iData.append("workingcategories[0]", serCategory.value);
      if (serSubCategory.length > 0) {
        serSubCategory.map((f, i) => {
          return iData.append("subcategory[" + i + "]", f.value);
        });
      } else {
        iData.append("subcategory[]", "");
      }
      iData.append("description", serDescription);
      console.log(indentityFile);
      if (indentityFile !== "") {
        iData.append(
          "identitydoc",
          indentityFile !== "" ? indentityFile[0].file : ""
        );
      }

      if (addressproffFile !== "") {
        iData.append(
          "addressdoc",
          addressproffFile !== "" ? addressproffFile[0].file : ""
        );
      }

      if (businessRegFile !== "") {
        iData.append(
          "bussinessregdoc",
          businessRegFile !== "" ? businessRegFile[0].file : ""
        );
      }

      iData.append(
        "insurancedoc",
        insuranceFile !== "" ? insuranceFile[0].file : ""
      );
      iData.append("otherdoc", otherFile !== "" ? otherFile[0].file : "");

      const businessID = JSON.parse(GLocalStorage.Get("c-bref"));
      const completeUrl = API.businessCategoryUpdate + businessID;

      HTTP.put(completeUrl, iData, true, false, Auth.getToken()).then((res) => {
        if (res && res.status && res.status === 200) {
          AlertModal02.show(
            <div className="p-2">
              Services & documents updated successfully.
            </div>,
            "Success!",
            () => {
              window.location.reload();
            }
          );
        }
      });

      // call api
    } catch (e) {
      console.log(e, "Error in service and doucment page");
    }
  };

  return (
    <>
      <div className="p-2">
        <Row>
          <Col lg={12} md={12} xl={12}>
            <GAlign align="between" className="mb-2">
              <h3 className="fs24 colorBlack fBold">
                Edit Service & Documents
              </h3>
              <CmnButton
                type="square"
                onClick={(e) => saveData()}
                text="Update"
              />
            </GAlign>
            {showProgress && (
              <div className="pageBody">
                <LoadinMsg message="Please wait" />
              </div>
            )}

            {!showProgress && (
              <section className="bgWhite radius mb30 border">
                <div className="pl30 pr30 pt30 pb30">
                  <h3 className="fs20 mb20 colorBlack">
                    Business Categories & Description
                  </h3>

                  <div className="mb20">
                    <Select
                      classNamePrefix="themeSelect"
                      className="themeSelect"
                      options={
                        serCategoryList.length > 0 ? serCategoryList : []
                      }
                      value={serCategory}
                      placeholder={<div>Choose Category</div>}
                      onChange={(e) => setserCategory(e)}
                    />
                  </div>

                  <div className="mb20">
                    <Select
                      classNamePrefix="themeSelect"
                      className="themeSelect"
                      options={
                        subCategoryList.length > 0 ? subCategoryList : []
                      }
                      value={serSubCategory}
                      placeholder={<div>Subcategory/keywords</div>}
                      onChange={(e) => setserSubCategory(e)}
                      isMulti={true}
                    />
                  </div>

                  <p className="fs15">
                    Add keywords that relate specifically to your business.
                    Customer requests are matched to your keywords and sent to
                    you.
                  </p>
                  <CmnTextarea
                    className="heightVh20 colorPara"
                    label="Description"
                    placeholder="Enter a detailed description of what your business does and its experience"
                    onChange={(e) => setserDescription(e.target.value)}
                    value={serDescription}
                  />
                </div>
                <div className="bBottom mb30"></div>
                <div className="pl30 pr30">
                  <div className="d-flex">
                    <h3 className="fs20 colorBlack mb30 mr10">
                      Credentials - Upload to earn a verified badge
                    </h3>
                    <div>
                      <img src={Img.badge.default} alt="" />
                    </div>
                  </div>

                  <div className="mb20">
                    {displayIndentityDoc !== null ? (
                      <>
                        <Row className="gy-3 mb10">
                          <Col md={8}>
                            {getExtension(displayIndentityDoc) === "jpg" ||
                            getExtension(displayIndentityDoc) === "png" ||
                            getExtension(displayIndentityDoc) === "jpeg" ? (
                              <div className="uploadImg w150">
                                <img
                                  className="img-fluid h-100 w-100 radius cover"
                                  src={API.imageurl + displayIndentityDoc}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <a href={API.imageurl + displayIndentityDoc}>
                                Document
                              </a>
                            )}
                          </Col>

                          <Col md={4} className="col-md-4 align-self-center">
                            <div className="d-flex flex-column align-items-md-end justify-content-md-end flex-wrap">
                              <CmnFileUploadFile
                                label="Change"
                                callback={getFile_Identity}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between mb15">
                        <p className="fs16 colorBlack mb0 mr15">
                          Identity Document *
                        </p>
                        <div>
                          <CmnFileUploadFile callback={getFile_Identity} />
                        </div>
                      </div>
                    )}

                    {displayAddressproffFile !== null ? (
                      <>
                        <Row className="gy-3 mb10">
                          <Col md={8}>
                            {getExtension(displayAddressproffFile) === "jpg" ||
                            getExtension(displayAddressproffFile) === "png" ||
                            getExtension(displayAddressproffFile) === "jpeg" ? (
                              <div className="uploadImg w150">
                                <img
                                  className="img-fluid h-100 w-100 radius"
                                  src={API.imageurl + displayAddressproffFile}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <a href={API.imageurl + displayAddressproffFile}>
                                Document
                              </a>
                            )}
                          </Col>

                          <Col md={4} className="col-md-4 align-self-center">
                            <div className="d-flex flex-column align-items-md-end justify-content-md-end flex-wrap">
                              <CmnFileUploadFile
                                label="Change"
                                callback={getFile_Identity}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between mb15">
                        <p className="fs16 colorBlack mb0 mr15">
                          Proof of Address *
                        </p>
                        <div>
                          <CmnFileUploadFile callback={getFile_AddressProff} />
                        </div>
                      </div>
                    )}

                    {bussinessregdoc !== null ? (
                      <>
                        <Row className="gy-3 mb10">
                          <Col md={8}>
                            {getExtension(bussinessregdoc) === "jpg" ||
                            getExtension(bussinessregdoc) === "png" ||
                            getExtension(bussinessregdoc) === "jpeg" ? (
                              <div className="uploadImg w150">
                                <img
                                  className="img-fluid h-100 w-100 radius"
                                  src={API.imageurl + bussinessregdoc}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <a href={API.imageurl + bussinessregdoc}>
                                Document
                              </a>
                            )}
                          </Col>

                          <Col md={4} className="col-md-4 align-self-center">
                            <div className="d-flex flex-column align-items-md-end justify-content-md-end flex-wrap">
                              <CmnFileUploadFile
                                label="Change"
                                callback={getFile_Identity}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between mb15">
                        <p className="fs16 colorBlack mb0 mr15">
                          Business Registration *
                        </p>
                        <div>
                          <CmnFileUploadFile callback={getFile_BusinessReg} />
                        </div>
                      </div>
                    )}
                    {displayInsurance !== null ? (
                      <>
                        <Row className="gy-3 mb10">
                          <Col md={8}>
                            {getExtension(displayInsurance) === "jpg" ||
                            getExtension(displayInsurance) === "png" ||
                            getExtension(displayInsurance) === "jpeg" ? (
                              <div className="uploadImg w150">
                                <img
                                  className="img-fluid h-100 w-100 radius"
                                  src={API.imageurl + displayInsurance}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <a href={API.imageurl + displayInsurance}>
                                Document
                              </a>
                            )}
                          </Col>

                          <Col md={4} className="col-md-4 align-self-center">
                            <div className="d-flex flex-column align-items-md-end justify-content-md-end flex-wrap">
                              <CmnFileUploadFile
                                label="Change"
                                callback={getFile_Identity}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between mb15">
                        <p className="fs16 colorBlack mb0 mr15">
                          Insurance (Optional)
                        </p>
                        <div>
                          <CmnFileUploadFile callback={getFile_Insurance} />
                        </div>
                      </div>
                    )}

                    {displayOtherdoc !== null ? (
                      <>
                        <Row className="gy-3 mb10">

                          <Col md={8}>
                            {getExtension(displayOtherdoc) === "jpg" ||
                            getExtension(displayOtherdoc) === "png" ||
                            getExtension(displayOtherdoc) === "jpeg" ? (
                              <div className="uploadImg w150">
                                <img
                                  className="img-fluid h-100 w-100 radius"
                                  src={API.imageurl + displayOtherdoc}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <a href={API.imageurl + displayOtherdoc}>
                                Document
                              </a>
                            )}
                          </Col>

                          <Col md={4} className="col-md-4 align-self-center">
                            <div className="d-flex flex-column align-items-md-end justify-content-md-end flex-wrap">
                              <CmnFileUploadFile
                                label="Change"
                                callback={getFile_Identity}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="fs16 colorBlack mb0 mr15">
                          Other (Optional)
                        </p>
                        <div>
                          <CmnFileUploadFile callback={getFile_Other} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-end mb30">
                    <CmnButton
                      onClick={() => saveData()}
                      type="square"
                      text="Update"
                      className=""
                    />
                  </div>
                </div>
              </section>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditServicesAndDocuments;

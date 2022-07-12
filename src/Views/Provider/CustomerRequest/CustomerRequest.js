import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Select from "react-select";
import "./CustomerRequest.scss";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import { Svg } from "../../../Assets/Svgs/Svg";
import NewLeads from "./NewLeads";
import PurchasedLeads from "./PurchasedLeads";
import ClosedLeads from "./ClosedLeads";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import { Redirect } from "react-router-dom";
import RequestedLeads from "./RequestedLeads";
import BroadcastLeads from "./BroadcastLeads";

const CustomerRequest = (props) => {
  const [showProgress, setshowProgress] = useState(true);
  const [businesses, setbusinesses] = useState([]);
  const [selectedbusiness, setselectedbusiness] = useState([]);
  const [businessNameList, setbusinessNameList] = useState([]);

  useEffect(() => {
    loadBusiness().then((res) => {
      setbusinesses(res);
      var _businesslist = [];
      if (res.length > 0) {
        res.forEach((element, idnex) => {
          if (element.profilestatus === 4) {
            _businesslist.push({
              value: element._id,
              label: element.bussinessname,
            });
          }
        });
        setbusinessNameList(_businesslist);
        setselectedbusiness(_businesslist[0]);
      }
      setshowProgress(false);
    });
  }, []);

  const loadBusiness = async () => {
    setshowProgress(true);
    var result = [];
    try {
      await HTTP.get(API.getBusinessList, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status) {
            if (res.status.toString() === "200") {
              if (res.data) {
                result = res.data;
                return result;
              }
            } else if (res.status.toString() === "201") {
              AlertModal.status(res.message, "OOps!");
              setshowProgress(false);
            } else {
              console.error("error : ", res);
              setshowProgress(false);
            }
          }
        }
      );
    } catch (error) {
      console.error("CustomerRequest : ", error);
      setshowProgress(false);
    }
    return result;
  };
  const [requestType, setrequestType] = useState("newleads");
  const [reloadRequired, setreloadRequired] = useState(false);

  const applyRefreshData = () => {
    setreloadRequired(true);
  };

  return (
    <>
      {showProgress && (
        <div className="pageBody">
          <LoadinMsg message="Please wait" />
        </div>
      )}
      {!showProgress && businessNameList.length <= 0 && (
        <Redirect to="/provider/business-profile" />
      )}

      {!showProgress && businessNameList.length > 0 && (
        <section className="bgLightOrange">
          <div className="tabbingSection bgLightOrange bgWhite bTop mb40 pt5 pb5">
            <Container>
              <Row className="align-items-center gy-4 mobColomnReverse">
                <Col lg={6} xl={6}>
                  <div className="d-flex align-items-center ">
                    <CmnButton
                      type="noBg"
                      text="New Leads"
                      className={`${
                        requestType === "newleads" ? "activeTab" : ""
                      } colorBlack pt15 pb15 tabTrigger pr15`}
                      onClick={(e) => setrequestType("newleads")}
                    />
                    <CmnButton
                      type="noBg"
                      text="Requested Leads"
                      className={`${
                        requestType === "requestedleads" ? "activeTab" : ""
                      } colorBlack pt15 pb15 tabTrigger pl15 pr15`}
                      onClick={(e) => setrequestType("requestedleads")}
                    />
                    <CmnButton
                      type="noBg"
                      text="Purchsed Leads"
                      className={`${
                        requestType === "purchasedLeader" ? "activeTab" : ""
                      } colorBlack pt15 pb15 tabTrigger pl15 pr15`}
                      onClick={(e) => setrequestType("purchasedLeader")}
                    />
                    <CmnButton
                      type="noBg"
                      text="Closed Lead"
                      className={`${
                        requestType === "closedLead" ? "activeTab" : ""
                      } colorBlack pt15 pb15 tabTrigger pl15 pr15`}
                      onClick={(e) => setrequestType("closedLead")}
                    />
                  </div>
                </Col>

                <Col lg={6} xl={6}>
                  <div className="d-flex align-items-center flex-wrap justify-content-end ptmobb mobJustifyContentBetween">
                    <div className="">
                      {businessNameList.length > 0 && (
                        <Select
                          options={businessNameList}
                          value={selectedbusiness}
                          onChange={(e) => {
                            setselectedbusiness(e);
                          }}
                          className="themeSelect businessSelect"
                          classNamePrefix="themeSelect"
                          placeholder={<div>Select Business</div>}
                          defaultValue={selectedbusiness}
                        />
                      )}
                    </div>
                    <div className="ref">
                      <CmnButton
                        icon={Svg.refresh}
                        text="Refresh"
                        type="noBg"
                        className="bgGreen pt12 pb12 pl30 pr30 radius ml15 mobMl0"
                        onClick={(e) => applyRefreshData()}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="tabContentParent">
            <Container>
              {requestType === "newleads" && (
                <BroadcastLeads
                  businessid={selectedbusiness.value}
                  reloadRequired={reloadRequired}
                  reloadReset={setreloadRequired}
                />
              )}
              {requestType === "requestedleads" && (
                <section>
                  <RequestedLeads
                    businessid={selectedbusiness.value}
                    reloadRequired={reloadRequired}
                    reloadReset={setreloadRequired}
                  />
                </section>
              )}
              {requestType === "purchasedLeader" && (
                <section>
                  <PurchasedLeads
                    businessid={selectedbusiness.value}
                    reloadRequired={reloadRequired}
                    reloadReset={setreloadRequired}
                  />
                </section>
              )}
              {requestType === "closedLead" && (
                <section>
                  <ClosedLeads
                    businessid={selectedbusiness.value}
                    reloadRequired={reloadRequired}
                    reloadReset={setreloadRequired}
                  />
                </section>
              )}
            </Container>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerRequest;

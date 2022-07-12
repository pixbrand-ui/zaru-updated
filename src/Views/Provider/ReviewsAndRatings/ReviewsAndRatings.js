import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Select from "react-select";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import CmnTextarea from "../../../Components/CmnTextarea/CmnTextarea";
import CmnReviews from "../../../Components/CmnReviews/CmnReviews";
import { useEffect } from "react";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import ProAside from "../ProviderProfile/ProAside";

const options = [
  { value: "Recommended", label: "Recommended" },
  { value: "Price (lowest to highest)", label: "Price (lowest to highest)" },
  { value: "Price (highest to lowest)", label: "Price (highest to lowest)" },
  { value: "% of positive reviews", label: "% of positive reviews" },
  { value: "# of completed tasks", label: "# of completed tasks" },
];

const ReviewsAndRatings = () => {
  const [reviewMsg, setreviewMsg] = useState("");
  const [showProgress, setshowProgress] = useState(true);
  const [businesses, setbusinesses] = useState([]);
  const [selectedbusiness, setselectedbusiness] = useState([]);
  const [businessNameList, setbusinessNameList] = useState([]);
  const onbusinessHandle=()=>{

  }

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
            console.log("busID",res);
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
  const saveData=()=>{
   //selectedbusiness.value
  }
  useEffect(()=>{
    loadData().then((res)=>{
      setreviewMsg(res);
    });
  },[selectedbusiness]);
  const loadData=async()=>{
    let result="";
    try{
      await HTTP.get(API.getBusinessReviews+selectedbusiness.value+"?pagesize=1&page=1",false,Auth.getToken()).then((res)=>{
        
        if(res && res.status && res.status.toString()==="200"){
          if(res.data && res.data.length > 0 ){
            return result= res.data;
          }
         
        }
      })
    }catch(e){
      console.log(e,"error in Review and rating page");
    }
    return result;
  }
  
  return (
    <>
        <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              <div className="d-flex align-items-center flex-wrap justify-content-between mb15">
                <div className="flex-fill">
                  <h2 className="fs28 colorBlack fBold">Review & Ratings</h2>
                </div>

                <div className="flex-fill d-flex align-items-center">
                  <p className="fs16 mb0 mr15">Business Profile:</p>
                 
                  <Select
                    className="w-50 themeSelect flex-grow-1"
                    classNamePrefix="themeSelect"
                    options={businessNameList}
                    onChange={(e)=>setselectedbusiness(e)}
                    value={selectedbusiness}
                  />
                </div>
              </div>
              <section className="bgWhite radius border mb20">
                <div className="d-flex align-items-center justify-content-center heightVh30 text-center">
                  <div>
                    <p className="fs16 ">
                      Getting Customer Reviews Make You Twice as Likely to Be
                      Hired on Zaaru.
                    </p>
                    <div className="d-flex justify-content-center">
                      <CmnButton
                        type="square"
                        text="Get Customers Reviews"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="bgWhite radius border">
                <div className="pl20 pr20 pt10 pb10 bBottom">
                  <h3 className="fs18 mb0 colorBlack">Reviews</h3>
                </div>
                <CmnReviews data={reviewMsg} bussinessid = {selectedbusiness.value}  />
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ReviewsAndRatings;

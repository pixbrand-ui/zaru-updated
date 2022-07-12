import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";

const CustomerDetails = (props) => {
  const { customerID } = props;
  const[data,setdata]=useState([]);
 
  useEffect(()=>{
    loadData();
  },[customerID])
  const loadData = async() => {
    try {
        LoadingModal.show("Please wait...");
       await HTTP.get(API.admincustomerinfo+"/"+customerID,false,Auth.getToken()).then((res)=>{
            //console.log(res);
            if(res && res.status && res.status.toString()==="200"){
                setdata(res.data);
                LoadingModal.hide();
            }
        })
    } catch (e) {
      console.log(e, "Error in the Customer Detail page");
    }
    LoadingModal.hide();
  };
  return (
    <div>
      

          <div className="mb30">
            <h6 className="fw500 mb10">Profile Picture</h6>
            <div className="w110">
                <img className="img-fluid radius100" src={Img.userplace.default} alt="" />
            </div>
          </div>
      <Row>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">Name</h6>
            <p className="text-capitalize">{data && data.firstname+ " " + data.lastname}</p>
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">Email</h6>
            <p>{data && data.email}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">Phone</h6>
            <p>{data && data.phone}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">Address</h6>
            <p className="text-capitalize">{data && data.address + " " + data.address2}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">City</h6>
            <p className="text-capitalize">{data && data.city + " " + data.city}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">State</h6>
            <p className="text-capitalize">{data && data.state + " " + data.state}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb30">
            <h6 className="fw500 mb3">Country</h6>
            <p className="text-capitalize">{data && data.country}</p>
          </div>
        </Col>
   
      </Row>
    </div>
  );
};

export default CustomerDetails;

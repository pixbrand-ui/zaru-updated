import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CmnButton from "../../../Components/CmnButton/CmnButton";
import LoadinMsg from "../../../Components/LoadingModal/LoadingMsg";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import ProAside from "../ProviderProfile/ProAside";
import HeaderWallet from '../../../Components/Provider/HeaderWallet'
import { getWallet } from '../../../Store/wallet/action'
import "./BuyCredits.scss";
import { useDispatch } from "react-redux";

const BuyCredits = () => {
  const [selectedPlans, setselectedPlans] = useState([]);
  const [showProgress, setshowProgress] = useState(true);
  const [selectedPlan, setselectedPlan] = useState(null);
  const [selectedPlanData, setselectedPlanData] = useState(null);
  const [plans, setPlans] = useState(null);
  const [success, setsuccess] = useState(false);
  var dispatch = useDispatch();
  useEffect(() => {
    loadPlans();
  }, []);
  const loadPlans = () => {
    try {
      HTTP.get(API.getCreditPoints, {}, false, "").then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setPlans(res.data);
          }
        }
        setshowProgress(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const buyPlan = () => {
    console.log("sellll",selectedPlanData);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    const iData = {
      orderid: "20220125220",
      orderdate: today,
      points:  selectedPlanData.points,
      amount: selectedPlanData.amount,
      planid: selectedPlanData._id,
      status: "success",
      name: "Pixbrand Agency",
      address: "indore",
      email: "abc@gmail.com",
      phone: "9876543210",
    };
    try {
      HTTP.post(
        API.purchaseCreditPoints,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        dispatch(getWallet())
        setsuccess(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e, id, data) => {
    if (id) {
      setselectedPlan(id);
      setselectedPlanData(data);

    }
  };

  return (
    <>
      <section className="bgLightOrange pt60 pb60">
        <Container>
          <Row>
            <Col lg={3} md={4} xl={3}>
              <ProAside />
            </Col>
            <Col lg={9} md={8} xl={9}>
              {showProgress && (
                <div className="pageBody">
                  <LoadinMsg message="Please wait..." />
                </div>
              )}
              {!showProgress && plans === null && (
                <p>There is no any plan available.</p>
              )}
              {!showProgress && plans && (
                <>
                  <section className="bgWhite radiusTop mb20 pb20">
                    <div className="bgGreen d-flex radiusTop justify-content-center align-items-center heightVh30 mb40">
                      <div className="text-center">
                        <h1 className="fs32 colorWhite fBold">Buy Credits</h1>
                        <h2 className="fs24 colorWhite">
                          Your Current Balance Is <HeaderWallet /> Credits
                        </h2>
                      </div>
                    </div>
                    <div className="pl20 pr20">
                      <h3 className="fs22 mb15 colorBlack">
                        Select Credit Pack
                      </h3>
                      <p className="fs16">
                        Top up your credits by selecting a credit pack below.
                      </p>
                      {plans &&
                        plans.length > 0 &&
                        plans.map((element, index) => {
                          return (
                            <PlanDetails
                              key={index}
                              data={element}
                              callback={onChange}
                            />
                          );
                        })}
                    </div>
                  </section>
                  <div className="d-flex justify-content-end">
                    <CmnButton
                      type="square"
                      text="Proceed to Payment"
                      className=""
                      onClick={buyPlan}
                    />
                  </div>
                  {success && (
                    <div className="alert alert-success mt20" role="alert">
                      Points Purchased successfully
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const PlanDetails = (props) => {
  const { data } = props;
  const changeHandler = (e, id, data) => {
    if (props.callback) {
      props.callback(e, id, data);
    }
  };
  return (
    <div className="cmnRadioBorder creditRadio mb20 w-100">
      <input
        type="radio"
        id={data._id}
        name={"creditplan"}
        onChange={(e) => changeHandler(e, data._id, data)}
      />
      <label
        htmlFor={data._id}
        className="border pl20 pr20 pt20 pb20 radius w-100"
      >
        <div className="d-flex align-items-center flex-wrap justify-content-between">
          <div className="d-flex align-items-center">
            <input type="radio" name="credit" id="cre20" />
            <div className="radius100 dNoneXs bc-circle mr20 ml20"></div>
            <span className="fs18 colorBlack mr20">{data.title}</span>
            <span className="fs16 colorOrange">
              <span className="colorPara">
                {data.offerstext !== "" && data.offerstext}{" "}
              </span>
              {data.subtitle !== "" && data.subtitle}
            </span>
          </div>
          <div>
            <span className="fs16 colorBlack">R {data.amount}</span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default BuyCredits;

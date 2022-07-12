import React, { useEffect, useState } from "react";
import "./Login.scss";
import Img from "../../../Assets/Img/Img";
import { Container, Row, Col } from "reactstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Redirect } from "react-router-dom";
import Auth from "../../../Helpers/Auth/Auth";
import GLocalStorage from "../../../Helpers/Global/GLocalStorage";
// import { Helmet } from "react-helmet";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [gotopage, setgotopage] = useState("");
  useEffect(() => {
    if (Auth.getToken() !== null) {
      if (JSON.parse(GLocalStorage.Get("user-role")) === "Customer") {
        setgotopage("customer/dashboard");
      } else if (JSON.parse(GLocalStorage.Get("user-role")) === "Provider") {
        setgotopage("provider/dashboard");
      }
      else if (JSON.parse(GLocalStorage.Get("user-role")) === "Admin") {
        
        setgotopage("Admin");
      }
    }
  }, []);
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Welcome to Zaaruu</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet> */}
      {gotopage === "customer/dashboard" && (
        <Redirect to="/customer/dashboard" />
      )}
      {gotopage === "provider/dashboard" && (
        <Redirect to="/provider/dashboard" />
      )}
       {gotopage === "Admin" && (
        <Redirect to="/admin" />
      )}
      <section className="loginSection bgLightOrange pt80 pb80">
        <Container>
          <Row className="gy-5">
            <Col lg={5}>
              <section className="logPart bgWhite radius pt30 pl30 pb30 pr30">
                <div className="parentController d-flex align-items-center flex-wrap justify-content-end mb30">
                  <div className="tabController d-flex align-items-center noUl bgLightOrange mb0 radiusFull">
                    <button
                      className={`btnTheme btnLightOrange   radiusFull ${
                        isSignin ? "btnOrange" : ""
                      }`}
                      onClick={(e) => setIsSignIn(true)}
                    >
                      Log In
                    </button>
                    <button
                      className={`btnTheme btnLightOrange radiusFull ${
                        !isSignin ? "btnOrange" : ""
                      }`}
                      onClick={(e) => setIsSignIn(false)}
                    >
                      Signup
                    </button>
                  </div>
                </div>

                <div className="tabContent">
                  {isSignin && <SignIn callback={setIsSignIn} />}

                  {!isSignin && <SignUp callback={setIsSignIn} />}
                </div>
              </section>
            </Col>

            <Col lg={7}>
              <div className="imgWrapper text-end">
                <img className="img-fluid" src={Img.login.default} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Login;

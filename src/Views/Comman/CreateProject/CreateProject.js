import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "../../../Assets/Img/Img";
import "./CreateProject.scss";
import CmnButton from "../../../Components/CmnButton/CmnButton";
// import Svg from "../../../Assets/Img/svg/Svg";
import {Svg} from "../../../Assets/Svgs/Svg"
import GAccordion from "../../../Components/GComponents/GAccordion/GAccordion/GAccordion";

const CreateProject = () => {
  return (
    <>
      <section className="pt60 pb60 mobPt40 mobPb40">
        <Container>
          <div className="text-center mb65">
            <h1 className="fs40 colorBlack fBold mb20">
              How to create a project (demand) for Zaaruu
            </h1>
            <p className="fs18">Tips and tricks | Dec 2, 2021</p>
          </div>

          <div className="mb65 mobMb15">
            <div>
              <img
                src={Img.rectangle13143.default}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>

          <div className="p_l_r_60 p_l_r_0_Mob mb60 mobMb15">
            <h2 className="fs24 fBold">
              Zaaruu will help you find experts in various services. Read how to
              do it.
            </h2>
            <p className="fs16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Bibendum est ultricies integer quis. Iaculis urna id volutpat
              lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac
              odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus
              euismod. Dictum fusce ut placerat orci nulla. Tincidunt ornare
              massa eget egestas purus viverra accumsan in nisl. Tempor id eu
              nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium.
              Massa ultricies mi quis hendrerit dolor magna eget.
            </p>
            <p className="fs16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Bibendum est ultricies integer quis. Iaculis urna id volutpat
              lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac
              odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus
              euismod.
            </p>
            <p className="fs16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Bibendum est ultricies integer quis. Iaculis urna id volutpat
              lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac
              odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus
              euismod. Dictum fusce ut placerat orci nulla. Tincidunt ornare
              massa eget egestas purus viverra accumsan in nisl. Tempor id eu
              nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium.
              Massa ultricies mi quis hendrerit dolor magna eget. Nullam eget
              felis eget nunc lobortis. Faucibus ornare suspendisse sed nisi.
              Sagittis eu volutpat odio facilisis mauris sit amet massa.{" "}
            </p>
            <p className="fs16">
              Your project is created and Wilio will automatically inform the
              experts who meet your requirements. You will receive the first
              reactions within a few hours.
            </p>
            <div>
              <h2 className="fs24 fBold">Type :</h2>
              <p className="fs16">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words
              </p>
            </div>
          </div>
          <section className="pl30 pr30 pt70 pb30 mobPt30 mobMb15 radius bgOrange">
            <Row className="align-items-center create-img">
              <Col lg={6}>
                <div className="pl30 pr30 p_l_r_0_Mob ">
                  <h1 className="fs40 colorWhite fBold">
                    Make your life easier
                  </h1>
                  <p className="fs18 colorWhite">
                    Answer questions specific to your needs and enter contact
                    information.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="d-flex justify-content-end mobJustifyContentStart mobMb10 pl30 pr30 p_l_r_0_Mob">
                  <CmnButton
                    type="square"
                    icon={Svg.people}
                    text="Login/Signup"
                    className="bg-dark radius4"
                  />
                </div>
                <Row>
                  {/* <Col lg={6}>
                    <div className="make-img-div">
                      <img
                        src={Img.mask_group.default}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </Col>
                  <Col lg={6}></Col> */}
                </Row>
              </Col>
            </Row>
          </section>
        </Container>
      </section>
      <FAQ />
    </>
  );
};

export default CreateProject;


const FAQ = () => {
  return (
    <>
      <section className="pt100 pb100 bgLightOrange">
        <h1 className="fs32 colorBlack fBold text-center mb40">Frequently Asked Questions</h1>
        <GAccordion
          data={[
            {
              title: "What is Zaaruu? ",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
            },
            {
              title: "How trustworthy is Zaaruu?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
            {
              title: "Why should I register?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
            {
              title:
                "I didn't receive a confirmation e-mail, what should I do?",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ",
            },
          ]}
        />
        <div className="d-flex justify-content-center">
          <CmnButton
            type="square"
            text="Frequently asked question"
            className="mt50"
          />
        </div>
      </section>
    </>
  );
};
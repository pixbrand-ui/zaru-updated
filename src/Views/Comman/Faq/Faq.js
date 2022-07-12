import React from "react";
import { Link } from "react-router-dom";
import { Row, Container, Col } from "reactstrap";
import "./Faq.scss";
// import {Svg} from "../../../Assets/Svgs/Svg";
import CmnSearch from "../../../Components/CmnSearch/CmnSearch";

const faq_data = [
  {
    started_title: "Getting Started on Charles",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Your Zaaru Account",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Charles Live Membership",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Member FAQs",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Expert FAQs",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Payments & Fees",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Getting Started on Charles",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Privacy & Security",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
  {
    started_title: "Other questions",
    que_1: "What is Charles?",
    que_2: "How does Charles work?",
    que_3: "How do I sign up?",
    que_4: "Are there guidelines or rules of conduct on",
    que_5: "Charles?",
    que_6: "Is Charles International?",
  },
];

const Faq = () => {
  return (
    <section>
      <div className="faq mt5 mb50 text-center bgLightOrange">
        <h2 className="fs32 fBold mb30 color_darkgrey">How Can We Help You?</h2>
        <div className="width50 mx-auto faq-in-mb">
          <CmnSearch
            placeholder="Type keywords to find your answer"
            className="inputSolid radius pl38 pl20 pr20 mb40 faq-input"
          />
        </div>

        <p className="fs16 color_faq_para">
          You can also browse the topics below to find what you are looking for.
        </p>
      </div>
      <Container>
        <Row>
          <h3 className="fs24 mb30">
            <span className="fBold colorOrange">Customer</span>/Provider
          </h3>
          {faq_data.map((el, index) => {
            const { started_title, que_1, que_2, que_3, que_4, que_5, que_6 } =
              el;
            return (
              <Col lg={4} className="mb20">
                <div key={started_title}>
                  <h4 className="fs18 colorOrange">{started_title}</h4>
                  <ul className="colorBlack lh35 faq-ul">
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_1}
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_2}
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_3}
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_4}
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_5}
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="faq-links fs15">
                        {que_6}
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Faq;

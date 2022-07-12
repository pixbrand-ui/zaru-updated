import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./CmnAccordian.css";

const CmnAccordian = (props) => {
  if (props.data.length > 0) {
    return (
      <Accordion>
        {props.data.map((element, index) => {
          return <MyAccordionItem key={index} props={element} />;
        })}
      </Accordion>
    );
  } else {
    return <>g</>;
  }
};

export const MyAccordionItem = (props) => {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>{props.props.title}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{props.props.content}</p>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default CmnAccordian;

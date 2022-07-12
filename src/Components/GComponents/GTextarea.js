import React from "react";
import styled from "styled-components";

const GTextareaWrapper = styled.div`
  label {
    font-size: 16px;
    margin-bottom: 4px;
  }
  textarea {
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : "#FFF"};
    width: auto;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    padding: ${(props) => (props.padding ? props.padding : ".5rem .8rem")};
    margin: ${(props) => (props.margin ? props.margin : "0rem")};
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "3px"};
    display: block;
    border: 1px solid #e8e9e9;
    outline: none;
    color: ${(props) => (props.color ? props.color : "#3f3f3f")};
    flex-direction: ${(props) => (props.direction ? props.direction : "row")};
    font-size: 16px;
    min-width: 100px;
    height: 130px;
    max-height: 180px;
    width: 100%;
    resize: none;
    -webkit-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

  textarea:focus {
    background-color: ${(props) =>
      props.hoverBgColor ? props.hoverBgColor : "#fff"};
    border: 1px solid #ec7523;
    box-shadow: 0px 1px 1px rgba(71, 187, 208, 0.3);
  }
`;

const GTextarea = (props) => {
  return (
    <GTextareaWrapper {...props}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <textarea
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        className={props.className}
        id={props.id}
        value={props.value}
      ></textarea>
    </GTextareaWrapper>
  );
};

export default GTextarea;

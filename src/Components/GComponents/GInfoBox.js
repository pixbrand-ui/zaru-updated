import styled from "styled-components";
import GCard from "./GCard";

//Uses
/* <GInfoBox iconBackground="#F58840">
  <span className="icon">
    <Icon.Person />
  </span>
  <span className="info">
    <span className="title">Customers</span>
    <span className="subtitle">2104</span>
    <span className="progressbar">
      <span className="progressslide"></span>
      <span className="progress"></span>
      <span>70% Increase in 30 Days</span>
    </span>
  </span>
</GInfoBox>; */

const GInfoBox = styled(GCard)`
  display: flex;
  padding: 0.6rem;
  padding-left: 1rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  flex: row;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => (props.color ? props.color : "#142F43")};
  cursor : default;

  span.icon {
    display: flex;
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
    background-color: ${(props) =>
      props.iconBackground ? props.iconBackground : "#FF5566"};
    border-radius: 5px;
    color: #fff;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  span.icon svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${(props) => (props.iconColor ? props.iconColor : "#FFF")};
  }

  span.info {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-right: 15px;
  }

  span.title {
    font-size: 11pt;
    font-weight: 500;
  }
  span.subtitle {
    font-size: 10pt;
    font-weight: 900;
  }

  span.progressbar {
    display: block;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    min-width: 100%;
    min-height: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 10pt;
    font-weight: 600;
  }
  .progressbar span.progressslide {
    display: flex;
    position: relative;
    background-color: rgba(0, 0, 0, 0.15);
    width: 100%;
    min-width: 100%;
    height: 3px;
    margin-bottom: 0;
  }

  span.progress {
    display: flex;
    position: relative;
    top: 0px;
    background-color: ${(props) =>
      props.progressColor
        ? props.progressColor
        : props.iconBackground
        ? props.iconBackground
        : "#4AA96C"};
    width: ${(props) => (props.progress ? props.progress : "70%")};
    height: 3px;
    margin-top: -3px;
  }
`;

export default GInfoBox;

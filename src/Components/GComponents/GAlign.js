import styled from "styled-components";

const GAlign = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: auto;
  flex-direction : ${(props) => props.direction ? props.direction : "row"};
  justify-content: ${(props) =>
    props.align === "center"
      ? "center"
      : props.align === "left"
      ? "flex-start"
      : props.align === "right"
      ? "flex-end"
      : props.align === "between"
      ? "space-between"
      : props.align === "around"
      ? "space-around"
      : "flex-start"};
`;

export default GAlign;

import styled from "styled-components";

const GSelect = styled.select.attrs({ type : "select"})`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#FFF'};
  width: auto;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  padding : ${props => props.padding ? props.padding : '.5rem .8rem'};
  margin : ${props => props.margin ? props.margin : '0rem'};
  border-radius : ${props => props.borderRadius ? props.borderRadius : '3px'};
  display : block;
  border : 1px solid #C9CCD5;
  outline : none;
  color : ${props => props.color ? props.color : '#000'};
  flex-direction : ${props => props.direction ? props.direction : 'row'};
  font-size : 11pt;
  min-width : 100px;
  max-height:40px;

  :hover{
      background-color : ${props => props.hoverColor ? props.hoverColor : '#FEFBF3'};
      border : 1px solid #FFD384;
  }
  :focus{
    background-color : ${props => props.hoverColor ? props.hoverColor : '#FEFBF3'};
    border : 1px solid #FFD384;
}
`;

export default GSelect;
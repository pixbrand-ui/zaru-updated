import styled from "styled-components";

const GButton = styled.button`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#519259'};
  width: auto;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  shadow : 0px 1px 3px rgba(0, 0, 0, 1);
  padding : ${props => props.padding ? props.padding : '.3rem 1.5rem'};
  margin : ${props => props.margin ? props.margin : '0rem'};
  border-radius : ${props => props.borderRadius ? props.borderRadius : '3px'};
  display : block;
  border : none;
  outline : none;
  color : ${props => props.color ? props.color : '#FFFFFF'};
  flex-direction : ${props => props.direction ? props.direction : 'row'};
  font-weight : 500;
  font-size : 11pt;
  margin-left : .2rem;

  :hover{
      background-color : ${props => props.hoverColor ? props.hoverColor : '#299145'};
  }
  @media (max-width: 991px) {
    font-size : 11pt;
    padding : ${props => props.padding ? props.padding : '.3rem 1rem'};
    margin-left : .5rem;
  }
`;

export default GButton;

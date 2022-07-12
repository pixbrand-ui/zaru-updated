import styled from "styled-components";

const GCard = styled.div`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#ffffff'};
  width: 100%;
  box-shadow: ${props => props.boxShadow ? props.boxShadow :  '0px 1px 2px rgba(0, 0, 0, 0.3)'};
  padding : ${props => props.padding ? props.padding : '.5rem'};
  margin : ${props => props.margin ? props.margin : '0rem'};
  border-radius : ${props => props.borderRadius ? props.borderRadius : '8px'};
  display : flex;
  flex : 1;
  flex-direction : ${props => props.direction ? props.direction : 'row'};;

  .card-title{
      font-weight : 700;
      font-size : 13pt;
      padding-left : 10px;
      color :  ${props => props.titleColor ? props.titleColor : 'rgba(0,0,0,1)'};
  }
`;

export default GCard;

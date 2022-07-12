import styled from "styled-components";

const GContainer = styled.div`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
  width: 100%;
  padding : .5rem;
  margin : ${props => props.margin ? props.margin : '0rem'};

  .container-title{
    display : flex;
    font-weight : 700;
    font-size : 13pt;
    padding-left : 20px;
    padding-bottom : 15px;
    color :  ${props => props.titleColor ? props.titleColor : 'rgba(0,0,0,1)'};
}
`;

export default GContainer;

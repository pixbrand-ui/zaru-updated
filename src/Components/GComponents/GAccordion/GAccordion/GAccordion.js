import React, { useEffect } from "react";
import { Container } from "reactstrap";
import AccordionLoad from "./AccordionLoad";
import $ from 'jquery';
const GAccordion = (props) => {
  useEffect(() => {
    $(function($) {
      $('.accWrapper > button').on('click', function(){
         // $(".accWrapper > div.dNone").slideUp();
          $(this).next().slideToggle();

         // var link = $(this);
          // $(this).next().slideToggle('slow', function() {
          //     if ($(this).is(':visible')) {
          //       //$(this).slideUp();   
          //     } else {
          //       $(this).slideDown();                 
          //     }        
          // });

     });
    });
  },[]);
  return (
    <>
      <section>
        <Container>
          {props.data.map((elem, index) => {
            return <AccordionLoad key={index} indexid={index} {...elem} />;
          })}
        </Container>
      </section>
    </>
  );
};
export default GAccordion;

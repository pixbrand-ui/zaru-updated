import React from 'react';
import styled from 'styled-components';

const GImage=styled.img`
max-width: 100%;
height: auto;
-webkit-border-radius: ${(props)=>{
   return props.radius ? props.radius : "0px";
}};
border-radius: ${(props)=>{
    return props.radius ? props.radius : "0px";
 }};
 padding-top: ${(props)=>{
    return props.paddingTop ? props.paddingTop : "0px";
 }};
 padding-bottom: ${(props)=>{
    return props.paddingBottom ? props.paddingBottom : "0px";
 }};
 padding-left: ${(props)=>{
    return props.paddingLeft ? props.paddingLeft : "0px";
 }};
 padding-right: ${(props)=>{
    return props.paddingRight ? props.paddingRight : "0px";
 }};
 margin-top: ${(props)=>{
    return props.marginTop ? props.marginTop : "0px";
 }};
 margin-bottom: ${(props)=>{
    return props.marginBottom ? props.marginBottom : "0px";
 }};
 margin-top: ${(props)=>{
    return props.marginTop ? props.marginTop : "0px";
 }};
width: ${(props)=>{
    return props.width ? props.width : "auto";
 }};
 height: ${(props)=>{
    return props.height ? props.height : "auto";
 }};
 -webkit-object-fit: ${(props)=>{
    return props.cover ? "cover" : "auto";
 }};
 object-fit: ${(props)=>{
    return props.cover ? "cover" : "auto";
 }};
 filter: ${(props)=>{
    return props.blur ? `blur(${props.blur})` : "none";
 }};
 -webkit-filter: ${(props)=>{
    return props.blur ? `blur(${props.blur})` : "none";
 }};
`
export default GImage;

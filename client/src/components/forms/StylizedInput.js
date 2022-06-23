import { min } from "moment"
import React from "react"
import styled from "styled-components"

const StyledInput = styled.input` 
    width:100%;
    padding: 1em;
    margin:0.5rem 0px 0.5rem 0px;
    border-radius: 5px;
    border: gray 1px solid;
    box-sizing: border-box;
`

function StylizedInput(props){
    return(
        <StyledInput type = {props.type} placeholder = {props.placeholder} value = {props.value} onChange = {props.onChange} min = {props.min} max = {props.max}></StyledInput>
    )
}

export default StylizedInput
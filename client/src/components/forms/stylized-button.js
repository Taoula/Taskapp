import React from "react"
import styled from "styled-components"

const StyledInputButton = styled.input`
    background-color: rgb(48, 128, 242);
    border: none;
    border-radius: 10px;
    display:block;
    margin:auto;
    padding:1em 5em 1em 5em;
    color:white;
    transition:0.2s;
    &:hover {
        background-color: #3c71c7;
        transform: scale(1.05);
        cursor: pointer;
    };
`

    const StyledButton = styled.button`
    background-color: rgb(48, 128, 242);
    border: none;
    border-radius: 10px;
    display:block;
    margin:1em auto 1em auto;
    padding:1em 5em 1em 5em;
    width:15%;
    color:white;
    transition:0.2s;
    &:hover {
        background-color: #3c71c7;
        transform: scale(1.05);
        cursor: pointer;
    };
`

function StylizedButton(props){
    return(
    props.input === true ? <StyledInputButton type={props.type} value={props.value} /> : <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
    )
}

export default StylizedButton
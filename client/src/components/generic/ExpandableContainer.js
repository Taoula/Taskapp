import React from "react"
import styled from "styled-components"

const ExpandingContainer = styled.div`
    position: fixed;
    width:30%;
    height:40%;
    background-color: #f0f0f0;
    border: 1px solid gray;
    padding: 3em;
    box-sizing: border-box;
    left:35%;
    top:30%;
    border-radius:2em;
    transition: 0.3s;
    transform: scale(${props => props.scale})
`

function ExpandableContainer(props){
    return(
        <ExpandingContainer>
            {props.children}
        </ExpandingContainer>
    )
}

export default ExpandableContainer;
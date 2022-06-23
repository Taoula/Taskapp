import React from "react"
import styled from "styled-components"

const StyledHeading = styled.h1`
    font-size:3em;
    margin-top:2em;
    text-align:center;
`

function StylizedHeading(props){
    return(
        <StyledHeading>{props.children}</StyledHeading>
    )
}

export default StylizedHeading
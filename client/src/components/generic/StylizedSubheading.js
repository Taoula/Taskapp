import React from "react"
import styled from "styled-components"

const StyledSubheading = styled.p`
    margin: 1em auto 2em auto;
    text-align:center;
`

function StylizedSubheading(props){
    return(
        <StyledSubheading>{props.children}</StyledSubheading>
    )
}

export default StylizedSubheading
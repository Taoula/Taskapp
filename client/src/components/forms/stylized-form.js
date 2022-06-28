import React from "react"
import styled from "styled-components"

const StyledForm = styled.form`
    width: ${props => props.width}%;
    margin:auto;
`

function StylizedForm(props){
    return(
        <StyledForm width = {props.width} onSubmit={props.onSubmit}>{props.children}</StyledForm>
    )
}

export default StylizedForm;
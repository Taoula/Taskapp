import React from "react"
import styled from "styled-components"

const BlockContainer = styled.div`
background-color: rgb(242, 240, 253);
border: 3px solid rgb(123, 113, 189);
padding: 10px;
border-radius: 10px;
margin: 10px;
width: 25%;
`

const BlockHeader = styled.h3`
font-family: Nunito;
text-transform: uppercase;
color: rgb(61, 57, 96);
margin: 0;
padding: 0;
font-size: 1.25rem;
font-weight: 700;
`

const BlockStart = styled.p`
margin: 0;
padding: 0;
font-size: 1rem;
font-family: Lora;
font-weight: 600;
`

function ScheduleBlock({task}) {
    const {name, start} = task;
    return (
        <BlockContainer>
            <BlockHeader>
                {name}
            </BlockHeader>

            <BlockStart>
                {start}
            </BlockStart>
        </BlockContainer>
    )
}

export default ScheduleBlock;
import React, {useState} from "react"
import styled from "styled-components"
import {Square, CheckSquare } from "phosphor-react"
import useToggle from "../../hooks/useToggle"
import axios from 'axios'

const BlockContainer = styled.div`
background-color: ${props => props.color[0] || "pink"};
border: 3px solid rgb(123, 113, 189);
padding: 10px;
border-radius: 10px;
margin: 10px;
width: 25%;
transition:0.2s;
&:hover {
    transform: scale(1.05);
    background-color: ${props => props.color[1] || "pink"};
    transition:0.2s;
    margin-left:2em;
};
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

    const {name, start, _id, completed} = task;
    const [isCompleted, setIsCompleted] = useState();

    async function toggleCompleted(){
        const taskReq = await axios.get(`http://localhost:5000/task/${_id}`)
        const {priority, duration, isActive, completed} = taskReq.data
        await axios.patch(`http://localhost:5000/task/${_id}`, {name, priority, duration, isActive, completed: !completed})
        setIsCompleted(completed);
    }

    return (
        <BlockContainer color={isCompleted ? ["#c4c4c4", "#b3b3b3"] : ["#F0FDF2", "#addbba"]} onClick={toggleCompleted}>
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
import React from "react"
import styled from "styled-components"
import {Square, CheckSquare } from "phosphor-react"
import useToggle from "../../hooks/useToggle"
import axios from 'axios'

const BlockContainer = styled.div`
background-color: ${props => props.color || "pink"};
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

function ScheduleBlock({task, getSchedule}) {

    const {name, start, _id, completed} = task;

    async function toggleCompleted(){
        const taskReq = await axios.get(`http://localhost:5000/task/${_id}`)
        const {priority, duration, isActive, completed} = taskReq.data
        await axios.patch(`http://localhost:5000/task/${_id}`, {name, priority, duration, isActive, completed: !completed})
        getSchedule();
    }

    return (
        <BlockContainer color={completed ? "#a7c4ab" : "#F0FDF2"}>
            <BlockHeader>
                {name}
            </BlockHeader>

            <BlockStart>
                {start}
            </BlockStart>
            {completed ? <CheckSquare size={20} onClick={toggleCompleted}/> : <Square size={20} onClick={toggleCompleted}/>}
        </BlockContainer>
    )
}

export default ScheduleBlock;
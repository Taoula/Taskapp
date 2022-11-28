import React, {useState} from "react"
import styled from "styled-components"
import {Square, CheckSquare } from "phosphor-react"
import useToggle from "../../hooks/use-toggle"
import axios from 'axios'
import { useEffect } from "react"

const BlockContainer = styled.div`
background-color: ${props => props.color[0] || "pink"};
border: 3px solid rgb(123, 113, 189);
padding: ${props => props.duration /10 + 1}px 10px ${props => props.duration /10 + 1}px 10px;
height: ${props => props.duration*2 + 10}px;
border-radius: 10px;
margin: 10px;
width: 30%;
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
font-size: ${props=>props.duration * 0 + 1.1}rem;
font-weight: 700;
`

const BlockStart = styled.p`
margin: 0;
padding: 0;
font-size: 1rem;
font-family: Lora;
font-weight: 600;
`

const DurationText = styled.p`
font-family: Lora;
text-transform: lowercase;
font-size: 15px;
`

function ScheduleBlock({task, getSchedule}) {

    const {name, start, _id, completed, duration} = task;
    const [isCompleted, setIsCompleted] = useState(completed);
    

    async function toggleCompleted(){
        // Pull task and schedule data
        const taskReq = await axios.get(`http://localhost:8282/task/${_id}/`)
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        let {schedule, start, end} = scheduleReq.data;
        const {priority, duration, isActive, completed} = await taskReq.data
        
        //Patch task with updated completed value
        await axios.patch(`http://localhost:8282/task/${_id}`, {name, priority, duration, isActive, completed: !completed})

        //Sort through schedule and update modified task
        schedule.forEach(task => {
            if (task._id == _id){
                task.completed = !task.completed;
            }
        });

        await axios.patch('http://localhost:8282/schedule/', {schedule, start, end})
        getSchedule();
    }

    useEffect(() => {
        setIsCompleted(completed)
    })

    return (
        <BlockContainer duration={duration} color={isCompleted ? ["#c4c4c4", "#b3b3b3"] : ["#F0FDF2", "#addbba"]} onClick={toggleCompleted}>
            <BlockHeader duration={duration}>
                
                <div className="flex justify-between">
                    <span>{name}</span>
                    <DurationText duration={duration}>{duration} minutes</DurationText>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <BlockStart duration={duration}>
                        {start}
                    </BlockStart>
                </div>
            </BlockHeader>

        </BlockContainer>
    )
}

export default ScheduleBlock;
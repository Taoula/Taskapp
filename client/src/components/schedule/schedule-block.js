import React, {useState} from "react"
import styled from "styled-components"
import {Square, CheckSquare } from "phosphor-react"
import useToggle from "../../hooks/use-toggle"
import axios from 'axios'
import { useEffect } from "react"
import sameDate from "../../methods/same-date"
import convertTime from "../../methods/convert-time"

const BlockContainer = styled.div`
background-color: ${props => props.color[0] || "pink"};
border: 3px solid rgb(123, 113, 189);
padding: ${props => props.duration /10 + 1}px 10px ${props => props.duration /10 + 1}px 10px;
height: ${props => props.completed ? 40 : props => props.duration*2 + 10}px;
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

function ScheduleBlock({task, getSchedule, currentDay, schedule}) {
    //console.log(task)
    const {name, start, _id, completed, duration, fixed} = task;
    const [isCompleted, setIsCompleted] = useState(completed);
    

    async function toggleCompleted(){
        // Pull task and schedule data
        if (_id.slice(0, 8) != "freetime"){
            const taskReq = await axios.get(`http://localhost:8282/task/${_id}/`)

            //find appropriate entry
            let index = -1;
            let {defaults, name, entries} = taskReq.data

            for (let i = 0; i < entries.length; i++){
                if (sameDate(currentDay, entries[i].date)){
                    index = i;
                    break;
                }
            }

            entries[index].completed = !entries[index].completed
            
            //Patch task with updated completed value
            await axios.patch(`http://localhost:8282/task/${_id}`, {name, entries, defaults})
        }

        //TODO: this is poorly structured. schedule data should only update if and after the task data updates.
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        let {entries} = scheduleReq.data;
         //Sort through schedule on most recent entry and update modified task
         let index = -1
         for (let i = 0; i < entries.length; i++){
            if (sameDate(currentDay, entries[i].wake)){
                index = i 
                break
            }
         }

        entries[index].schedule.forEach(task => {
            if (task._id == _id){
                task.completed = !task.completed;
            }
        });
        
        await axios.patch('http://localhost:8282/schedule/', {entries})
        getSchedule();
        
    }

    useEffect(() => {
        setIsCompleted(completed)
    })


    // TODO Needs to be refactored
    function getColors(){
        if (isCompleted){
            return ["#c4c4c4", "#b3b3b3"]
        } else if (fixed){
            return ["#ffc4b3", "#f7a892"]
        } else if (_id.slice(0,8) == "freetime"){
            return ["#c4d8f2", "#a1b6d1"]
        } else {
            return ["#F0FDF2", "#addbba"]
        }
        
    }

    return (
        <BlockContainer duration={duration} completed={isCompleted} color={getColors()} onClick={toggleCompleted}>
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
                        {convertTime(start, "utc", false)}
                    </BlockStart>
                </div>
            </BlockHeader>

        </BlockContainer>
    )
}

export default ScheduleBlock;
import React, { useState } from "react"
import styled from "styled-components"
import axios from 'axios'
import StylizedInput from "../forms/stylized-input"
import StylizedButton from "../forms/stylized-button"
import StylizedForm from "../forms/stylized-form"

const ExpandableContainer = styled.div`
  position: fixed;
  width:30%;
  height:45%;
  background-color: #f0f0f0;
  border: 1px solid gray;
  padding: 3em;
  box-sizing: border-box;
  left:35%;
  top:30%;
  border-radius:2em;
  transition: 0.4s;
  transform: scale(${props => props.scale});
  text-transform: Capitalize;
`

function TaskForm({ getTasks, disableTaskForm, scale}){
    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [priority, setPriority] = useState("")

    async function onSubmit (e) {
        disableTaskForm("create")
        e.preventDefault();
        const taskData = {
            name, duration, priority,
            isActive: false,
            completed: false
        }

        await axios.post("http://localhost:8282/task/", taskData)
        getTasks()
    }

    return (
        <ExpandableContainer scale={scale}>
            <p>New Task</p>
            <StylizedForm onSubmit={(e) => onSubmit(e)}>
                <StylizedInput type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <StylizedInput type="number" placeholder="Duration (minutes)" min="5" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                <StylizedInput type="number" placeholder="Priority (1-3)" min="1" max="5" value={priority} onChange={(e) => setPriority(e.target.value)}/>
                <StylizedButton input={true} type="submit" value="submit"/>
            </StylizedForm>
        </ExpandableContainer>
    )
}

export default TaskForm
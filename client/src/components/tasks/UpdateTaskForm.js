import React, { useState, useEffect } from "react"
import axios from 'axios'
import styled from "styled-components"
import StylizedInput from "../forms/StylizedInput"
import StylizedButton from "../forms/StylizedButton"
import StylizedForm from "../forms/StylizedForm"

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

function UpdateTaskForm({ getTasks, _id, scale, disableTaskForm}){
    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [priority, setPriority] = useState("")
    const [isActive, setIsActive] = useState(false)

    async function loadData(){
        const task = await axios.get(`http://localhost:8282/task/${_id}/`)
        const {name: loadName, duration: loadDuration, priority: loadPriority, isActive: loadIsActive} = task.data
        setName(loadName)
        setDuration(loadDuration)
        setPriority(loadPriority)
        setIsActive(loadIsActive)
    }

    useEffect(() => {
        loadData()
    }, [])

    async function onSubmit (e) {
        e.preventDefault();
        disableTaskForm("update")
        const taskData = {
            name, duration, priority,
            isActive
        }

        await axios.patch(`http://localhost:8282/task/${_id}/`, taskData)
        getTasks()
    }

    return (
        <ExpandableContainer scale={scale}>
            <p>Updating {name}</p>
             <StylizedForm width={80} onSubmit={(e) => onSubmit(e)}>
                <StylizedInput type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <StylizedInput type="number" placeholder="Duration (minutes)" min="5" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                <StylizedInput type="number" placeholder="Priority (1-3)" min="1" max="3" value={priority} onChange={(e) => setPriority(e.target.value)}/>
                <StylizedButton input={true} type="submit" value="submit"/>
            </StylizedForm>
        </ExpandableContainer>
    )
}

export default UpdateTaskForm
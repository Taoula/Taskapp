import React, { useEffect } from "react"
import { Pencil, Trash, Square, CheckSquare } from "phosphor-react"
import useToggle from "../../hooks/useToggle"
import styled from "styled-components"
import axios from 'axios'

const TaskContainer = styled.div`
background-color: ${props => props.color || "pink"};
padding:1em 1em;
box-sizing:border-box;
border-radius:1em;
`
const TaskHeader = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
text-transform:capitalize;
`

const TaskDescription = styled.p`
margin:0.1em 0;
font-size:.75rem;
`

function Task({task, getTasks, setCurrent}) {

    const {name, priority, duration, _id, isActive} = task
    const [isExpanded, toggle] = useToggle(false)
    const colors = ["#76a371", "#f5c540", "#e67839"]

    async function deleteTask(){
        const url = `http://localhost:5000/task/${_id}/`
        await axios.delete(url)
        getTasks()
    }

    async function toggleActive(){
        await axios.patch(`http://localhost:5000/task/${_id}`, {name, priority, duration, isActive: !isActive})
        getTasks()
    }

    useEffect(()=> {
        if (isExpanded){
            setCurrent(_id)
        } else {
            setCurrent("")
        }
    }, [isExpanded])

    return (
        <TaskContainer color={colors[priority-1]}>
            <TaskHeader>
                <h3>{name}</h3>
                <Pencil size={20} onClick={toggle}/>
                <Trash size={20} onClick={deleteTask}/>
                {isActive ? <CheckSquare size={20} onClick={toggleActive}/> : <Square size={20} onClick={toggleActive}/>}
            </TaskHeader>
            
            <TaskDescription>
                {duration} minutes
            </TaskDescription>
        </TaskContainer>
    )
}

export default Task
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './TaskForm'
import UpdateTaskForm from './UpdateTaskForm'
import useToggle from '../../hooks/useToggle'
import Task from './Task'
import styled from 'styled-components'
import { PlusCircle } from "phosphor-react"

const DisplayContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap:10px;
    height:100%;
`

const Display = styled.div`
    background-color:#a98467;
    color:white;
    font-family:Verdana;
    display:grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    grid-template-rows: 1fr repeat(5, minmax(auto, 1.5fr));
    grid-gap: 1em;
    font-size:1rem;
    padding: 0 1em;
`

const DisplayHeader = styled.h2`
text-align:center;
grid-column: 1 / 5;
`

const NewButton = styled.div`
    transition:0.2s;
    color:white;
    &:hover{
        transform: scale(1.10);
        cursor:pointer;
        color: #432818;
    }
`

function TaskDisplay(){
    const [tasks, setTasks] = useState([])
    const [taskFormId, setTaskFormId] = useState("")
    const [updateFormScale, setUpdateFormScale] = useState(0)
    const [createFormScale, setCreateFormScale] = useState(0)
    const [newTask, toggle] = useToggle(false)

    async function getTasks(){
        const taskReq = await axios.get("http://localhost:8282/task/")
        setTasks(taskReq.data)
    }

    function enableTaskForm(type, id){
        if (type === "update") {
            setUpdateFormScale(0)
            setTaskFormId(id)
            setTimeout(()=> {setUpdateFormScale(1)}, 1);
        } else {
            setCreateFormScale(0)
            toggle()
            setTimeout(()=> {setCreateFormScale(1)}, 1);
        }
    }

    function disableTaskForm(type){
        if (type === "update") {
            setUpdateFormScale(0)
            setTimeout(()=> {setTaskFormId("")}, 400);
        } else {
            setCreateFormScale(0)
            setTimeout(()=>{toggle()}, 400);
        }
    }

    //renders tasks based on active bool
    function renderTasks(active) {
        return tasks.map((task, i) => {
            if (task.isActive === active){
                return <Task key={i} task={task} getTasks={getTasks} enableTaskForm={enableTaskForm} disableTaskForm={disableTaskForm}>{task.name}</Task>
            }
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <DisplayContainer>
            <Display>
                <DisplayHeader>
                    ACTIVE TASKS 
                    <NewButton>
                        <PlusCircle size={30} onClick={() => {newTask ? disableTaskForm("create") : enableTaskForm("create")}}/>
                    </NewButton>
                </DisplayHeader>
                {renderTasks(true)}
            </Display>
            <Display>
                <DisplayHeader>INACTIVE TASKS</DisplayHeader>
                {renderTasks(false)}
            </Display>
            {taskFormId === "" && newTask && <TaskForm getTasks = {getTasks} disableTaskForm={disableTaskForm} scale={createFormScale}/>}
            {!newTask && taskFormId !== "" && <UpdateTaskForm getTasks={getTasks}  disableTaskForm={disableTaskForm} _id={taskFormId} scale={updateFormScale}/>}
        </DisplayContainer>
    )
}

export default TaskDisplay
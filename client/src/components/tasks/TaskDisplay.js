import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './TaskForm'
import UpdateTaskForm from './UpdateTaskForm'
import Task from './Task'
import styled from 'styled-components'

const DisplayContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap:10px;
`

const Display = styled.div`
    background-color:#636363;
    color:white;
    font-family:Verdana;
    display:grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    grid-template-rows: 1fr repeat(3, minmax(auto, 2fr));
    grid-gap: 1em;
    font-size:1rem;
    padding: 0 1em;
`

const DisplayHeader = styled.h2`
text-align:center;
grid-column: 1 / 5;
`

function TaskDisplay(){
    const [tasks, setTasks] = useState([])
    const [taskFormId, setTaskFormId] = useState("")

    async function getTasks(){
        const taskReq = await axios.get("http://localhost:5000/task/")
        setTasks(taskReq.data)
    }

    function disableTaskForm(){
        setTaskFormId("")
    }

    //renders tasks based on active bool
    function renderTasks(active) {
        return tasks.map((task, i) => {
            if (task.isActive === active){
                return <Task key={i} task={task} getTasks={getTasks} setCurrent={setTaskFormId}>{task.name}</Task>
            }
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <DisplayContainer>

            <Display>
                <DisplayHeader>ACTIVE TASKS</DisplayHeader>
                {renderTasks(true)}
            </Display>
            <Display>
                <DisplayHeader>INACTIVE TASKS</DisplayHeader>
                {renderTasks(false)}
            </Display>
            <TaskForm getTasks={getTasks}/>
            {taskFormId !== "" && <UpdateTaskForm getTasks={getTasks} disableTaskForm={disableTaskForm} _id={taskFormId}/>}
        </DisplayContainer>
    )
}

export default TaskDisplay
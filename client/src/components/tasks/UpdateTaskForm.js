import React, { useState, useEffect } from "react"
import axios from 'axios'

function TaskForm({ getTasks, _id, disableTaskForm}){
    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [priority, setPriority] = useState("")
    const [isActive, setIsActive] = useState(false)

    async function loadData(){
        const task = await axios.get(`http://localhost:5000/task/${_id}/`)
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
        const taskData = {
            name, duration, priority,
            isActive
        }

        await axios.patch(`http://localhost:5000/task/${_id}/`, taskData)
        getTasks()
        disableTaskForm()
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="number" placeholder="Duration (minutes)" min="5" value={duration} onChange={(e) => setDuration(e.target.value)}/>
            <input type="number" placeholder="Priority (1-3)" min="1" max="3" value={priority} onChange={(e) => setPriority(e.target.value)}/>
            <input type="submit" value="submit"/>
        </form>
    )
}

export default TaskForm
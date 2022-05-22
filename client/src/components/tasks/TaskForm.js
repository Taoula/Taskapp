import React, { useState } from "react"
import axios from 'axios'

function TaskForm({ getTasks }){
    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [priority, setPriority] = useState("")

    async function onSubmit (e) {
        e.preventDefault();
        const taskData = {
            name, duration, priority,
            isActive: false,
            completed: false
        }

        await axios.post("http://localhost:5000/task/", taskData)
        getTasks()
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="number" placeholder="Duration (minutes)" min="5" value={duration} onChange={(e) => setDuration(e.target.value)}/>
            <input type="number" placeholder="Priority (1-3)" min="1" max="5" value={priority} onChange={(e) => setPriority(e.target.value)}/>
            <input type="submit" value="submit"/>
        </form>
    )
}

export default TaskForm
import React, {useState, useEffect} from "react"
import axios from "axios"
import sortSchedule from "../../methods/sortSchedule"

function ScheduleDisplay(){
    const [schedule, setSchedule] = useState([])

    async function getSchedule(){
        const scheduleReq = await axios.get("http://localhost:5000/schedule/")
        setSchedule(scheduleReq.data.schedule)
    }

    function renderSchedule(){
        return schedule.map((task) => {
            return <p>{task.name} {task._id} </p>
        })
    }

    useEffect(() => {
        getSchedule()
    }, [])

    return( 
        <div>
            <h1>Schedule</h1>
            <div>{renderSchedule()}</div>
            <button onClick={()=> sortSchedule(setSchedule, {})}>Generate Schedule</button>
        </div>
    )
}

export default ScheduleDisplay
import React, {useState, useEffect} from "react"
import axios from "axios"
import ScheduleBlock from './schedule-block'
import sortSchedule from "../../methods/sort-schedule"
import styled from "styled-components"

const ScheduleButton = styled.button`
    background-color: rgb(48, 128, 242);
    border: none;
    border-radius: 10px;
`

const SubHeading = styled.h3`
    font-family: Lola;
    text-transform: lowercase;
    font-weight: 400;
    margin-left:20px;
    `

const ScheduleText = styled.p`
    font-family: Nunito;
    text-transform: uppercase;
    padding: 0px 5px 0px 5px;
    color:white;
    font-weight: 700;
    font-size: 0.75rem;
`

const PageTitle = styled.h1`
    font-size: 2.5rem;
    font-family: Nunito;
    text-transform: uppercase;
    font-weight: 800;
    margin-left:20px;
`


function ScheduleDisplay(){
    const [schedule, setSchedule] = useState([])
    const [wake, setWake] = useState([])
    const [sleep, setSleep] = useState([])

    async function getSchedule(){
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        setSchedule(scheduleReq.data.schedule)
    }

    async function updateSchedule(){
        const taskReq = await axios.get("http://localhost:8282/task/")
        let tasks = taskReq.data.filter(task => task.isActive)
        if (schedule.length != tasks.length){
            sortSchedule(setSchedule, toDate(wake), toDate(sleep))
        }
    }

    function renderSchedule(){
        updateSchedule()
        return schedule.map((task) => {
            return <ScheduleBlock task={task}></ScheduleBlock>
        })
    }

    async function updateHours(e){
        try {
            e.preventDefault();
            
            // Create Date objects for updated wake & start time (convert from hh:mm)
            let wakeDate = toDate(wake);
            let sleepDate = toDate(sleep);
            console.log(wakeDate);
            console.log(sleepDate);

            //Push new date objects to schedule
            await axios.patch(`http://localhost:8282/schedule/`, {schedule, start:wakeDate, end:sleepDate})
            sortSchedule(setSchedule, wakeDate, sleepDate);
        }
        catch (err) {
            console.log(err);
        }
    }

    function toDate(time) {
        let newDate = new Date();
        newDate.setHours(time.slice(null, 2));
        newDate.setMinutes(time.slice(3, 5));
        newDate.setSeconds(0);
        return newDate;
    }

    useEffect(() => {
        getSchedule()
    }, [])

    return( 
        <div>
            <PageTitle>Name</PageTitle>
            <SubHeading>A scheduling app</SubHeading>
            <form onSubmit={(e) => updateHours(e)}>
                <input type="time" placeholder="Wake Time" value={wake} onChange={(e) => setWake(e.target.value)}></input>
                <input type="time" placeholder="Sleep Time" value={sleep} onChange={(e) => setSleep(e.target.value)}></input>
                <input type="submit" value="Update Hours"></input>
            </form>
            <div>{renderSchedule()}</div>
            <ScheduleButton onClick={()=> sortSchedule(setSchedule, toDate(wake), toDate(sleep))}><ScheduleText>Generate Schedule</ScheduleText></ScheduleButton>
        </div>
    )
}

export default ScheduleDisplay
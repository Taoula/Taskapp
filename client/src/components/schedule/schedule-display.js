import React, {useState, useEffect} from "react"
import axios from "axios"
import ScheduleBlock from './schedule-block'
import sortSchedule from "../../methods/sort-schedule"
import convertTime from "../../methods/convert-time"
import styled from "styled-components"
import TimeInput from "../generic/time-input"
import StylizedButton from "../forms/stylized-button"
import ExpandableContainer from "../generic/expandable-container"

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


export default function ScheduleDisplay(){
    const [schedule, setSchedule] = useState([])
    const [wake, setWake] = useState("")
    const [sleep, setSleep] = useState("")
    const [hoursExpanded, setHoursExpanded] = useState(false)

    async function getSchedule(){
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        setSchedule(scheduleReq.data.schedule)
        const {start, end} = scheduleReq.data
        setWake(start)
        setSleep(end)

        const taskReq = await axios.get("http://localhost:8282/task/")
        let tasks = taskReq.data.filter(task => task.isActive)

        if (scheduleReq.data.schedule.length != tasks.length) {
            sortSchedule(setSchedule, start, end)
            //await axios.patch(`http://localhost:8282/schedule/`, {schedule})

        }
    }

    function renderSchedule(){
        return schedule.map((task) => {
            return <ScheduleBlock task={task}></ScheduleBlock>
        })
    }

    async function updateHours(start, end){
        try {
            // Create Date objects for updated wake & start time (convert from hh:mm)
            let startDate = convertTime(start, "date");
            let endDate = convertTime(end, "date");
            setWake(startDate)
            setSleep(endDate)
            console.log(startDate);
            console.log(endDate);

            //Push new date objects to schedule
            sortSchedule(setSchedule, startDate, endDate);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSchedule()
    }, [])

    return( 
        <div>
            <PageTitle>Name</PageTitle>
            <SubHeading>A scheduling app</SubHeading>

            {<button onClick={()=>setHoursExpanded(!hoursExpanded)}>Edit Hours</button>}
            {hoursExpanded && <ExpandableContainer><TimeInput update={updateHours} wake={convertTime(wake, "utc")} sleep={convertTime(sleep, "utc")} close={setHoursExpanded}/></ExpandableContainer>}

            <div>{renderSchedule()}</div>
            <ScheduleButton onClick={()=> sortSchedule(setSchedule, wake, sleep)}><ScheduleText>Generate Schedule</ScheduleText></ScheduleButton>
        </div>
    )
}
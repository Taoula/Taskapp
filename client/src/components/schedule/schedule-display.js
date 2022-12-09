import React, {useState, useEffect} from "react"
import axios from "axios"
import ScheduleBlock from './schedule-block'
import sortSchedule from "../../methods/sort-schedule"
import resortSchedule from "../../methods/resort-schedule"
import convertTime from "../../methods/convert-time"
import styled from "styled-components"
import TimeInput from "../generic/time-input"
import StylizedButton from "../forms/stylized-button"
import ExpandableContainer from "../generic/expandable-container"
import Calendar from 'react-awesome-calendar';

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
        console.log("running")
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        setSchedule(scheduleReq.data.schedule)
        console.log(scheduleReq.data.schedule)
        const {start, end} = scheduleReq.data
        setWake(start)
        setSleep(end)


        /* CONDITIONAL SCHEDULE RELOADING - IS IT NECESSARY? IF SO, NEEDS TO BE REDONE
        
        const taskReq = await axios.get("http://localhost:8282/task/")
        let tasks = taskReq.data.filter(task => task.isActive)

        if (scheduleReq.data.schedule.length != tasks.length) {
            sortSchedule(setSchedule, start, end)
            //await axios.patch(`http://localhost:8282/schedule/`, {schedule})
        }*/
    }

    async function refreshSchedule(){
        //Loop through JSON tasks in schedule
        for (let i = 0; i < schedule.length; i++){
            // Update completed value of each task (only refresh value currently)
            let currentID = schedule[i]._id;
            let cTaskReq = await axios.get(`http://localhost:8282/task/${currentID}`)
            let cTask = cTaskReq.data;
            schedule[i].completed = cTask.completed;
        }
        //Patch updated schedule to server
        await axios.patch(`http://localhost:8282/schedule/`, {schedule, wake, sleep})
    }

    function renderSchedule(){
        return schedule.map((task) => {
            return <ScheduleBlock task={task} refreshSchedule={refreshSchedule} getSchedule = {getSchedule}></ScheduleBlock>
        })
    }

    async function updateStats(){
        //update task stats
        let today = new Date(wake)
        let dayDurationToAdd = 0

        schedule.forEach(async task => {
            //loop through completed tasks
            if (task.completed){
                let {_id, duration} = task;
                let taskStatReq = await axios.get(`http://localhost:8282/taskStat/${_id}/`)
                let {entries, timesCompleted, netTime} = taskStatReq.data;
                let entryDate = new Date()
                if (entries.length != 0){
                    let tempEntryDate = new Date(entries[entries.length-1].date)
                    entryDate = tempEntryDate;
                }

                //CHECK TO MAKE SURE TASK HAS NOT BEEN COMPLETED TODAY, then push stats
                if(entries.length == 0 || !(entryDate.getMonth() == today.getMonth() && entryDate.getDate() == today.getDate())){
                    let entryToPush = {date: wake, duration: duration}
                    dayDurationToAdd += duration;
                    entries.push(entryToPush)
                    await axios.patch(`http://localhost:8282/taskStat/${_id}/`, {entries: entries, timesCompleted: timesCompleted + 1, netTime: netTime + duration, averageDuration: ((netTime + duration)/(timesCompleted + 1))})
                } else {
                    console.log("task already completed today")
                }
            } else{
                console.log("task not completed")
            }
        })

        //update user stats
        // Pull user stats

        let userStatReq = await axios.get("http://localhost:8282/userStat/")
        let {entries, daysCompleted, streak} = userStatReq.data;

        let entryDate = new Date()
        if (entries.length != 0){
            let tempEntryDate = new Date(entries[entries.length-1].date)
            entryDate = tempEntryDate;
        }

        if (entries.length == 0 || !(entryDate.getMonth() == today.getMonth() && entryDate.getDate() == today.getDate())){
            //if no entry for today
            let entryToPush = {date: wake, duration: dayDurationToAdd}
            entries.push(entryToPush)
            await axios.patch("http://localhost:8282/userStat/", {entries, daysCompleted: daysCompleted + 1, streak: streak + 1})
        } else if (dayDurationToAdd > 0) {
            let entryToPush = {date: wake, duration: entries[entries.length - 1].duration + dayDurationToAdd}
            entries.push(entryToPush)
            await axios.patch("http://localhost:8282/userStat/", {entries, daysCompleted, streak})
        }

    }

    async function updateHours(start, end){
        try {
            // Create Date objects for updated wake & start time (convert from hh:mm)
            let startDate = convertTime(start, "date");
            let endDate = convertTime(end, "date");
            setWake(startDate)
            setSleep(endDate)
            // console.log(startDate);
            //console.log(endDate);

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

    const events = [{
        id: 1,
        color: '#fd3153',
        from: '2022-05-01T18:00:00+00:00',
        to: '2022-05-05T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        color: '#1ccb9e',
        from: '2019-05-01T13:00:00+00:00',
        to: '2019-05-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        color: '#3694DF',
        from: '2019-05-05T13:00:00+00:00',
        to: '2019-05-05T20:00:00+00:00',
        title: 'This is also another event'
    }];

    return( 
        <div>
            <PageTitle>Name</PageTitle>
            <SubHeading>A scheduling app</SubHeading>

            {<button onClick={()=>setHoursExpanded(!hoursExpanded)}>Edit Hours</button>}
            {hoursExpanded && <ExpandableContainer><TimeInput update={updateHours} wake={convertTime(wake, "utc")} sleep={convertTime(sleep, "utc")} close={setHoursExpanded}/></ExpandableContainer>}

            <div>{renderSchedule()}</div>
            <ScheduleButton onClick={()=> sortSchedule(setSchedule, wake, sleep)}><ScheduleText>Generate Schedule</ScheduleText></ScheduleButton>
            <ScheduleButton onClick={()=> resortSchedule(setSchedule, wake, sleep)}><ScheduleText>Resort Schedule</ScheduleText></ScheduleButton>
            <ScheduleButton onClick={()=> updateStats()}><ScheduleText>Call It A Day</ScheduleText></ScheduleButton>

            <div className="border rounded-md px-8 py-5 overflow-hidden">
            <Calendar
                events={events}
            />
            </div>
        </div>
    )
}
import React, {useState, useEffect} from "react"
import axios from "axios"
import ScheduleBlock from './schedule-block'
import sortSchedule from "../../methods/sort-schedule"
import resortSchedule from "../../methods/resort-schedule"
import getDateValue from "../../methods/get-date-value"
import addDays from "../../methods/add-days"
import styled from "styled-components"
import ExpandableContainer from "../generic/expandable-container"
import sameDate from "../../methods/same-date"
import Calendar from 'react-awesome-calendar';
import {CheckSquare, Square} from "phosphor-react"
import Countdown from "./countdown"
import { TimeField } from '@mui/x-date-pickers/TimeField';
const dayjs = require('dayjs')
dayjs().format()

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
    text-transform: uppercase;
    font-weight: 300;
    margin-left:20px;
`


export default function ScheduleDisplay(){
    const [calendarEntries, setCalendarEntries] = useState([])
    const [currentDay, setCurrentDay] = useState(new Date())
    const [dayDistance, setDayDistance] = useState(0)
    const [schedule, setSchedule] = useState([])
    const [wake, setWake] = useState(new Date())
    const [sleep, setSleep] = useState(new Date())
    const [hoursExpanded, setHoursExpanded] = useState(false)
    const [focusMode, setFocusMode] = useState(false)

    async function getSchedule(){
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        let {entries} = scheduleReq.data;
        setCalendarEntries(entries)
        let found = false
        // TODO set the schedule based on a state value representing which day is being edited
        for (let i = 0; i < entries.length; i++){
            // If an entry matching the selected day is found
            if (sameDate(entries[i].wake, currentDay)){
                console.log("current date is " + currentDay + " and wake entry is " + entries[i].wake)
                setSchedule(entries[i].schedule)
                console.log(entries[i].schedule)
                setWake(entries[i].wake)
                setSleep(entries[i].sleep)
                found = true
            }
        }

        // Add an entry for the selected day if none exists, then get data again
        if (!found){
            console.log("an entry was not found :(")
            let entryToAdd = {schedule: [], wake: currentDay, sleep: sleep}
            entries.push(entryToAdd)
            if (entries.length > 1){
                entries.sort((a, b) => Date.parse(a.wake) - Date.parse(b.wake))
            }

            await axios.patch("http://localhost:8282/schedule/", {entries}, {new: true})
            getSchedule()
        }
        /* TODO CONDITIONAL SCHEDULE RELOADING - IS IT NECESSARY? IF SO, NEEDS TO BE REDONE
        
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
            return <ScheduleBlock task={task} refreshSchedule={refreshSchedule} getSchedule = {getSchedule} currentDay={currentDay}></ScheduleBlock>
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

    async function updateHours(){
        console.log("updating")
        try {
            // Find entry matching selected day. Update hours. Get Schedule. 
            
            const scheduleReq = await axios.get("http://localhost:8282/schedule/")
            console.log(scheduleReq.data)
            let {entries} = scheduleReq.data;
            let found = false

            for (let i = 0; i < entries.length; i++){
                // If an entry matching the selected day is found
                if (sameDate(entries[i].wake, currentDay)){
                    entries[i].wake = wake;
                    entries[i].sleep = sleep;
                    // TODO should wake & start be set manually? Or does sorting call getSchedule and reset?
                    await axios.patch("http://localhost:8282/schedule/",{entries})

                    sortSchedule(setSchedule, wake, sleep, currentDay);
                }
            }

            setHoursExpanded(false)
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getSchedule()
    }, [currentDay])


    //TODO ??? is this
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
            <PageTitle>{getDateValue(currentDay, "numeric")}</PageTitle>

            {dayDistance > 0 ? <div>
                <ScheduleButton onClick={() => {
                setCurrentDay(addDays(currentDay, -1))
                setDayDistance(dayDistance - 1)
            }}><ScheduleText>-</ScheduleText></ScheduleButton>
            </div> : <div></div>}

            <ScheduleButton onClick={() => {
                console.log("new date is " + addDays(currentDay, 1))
                setCurrentDay(addDays(currentDay, 1))
                setDayDistance(dayDistance + 1)
            }}><ScheduleText>+</ScheduleText></ScheduleButton>
            <SubHeading>A scheduling app</SubHeading>
            {<button onClick={()=>setHoursExpanded(!hoursExpanded)}>Edit Hours</button>}
            {hoursExpanded && 
                <ExpandableContainer>
                    <TimeField
                        label="Start Time"
                        value={dayjs(wake)}
                        onChange={(newWake) => {setWake(newWake.toDate())}}
                    />
                    
                    <TimeField
                        label="End Time"
                        value={dayjs(sleep)}
                        onChange={(newSleep) => {setSleep(newSleep.toDate())}}
                    />

                    <button onClick={()=>updateHours()}>Done</button>
                </ExpandableContainer>
            }

            <span>
              { dayDistance == 0 && focusMode ? (
                
                <CheckSquare
                  size={20}
                  onClick={() => setFocusMode(false)}
                  className="text-gray-500"
                              />
                            ) : dayDistance == 0 && (
                              <Square
                                size={20}
                                onClick={() => setFocusMode(true)}
                                className="text-gray-500"
                              />
                            )}
            </span>
            
            {focusMode && dayDistance == 0 ? <div><Countdown schedule={schedule} currentDay={currentDay} getSchedule={getSchedule}/></div> : 
            <div> 
                <div>{renderSchedule()}</div>
                {wake != null && wake != "Invalid Date" ? 
                <div>
                    <ScheduleButton onClick={()=> sortSchedule(setSchedule, wake, sleep, currentDay)}><ScheduleText>Generate Schedule</ScheduleText></ScheduleButton>
                    {dayDistance == 0 && <ScheduleButton onClick={()=> resortSchedule(setSchedule, wake, sleep, currentDay)}><ScheduleText>Resort Schedule</ScheduleText></ScheduleButton>}
                    {dayDistance == 0 && <ScheduleButton onClick={()=> updateStats()}><ScheduleText>Call It A Day</ScheduleText></ScheduleButton>}
                </div> : 
                <p>You must set your schedule's start and end hours before generating.</p>}
            </div>} 
            </div>

    )
}
import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import axios from "axios"
import sameDate from "../../methods/same-date";
const dayjs = require('dayjs')
dayjs().format()

const Count = styled.h1`
  font-size:125px;
  text-align:center;
  `

const TaskHeader = styled.h2`
    font-size:75px;
    text-align:center;
`
function Countdown({schedule, currentDay, getSchedule}){
    const [index, setIndex] = useState(-1)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [elapsed, setElapsed] = useState(false)
    const [init, setInit] = useState(false)

    useEffect(()=>{
        const interval = setInterval(() => decrease(), 1000);
        return () => clearInterval(interval);
    }, [minutes, seconds])

    async function completeTask(){
        if (schedule[index]._id.slice(0, 8) != "freetime"){
            const taskReq = await axios.get(`http://localhost:8282/task/${schedule[index]._id}/`)

            //find appropriate entry
            let index2 = -1;
            let {defaults, name, entries} = taskReq.data

            for (let i = 0; i < entries.length; i++){
                if (sameDate(currentDay, entries[i].date)){
                    index2 = i;
                    break;
                }
            }

            entries[index2].completed = !entries[index2].completed
            
            //Patch task with updated completed value
            await axios.patch(`http://localhost:8282/task/${schedule[index]._id}`, {name, entries, defaults})
        }

        //TODO: this is poorly structured. schedule data should only update if and after the task data updates.
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        let {entries} = scheduleReq.data;
         //Sort through schedule on most recent entry and update modified task
         let index2 = -1
         for (let i = 0; i < entries.length; i++){
            if (sameDate(currentDay, entries[i].wake)){
                index2 = i 
                break
            }
         }

        entries[index2].schedule.forEach(task => {
            if (task._id == schedule[index]._id){
                task.completed = !task.completed;
            }
        });
        
        await axios.patch('http://localhost:8282/schedule/', {entries})
        getSchedule();

        setElapsed(false)
        setInit(false)
    }

    function decrease(){
        if (!elapsed && init){
            if (seconds == 0 && minutes == 0){
                setElapsed(true)
                setSeconds(1)
            } else if (seconds == 0){
                setSeconds(59)
                setMinutes(minutes - 1)
            } else {
                setSeconds(seconds - 1)
            }
        } else if (!elapsed){
            if (seconds == 0 && minutes == 0){
                findRemaining()
            } else if (seconds == 0){
                setSeconds(59)
                setMinutes(minutes - 1)
            } else {
                setSeconds(seconds - 1)
            }
        } else if (elapsed){
            if (seconds == 59){
                setSeconds(0)
                setMinutes(minutes + 1)
            } else {
                setSeconds(seconds + 1)
            }
        }
    }
    function findRemaining(){
        console.log("finding")
        let currentTime = dayjs(new Date);
        for (let i = 0; i < schedule.length; i++){
            let tempDate = dayjs(schedule[i].start)
            let tempDate2 = dayjs(schedule[i].end)
            console.log(tempDate)
            console.log(tempDate2)
            if(tempDate.diff(currentTime, "second") < 0 && tempDate2.diff(currentTime, "second") > 0){
                setIndex(i)
                setMinutes(tempDate2.diff(currentTime, "minute"))
                setSeconds(tempDate2.diff(currentTime, "second") %60)
                setInit(true)
            }
        }
    }

    return(<>
        <TaskHeader>{index != -1 && schedule[index].name}</TaskHeader>
        <Count>{minutes}:{seconds < 10 ? "0" + seconds.toString(): seconds}</Count>
        {elapsed && <button onClick={()=>completeTask()}>I'm Done!</button>}
        {index != -1 && schedule[index].notes.map((note) =>{
            return <p>{note}</p>
        })}

        {index != -1 && schedule[index].links.map((link) =>{
            return <a href={link}>{link}</a>
        })}
    </>)
}

export default Countdown;
import React, {useState, useEffect} from "react"
import styled from "styled-components"
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
function Countdown({schedule}){
    const [index, setIndex] = useState(-1)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(()=>{
        findRemaining()
        const interval = setInterval(() => decrease());
    }, [])

    function decrease(){
        if (seconds == 0 && minutes == 0){
            findRemaining()
        } else if (seconds == 0){
            setSeconds(59)
            setMinutes(minutes-1)
        } else {
            setSeconds(seconds - 1)
        }
    }
    function findRemaining(){
        let currentTime = dayjs(new Date());
        for (let i = 0; i < schedule.length - 1; i++){
            let tempDate = dayjs(schedule[i].start)
            let tempDate2 = dayjs(schedule[i].end)
            if(tempDate.diff(currentTime, "second") < 0 && tempDate2.diff(currentTime, "second") > 0){
                setIndex(i)
                setMinutes(tempDate2.diff(currentTime, "minute"))
                setSeconds(tempDate2.diff(currentTime, "second") % 60)
            }
        }
    }

    return(<>
        <TaskHeader>{index != -1 && schedule[index].name}</TaskHeader>
        <Count>{minutes}:{seconds < 10 ? "0" + seconds.toString(): seconds}</Count>
    </>)
}

export default Countdown;
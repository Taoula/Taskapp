import React, {useState, useEffect} from "react"
import axios from "axios"
import ScheduleBlock from './ScheduleBlock'
import sortSchedule from "../../methods/sortSchedule"
import styled from "styled-components"

const ScheduleButton = styled.button`
    background-color: rgb(48, 128, 242);
    border: none;
    border-radius: 10px;
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
    font-family: Nunito;
    text-transform: uppercase;
    font-weight: 700;
`


function ScheduleDisplay(){
    const [schedule, setSchedule] = useState([])

    async function getSchedule(){
        const scheduleReq = await axios.get("http://localhost:5000/schedule/")
        setSchedule(scheduleReq.data.schedule)
    }

    function renderSchedule(){
        return schedule.map((task) => {
            return <ScheduleBlock task={task}></ScheduleBlock>
        })
    }

    useEffect(() => {
        getSchedule()
    }, [])

    return( 
        <div>
            <PageTitle>Dynamic Schedule</PageTitle>
            <div>{renderSchedule()}</div>
            <ScheduleButton onClick={()=> sortSchedule(setSchedule, {})}><ScheduleText>Generate Schedule</ScheduleText></ScheduleButton>
        </div>
    )
}

export default ScheduleDisplay
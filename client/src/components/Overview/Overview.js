import React, { useState, useEffect } from "react";
import axios from "axios"
import TaskStatGraph from "../statistics/TaskStatGraph";
import "tw-elements";

export default function Overview() {
  const [streak, setStreak] = useState()
  const [daysCompleted, setDaysCompleted] = useState()

  useEffect(() => {
    getUserStatData()
    console.log("overview get effect")
  })

  async function getUserStatData(){
    let userStatReq = await axios.get("http://localhost:8282/userStat/")
    const {streak, daysCompleted} = userStatReq.data;
    setStreak(streak)
    setDaysCompleted(daysCompleted)
  }

  return (
    <>
      {streak > 0 ? <p>{streak} day streak</p> : <p>No streak</p>}
      {daysCompleted > 0 ? <p>{daysCompleted} total days completed</p> : <p>No days have been completed yet</p>}
      <h1 className="text-3xl font-normal">Overview</h1>
      <TaskStatGraph></TaskStatGraph>
    </>
  );
}

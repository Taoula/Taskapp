import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskStatGraph from "../statistics/TaskStatGraph";
import "tw-elements";

export default function Overview() {
  const [streak, setStreak] = useState();
  const [daysCompleted, setDaysCompleted] = useState();

  useEffect(() => {
    getUserStatData();
    console.log("overview get effect");
  });

  async function getUserStatData() {
    let userStatReq = await axios.get("http://localhost:8282/userStat/");
    const { streak, daysCompleted } = userStatReq.data;
    setStreak(streak);
    setDaysCompleted(daysCompleted);
  }

  return (
    <>
      <div className="space-y-2">
        {streak > 0 ? (
          <p className="text-3xl text-slate-900">{streak} day streak</p>
        ) : (
          <p className="text-3xl font-medium text-slate-900">No streak!</p>
        )}
        {daysCompleted > 0 ? (
          <p className="text-slate-500">{daysCompleted} total days completed</p>
        ) : (
          <p className="text-slate-500">You haven't completed any days yet 🫤</p>
        )}
      </div>
      <TaskStatGraph />
    </>
  );
}

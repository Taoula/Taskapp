import React, { useState } from "react";
import styled from "styled-components";
import { Square, CheckSquare } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import axios from "axios";
import { useEffect } from "react";
import sameDate from "../../methods/same-date";
import convertTime from "../../methods/convert-time";
import convertTimeNew from "../../methods/convert-time-new"



function ScheduleBlock({ task, getSchedule, currentDay, schedule, gridRowStyles }) {
  //console.log(task)
  const { name, start, end, _id, completed, duration, fixed } = task;
  const [isCompleted, setIsCompleted] = useState(completed);

  function toHourTime(minuteSum) {
    let hours = Math.floor(minuteSum / 60);
    let minutes = minuteSum % 60;
    return hours == 0
      ? minutes.toString() + " minutes"
      : hours.toString() + " hours " + minutes.toString() + " minutes";
  }

  async function toggleCompleted() {
    // Pull task and schedule data
    if (_id.slice(0, 8) != "freetime") {
      const taskReq = await axios.get(`http://localhost:8282/task/${_id}/`);

      //find appropriate entry
      let index = -1;
      let { defaults, name, entries } = taskReq.data;

      for (let i = 0; i < entries.length; i++) {
        if (sameDate(currentDay, entries[i].date)) {
          index = i;
          break;
        }
      }

      entries[index].completed = !entries[index].completed;

      //Patch task with updated completed value
      await axios.patch(`http://localhost:8282/task/${_id}`, {
        name,
        entries,
        defaults,
      });
    }

    //TODO: this is poorly structured. schedule data should only update if and after the task data updates.
    const scheduleReq = await axios.get("http://localhost:8282/schedule/");
    let { entries } = scheduleReq.data;
    //Sort through schedule on most recent entry and update modified task
    let index = -1;
    for (let i = 0; i < entries.length; i++) {
      if (sameDate(currentDay, entries[i].wake)) {
        index = i;
        break;
      }
    }

    entries[index].schedule.forEach((task) => {
      if (task._id == _id) {
        task.completed = !task.completed;
      }
    });

    await axios.patch("http://localhost:8282/schedule/", { entries });
    getSchedule();
  }

  useEffect(() => {
    setIsCompleted(completed);
  });

  // TODO Needs to be refactored

  return (


    <li className="relative mt-px flex" style={gridRowStyles}>
      <a
        href="/"
        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
      >
        <p className="order-1 font-semibold text-pink-700">{name}</p>
        <p className="order-1 text-pink-500 group-hover:text-pink-700">
          {name}
        </p>
        <p className="text-pink-500 group-hover:text-pink-700">
        {/* TODO: dateTime january 2022? */}
          <time dateTime="2022-01-22T07:30">{convertTimeNew(start)}</time>
        </p>
      </a>
    </li>
  );
}

export default ScheduleBlock;

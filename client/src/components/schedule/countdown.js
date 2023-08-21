import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import axios from "axios";
import sameDate from "../../methods/same-date";
const dayjs = require("dayjs");
dayjs().format();

function Countdown({ schedule, currentDay, getSchedule }) {
  const [index, setIndex] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [elapsed, setElapsed] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => decrease(), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  async function completeTask() {
    if (schedule[index]._id.slice(0, 8) != "freetime") {
      const taskReq = await axios.get(
        `http://localhost:8282/task/${schedule[index]._id}/`
      );

      //find appropriate entry
      let index2 = -1;
      let { defaults, name, entries } = taskReq.data;

      for (let i = 0; i < entries.length; i++) {
        if (sameDate(currentDay, entries[i].date)) {
          index2 = i;
          break;
        }
      }

      entries[index2].completed = !entries[index2].completed;

      //Patch task with updated completed value
      await axios.patch(`http://localhost:8282/task/${schedule[index]._id}`, {
        name,
        entries,
        defaults,
      });
    }

    //TODO: this is poorly structured. schedule data should only update if and after the task data updates.
    const scheduleReq = await axios.get("http://localhost:8282/schedule/");
    let { entries } = scheduleReq.data;
    //Sort through schedule on most recent entry and update modified task
    let index2 = -1;
    for (let i = 0; i < entries.length; i++) {
      if (sameDate(currentDay, entries[i].wake)) {
        index2 = i;
        break;
      }
    }

    entries[index2].schedule.forEach((task) => {
      if (task._id == schedule[index]._id) {
        task.completed = !task.completed;
      }
    });

    await axios.patch("http://localhost:8282/schedule/", { entries });
    getSchedule();

    setElapsed(false);
    setInit(false);
  }

  function decrease() {
    if (!elapsed && init) {
      if (seconds === 0 && minutes === 0 && hours === 0) {
        setElapsed(true);
      } else if (seconds === 0 && (minutes > 0 || hours > 0)) {
        setSeconds(59);
        if (minutes > 0) {
          setMinutes(minutes - 1);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    } else if (!elapsed) {
      if (seconds === 0 && minutes === 0 && hours === 0) {
        findRemaining();
      } else if (seconds === 0 && (minutes > 0 || hours > 0)) {
        setSeconds(59);
        if (minutes > 0) {
          setMinutes(minutes - 1);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    } else if (elapsed) {
      if (seconds === 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
        if (minutes === 59) {
          setMinutes(0);
          setHours(hours + 1);
        }
      } else {
        setSeconds(seconds + 1);
      }
    }
  }

  function formatTime(hours, minutes, seconds) {
    const timeParts = [];

    if (hours > 0) {
      timeParts.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
    }

    if (minutes > 0 || hours > 0) {
      timeParts.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);
    }

    timeParts.push(`${seconds} Second${seconds !== 1 ? "s" : ""}`);

    return timeParts.join(" ");
  }

  function findRemaining() {
    console.log("finding");
    let currentTime = dayjs(new Date());
    for (let i = 0; i < schedule.length; i++) {
      let tempDate = dayjs(schedule[i].start);
      let tempDate2 = dayjs(schedule[i].end);
      console.log(tempDate);
      console.log(tempDate2);
      if (
        tempDate.diff(currentTime, "second") < 0 &&
        tempDate2.diff(currentTime, "second") > 0
      ) {
        setIndex(i);
        setHours(tempDate2.diff(currentTime, "hour")); // Update hours
        setMinutes(tempDate2.diff(currentTime, "minute") % 60); // Update minutes
        setSeconds(tempDate2.diff(currentTime, "second") % 60);
        setInit(true);
      }
    }
  }

  return (
    <>
      <h1 className="text-center text-5xl pb-8">
        {index !== -1 && schedule[index].name}
      </h1>
      <table className="w-full table-fixed max-w-sm">
        <thead>
          <tr>
            <th className="text-lg font-normal pb-4">Hours</th>
            <th className="text-lg font-normal pb-4">Minutes</th>
            <th className="text-lg font-normal pb-4">Seconds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-7xl text-center px-4">{hours}</td>
            <td className="text-7xl text-center px-4">{minutes}</td>
            <td className="text-7xl text-center px-4">{seconds}</td>
          </tr>
        </tbody>
      </table>

      {/* <p className="text-7xl">{formatTime(hours, minutes, seconds)}</p> */}
      {elapsed && <button onClick={() => completeTask()}>I'm Done!</button>}
      {index !== -1 &&
        schedule[index].notes.map((note, idx) => <p key={idx}>{note}</p>)}
      {index !== -1 &&
        schedule[index].links.map((link, idx) => (
          <a key={idx} href={link}>
            {link}
          </a>
        ))}
    </>
  );
}

export default Countdown;

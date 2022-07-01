import { Input } from "postcss";
import React from "react";

function TimeInput(props) {
  const { update } = props;
  function formatTime(e) {
    e.preventDefault();
    let startTime = `${document.getElementById("start-hours").value}:${
      document.getElementById("start-minutes").value
    } ${document.getElementById("startampm").value}`;
    let endTime = `${document.getElementById("end-hours").value}:${
      document.getElementById("end-minutes").value
    } ${document.getElementById("endampm").value}`;
    update(startTime, endTime);
  }

  return (
    <form onSubmit={(e) => formatTime(e)}>
        <input type="number" placeholder="12" id="start-hours" className=" bg-transparent text-xl appearance-none outline-none" />
        <input type="number" placeholder="00" id="start-minutes" className="border-none" />
        <select id="startampm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
        <br />
        <input type="number" placeholder="12" id="end-hours"/>
        <input type="number" placeholder="00" id="end-minutes"/>
        <select id="endampm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
        <br />
        <button type="submit" value="submit" className="bg-indigo-600 rounded-lg px-5 py-3 font-medium text-white">Submit</button>
    </form>
  );
}

export default TimeInput;
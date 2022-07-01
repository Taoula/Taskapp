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

    if (props.close != null){
        props.close(false)
    }
  }

  return (
    <form onSubmit={(e) => formatTime(e)}>
        <input type="number" min="1" max="12" placeholder="12" id="start-hours" className=" bg-transparent text-xl appearance-none outline-none" required/>
        <input type="number" min="0" max="59" placeholder="00" id="start-minutes" className="border-none" required/>
        <select id="startampm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
        <br />
        <input type="number" min="1" max="12" placeholder="12" id="end-hours" required/>
        <input type="number" min="0" max="59" placeholder="00" id="end-minutes" required/>
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
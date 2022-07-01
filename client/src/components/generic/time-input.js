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
    <div class="mt-2 p-5 w-40">
      <div class="flex">
        <select
          name="hours"
          class="bg-transparent text-xl appearance-none outline-none"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">10</option>
          <option value="12">12</option>
        </select>
        <span class="text-xl mr-3">:</span>
        <select
          name="minutes"
          class="bg-transparent text-xl appearance-none outline-none mr-4"
        >
          <option value="0" id="start-hours">00</option>
          <option value="30" id="start-minutes">30</option>
        </select>
        <select
          class="bg-transparent text-xl appearance-none outline-none"
          id="endampm"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <div class="mt-2 p-5 w-40">
      <div class="flex">
        <select
          name="hours"
          class="bg-transparent text-xl appearance-none outline-none"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">10</option>
          <option value="12">12</option>
        </select>
        <span class="text-xl mr-3">:</span>
        <select
          name="minutes"
          class="bg-transparent text-xl appearance-none outline-none mr-4"
        >
          <option value="0" id="end-hours">00</option>
          <option value="30" id="end-minutes">30</option>
        </select>
        <select
          class="bg-transparent text-xl appearance-none outline-none"
          id="endampm"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <button type="submit" value="submit" className="bg-indigo-600 rounded-lg px-5 py-3 font-medium text-white">Submit</button>
    </form>
    // <form onSubmit={(e) => formatTime(e)}>
    //     <input type="number" placeholder="12" id="start-hours" className="border-none" />
    //     <input type="number" placeholder="00" id="start-minutes" className="border-none" />
    //     <select id="startampm">
    //         <option value="AM">AM</option>
    //         <option value="PM">PM</option>
    //     </select>
    //     <br />
    //     <input type="number" placeholder="12" id="end-hours"/>
    //     <input type="number" placeholder="00" id="end-minutes"/>
    //     <select id="endampm">
    //         <option value="AM">AM</option>
    //         <option value="PM">PM</option>
    //     </select>
    //     <br />
    //     <button type="submit" value="submit" className="bg-indigo-600 rounded-lg px-5 py-3 font-medium text-white">Submit</button>
    // </form>
  );
}

export default TimeInput;

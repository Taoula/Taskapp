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

    if (props.close != null) {
      props.close(false);
    }
  }

  return (
    <form
      className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-red-500 max-w-xs"
      onSubmit={(e) => formatTime(e)}
    >
      {/* start hours input */}
      <div>
        <label class="text-lg font-light">Start hours</label>
        <div className="relative mt-1 flex bg-white shadow-lg rounded-sm">
          <input
            min="1"
            max="12"
            id="start-hours"
            placeholder="12"
            className="w-10 border-none rounded-sm p-2 timeInput"
            required
          />
          <p className="text-3xl">:</p>
          <input
            placeholder="00"
            min="0"
            max="59"
            id="start-minutes"
            required
            className="w-10 border-none rounded-sm p-2"
          />
          <select className="w-15 ml-1 border-none rounded-sm" id="startampm">
            <option value="AM">am</option>
            <option value="PM">pm</option>
          </select>
        </div>
      </div>

      {/* end hours input */}
      <div>
        <label class="text-lg font-light">End hours</label>
        <div className="relative mt-1 flex bg-white shadow-lg rounded-sm">
          <input
            placeholder="12"
            className="w-10 border-none rounded-sm p-2 timeInput"
            min="1"
            max="12"
            id="end-hours"
            required
          />
          <p className="text-3xl">:</p>
          <input
            placeholder="00"
            min="0"
            max="59"
            id="end-minutes"
            required
            className="w-10 border-none rounded-sm p-2"
          />
          <select className="w-15 ml-1 border-none rounded-sm" id="endampm">
            <option value="AM">am</option>
            <option value="PM">pm</option>
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          input={+true}
          value="submit"
          className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-sm"
        >
          <span className="text-xl font-light">Log In</span>
        </button>
      </div>
    </form>
  );
}

export default TimeInput;

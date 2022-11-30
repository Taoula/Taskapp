import React, { useState, useEffect } from "react";
import TaskStatGraph from "../statistics/TaskStatGraph";
import "tw-elements";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CreateTaskForm({ getTasks, visible, onClose }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");

  // function handles form submission
  async function onSubmit(e) {
    e.preventDefault();
    const taskData = {
      name,
      duration,
      priority,
      isActive: false,
      completed: false,
    };

    await axios
      .post("http://localhost:8282/task/", taskData)
      .then((res) => res.data)
      .then(async (res) => {
        let _id = res._id;
        let newTaskStat = { task: _id, entries: [] };
        await axios.post(`http://localhost:8282/taskStat/`, newTaskStat);
      });
    getTasks();

    // input fields are reset to empty
    setName("");
    setDuration("");
    setPriority("");
  }

  

  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-normal mb-8">Create a Task</h1>
          <form className="space-y-8 mr-8" onSubmit={(e) => onSubmit(e)}>
            <div>
              <label className="block text-sm text-gray-500 mb-2 font-normal">
                Task Name
              </label>
              <input
                type="text"
                placeholder="task"
                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 font-normal">
                Task Duration
              </label>
              <input
                type="number"
                placeholder="duration (minutes)"
                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                min="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></input>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 font-normal">
                Task Priority
              </label>
              <input
                type="number"
                placeholder="priority (1-3)"
                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                min="1"
                max="5"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              ></input>
            </div>
            <Link to="/dashboard/tasks">
            <button
              type="submit"
              input={+true}
              value="submit"
              className="border px-4 py-2 rounded-md text-xs font-normal text-white bg-indigo-500 border-indigo-500 hover:bg-indigo-800 hover:border-indigo-800"
            >
              Save
            </button>
            </Link>
          </form>
        </div>
        <div className="w-1/4 space-x-2">
          <Link
            to="/dashboard/tasks"
            className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
}

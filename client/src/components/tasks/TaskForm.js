import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({ getTasks, visible, onClose }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");

  // is not visible is true then nothing will be returned
  if (!visible) return null;

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

    // prop is passed from task-display to give access to form closure function
    onClose();
  }

  // functions handles form closure
  const handleOnClose = (e) => {
    // the form will close if the user clicks on the background
    if (e.target.id === "formBackground") {
      // input fields are reset to empty
      setName("");
      setDuration("");
      setPriority("");

      // prop is passed from task-display to give access to form closure function
      onClose();
    }
    // the form will close if the user clicks on the cancel button
    else if (e.target.id === "cancelButton") {
      // input fields are reset to empty
      setName("");
      setDuration("");
      setPriority("");

      // prop is passed from task-display to give access to form closure function
      onClose();
    }
  };

  return (
    <>
      <h1>Create a Task</h1>
      <div
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        id="formBackground"
      >
        <div className="max-w-4xl py-16 mx-auto">
          <form
            class="px-8 py-5 space-y-4 rounded-md bg-white"
            onSubmit={(e) => onSubmit(e)}
          >
            <p class="text-lg font-normal text-left">Create a new task</p>

            <div>
              <label class="text-sm font-medium">Task Name</label>

              <div class="relative mt-1">
                <input
                  type="text"
                  id=""
                  class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label class="text-sm font-medium">Duration</label>

              <div class="relative mt-1">
                <input
                  type="number"
                  id=""
                  class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Duration (minutes)"
                  min="5"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label class="text-sm font-medium">Priority</label>

              <div class="relative mt-1">
                <input
                  type="number"
                  class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Priority (1 - 3)"
                  min="1"
                  max="5"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
            </div>

            <div className="space-x-2">
              <button
                type="submit"
                class="px-4 py-2 text-xs font-normal text-white bg-indigo-600 rounded-md"
                input={+true}
                value="submit"
              >
                Save
              </button>
              <button
                class="px-4 py-2 text-xs font-normal text-white bg-red-600 rounded-md"
                onClick={handleOnClose}
                id="cancelButton"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

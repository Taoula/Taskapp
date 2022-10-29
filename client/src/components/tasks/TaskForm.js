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

    await axios.post("http://localhost:8282/task/", taskData);
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
    <div
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
      id="formBackground"
    >
      <div className="max-w-md px-4 py-16 mx-auto">
        <form
          action=""
          class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white"
          onSubmit={(e) => onSubmit(e)}
        >
          <p class="text-lg font-medium text-center">Create a new task</p>

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

          <button
            type="submit"
            class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            input={+true}
            value="submit"
          >
            Create
          </button>
          <button
            class="block w-full px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-lg"
            onClick={handleOnClose}
            id="cancelButton"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

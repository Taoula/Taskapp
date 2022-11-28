import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import { Plus } from "phosphor-react";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // state for task menu
  const [toggleState, setToggleState] = useState(1);

  // sets state value to the index of the clicked tab
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // handles form closure
  const handleOnClose = () => {
    // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
    setShowCreateTask(false);
  };

  async function getTasks() {
    const taskReq = await axios.get("http://localhost:8282/task/");
    setTasks(taskReq.data);
  }

  //renders tasks based on active bool
  function renderTasks(active) {
    return tasks.map((task, i) => {
      if (task.isActive === active) {
        return (
          <Task key={i} task={task} getTasks={getTasks}>
            {task.name}
          </Task>
        );
      }
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {/* Tasks menu */}
      <div className="flex justify-between items-center mb-4 mt-8">
        <ul className="flex space-x-1 p-2 rounded border-2 border-indigo-500 shadow-sm text-white">
          <li
            className={
              toggleState === 1
                ? "bg-indigo-900 py-2 px-3 rounded hover:bg-indigo-900"
                : "bg-indigo-500 py-2 px-3 rounded hover:bg-indigo-800"
            }
            onClick={() => toggleTab(1)}
          >
            All
          </li>
          <li
            className={
              toggleState === 2
              ? "bg-indigo-900 py-2 px-3 rounded hover:bg-indigo-900"
                : "bg-indigo-500 py-2 px-3 rounded hover:bg-indigo-800"
            }
            onClick={() => toggleTab(2)}
          >
            Inactive
          </li>
          <li
            className={
              toggleState === 3
              ? "bg-indigo-900 py-2 px-3 rounded hover:bg-indigo-900"
                : "bg-indigo-500 py-2 px-3 rounded hover:bg-indigo-800"
            }
            onClick={() => toggleTab(3)}
          >
            Active
          </li>
          <li className="bg-indigo-500 py-2 px-3 rounded hover:bg-indigo-900">
            Complete
          </li>
          <li className="bg-indigo-500 py-2 px-3 rounded hover:bg-indigo-900">
            Incomplete
          </li>
        </ul>
      </div>

      {/* both fields are visible if all tab is clicked */}
      <div className={toggleState === 1 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 md:space-x-2">
          {/* Inactive tasks field */}
          <div className="bg-white rounded-md shadow-lg text-center border-solid border-2 border-white p-5">
            {/* Title and add button inline */}
            <div className="flex justify-between items-center pb-3">
              <h1 className="font-semibold text-lg">Inactive Tasks</h1>

              {/* add task button */}
              <span className="p-2 rounded-md bg-indigo-200 bg-opacity-50 hover:bg-opacity-80 text-indigo-600 hover:text-white hover:bg-indigo-500">
              <Plus
                size={20}
                onClick={() => setShowCreateTask(true)}
              />
              </span>
            </div>
            {renderTasks(false)}
          </div>

          {/* active tasks field */}
          <div className="bg-white rounded-md shadow-lg text-center border-solid border-2 border-white p-5">
            <div className="flex pb-3 items-center">
              <h1 className="font-semibold text-lg">Active Tasks</h1>
            </div>
            {renderTasks(true)}
          </div>
        </div>
      </div>

      {/* inactive tasks field is only visible if inactive tab is clicked */}
      <div className={toggleState === 2 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1">
          {/* Inactive tasks field */}
          <div className="bg-white rounded-md shadow-lg text-center border-solid border-2 border-white p-5">
            {/* Title and add button inline */}
            <div className="flex justify-between items-center pb-3">
              <h1 className="font-semibold text-lg">Inactive Tasks</h1>

              {/* add task button */}
              <span className="p-2 rounded-md bg-indigo-200 bg-opacity-50 hover:bg-opacity-80 text-indigo-600 hover:text-white hover:bg-indigo-500">
              <Plus
                size={20}
                onClick={() => setShowCreateTask(true)}
              />
              </span>
            </div>
            {renderTasks(false)}
          </div>
        </div>
      </div>

      {/* active tasks field only visible if visible tab is clicked */}
      <div className={toggleState === 3 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1">
          {/* active tasks field */}
          <div className="bg-white rounded-md shadow-lg text-center border-solid border-2 border-white p-5">
            <div className="flex pb-3 items-center">
              <h1 className="font-semibold text-lg">Active Tasks</h1>
            </div>
            {renderTasks(true)}
          </div>
        </div>
      </div>

      <TaskForm
        getTasks={getTasks}
        visible={showCreateTask}
        onClose={handleOnClose}
      />
      {taskFormId === "" && newTask && (
        <TaskForm
          getTasks={getTasks}
          visible={showCreateTask}
          onClose={handleOnClose}
        />
      )}
    </>
  );
}

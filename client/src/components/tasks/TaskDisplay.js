import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import { Plus } from "phosphor-react";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [updateFormScale, setUpdateFormScale] = useState(0);
  const [createFormScale, setCreateFormScale] = useState(0);
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  // const [showUpdateTask, setShowUpdateTask] = useState(false);

  // handles form closure
  const handleOnClose = () => {
    // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
    setShowCreateTask(false);
  };

  // const handleUpdateOnClose = () => {

  //   setShowUpdateTask(false);
  // }

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

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      {/* Tasks menu */}
      <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-2xl">My Tasks</h1>
        <ul className="flex space-x-1 p-1 rounded border-2 border-gray-300">
          <li
            className={
              toggleState === 1
                ? "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400 active-tab"
                : "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400"
            }
            onClick={() => toggleTab(1)}
          >
            All
          </li>
          <li
            className={
              toggleState === 2
                ? "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400 active-tab"
                : "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400"
            }
            onClick={() => toggleTab(2)}
          >
            Inactive
          </li>
          <li
            className={
              toggleState === 3
                ? "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400 active-tab"
                : "bg-gray-300 py-2 px-3 rounded hover:bg-gray-400"
            }
            onClick={() => toggleTab(3)}
          >
            Active
          </li>
          <li className="bg-gray-300 py-2 px-3 rounded hover:bg-gray-400">
            Completed
          </li>
          <li className="bg-gray-300 py-2 px-3 rounded hover:bg-gray-400">
            Incomplete
          </li>
        </ul>
      </div>

      <div className={toggleState === 1 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1 space-x-2 sm:grid-cols-2">
          {/* Inactive tasks field */}
          <div className="bg-stone-100 rounded-lg shadow-lg text-center border-solid border-2 border-stone-200">
            {/* Title and add button inline */}
            <div className="flex justify-between p-6 items-center">
              <h1 className="">Inactive Tasks</h1>
              <Plus
                size={20}
                onClick={() => setShowCreateTask(true)}
                className="hover:text-blue-500"
              />
            </div>
            {renderTasks(false)}
          </div>

          {/* active tasks field */}
          <div className="bg-stone-100 rounded-lg shadow-lg text-center border-solid border-2 border-stone-200">
            <div className="flex p-6 items-center">
              <h1>Active Tasks</h1>
            </div>
            {renderTasks(true)}
          </div>
        </div>
      </div>

      <div className={toggleState === 2 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1 space-x-2 sm:grid-cols-2">
          {/* Inactive tasks field */}
          <div className="bg-stone-100 rounded-lg shadow-lg text-center border-solid border-2 border-stone-200">
            {/* Title and add button inline */}
            <div className="flex justify-between p-6 items-center">
              <h1 className="">Inactive Tasks</h1>
              <Plus
                size={20}
                onClick={() => setShowCreateTask(true)}
                className="hover:text-blue-500"
              />
            </div>
            {renderTasks(false)}
          </div>

          {/* active tasks field
        <div className="bg-stone-100 rounded-lg shadow-lg text-center border-solid border-2 border-stone-200">
          <div className="flex p-6 items-center">
            <h1>Active Tasks</h1>
          </div>
          {renderTasks(true)}
        </div> */}
        </div>
      </div>

      <div className={toggleState === 3 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1 space-x-2 sm:grid-cols-2">
          {/* active tasks field */}
          <div className="bg-stone-100 rounded-lg shadow-lg text-center border-solid border-2 border-stone-200">
            <div className="flex p-6 items-center">
              <h1>Active Tasks</h1>
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
      {/* <button className="bg-red-500 p-3" onClick={() => setShowUpdateTask(true)}>Edit task</button>
      <UpdateTaskForm visible={showUpdateTask} onClose={handleUpdateOnClose}/> */}
    </>
  );
}

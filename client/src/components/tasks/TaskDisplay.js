import React, { useState, useEffect } from "react";
import axios from "axios";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import DashboardFooter from "../layout/DashboardFooter";
import CreateTaskSlideover from "./CreateTaskSlideover";
import CompletedTask from "./CompletedTask";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [open, setOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  // state for task menu
  const [toggleState, setToggleState] = useState(1);

  // sets state value to the index of the clicked tab
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // state for task status menu
  const [secondToggleState, setSecondToggleState] = useState(1);

  const secondToggleTab = (index) => {
    setSecondToggleState(index);
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

  // renders tasks based on completed bool
  function renderCompletedTasks(isComplete) {
    return tasks.map((task, i) => {
      if (task.completed === isComplete && task.isActive === true) {
        return (
          <CompletedTask key={i} task={task} getTasks={getTasks}>
            {task.name}
          </CompletedTask>
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
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-normal">My Tasks</h1>
        <ul className="flex text-gray-500">
          <li
            className={
              toggleState === 1
                ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 text-gray-900 hover:bg-gray-300 font-normal text-xs rounded-l-md border"
                : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs rounded-l-md border"
            }
            onClick={() => toggleTab(1)}
          >
            All
          </li>
          <li
            className={
              toggleState === 2
                ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 text-gray-900 font-normal text-xs border-t border-b"
                : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs border-t border-b"
            }
            onClick={() => toggleTab(2)}
          >
            Inactive
          </li>
          <li
            className={
              toggleState === 3
                ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 text-gray-900 font-normal text-xs rounded-r-md border"
                : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs rounded-r-md border"
            }
            onClick={() => toggleTab(3)}
          >
            Active
          </li>
        </ul>
      </div>

      {/* both fields are visible if all tab is clicked */}
      <div className={toggleState === 1 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Inactive tasks field */}
          <div className="rounded-md text-center p-5 border">
            {/* Title and add button inline */}
            <div className="flex justify-between items-center pb-5">
              <h1 className="font-normal text-lg">Inactive Tasks</h1>

              {/* add task button */}
              <span
                className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2"
                // onClick={() => setShowCreateTask(true)}
                onClick={() => setOpen(true)}
              >
                Add Task
              </span>
            </div>
            <div className="space-y-3">{renderTasks(false)}</div>
          </div>

          {/* active tasks field */}
          <div className="rounded-md text-center p-5 border">
            {/* Title and add button inline */}
            <div className="flex justify-start items-center pb-5">
              <h1 className="font-normal text-lg">Active Tasks</h1>
            </div>
            <div className="space-y-3">{renderTasks(true)}</div>
          </div>
        </div>
      </div>

      {/* inactive tasks field is only visible if inactive tab is clicked */}
      <div className={toggleState === 2 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1">
          <div className="rounded-md text-center p-5 border">
            {/* Title and add button inline */}
            <div className="flex justify-between items-center pb-5">
              <h1 className="font-normal text-lg">Inactive Tasks</h1>

              {/* add task button */}
              <span
                className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2"
                // onClick={() => setShowCreateTask(true)}
                onClick={() => setOpen(true)}
              >
                Add Task
              </span>
            </div>
            <div className="space-y-3">{renderTasks(false)}</div>
          </div>
        </div>
      </div>

      {/* active tasks field only visible if visible tab is clicked */}
      <div className={toggleState === 3 ? "active-content content" : "content"}>
        <div className="grid grid-cols-1">
          <div className="rounded-md text-center p-5 border">
            {/* Title and add button inline */}
            <div className="flex justify-start items-center pb-5">
              <h1 className="font-normal text-lg">Active Tasks</h1>
            </div>
            <div className="space-y-3">{renderTasks(true)}</div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-normal mt-8 mb-5">Task Status</h1>

      {/* Task status tabs */}
      <div className="rounded-md text-center p-5 border">
        <div class="text-sm mb-5 text-center text-gray-500 border-b border-gray-500">
          <ul class="flex flex-wrap -mb-px">
            <li>
              <span
                className={
                  secondToggleState === 1
                    ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
                }
                onClick={() => secondToggleTab(1)}
              >
                Incomplete
              </span>
            </li>
            <li>
              <span
                className={
                  secondToggleState === 2
                    ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
                }
                onClick={() => secondToggleTab(2)}
              >
                Complete
              </span>
            </li>
          </ul>
        </div>

        <div
          className={
            secondToggleState === 1 ? "active-content content" : "content"
          }
        >
          <div className="space-y-3">
          {renderCompletedTasks(false)}
          </div>
        </div>

        <div
          className={
            secondToggleState === 2 ? "active-content content" : "content"
          }
        >
          <div className="space-y-3">
          {renderCompletedTasks(true)}
          </div>
        </div>
      </div>

      <DashboardFooter></DashboardFooter>

      <CreateTaskSlideover
        open={open}
        setOpen={setOpen}
        getTasks={getTasks}
      ></CreateTaskSlideover>

      {/* <TaskForm
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
      )} */}
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./task-form";
import UpdateTaskForm from "./update-task-form";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import styled from "styled-components";

const DisplayContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  height: 100%;
`;

const Display = styled.div`
  background-color: #a98467;
  color: white;
  font-family: Verdana;
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 1fr));
  grid-template-rows: 1fr repeat(5, minmax(auto, 1.5fr));
  grid-gap: 1em;
  font-size: 1rem;
  padding: 0 1em;
`;

const DisplayHeader = styled.h2`
  text-align: center;
  grid-column: 1 / 5;
`;

const NewButton = styled.div`
  transition: 0.2s;
  color: white;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    color: #432818;
  }
`;

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [updateFormScale, setUpdateFormScale] = useState(0);
  const [createFormScale, setCreateFormScale] = useState(0);
  const [newTask, toggle] = useToggle(false);

  async function getTasks() {
    const taskReq = await axios.get("http://localhost:8282/task/");
    setTasks(taskReq.data);
  }

  function enableTaskForm(type, id) {
    if (type === "update") {
      setUpdateFormScale(0);
      setTaskFormId(id);
      setTimeout(() => {
        setUpdateFormScale(1);
      }, 1);
    } else {
      setCreateFormScale(0);
      toggle();
      setTimeout(() => {
        setCreateFormScale(1);
      }, 1);
    }
  }

  function disableTaskForm(type) {
    if (type === "update") {
      setUpdateFormScale(0);
      setTimeout(() => {
        setTaskFormId("");
      }, 400);
    } else {
      setCreateFormScale(0);
      setTimeout(() => {
        toggle();
      }, 400);
    }
  }

  //renders tasks based on active bool
  function renderTasks(active) {
    return tasks.map((task, i) => {
      if (task.isActive === active) {
        return (
          <Task
            key={i}
            task={task}
            getTasks={getTasks}
            enableTaskForm={enableTaskForm}
            disableTaskForm={disableTaskForm}
          >
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
    <div>
      <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 sm:mt-3">
        <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 sm:mt-2 sm:ml-2 sm:mr-1 text-center border-solid border-2 border-stone-200">
          <h1 className="p-2">Inactive Tasks</h1>

          <button
            onClick={() => {
              newTask ? disableTaskForm("create") : enableTaskForm("create");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:fill-neutral-900 hover:stroke-neutral-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {renderTasks(true)}
        </div>

        <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 mt-2 sm:mt-2 sm:ml-1 sm:mr-2 text-center border-solid border-2 border-stone-200">
          <h1 className="p-2">Active Tasks</h1>
          {renderTasks(false)}
        </div>
      </div>

      {taskFormId === "" && newTask && (
          <TaskForm
            getTasks={getTasks}
            disableTaskForm={disableTaskForm}
            scale={createFormScale}
          />
        )}
        {!newTask && taskFormId !== "" && (
          <UpdateTaskForm
            getTasks={getTasks}
            disableTaskForm={disableTaskForm}
            _id={taskFormId}
            scale={updateFormScale}
          />
        )}
    </div>
  );
}

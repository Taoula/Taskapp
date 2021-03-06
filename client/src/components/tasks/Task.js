import React, { useEffect, useState } from "react";
import { Square, CheckSquare } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";
import UpdateTaskForm from "./update-task-form";

const TaskContainer = styled.div`
  background-color: ${(props) => props.color || "pink"};
  transition: 0.2s;
  &:hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;

export default function Task({
  task,
  getTasks
}) {
  const { name, priority, duration, _id, isActive, completed } = task;
  const [isExpanded, toggle] = useToggle(false);
  const colors = ["#f87171", "#fcd34d", "#4ade80"];
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  const handleUpdateOnClose = () => {

    setShowUpdateTask(false);
  }

  async function deleteTask() {
    if (isExpanded) {
      
    }
    const url = `http://localhost:8282/task/${_id}/`;
    await axios.delete(url);
    getTasks();
  }

  async function toggleActive() {
    await axios.patch(`http://localhost:8282/task/${_id}`, {
      name,
      priority,
      duration,
      isActive: !isActive,
      completed,
    });
    getTasks();
  }

  return (
    <div>
      <TaskContainer
        color={colors[priority - 1]}
        onClick={toggle}
        className="text-left mt-1 mb-2 ml-2 mr-2 rounded-lg p-2"
      >
        <div className="grid grid-cols-4">
          <p className="capitalize font-medium text-md">
            {name}:{" "}
            <span className="text-md font-light">{duration} minutes</span>
          </p>

          <div className="flex">
            <p>Delete:</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:fill-black hover:stroke-neutral-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
              onClick={deleteTask}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          <div>
            {isActive ? (
              <CheckSquare size={20} onClick={toggleActive} />
            ) : (
              <Square size={20} onClick={toggleActive} />
            )}
          </div>

          <div>
            <p className="hover:underline" onClick={() => setShowUpdateTask(true)}>Edit Task</p>
          </div>
        </div>
      </TaskContainer>

      <UpdateTaskForm visible={showUpdateTask} onClose={handleUpdateOnClose}/>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Square, CheckSquare } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";
import UpdateTaskForm from "./UpdateTaskForm1";
import { Pencil, Pen, Trash, DotsThree, PencilSimple } from "phosphor-react";
import { useNavigate, Link } from "react-router-dom";
import UpdateTaskSlideover from "../layout/UpdateTaskSlideover";

const TaskContainer = styled.div`
  background-color: ${(props) => props.color || "pink"};
  transition: 0.2s;
  &:hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;

export default function Task({ task, getTasks }) {
  const { name, priority, duration, _id, isActive, completed } = task;
  const [isExpanded, toggle] = useToggle(false);
  const colors = ["#fecdd3", "#fef3c7", "#bbf7d0"];
  const borderColors = ["#e11d48", "#fbbf24", "#22c55e"];
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleUpdateOnClose = () => {
    setShowUpdateTask(false);
  };

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
    <>
      <TaskContainer
        color={colors[priority - 1]}
        style={{ border: `solid ${borderColors[priority - 1]} 1px` }}
        onClick={toggle}
        className="rounded-md pl-5 pr-5 pt-4 pb-4 flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <span>
          {isActive ? (
            <CheckSquare size={20} onClick={toggleActive} />
          ) : (
            <Square size={20} onClick={toggleActive} />
          )}
          </span>
          <span>
                  <h1 className="capitalize font-normal text-md">
          {name}: <span className="font-light">{duration} minutes</span>
        </h1>
        </span>
        </div>
        {/* <DotsThree size={32} /> */}
        <div className="flex space-x-1">
          <span className="hover:text-indigo-600">
            <PencilSimple
              size={20}
              weight="light"
              onClick={() => setShowUpdateTask(true)}
              // onClick={() => setOpen2(true)}
            />
          </span>
          <span className="hover:text-red-500">
            <Trash size={20} weight="light" onClick={deleteTask} />
          </span>
        </div>

        {/* <div className="flex">
            <p>Delete:</p>
            <Trash size={25} weight="fill" onClick={deleteTask} />
          </div>

          <div>
            {isActive ? (
              <CheckSquare size={20} onClick={toggleActive} />
            ) : (
              <Square size={20} onClick={toggleActive} />
            )}
          </div> */}

        {/* <div>
            <p
              className="hover:underline"
              onClick={() => setShowUpdateTask(true)}
            >
              Edit Task
            </p>
            <Pencil size={25} weight="fill" />
          </div> */}
      </TaskContainer>
      <UpdateTaskSlideover open2={open2} setOpen2={setOpen2} getTasks={getTasks}></UpdateTaskSlideover>


      <UpdateTaskForm
        getTasks={getTasks}
        _id={_id}
        visible={showUpdateTask}
        onClose={handleUpdateOnClose}
      />
    </>
  );
}

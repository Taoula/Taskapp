import React, { useEffect, useState } from "react";
import { Square, CheckSquare } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";
import { Trash, PencilSimple } from "phosphor-react";
import UpdateTaskSlideover from "./UpdateTaskSlideover";
import DeleteTaskDialogue from "./DeleteTaskDialogue";

const TaskContainer = styled.div`
  transition: 0.2s;
  &:hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;

export default function CompletedTask({ task, getTasks }) {
  const { name, priority, duration, _id, isActive, completed } = task;
  const [isExpanded, toggle] = useToggle(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteTaskDialogue, setDeleteTaskDialogueOpen] = useState(false);

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
      <TaskContainer className="rounded-md pl-5 pr-5 pt-4 pb-4 flex items-center justify-between bg-gray-50 border-gray-400 border">
        <div className="flex items-center space-x-2">
          <h1 className="capitalize font-normal text-md">
            {name}: <span className="font-light">{duration} minutes</span>
          </h1>
        </div>
        {/* <DotsThree size={32} /> */}
        <div className="flex space-x-1"></div>
        <span>
          {/* {isActive ? (
              <CheckSquare size={20} onClick={toggleActive} />
            ) : (
              <Square size={20} onClick={toggleActive} />
            )} */}
          {completed ? (
            <p className="bg-emerald-100 text-emerald-600 font-normal py-2 px-4 rounded-3xl text-xs">Complete</p>
          ) : (
            <p className="bg-red-200 text-red-500 border-red-500 border font-normal py-1 px-2 text-xs rounded-3xl">
              Incomplete
            </p>
          )}
        </span>
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

      <DeleteTaskDialogue
        deleteTaskDialogue={deleteTaskDialogue}
        setDeleteTaskDialogue={setDeleteTaskDialogueOpen}
        getTasks={getTasks}
        task={task}
      ></DeleteTaskDialogue>

      <UpdateTaskSlideover
        open2={open2}
        setOpen2={setOpen2}
        getTasks={getTasks}
        _id={_id}
      ></UpdateTaskSlideover>

      {/* <UpdateTaskForm
        getTasks={getTasks}
        _id={_id}
        visible={showUpdateTask}
        onClose={handleUpdateOnClose}
      /> */}
    </>
  );
}

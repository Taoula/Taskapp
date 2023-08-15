import React, { useEffect, useState } from "react";
import {
  Square,
  CheckSquare,
  DotsThreeOutline,
  Check,
  Pen,
} from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";
import { Trash, PencilSimple } from "phosphor-react";
import UpdateTaskSlideover from "./UpdateTaskSlideover";
import DeleteTaskDialogue from "./DeleteTaskDialogue";
import convertTime from "../../methods/convert-time";
import sameDate from "../../methods/same-date";
import { Menu, Transition } from "@headlessui/react";
import useGlobalStore from "../../context/useGlobalStore";

export default function Task({ task, getTasks }) {
  console.log("rendering task?");
  const {
    name,
    priority,
    duration,
    _id,
    isActive,
    completed,
    time,
    currentDay,
    divisions,
    prev,
    next,
  } = task;

  const [isExpanded, toggle] = useToggle(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteTaskDialogue, setDeleteTaskDialogueOpen] = useState(false);
  const { taskLayout } = useGlobalStore();

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

  // TODO needs to be optimized
  async function toggleActive() {
    const taskReq = await axios.get(`http://localhost:8282/task/${_id}`);
    let tempEntries = taskReq.data.entries;
    for (let i = 0; i < tempEntries.length; i++) {
      if (sameDate(tempEntries[i].date, currentDay)) {
        tempEntries[i].isActive = !tempEntries[i].isActive;

        await axios.patch(`http://localhost:8282/task/${_id}`, {
          name,
          defaults: taskReq.data.defaults,
          entries: tempEntries,
        });
      }
    }

    getTasks();
  }

  return (
    <>
      {taskLayout === 1 && (
        <div
          className={`w-full rounded-md border hover:shadow-xl duration-300 bg-opacity-70 shadow-sm hover:cursor-pointer flex items-center justify-between group square-container aspect-w-1 aspect-h-1 ${
            isActive
              ? "border-blue-600"
              : priority === "1"
              ? "border-red-600"
              : priority === "2"
              ? "border-yellow-600"
              : "border-green-600"
          }`}
        >
          <div className="m-5">
            <div className="flex flex-col justify-between">
              <div>
                {isActive ? (
                  <>
                    <CheckSquare size={20} onClick={toggleActive} />
                  </>
                ) : (
                  <>
                    <Square size={20} onClick={toggleActive} />
                  </>
                )}
                <p className="capitalize text-2xl">{name}</p>
                <p className="text-lg text-gray-600">{duration} minutes</p>
              </div>
              <p
                className={`${
                  isActive
                    ? "text-blue-600"
                    : priority === "1"
                    ? "text-red-600"
                    : priority === "2"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Priority {priority}
              </p>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Pen
                size={20}
                className="text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  setOpen2(true);
                }}
              />
              <Trash
                size={20}
                className="text-gray-600 hover:text-gray-900"
                onClick={deleteTask}
              />
            </div>
          </div>
        </div>
      )}

      {taskLayout === 2 && (
        <div
          className={`w-full rounded-md border hover:shadow-xl duration-300 bg-opacity-70 py-3 pl-4 pr-4 shadow-sm hover:cursor-pointer flex items-center justify-between group`}
        >
          <div className="flex items-center gap-3">
            {isActive ? (
              <>
                <CheckSquare size={20} onClick={toggleActive} />
              </>
            ) : (
              <>
                <Square size={20} onClick={toggleActive} />
              </>
            )}
            <p className="text-xl capitalize">
              {name}: <span className="font-light">{duration} minutes</span>
            </p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pen
              size={20}
              className="text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                setOpen2(true);
              }}
            />
            <Trash
              size={20}
              className="text-gray-600 hover:text-gray-900"
              onClick={deleteTask}
            />
          </div>
        </div>
      )}

      {/* update task form */}
      <UpdateTaskSlideover
        open2={open2}
        setOpen2={setOpen2}
        getTasks={getTasks}
        currentDay={currentDay}
        _id={_id}
      ></UpdateTaskSlideover>
    </>
    // <>
    //   {/* <div
    //     className={`w-full rounded-md border hover:shadow-lg duration-300 bg-opacity-70 py-3 pl-4 pr-4 shadow-sm hover:cursor-pointer flex items-center justify-between ${
    //       isActive
    //         ? "border-blue-600"
    //         : priority === "1"
    //         ? "border-red-600"
    //         : priority === "2"
    //         ? "border-yellow-600"
    //         : "border-green-600"
    //     } group`}
    //   > */}
    //   <div
    //     className={`w-full rounded-md border hover:shadow-lg duration-300 bg-opacity-70 py-3 pl-4 pr-4 shadow-sm hover:cursor-pointer flex items-center justify-between group`}
    //   >
    //     <div className="flex items-center gap-3">
    //       {isActive ? (
    //         <>
    //           <CheckSquare size={20} onClick={toggleActive} />
    //         </>
    //       ) : (
    //         <>
    //           <Square size={20} onClick={toggleActive} />
    //         </>
    //       )}
    //       <p className="text-xl capitalize">
    //         {name}: <span className="font-light">{duration} minutes</span>
    //       </p>
    //     </div>
    //     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
    //       <Pen
    //         size={20}
    //         className="text-gray-600 hover:text-gray-900"
    //         onClick={(e) => {
    //           setOpen2(true);
    //         }}
    //       />
    //       <Trash
    //         size={20}
    //         className="text-gray-600 hover:text-gray-900"
    //         onClick={deleteTask}
    //       />
    //     </div>
    //   </div>

    //   {/* update task form */}
    //   <UpdateTaskSlideover
    //     open2={open2}
    //     setOpen2={setOpen2}
    //     getTasks={getTasks}
    //     currentDay={currentDay}
    //     _id={_id}
    //   ></UpdateTaskSlideover>
    // </>
  );
}

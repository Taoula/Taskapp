import React, { useEffect, useState } from "react";
import { Square, CheckSquare, Pen, TrashSimple } from "phosphor-react";
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
import dayjs from "dayjs";

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
    // if (isExpanded) {
    // }
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

  function convertTimeToNormalFormat(timeString) {
    const date = dayjs(timeString);

    if (!date.isValid()) {
      return ""; // Return empty string for invalid dates
    }

    const formattedTime = date.format("h:mm A");
    return formattedTime;
  }

  return (
    <>
      {/* full size tiles */}
      {taskLayout === 1 && (
        <div
          onClick={toggleActive}
          className={`w-full overflow-hidden rounded-md border hover:shadow-xl duration-300 bg-opacity-70 shadow-sm hover:cursor-pointer justify-between group square-container aspect-w-1 aspect-h-1 ${
            isActive
              ? "border-blue-600 bg-blue-500/10"
              : priority === "1"
              ? "border-red-600 bg-red-500/10"
              : priority === "2"
              ? "border-yellow-600 bg-yellow-500/10"
              : "border-green-600 bg-green-500/10"
          }`}
        >
          <div className="p-5">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  {isActive ? (
                    <>
                      <CheckSquare
                        size={20}
                        // onClick={toggleActive}
                      />
                    </>
                  ) : (
                    <>
                      <Square
                        size={20}
                        // onClick={toggleActive}
                      />
                    </>
                  )}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pen
                      size={20}
                      className="text-gray-600 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        setOpen2(true);
                      }}
                    />
                    <Trash
                      size={20}
                      className="text-gray-600 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        deleteTask();
                      }}
                    />
                  </div>
                </div>
                <p className="capitalize text-2xl pt-4">{name}</p>
                <p className="text-lg text-gray-600">{duration} minutes</p>
                <p
                  className={`text-md ${
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
              <p className="text-md">{convertTimeToNormalFormat(time)}</p>
            </div>
          </div>
        </div>
      )}

      {/* collapsed tiles */}
      {taskLayout === 2 && (
        <div
          onClick={toggleActive}
          className={`w-full rounded-md border hover:shadow-xl duration-300 bg-opacity-70 py-3 pl-4 pr-4 shadow-sm hover:cursor-pointer flex items-center justify-between group ${
            isActive
              ? "border-blue-600 bg-blue-500/10"
              : priority === "1"
              ? "border-red-600 bg-red-500/10"
              : priority === "2"
              ? "border-yellow-600 bg-yellow-500/10"
              : "border-green-600 bg-green-500/10"
          }`}
        >
          <div className="flex items-center gap-3">
            {isActive ? (
              <>
                <CheckSquare
                  size={20}
                  // onClick={toggleActive}
                />
              </>
            ) : (
              <>
                <Square
                  size={20}
                  // onClick={toggleActive}
                />
              </>
            )}
            <p className="text-xl capitalize">
              {name}: <span className="font-light">{duration} minutes</span>
            </p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pen
              size={20}
              className="text-gray-600 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                setOpen2(true);
              }}
            />
            <Trash
              size={20}
              className="text-gray-600 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                deleteTask();
              }}
            />
          </div>
        </div>
      )}

      {/* table row layout */}
      {taskLayout === 3 && (
        <tr
          onClick={toggleActive}
          className={`bg-white hover:bg-gray-50 ${
            isActive ? "border-blue-500 bg-blue-100/60" : ""
          }`}
        >
          <td class="w-4 p-4 text-sm font-medium">
            <div class="flex items-center">
              {isActive ? (
                <>
                  <CheckSquare
                    size={20}
                    // onClick={toggleActive}
                    className={`${isActive ? "text-blue-500" : ""}`}
                  />
                </>
              ) : (
                <>
                  <Square
                    size={20}
                    // onClick={toggleActive}
                  />
                </>
              )}
            </div>
          </td>
          <th
            scope="row"
            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize whitespace-nowrap"
          >
            {name}
          </th>
          <td class="px-6 py-4 text-sm font-normal text-gray-800">
            {duration} minutes
          </td>
          <td class="px-6 py-4">
            <div
              class={`inline px-2 py-1 border text-sm font-normal rounded-full ${
                isActive
                  ? "text-blue-500 border-blue-500 bg-blue-100/60"
                  : priority === "1"
                  ? "text-red-500 border-red-500 bg-red-100/60"
                  : priority === "2"
                  ? "text-yellow-500 border-yellow-500 bg-yellow-100/60"
                  : "text-green-500 border-green-500 bg-green-100/60"
              }`}
            >
              {priority}
            </div>
          </td>
          <td class="px-6 py-4 text-sm font-normal text-gray-800">
            {convertTimeToNormalFormat(time)}
          </td>
          <td class="flex items-center px-6 py-4 space-x-3">
            <Pen
              size={20}
              className="hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                setOpen2(true);
              }}
            />
            <TrashSimple
              size={20}
              className="hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                deleteTask();
              }}
            />
          </td>
        </tr>
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
  );
}

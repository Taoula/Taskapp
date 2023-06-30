import React, { useEffect, useState } from "react";
import { Square, CheckSquare, DotsThreeOutline } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";
import { Trash, PencilSimple } from "phosphor-react";
import UpdateTaskSlideover from "./UpdateTaskSlideover";
import DeleteTaskDialogue from "./DeleteTaskDialogue";
import convertTime from "../../methods/convert-time";
import sameDate from "../../methods/same-date";
import { Menu, Transition } from "@headlessui/react";

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
      <div
        className={`w-full rounded-md border-2 bg-opacity-70 py-3 pl-4 pr-4 shadow-md hover:cursor-pointer flex justify-between ${
          isActive
            ? "bg-blue-400 border-blue-600"
            : priority === "1"
            ? "bg-rose-400 border-red-600"
            : priority === "2"
            ? "bg-yellow-400 border-yellow-600"
            : "bg-green-400 border-green-600"
        }`}
        onClick={toggleActive}
      >
        <div>
          <p className="text-xl capitalize">{name}</p>
          <p className="font-light">{duration} minutes</p>
        </div>
        <div>
          <Menu as="div" className="relative flex text-left">
            <Menu.Button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DotsThreeOutline size={20} weight="fill" />
            </Menu.Button>

            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 origin-top-right absolute right-0 mt-6 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen2(true);
                      }}
                      className={` hover:bg-gray-100 hover:text-slate-900 text-gray-700
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                    >
                      <span>Edit</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={deleteTask}
                      className={` hover:bg-red-100 hover:text-red-600 text-gray-700
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                    >
                      <span>Delete</span>
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

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

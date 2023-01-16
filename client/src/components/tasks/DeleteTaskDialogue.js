import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Trash } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import axios from "axios";

export default function DeleteTaskDialogue({
  deleteTaskDialogue,
  setDeleteTaskDialogue,
  getTasks,
  task,
}) {
  const [isExpanded, toggle] = useToggle(false);
  const cancelButtonRef = useRef(null);
  const { name, priority, duration, _id, isActive, completed } = task;

  async function deleteTask() {
    if (isExpanded) {
    }
    const url = `http://localhost:8282/task/${_id}/`;
    await axios.delete(url);
    getTasks();

    setDeleteTaskDialogue(false);
  }

  return (
    <Transition.Root show={deleteTaskDialogue} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={setDeleteTaskDialogue}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-md p-20">
                <div>
                  <div className="justify-center flex">
                    {/* <span className="bg-red-200 bg-opacity-60 p-2 rounded-full text-red-500 border border-red-500"> */}
                      <Trash size={75} weight="duotone" className="text-red-500"/>
                    {/* </span> */}
                  </div>
                  <div className="flex-col text-center">
                    <h1 className="text-2xl pt-8">Delete Task?</h1>
                    <p className="text-lg font-light text-gray-500 pt-2">
                      This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex space-x-2 pt-8">
                    <span
                      type="button"
                      className="text-gray-500 border px-4 py-2 w-full text-center text-md rounded-md font-normal hover:bg-sidebarColor hover:text-gray-900"
                      onClick={() => setDeleteTaskDialogue(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </span>
                    <span
                      type="button"
                      className="bg-red-500 text-white text-center text-md w-full px-4 py-2 rounded-md font-normal hover:bg-red-600"
                      onClick={() => deleteTask()}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

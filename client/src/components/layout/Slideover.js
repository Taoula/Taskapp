import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "phosphor-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Slideover({ open, setOpen, getTasks }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");

  // function handles form submission
  async function onSubmit(e) {
    
    e.preventDefault();
    const taskData = {
      name,
      duration,
      priority,
      isActive: false,
      completed: false,
    };

    await axios
      .post("http://localhost:8282/task/", taskData)
      .then((res) => res.data)
      .then(async (res) => {
        let _id = res._id;
        let newTaskStat = { task: _id, entries: [] };
        await axios.post(`http://localhost:8282/taskStat/`, newTaskStat);
      });
    getTasks();

    // input fields are reset to empty
    setName("");
    setDuration("");
    setPriority("");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-8 flex items-center justify-start pt-5">
                      <Dialog.Title className="text-lg font-normal text-gray-900">
                        Create a Task
                      </Dialog.Title>
                    </div>
                    <div className="mt-8 px-8 block">
                      {/* Replace with your content */}
                      <form
                        className="space-y-5"
                        onSubmit={(e) => onSubmit(e)}
                      >
                        <div>
                          <label className="block text-sm text-gray-500 mb-2 font-normal">
                            Task Name
                          </label>
                          <input
                            type="text"
                            placeholder="task"
                            className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></input>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-500 mb-2 font-normal">
                            Task Duration
                          </label>
                          <input
                            type="number"
                            placeholder="duration (minutes)"
                            className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                            min="5"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          ></input>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-500 mb-2 font-normal">
                            Task Priority
                          </label>
                          <input
                            type="number"
                            placeholder="priority (1-3)"
                            className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                            min="1"
                            max="5"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          ></input>
                        </div>
                        <div className="space-x-2 flex justify-end">
                          <button
                            className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            input={+true}
                            value="submit"
                            className="border px-4 py-2 rounded-md text-xs font-normal text-white bg-indigo-500 border-indigo-500 hover:bg-indigo-800 hover:border-indigo-800"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Square, CheckSquare } from "phosphor-react";
import axios from "axios";
import { TimeField } from '@mui/x-date-pickers/TimeField';
const dayjs = require('dayjs')
dayjs().format()

export default function CreateTaskSlideover({ open, setOpen, getTasks }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [fixed, setFixed] = useState(false);
  const [time, setTime] = useState(new Date())
  const [currentDay, setCurrentDay] = useState(new Date())

  // function handles form submission
  async function onSubmit(e) {
    try {
      e.preventDefault();
      
      let entries = [{date: currentDay, duration, priority, isActive: false, completed: false, time: fixed ? time : null}]
      let defaults = {duration, priority, time}
      const taskData = {
        name,
        entries,
        defaults
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
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  function closeSlideover() {
    setName("");
    setDuration("");
    setPriority("");
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
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
                    <div className="px-8 flex items-center justify-start pt-8">
                      <Dialog.Title className="text-2xl font-semibold text-gray-900">
                        Create a Task
                      </Dialog.Title>
                    </div>
                    <div className="mt-8 px-8 block">
                      <form className="space-y-5" onSubmit={(e) => onSubmit(e)}>
                        <div>
                          <label className="block text-md text-gray-500 mb-2 font-normal">
                            Task Name
                          </label>
                          <input
                            type="text"
                            placeholder="task"
                            className="border rounded-sm px-4 py-3 text-md font-light text-gray-500 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></input>
                        </div>

                        <div>
                          <label className="block text-md text-gray-500 mb-2 font-normal">
                            Task Duration
                          </label>
                          <input
                            type="number"
                            placeholder="duration (minutes)"
                            className="border rounded-sm px-4 py-3 text-md font-light text-gray-500 w-full"
                            min="5"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          ></input>
                        </div>

                        <div>
                          <label className="block text-md text-gray-500 mb-2 font-normal">
                            Task Priority
                          </label>
                          <input
                            type="number"
                            placeholder="priority (1-3)"
                            className="border rounded-sm px-4 py-3 text-md font-light text-gray-500 w-full"
                            min="1"
                            max="3"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          ></input>
                        </div>

                        <div className="flex items-center space-x-1 justify-end">
                          <h1 className="font-light text-md text-gray-500">
                            Set time:{" "}
                          </h1>
                          <span>
                            {fixed ? (
                              <CheckSquare
                                size={20}
                                onClick={() => setFixed(false)}
                                className="text-gray-500"
                              />
                            ) : (
                              <Square
                                size={20}
                                onClick={() => setFixed(true)}
                                className="text-gray-500"
                              />
                            )}
                          </span>
                        </div>
                        {fixed && (       
                          <TimeField
                            label="Controlled field"
                            value={dayjs(time)}
                            onChange={(newTime) => {setTime(newTime.toDate())}}
                          />
                        )}
                        

                        <div className="space-x-2 flex justify-end">
                          <span
                            type="button"
                            className="border px-4 py-2 rounded-md text-sm font-normal bg-opacity-50 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={closeSlideover}
                          >
                            Cancel
                          </span>

                          <button
                            type="submit"
                            input={+true}
                            value="submit"
                            className="px-4 py-2 rounded-md text-sm font-normal text-white bg-green-600 hover:bg-green-700"
                          >
                            Create
                          </button>
                        </div>
                      </form>
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

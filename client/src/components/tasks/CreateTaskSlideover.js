import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import modifyTime from "../../methods/modify-time";
import convertTime from "../../methods/convert-time";
import { Square, CheckSquare } from "phosphor-react";
import getTimeValue from "../../methods/get-time-value";
import axios from "axios";

export default function CreateTaskSlideover({ open, setOpen, getTasks }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [fixed, setFixed] = useState(false);
  const [time, setTime] = useState("12:00 AM");

  // function handles form submission
  async function onSubmit(e) {
    try {
      e.preventDefault();

      const taskData = {
        name,
        duration,
        priority,
        isActive: false,
        completed: false,
        time: fixed ? convertTime(time, "date") : null,
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
      setTime("12:00 AM");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  function closeSlideover() {
    setName("");
    setDuration("");
    setPriority("");
    setTime("12:00 AM");
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
                    <div className="px-8 flex items-center justify-start pt-5">
                      <Dialog.Title className="text-2xl font-normal text-gray-900">
                        Create a Task
                      </Dialog.Title>
                    </div>
                    <div className="mt-8 px-8 block">
                      {/* Replace with your content */}
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
                          <div>
                          <p className="font-light text-red-600 pb-3">*Set a specific time to complete this task</p>
                          <div className="border rounded-md py-5 px-8 flex justify-between items-center">
                            <p className="text-lg w-full">{time}</p>
                            <div class="inline-flex text-sm font-light border rounded-md p-2">
                              <input
                                class="px-2 outline-none appearance-none bg-transparent w-full"
                                placeholder="0-23"
                                min="1"
                                max="12"
                                value={getTimeValue(time, "hours")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "hours", e.target.value)
                                  )
                                }
                              ></input>
                              <span class="px-2">:</span>
                              <input
                                class="px-2 outline-none appearance-none bg-transparent w-full"
                                placeholder="0-59"
                                min="0"
                                max="59"
                                value={getTimeValue(time, "minutes")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "minutes", e.target.value)
                                  )
                                }
                              ></input>
                              <select
                                class="px-2 outline-none appearance-none bg-transparent"
                                value={getTimeValue(time, "amorpm")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "amorpm", e.target.value)
                                  )
                                }
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                            {/* <div className="">
                              <label className="block text-sm text-gray-500 mb-2 font-normal">
                                Start Hour
                              </label>
                              <input
                                type="number"
                                placeholder="0-23"
                                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                                min="1"
                                max="12"
                                value={getTimeValue(time, "hours")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "hours", e.target.value)
                                  )
                                }
                              ></input>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-2 font-normal">
                                Start Minutes
                              </label>
                              <input
                                type="number"
                                placeholder="0-59"
                                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                                min="0"
                                max="59"
                                value={getTimeValue(time, "minutes")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "minutes", e.target.value)
                                  )
                                }
                              ></input>
                            </div>

                            <div>
                              <label className="block text-sm text-gray-500 mb-2 font-normal">
                                AM or PM
                              </label>
                              <select
                                placeholder=""
                                className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-full"
                                value={getTimeValue(time, "amorpm")}
                                onChange={(e) =>
                                  setTime(
                                    modifyTime(time, "amorpm", e.target.value)
                                  )
                                }
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div> */}
                          </div>
                          </div>
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

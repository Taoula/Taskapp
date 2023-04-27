import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import sameDate from "../../methods/same-date";
import convertTime from "../../methods/convert-time";
import { Square, CheckSquare } from "phosphor-react";
import modifyTime from "../../methods/modify-time";
import getTimeValue from "../../methods/get-time-value";
import { TimeField } from '@mui/x-date-pickers/TimeField';
const dayjs = require('dayjs')
dayjs().format()


export default function UpdateTaskSlideover({
  open2,
  setOpen2,
  getTasks,
  _id,
  currentDay
}) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [time, setTime] = useState(new Date());
  const [entries, setEntries] = useState([]) //TODO idk if needed but saves a get request call
  const [defaults, setDefaults] = useState({}) //same here
  const [index, setIndex] = useState(0) //also might not be needed but saves an iteration of entries

  async function loadData() {
    const task = await axios.get(`http://localhost:8282/task/${_id}/`);
    setEntries(task.data.entries)
    setDefaults(task.data.defaults)
    for (let i = 0; i < task.data.entries.length; i++){
      if (sameDate(task.data.entries[i], currentDay)){
        setIndex(i)
      }
    }
    const loadName = task.data.name;

    const {
      duration: loadDuration,
      priority: loadPriority,
      isActive: loadIsActive,
      time: loadTime
    } = task.data.entries[index];

    setName(loadName);
    setDuration(loadDuration);
    setPriority(loadPriority);
    setIsActive(loadIsActive);
    if (loadTime != null){
      setFixed(true)
      setTime(loadTime)
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submit(e) {
    console.log("SUBMITTING")
    try {
      e.preventDefault();


      // TODO can this be refactored?
      let tempEntries = entries
      tempEntries[index].duration = duration
      tempEntries[index].priority = priority
      tempEntries[index].isActive = isActive
      tempEntries[index].time = fixed ? time : null

      const taskData = {
        name,
        entries: tempEntries,
        defaults
      }

      console.log("taskdata")
      console.log(taskData)

      await axios.patch(`http://localhost:8282/task/${_id}/`, taskData);
      getTasks();

      setOpen2(false);
    } catch (err) {
      console.error(err);
    }
  }

  function closeSlideover() {
    setOpen2(false);
  }

  return (
    <>
      <Transition.Root show={open2} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={setOpen2}>
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
                          Update Task
                        </Dialog.Title>
                      </div>
                      <div className="mt-8 px-8 block h-full">
                        <div className="flex flex-col h-full justify-between">
                          <form
                            className="space-y-5"
                            //onSubmit={(e) => submit(e)}
                          >
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
                            label="Edit Time"
                            value={dayjs(time)}
                            onChange={(newTime) => {setTime(newTime.toDate())}}
                          />
                        )}

                            <div className="space-x-2 flex justify-end">
                              <span
                                className="border px-4 py-2 rounded-md text-sm font-normal bg-opacity-50 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                onClick={closeSlideover}
                              >
                                Cancel
                              </span>

                              <span
                                type="submit"
                                input={+true}
                                value="submit"
                                onClick={(e) => submit(e)}
                                className="border px-4 py-2 rounded-md text-sm font-normal text-white bg-green-600 hover:bg-green-700"
                              >
                                Save
                              </span>
                            </div>
                          </form>
                          <button
                            className="px-4 mb-8 py-3 text-md font-normal bg-red-500 text-white w-full rounded-md hover:bg-red-600"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this task? This action cannot be undone."
                                )
                              )
                                this.onCancel();
                            }}
                          >
                            Delete Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

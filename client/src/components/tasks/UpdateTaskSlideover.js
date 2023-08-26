import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import sameDate from "../../methods/same-date";
import convertTime from "../../methods/convert-time";
import { Square, CheckSquare, X } from "phosphor-react";
import modifyTime from "../../methods/modify-time";
import getTimeValue from "../../methods/get-time-value";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const dayjs = require("dayjs");
dayjs().format();

export default function UpdateTaskSlideover({
  open2,
  setOpen2,
  getTasks,
  _id,
  currentDay,
}) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [time, setTime] = useState(new Date());

  //const [originalName, setOriginalName] = useState("");
  //const [originalDuration, setOriginalDuration] = useState("");
  //const [originalPriority, setOriginalPriority] = useState("");

  //const [hasChanges, setHasChanges] = useState(false);

  const [entries, setEntries] = useState([]); //TODO idk if needed but saves a get request call
  const [defaults, setDefaults] = useState({}); //same here
  const [index, setIndex] = useState(0); //also might not be needed but saves an iteration of entries

  async function loadData() {
    const task = await axios.get(`http://localhost:8282/task/${_id}/`);
    setEntries(task.data.entries);
    setDefaults(task.data.defaults);
    for (let i = 0; i < task.data.entries.length; i++) {
      
      if (sameDate(task.data.entries[i].date, currentDay)) {
        setIndex(i);
      }
    }
    const loadName = task.data.name;

    const {
      duration: loadDuration,
      priority: loadPriority,
      isActive: loadIsActive,
      time: loadTime,
    } = task.data.entries[index];

    //setOriginalName(loadName);
    //setOriginalDuration(loadDuration);
    //setOriginalPriority(loadPriority);

    setName(loadName);
    setDuration(loadDuration);
    setPriority(loadPriority);
    setIsActive(loadIsActive);

    if (loadTime != null) {
      setFixed(true);
      setTime(loadTime);
    }
  }

  useEffect(() => {
    loadData();
  }, [open2]);

  /*useEffect(() => {
    // Check for changes and set hasChanges accordingly
    const nameChanged = name !== originalName;
    const durationChanged = duration !== originalDuration;
    const priorityChanged = priority !== originalPriority;

    setHasChanges(nameChanged || durationChanged || priorityChanged);
  }, [
    name,
    duration,
    priority,
    originalName,
    originalDuration,
    originalPriority,
  ]);*/

  async function submit(e) {
    console.log("SUBMITTING");
    try {
      e.preventDefault();

      // TODO can this be refactored?
      console.log("DURATION IS " + duration)
      let tempEntries = entries;
      tempEntries[index].duration = duration;
      tempEntries[index].priority = priority;
      tempEntries[index].isActive = isActive;
      tempEntries[index].time = fixed ? time : null;

      const taskData = {
        name,
        entries: tempEntries,
        defaults,
      };

      console.log("taskdata");
      console.log(taskData);

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

  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);

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
                      <div className="px-8 pt-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-2xl text-slate-900 font-semibold">
                            Update task
                          </Dialog.Title>
                          <X
                            size={25}
                            className="hover:scale-75 duration-300"
                            onClick={closeSlideover}
                          />
                        </div>

                        {/* tabs */}
                        <div className="w-full mt-8 flex p-1.5 gap-2 rounded-lg bg-gray-100">
                          <button
                            className={`text-gray-700 py-2 w-full rounded-md text-sm font-light ${
                              settingsTabsToggle === 1
                                ? "text-gray-800 bg-white shadow-md font-normal"
                                : ""
                            }`}
                            onClick={(e) => setSettingsTabToggle(1)}
                          >
                            General
                          </button>
                          <button
                            className={`text-gray-700 py-2 w-full rounded-md text-sm font-light ${
                              settingsTabsToggle === 2
                                ? "text-gray-800 bg-white shadow-md font-normal"
                                : ""
                            }`}
                            onClick={(e) => setSettingsTabToggle(2)}
                          >
                            Advanced
                          </button>
                        </div>
                      </div>
                      <div className="mt-8 px-8 h-full">
                        <form
                          className="flex flex-col h-full justify-between"
                          onSubmit={(e) => submit(e)}
                        >
                          {/* general settings */}
                          {settingsTabsToggle === 1 && (
                            <div className="space-y-4">
                              <input
                                type="text"
                                placeholder="Task name"
                                className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />

                              <input
                                type="number"
                                placeholder="Duration (minutes)"
                                className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full"
                                min="5"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                              />

                              {/* <input
                                type="number"
                                placeholder="priority (1-3)"
                                className="border rounded-sm px-4 py-3 text-md font-light text-gray-500 w-full"
                                min="1"
                                max="3"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                              ></input> */}

                              <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 focus:bg-white text-sm"
                              >
                                <option value="" disabled>
                                  Priority
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>
                          )}

                          {/* advanced settings */}
                          {settingsTabsToggle === 2 && (
                            <>
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
                                  onChange={(newTime) => {
                                    setTime(newTime.toDate());
                                  }}
                                />
                              )}
                            </>
                          )}

                          <div className="flex gap-4 mb-6">
                            <button
                              className="w-full text-sm py-3 border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-solid font-normal rounded-md duration-200"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this task? This action cannot be undone."
                                  )
                                )
                                  this.onCancel();
                              }}
                            >
                              Delete task
                            </button>
                            <button
                              type="submit"
                              value="submit"
                              onClick={(e) => submit(e)}
                              //disabled={!hasChanges}
                              className={`${
                                1 != 1 // todo
                                  ? "bg-gray-500/10 border-gray-300 text-gray-400 cursor-not-allowed"
                                  : "bg-green-600/10 border-green-600 text-green-600 hover:text-white hover:bg-green-600"
                              } w-full text-sm py-3 border border-solid font-normal rounded-md duration-200`}
                            >
                              Save changes
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
    </>
  );
}

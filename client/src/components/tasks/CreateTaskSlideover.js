import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import {
  Square,
  CheckSquare,
  Note,
  Link,
  Trash,
  Pencil,
  Clock,
  CaretUp,
  CaretDown,
  CaretRight,
  Plus,
  XSquare,
  X,
} from "phosphor-react";
import { AiOutlineExclamation } from "react-icons/ai";
import { MdSplitscreen } from "react-icons/md";
import axios from "axios";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import useGlobalStore from "../../context/useGlobalStore";
const dayjs = require("dayjs");
dayjs().format();

export default function CreateTaskSlideover({ open, setOpen, getTasks }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [fixed, setFixed] = useState(false);
  const [time, setTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date());
  const [links, setLinks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [divisions, setDivisions] = useState(1);
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const { currentFolder } = useGlobalStore((state) => ({currentFolder: state.currentFolder}));

  useEffect(() => {
    // Check if name, duration, and priority have values
    const hasValues = name.trim() !== "" && duration !== "" && priority !== "";
    // Update isCreateDisabled based on the result
    setIsCreateDisabled(!hasValues);
  }, [name, duration, priority]);

  // function handles form submission
  async function onSubmit(e) {
    try {
      e.preventDefault();

      let entries = [
        {
          date: currentDay,
          duration,
          priority,
          isActive: false,
          completed: false,
          time: fixed ? time : null,
          notes,
          links,
          divisions,
          next: "",
          prev: "",
        },
      ];

      let defaults = {
        duration,
        priority,
        time: fixed ? time : null,
        notes,
        links,
        divisions,
        next: "",
        prev: "",
      };
      const taskData = {
        name,
        entries,
        defaults,
        parent: currentFolder,
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
      setFixed(false);
      setDivisions(1);
      setNotes([]);
      setLinks([]);
    } catch (err) {
      console.error(err);
    }
  }

  function closeSlideover() {
    //TODO why is this happening twice?
    setName("");
    setDuration("");
    setPriority("");
    setOpen(false);
    setFixed(false);
    setNotes([]);
    setLinks([]);
    setDivisions([""]);
  }

  function updateNotes(e, i) {
    let notesClone = notes;
    notesClone[i] = e.target.value;
    setNotes([...notesClone]);
  }

  function updateLinks(e, i) {
    let linksClone = links;
    linksClone[i] = e.target.value;
    setLinks([...linksClone]);
  }

  function addNote() {
    let notesClone = notes;
    notesClone.push("");
    setNotes([...notesClone]);
  }

  function addLink() {
    let linksClone = links;
    linksClone.push("");
    setLinks([...linksClone]);
  }

  function deleteNote(i) {
    let notesClone = notes;
    notesClone.splice(i, 1);
    setNotes([...notesClone]);
  }

  function deleteLink(i) {
    let linksClone = links;
    linksClone.splice(i, 1);
    setLinks([...linksClone]);
  }

  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-black/50" />
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-700">
                    <div className="px-8 pt-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-2xl text-slate-900 font-semibold dark:text-white">
                          Create a task
                        </Dialog.Title>
                        <X
                          size={25}
                          className="hover:scale-75 duration-300 dark:text-white"
                          onClick={closeSlideover}
                        />
                      </div>

                      {/* tabs */}
                      <div className="w-full mt-8 flex p-1.5 gap-2 rounded-lg bg-gray-100 dark:bg-gray-600">
                        <button
                          className={`text-gray-700 dark:text-gray-200 py-2 w-full rounded-md text-sm font-light ${
                            settingsTabsToggle === 1
                              ? "text-gray-800 bg-white shadow-md font-normal dark:text-gray-200 dark:bg-gray-800"
                              : ""
                          }`}
                          onClick={(e) => setSettingsTabToggle(1)}
                        >
                          General
                        </button>
                        <button
                          className={`text-gray-700 dark:text-gray-200 py-2 w-full rounded-md text-sm font-light ${
                            settingsTabsToggle === 2
                              ? "text-gray-800 bg-white shadow-md font-normal dark:text-gray-200 dark:bg-gray-800"
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
                        onSubmit={(e) => onSubmit(e)}
                      >
                        {/* general settings */}
                        {settingsTabsToggle === 1 && (
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Task name"
                              className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full dark:bg-gray-800 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />

                            <input
                              type="number"
                              placeholder="Duration (minutes)"
                              className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full dark:bg-gray-800 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
                              min="5"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                            />

                            {/* <input
                              type="number"
                              placeholder="Priority (1 - 3)"
                              className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full"
                              min="1"
                              max="3"
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                            ></input> */}

                            <select
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                              className="w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 focus:bg-white text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
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
                          <div className="space-y-5">
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-200">
                                Divide task into parts
                              </label>
                              <div className="relative rounded-md mt-2">
                                <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                                  <MdSplitscreen size={20} />
                                </div>
                                <input
                                  type="number"
                                  placeholder="divisions (1-10)"
                                  className="block rounded-md pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-md text-sm w-full dark:bg-gray-800 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
                                  min="1"
                                  max="10"
                                  value={divisions}
                                  onChange={(e) => setDivisions(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="pt-4">
                              <h1 className="text-sm text-gray-700 dark:text-gray-200">
                                Set a specific time
                              </h1>
                              <span>
                                {fixed ? (
                                  <CheckSquare
                                    size={20}
                                    onClick={() => setFixed(false)}
                                    className="text-gray-500 dark:text-gray-200"
                                  />
                                ) : (
                                  <Square
                                    size={20}
                                    onClick={() => setFixed(true)}
                                    className="text-gray-500 dark:text-gray-200"
                                  />
                                )}
                              </span>
                            </div>

                            {fixed && (
                              <TimeField
                                label="Controlled field"
                                value={dayjs(time)}
                                onChange={(newTime) => {
                                  setTime(newTime.toDate());
                                }}
                              />
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                              <p>Add a note</p>
                              <Plus
                                size={15}
                                weight="bold"
                                onClick={() => addNote()}
                                className="text-blue-600"
                              />
                            </div>

                            {notes.map((note, i) => {
                              return (
                                <div>
                                  <textarea
                                    type="text"
                                    value={notes[i]}
                                    onChange={(e) => updateNotes(e, i)}
                                    className="w-full rounded-md bg-gray-50 border border-gray-200 focus:bg-white text-gray-600 text-sm"
                                  />
                                  <p
                                    onClick={() => deleteNote(i)}
                                    className="text-red-500 text-sm hover:cursor-pointer hover:underline flex justify-end"
                                  >
                                    Delete note
                                  </p>
                                </div>
                              );
                            })}

                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                              <p>Add a link</p>
                              <Plus
                                size={15}
                                weight="bold"
                                onClick={() => addLink()}
                                className="text-blue-600"
                              />
                            </div>

                            {links.map((link, i) => {
                              return (
                                <div>
                                  <input
                                    type="url"
                                    value={links[i]}
                                    onChange={(e) => updateLinks(e, i)}
                                    className="w-full rounded-md bg-gray-50 border border-gray-200 focus:bg-white text-gray-600 text-sm"
                                  />
                                  <p
                                    onClick={() => deleteLink(i)}
                                    className="text-red-500 text-sm hover:cursor-pointer hover:underline flex justify-end mt-2"
                                  >
                                    Delete note
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* create button */}
                        <button
                          type="submit"
                          value="submit"
                          disabled={isCreateDisabled}
                          className={`${
                            isCreateDisabled === true
                              ? "bg-gray-500/10 border-gray-300 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                              : "bg-green-600/10 border-green-600 text-green-600 hover:text-white hover:bg-green-600 dark:bg-green-600/80 dark:text-white"
                          } w-full text-sm mb-6 py-3 border border-solid font-normal rounded-md duration-200`}
                        >
                          Create task
                        </button>
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

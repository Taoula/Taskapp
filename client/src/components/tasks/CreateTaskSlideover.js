import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-8 flex items-center justify-between pb-4 pt-6 border-b border-gray-200">
                      <Dialog.Title className="text-2xl text-slate-900 font-semibold">
                        Create a task
                      </Dialog.Title>
                      <div>
                        <X
                          type="button"
                          size={20}
                          weight="bold"
                          onClick={closeSlideover}
                          className="text-slate-500 hover:text-slate-900 duration-300 hover:duration-300"
                        />
                      </div>
                    </div>
                    <div className="mt-8 px-8 h-full">
                      <form
                        className="flex flex-col h-full justify-between"
                        onSubmit={(e) => onSubmit(e)}
                      >
                        <div className="space-y-5">
                          <div>
                            <label className="text-sm">Task name</label>
                            <input
                              type="text"
                              placeholder="Name"
                              className="rounded-md mt-2 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-md text-sm w-full"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm">
                              Duration (in minutes)
                            </label>
                            <input
                              type="number"
                              placeholder="Duration"
                              className="mt-2 rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-md text-sm w-full"
                              min="5"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                            ></input>
                          </div>
                          <div>
                            <label className="text-sm">Priority (1 - 3)</label>
                            <input
                              type="number"
                              placeholder="Priority"
                              className="rounded-md mt-2 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-md text-sm w-full"
                              min="1"
                              max="3"
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                            ></input>
                          </div>
                          <div className="pt-8 text-gray-700 flex items-center gap-2 text-sm">
                            <p className="">Advanced options</p>
                            {advancedOptions ? (
                              <CaretDown
                                size={15}
                                weight="bold"
                                className="text-blue-600"
                                onClick={() => setAdvancedOptions(false)}
                              />
                            ) : (
                              <CaretRight
                                size={15}
                                weight="bold"
                                onClick={() => setAdvancedOptions(true)}
                              />
                            )}
                          </div>
                          {advancedOptions && (
                            <>
                              <div className="relative rounded-md">
                                <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                                  <MdSplitscreen size={20} />
                                </div>
                                <input
                                  type="number"
                                  placeholder="divisions (1-10)"
                                  className="block rounded-md pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-md text-sm w-full"
                                  min="1"
                                  max="10"
                                  value={divisions}
                                  onChange={(e) => setDivisions(e.target.value)}
                                />
                              </div>

                              <div className="pt-4">
                                <h1 className="text-sm text-gray-700">
                                  Set a specific time
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
                              onChange={(newTime) => {
                                setTime(newTime.toDate());
                              }}
                            />
                          )} 
                            </>
                          )}

                          {advancedOptions && (
                            <>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
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

                              <div className="flex items-center gap-2 text-sm text-gray-700">
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
                            </>
                          )}
                        </div>

                        {/* <div className="space-x-2 flex justify-end">
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
                        </div> */}
                        <div className="pb-8 flex gap-4 fixed-bottom px-8 pt-4 bg-white">
                          <button
                            type="button"
                            onClick={closeSlideover}
                            className="w-1/3 text-sm tracking-wide py-3.5 border border-solid border-gray-500 font-medium text-gray-500 rounded-md hover:text-white hover:bg-red-500 hover:border-red-600 hover:duration-200 duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            input={+true}
                            value="submit"
                            className="w-2/3 text-sm tracking-wide py-3.5 bg-green-600 font-medium text-white rounded-md hover:text-white hover:bg-green-700 duration-200 hover:duration-200"
                          >
                            Create task
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

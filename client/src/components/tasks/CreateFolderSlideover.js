import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import useGlobalStore from "../../context/useGlobalStore";
import {
  Square,
  CheckSquare,
  Plus,
  X,
} from "phosphor-react";
import { MdSplitscreen } from "react-icons/md";
import axios from "axios";
import { TimeField } from "@mui/x-date-pickers/TimeField";
const dayjs = require("dayjs");
dayjs().format();

export default function CreateFolderSlideover({ open, setOpen, getTasks }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("")
  const { currentFolder} = useGlobalStore(
    (state) => ({
      currentFolder: state.currentFolder
    })
  );

  useEffect(() => {
    // Check if name, duration, and priority have values
    const hasValues = name.trim() !== "";
    // Update isCreateDisabled based on the result
    setIsCreateDisabled(!hasValues);
  }, [name]);

  // function handles form submission
  async function onSubmit(e) {
    try {
      e.preventDefault();
      
      const folderData = {
        name, 
        parent: currentFolder,
        color: "green",
        children: []
      }

      await axios.post("http://localhost:8282/folder/", folderData)

      getTasks();

      // input fields are reset to empty
      setName("");
    } catch (err) {
      console.error(err);
    }
  }

  function closeSlideover() {
    //TODO why is this happening twice?
    setName("");
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
                          Create a folder
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
                              placeholder="Folder name"
                              className="rounded-md pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 py-3 text-sm w-full dark:bg-gray-800 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        )}

                        {/* advanced settings */}
                        {settingsTabsToggle === 2 && (
                          <div className="space-y-5">
                            <p>Get rid of this Paul</p>
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

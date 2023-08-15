import React, { useState, useEffect } from "react";
import axios from "axios";
import useToggle from "../../hooks/use-toggle";
import useGlobalStore from "../../context/useGlobalStore";
import Task from "./Task";
import "tw-elements";
import DashboardFooter from "../layout/Dashboard/DashboardFooter";
import CreateTaskSlideover from "./CreateTaskSlideover";
import { Menu, Transition } from "@headlessui/react";
import CompletedTask from "./CompletedTask";
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  Check,
  SquaresFour,
  Rows,
  Table,
  SortAscending,
  CheckSquare,
} from "phosphor-react";
import sameDate from "../../methods/same-date";
import dateSearch from "../../methods/date-search";

export default function TaskDisplay() {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [open, setOpen] = useState(false);
  const { taskLayout, setTaskLayout } = useGlobalStore();

  const [sortOption, setSortOption] = useState("oldestToNewest");

  function handleSortSelect(option) {
    setSortOption(option);
  }

  function sortByPriorityHighToLow(tasks) {
    return [...tasks].sort((a, b) => {
      const indexA = dateSearch(currentDay, a.entries);
      const indexB = dateSearch(currentDay, b.entries);
      return b.entries[indexB].priority - a.entries[indexA].priority;
    });
  }

  function sortByPriorityLowToHigh(tasks) {
    return [...tasks].sort((a, b) => {
      const indexA = dateSearch(currentDay, a.entries);
      const indexB = dateSearch(currentDay, b.entries);
      return a.entries[indexA].priority - b.entries[indexB].priority;
    });
  }

  function sortByDurationAscending(tasks) {
    return [...tasks].sort((a, b) => {
      const indexA = dateSearch(currentDay, a.entries);
      const indexB = dateSearch(currentDay, b.entries);
      return a.entries[indexA].duration - b.entries[indexB].duration;
    });
  }

  function sortByDurationDescending(tasks) {
    return [...tasks].sort((a, b) => {
      const indexA = dateSearch(currentDay, a.entries);
      const indexB = dateSearch(currentDay, b.entries);
      return b.entries[indexB].duration - a.entries[indexA].duration;
    });
  }

  function handleLayoutChange(newLayout) {
    setTaskLayout(newLayout); // Update the global layout state
    setTaskLayout(newLayout); // Update the local layout state
  }

  /*const [tasks, setTasks] = useState([]);
  const [numberOfInactiveTasks, setNumberOfInactiveTasks] = useState(0);
  const [numberOfActiveTasks, setNumberOfActiveTasks] = useState(0);
  const [numberOfCompleteTasks, setNumberOfCompleteTasks] = useState(0);
  const [numberOfIncompleteTasks, setNumberOfIncompleteTasks] = useState(0);*/

  const [taskState, setTaskState] = useState({
    tasks: [],
    numberOfInactiveTasks: 0,
    numberOfActiveTasks: 0,
    numberOfCompleteTasks: 0,
    numberOfIncompleteTasks: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterActive, setFilterActive] = useState("");

  function handleFilterSelect(priority, active) {
    setFilterPriority(priority);
    setFilterActive(active);
  }

  // state for task menu
  const [toggleState, setToggleState] = useState(1);

  const currentDay = useGlobalStore((state) => state.currentDay);

  useEffect(() => {
    console.log("useeffect");
    getTasks();
  }, [currentDay]);

  async function getTasks() {
    // Get all tasks
    const taskReqInit = await axios.get("http://localhost:8282/task/");
    console.log(taskReqInit.data);

    // Loop through all tasks
    for (let i = 0; i < taskReqInit.data.length; i++) {
      // Add entry on current day if none exists
      if (dateSearch(currentDay, taskReqInit.data[i].entries) == -1) {
        let tempEntries = taskReqInit.data[i].entries;
        let defaults = taskReqInit.data[i].defaults;

        let entryToAdd = {
          date: currentDay,
          duration: parseInt(defaults.duration),
          priority: defaults.priority,
          isActive: false,
          completed: false,
          time: defaults.time,
          notes: defaults.notes == undefined,
          divisions: defaults.divisions,
          prev: defaults.prev,
          next: defaults.next,
        };

        tempEntries.push(entryToAdd);
        tempEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        // Patch the updated task
        let taskData = {
          name: taskReqInit.data[i].name,
          entries: tempEntries,
          defaults: taskReqInit.data[i].defaults,
        };

        await axios.patch(
          `http://localhost:8282/task/${taskReqInit.data[i]._id}/`,
          taskData
        );
      }
    }

    const taskReq = await axios.get("http://localhost:8282/task/");

    let inactiveIterator = 0;
    let activeIterator = 0;
    let incompleteIterator = 0;
    let completeIterator = 0;

    taskReq.data.map((task) => {
      let index = dateSearch(currentDay, task.entries);

      let t = task.entries[index];

      if (t.isActive === false) {
        inactiveIterator += 1;
      } else if (t.isActive === true) {
        activeIterator += 1;
      }

      if (t.completed === false && t.isActive === true) {
        incompleteIterator += 1;
      } else if (t.completed === true && t.isActive === true) {
        completeIterator += 1;
      }
    });

    // Set all state values at once
    setTaskState({
      tasks: taskReq.data,
      numberOfInactiveTasks: inactiveIterator,
      numberOfActiveTasks: activeIterator,
      numberOfCompleteTasks: completeIterator,
      numberOfIncompleteTasks: incompleteIterator,
    });
  }

  function renderTasks() {
    if (taskState === null) {
      return <div></div>;
    }

    let sortedTasks = [...taskState.tasks];

    if (sortOption === "newestToOldest") {
      sortedTasks.reverse();
    } else {
      switch (sortOption) {
        case "priorityHighToLow":
          sortedTasks = sortByPriorityHighToLow(sortedTasks);
          break;
        case "priorityLowToHigh":
          sortedTasks = sortByPriorityLowToHigh(sortedTasks);
          break;
        case "durationAscending":
          sortedTasks = sortByDurationAscending(sortedTasks);
          break;
        case "durationDescending":
          sortedTasks = sortByDurationDescending(sortedTasks);
          break;
        default:
          break;
      }
    }

    return sortedTasks
      .filter((task) => {
        let index = dateSearch(currentDay, task.entries);
        if (index === -1) {
          return false;
        }
        const nameMatch = task.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const priorityMatch =
          filterPriority === ""
            ? true
            : filterPriority === task.entries[index].priority.toString();

        const activeMatch =
          filterActive.length === 0
            ? true
            : filterActive === task.entries[index].isActive.toString();

        return nameMatch && priorityMatch && activeMatch;
      })
      .map((task, i) => {
        let index = dateSearch(currentDay, task.entries);

        if (index > -1) {
          let t = task.entries[index];

          return (
            <Task
              key={i}
              task={{
                name: task.name,
                priority: t.priority,
                duration: t.duration,
                _id: task._id,
                isActive: t.isActive,
                completed: t.completed,
                time: t.time,
                currentDay,
              }}
              getTasks={getTasks}
            >
              {task.name}
            </Task>
          );
        }
      });
  }

  return (
    <>
      {/* Tasks menu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium">Library</h1>
        <div className="flex gap-4">
          {/* search for task */}
          <div className="flex items-center">
            <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
              Search
            </p>
            <div className="relative">
              <div className="pointer-events-non text-slate-900 absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlass size={20} />
              </div>
              <input
                type="text"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-4 pr-8 text-sm rounded-r-lg border border-gray-200 border-l-0 focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
          </div>

          {/* filter tasks */}
          <Menu as="div" className="relative flex text-left">
            <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
              Filter
            </p>
            <Menu.Button>
              <div className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100">
                <Funnel size={20} />
              </div>
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
              <Menu.Items className="z-10 origin-top-right absolute right-0 mt-12 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>No filter</span>
                        {filterPriority === "" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("1", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span className="text-red-600">High priority</span>
                        {filterPriority === "1" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("2", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span className="text-yellow-600">Medium priority</span>
                        {filterPriority === "2" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("3", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span className="text-green-600">Low priority</span>
                        {filterPriority === "3" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("", "true")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span className="text-blue-600">Active</span>
                        {filterPriority === "" && filterActive === "true" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("", "false")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Inactive</span>
                        {filterPriority === "" && filterActive === "false" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* sort tasks */}
          <Menu as="div" className="relative flex text-left">
            <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
              Sort
            </p>
            <Menu.Button>
              <div className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100">
                <SortAscending size={20} />
              </div>
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
              <Menu.Items className="z-10 origin-top-right absolute right-0 mt-12 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("oldestToNewest")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Oldest to newest</span>
                        {sortOption === "oldestToNewest" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("newestToOldest")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Newest to oldest</span>
                        {sortOption === "newestToOldest" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("priorityHighToLow")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Low to high priority</span>
                        {sortOption === "priorityHighToLow" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("priorityLowToHigh")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>High to low priority</span>
                        {sortOption === "priorityLowToHigh" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("durationAscending")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Duration ascending</span>
                        {sortOption === "durationAscending" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortSelect("durationDescending")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Duration descending</span>
                        {sortOption === "durationDescending" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* add task */}
          <div className="flex items-center">
            <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
              Add task
            </p>
            <div
              onClick={() => setOpen(true)}
              className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100"
            >
              <Plus size={20} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            {taskLayout === 1 ? (
              <SquaresFour
                size={30}
                className="text-slate-900 hover:text-slate-900 duration-200"
                weight="fill"
              />
            ) : (
              <SquaresFour
                size={30}
                className="text-slate-400 hover:text-slate-900 duration-200"
                weight="fill"
                onClick={() => handleLayoutChange(1)}
              />
            )}

            {taskLayout === 2 ? (
              <Rows
                size={30}
                className="text-slate-900 hover:text-slate-900 duration-200"
                weight="fill"
              />
            ) : (
              <Rows
                size={30}
                className="text-slate-400 hover:text-slate-900 duration-200"
                weight="fill"
                onClick={() => handleLayoutChange(2)}
              />
            )}

            {taskLayout === 3 ? (
              <Table
                size={30}
                className="text-slate-900 hover:text-slate-900 duration-200"
                weight="fill"
              />
            ) : (
              <Table
                size={30}
                className="text-slate-400 hover:text-slate-900 duration-200"
                weight="fill"
                onClick={() => handleLayoutChange(3)}
              />
            )}
          </div>
        </div>
      </div>

      {taskLayout === 1 && (
        <div
          className={`max-h-fit ${
            taskState.numberOfActiveTasks === 0 &&
            taskState.numberOfInactiveTasks === 0
              ? "flex"
              : "grid grid-cols-5 gap-5"
          }`}
        >
          {taskState.numberOfActiveTasks === 0 &&
          taskState.numberOfInactiveTasks === 0 ? (
            <>
              <p className="text-md text-slate-500 font-light mx-auto">
                No tasks! Add a task to get started
              </p>
            </>
          ) : (
            <>{renderTasks()}</>
          )}
        </div>
      )}

      {taskLayout === 2 && (
        <div
          className={`max-h-fit ${
            taskState.numberOfActiveTasks === 0 &&
            taskState.numberOfInactiveTasks === 0
              ? "flex"
              : "grid grid-cols-3 gap-3"
          }`}
        >
          {taskState.numberOfActiveTasks === 0 &&
          taskState.numberOfInactiveTasks === 0 ? (
            <>
              <p className="text-md text-slate-500 font-light mx-auto">
                No tasks! Add a task to get started
              </p>
            </>
          ) : (
            <>{renderTasks()}</>
          )}
        </div>
      )}

      {taskLayout === 3 && (
        <>
          <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 rounded-md">
                  <table class="w-full table-auto divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-4 text-sm flex gap-4 font-normal text-left text-gray-500 w-1/5">
                          <span>Name</span>
                        </th>

                        <th class="py-4 text-sm font-normal text-center text-gray-500 w-1/5">
                          Duration
                        </th>
                        <th class="py-4 text-sm font-normal text-center text-gray-500 w-1/5">
                          Priority
                        </th>
                        <th class="py-4 text-sm font-normal text-center text-gray-500 w-1/5">
                          Time
                        </th>
                        <th class="py-4 text-sm font-normal text-center text-gray-500 w-1/5">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <>{renderTasks()}</>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button class="flex items-center gap-x-3 focus:outline-none">
                            <span>Company</span>

                            <svg
                              class="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.3"
                              />
                            </svg>
                          </button>
                        </th>

                        <th
                          scope="col"
                          class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          About
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Users
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          License use
                        </th>

                        <th scope="col" class="relative py-3.5 px-4">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">
                              Catalog
                            </h2>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
                              catalogapp.io
                            </p>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            Customer
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Content curating app
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              Brings all your news into one place
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-2/3 h-1.5"></div>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">
                              Circooles
                            </h2>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
                              getcirooles.com
                            </p>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div class="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
                            Churned
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Design software
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              Super lightweight design app
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-2/5 h-1.5"></div>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">
                              Sisyphus
                            </h2>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
                              sisyphus.com
                            </p>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            Customer
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Automation and workflow
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              Time tracking, invoicing and expenses
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-11/12 h-1.5"></div>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">
                              Hourglass
                            </h2>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
                              hourglass.app
                            </p>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div class="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
                            Churned
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Productivity app
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              Time management and productivity
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-1/3 h-1.5"></div>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">
                              Quotient
                            </h2>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
                              quotient.co
                            </p>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            Customer
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Sales CRM
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              Web-based sales doc management
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-1/6 h-1.5"></div>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </>
      )}

      {/* create task form */}
      <CreateTaskSlideover
        open={open}
        setOpen={setOpen}
        getTasks={getTasks}
      ></CreateTaskSlideover>
    </>
  );
}

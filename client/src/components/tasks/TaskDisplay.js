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
  Square,
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
              {/* <p className="text-md text-slate-500 font-light mx-auto">
                No tasks! Add a task to get started
              </p> */}
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
              : "grid grid-cols-2 gap-2"
          }`}
        >
          {taskState.numberOfActiveTasks === 0 &&
          taskState.numberOfInactiveTasks === 0 ? (
            <>
              {/* <p className="text-md text-slate-500 font-light mx-auto">
                No tasks! Add a task to get started
              </p> */}
            </>
          ) : (
            <>{renderTasks()}</>
          )}
        </div>
      )}

      {taskLayout === 3 && (
        <>
          <div class="relative overflow-x-auto rounded-md border border-gray-200 ">
            <table class="w-full text-sm text-left text-gray-500 divide-y divide-gray-200">
              <thead class="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" class="p-4"></th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-normal text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-normal text-gray-500"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-normal text-gray-500"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-normal text-gray-500"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-normal text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <>{renderTasks()}</>
              </tbody>
            </table>
          </div>
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useToggle from "../../hooks/use-toggle";
// import Task from "./Task";
// import "tw-elements";
// import DashboardFooter from "../layout/DashboardFooter";
// import CreateTaskSlideover from "./CreateTaskSlideover";
// import CompletedTask from "./CompletedTask";
// import {
//   MagnifyingGlass,
//   ArrowsDownUp,
//   Plus,
//   CaretDown,
//   Funnel,
// } from "phosphor-react";
// import sameDate from "../../methods/same-date";
// import dateSearch from "../../methods/date-search";

// export default function TaskDisplay() {
//   const [tasks, setTasks] = useState([]);
//   const [currentDay, setCurrentDay] = useState(new Date());
//   const [dayDistance, setDayDistance] = useState(0);
//   const [taskFormId, setTaskFormId] = useState("");
//   const [newTask, toggle] = useToggle(false);
//   const [showCreateTask, setShowCreateTask] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [dayInitialized, setDayInitialized] = useState(false);

//   const [numberOfInactiveTasks, setNumberOfInactiveTasks] = useState(0);
//   const [numberOfActiveTasks, setNumberOfActiveTasks] = useState(0);
//   const [numberOfCompleteTasks, setNumberOfCompleteTasks] = useState(0);
//   const [numberOfIncompleteTasks, setNumberOfIncompleteTasks] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [activeFilter, setActiveFilter] = useState("");

//   useEffect(() => {
//     getTasks();
//   }, []);

//   // state for task menu
//   const [toggleState, setToggleState] = useState(1);

//   // sets state value to the index of the clicked tab
//   const toggleTab = (index) => {
//     setToggleState(index);
//   };

//   // state for task status menu
//   const [secondToggleState, setSecondToggleState] = useState(1);

//   const secondToggleTab = (index) => {
//     setSecondToggleState(index);
//   };

//   // handles form closure
//   const handleOnClose = () => {
//     // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
//     setShowCreateTask(false);
//   };

//   async function getTasks() {
//     //If first load / day change TODO clean this up binary serach etc

//     if (!dayInitialized) {
//       const taskReqInit = await axios.get("http://localhost:8282/task/");
//       console.log(taskReqInit.data);
//       //Loop through all tasks
//       for (let i = 0; i < taskReqInit.data.length; i++) {
//         //Add entry on current day if none exists
//         if (dateSearch(currentDay, taskReqInit.data[i].entries) == -1) {
//           let tempEntries = taskReqInit.data[i].entries;
//           let defaults = taskReqInit.data[i].defaults;

//           let entryToAdd = {
//             date: currentDay,
//             duration: defaults.duration,
//             priority: defaults.priority,
//             isActive: false,
//             completed: false,
//             time: defaults.time,
//           };

//           tempEntries.push(entryToAdd);
//           tempEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

//           //Patch the updated task
//           let taskData = {
//             name: taskReqInit.data[i].name,
//             entries: tempEntries,
//             defaults: taskReqInit.data[i].defaults,
//           };

//           await axios.patch(
//             `http://localhost:8282/task/${taskReqInit.data[i]._id}/`,
//             taskData
//           );
//         }
//       }

//       setDayInitialized(true);
//     }

//     const taskReq = await axios.get("http://localhost:8282/task/");
//     setTasks(taskReq.data);

//     let inactiveIterator = 0;
//     let activeIterator = 0;

//     // complete and incomplete iterators
//     let incompleteIterator = 0;
//     let completeIterator = 0;

//     taskReq.data.map((task) => {
//       let index = dateSearch(currentDay, task.entries);

//       let t = task.entries[index];

//       if (t.isActive === false) {
//         inactiveIterator += 1;
//       } else if (t.isActive === true) {
//         activeIterator += 1;
//       }

//       if (t.completed === false && t.isActive === true) {
//         incompleteIterator += 1;
//       } else if (t.completed === true && t.isActive === true) {
//         completeIterator += 1;
//       }

//       // set state values of inactive and active counters to the corresponding iterators
//       setNumberOfInactiveTasks(inactiveIterator);
//       setNumberOfActiveTasks(activeIterator);

//       // set state values of incomplete and complete counters to the corresponding iterators
//       setNumberOfCompleteTasks(completeIterator);
//       setNumberOfIncompleteTasks(incompleteIterator);
//     });
//   }

//   //renders tasks based on active bool
//   function renderTasks(active) {
//     return tasks
//       .filter((task) =>
//         task.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .map((task, i) => {
//         //find today's entry
//         //console.log(task)
//         let index = dateSearch(currentDay, task.entries);

//         if (index > -1) {
//           let t = task.entries[index];

//           if (t.isActive === active) {
//             return (
//               <Task
//                 key={i}
//                 task={{
//                   name: task.name,
//                   priority: t.priority,
//                   duration: t.duration,
//                   _id: task._id,
//                   isActive: t.isActive,
//                   completed: t.completed,
//                   time: t.time,
//                   currentDay,
//                 }}
//                 getTasks={getTasks}
//               >
//                 {task.name}
//               </Task>
//             );
//           }
//         }
//       });
//   }

//   /* renders tasks based on completed bool TODO: is this still being used?
//   function renderCompletedTasks(isComplete) {
//     return tasks.map((task, i) => {
//       if (task.completed === isComplete && task.isActive === true) {
//         return (
//           <CompletedTask key={i} task={task} getTasks={getTasks}>
//             {task.name}
//           </CompletedTask>
//         );
//       }
//     });
//   }*/

//   return (
//     <>
//       {/* Tasks menu */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-semibold pt-1">Library</h1>
//         <div className="flex gap-4">
//           {/* search for task */}
//           <div className="flex items-center">
//             <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
//               Search
//             </p>
//             <div className="relative">
//               <div className="pointer-events-non text-slate-900 absolute inset-y-0 right-0 flex items-center pr-3">
//                 <MagnifyingGlass size={20} />
//               </div>
//               <input
//                 type="text"
//                 autoComplete="off"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="block w-full pl-4 pr-8 text-sm rounded-r-lg border border-gray-200 border-l-0"
//               />
//             </div>
//           </div>
//           {/* filter tasks */}
//           <div className="flex items-center">
//             <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
//               Filter
//             </p>
//             <div className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100">
//               <Funnel size={20} />
//             </div>
//           </div>
//           {/* add task */}
//           <div className="flex items-center">
//             <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
//               Add task
//             </p>
//             <div
//               onClick={() => setOpen(true)}
//               className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100"
//             >
//               <Plus size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* library */}
//       <div className="border border-gray-200 bg-stone-50 rounded-md p-6 grid grid-cols-4 gap-3">
//         {renderTasks(false)}
//         {renderTasks(true)}
//       </div>

//       <div className="space-y-6 flex flex-col hidden">
//         {/* Inactive tasks field */}
//         <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
//           {/* Title and add button inline */}
//           <div className=" p-5 sticky top-0 z-10 bg-white">
//             <div className="flex justify-between items-center">
//               <h1 className="font-semibold text-2xl">Library</h1>

//               {/* blue add task button */}
//               <span
//                 className="rounded-md text-blue-600 border bg-sky-100 border-blue-600 hover:text-white hover:bg-blue-500 font-normal pl-4 pr-4 text-xs pt-2 pb-2"
//                 onClick={() => setOpen(true)}
//               >
//                 Add Task
//               </span>
//             </div>
//           </div>
//           {numberOfInactiveTasks === 0 ? (
//             <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
//               No inactive tasks <br /> Click add task to start
//             </p>
//           ) : (
//             <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div>
//           )}
//         </div>

//         {/* arrows */}
//         <div className="flex justify-center">
//           <ArrowsDownUp size={25} weight="fill" className="text-gray-700" />
//         </div>

//         {/* inactive tasks section */}
//         <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
//           {/* Title and add button inline */}
//           <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
//             <h1 className="font-semibold text-2xl">Active Tasks</h1>

//             {/* add task button */}
//             <span
//               className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2 invisible"
//               onClick={() => setOpen(true)}
//             >
//               Add Task
//             </span>
//           </div>
//           {numberOfActiveTasks === 0 ? (
//             <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
//               No active tasks
//             </p>
//           ) : (
//             <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div>
//           )}
//         </div>
//       </div>

//       {/* <DashboardFooter></DashboardFooter> */}

//       <CreateTaskSlideover
//         open={open}
//         setOpen={setOpen}
//         getTasks={getTasks}
//       ></CreateTaskSlideover>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import DashboardFooter from "../layout/DashboardFooter";
import CreateTaskSlideover from "./CreateTaskSlideover";
import { Menu, Transition } from "@headlessui/react";
import CompletedTask from "./CompletedTask";
import {
  MagnifyingGlass,
  ArrowsDownUp,
  Plus,
  CaretDown,
  Funnel,
  Check,
} from "phosphor-react";
import sameDate from "../../methods/same-date";
import dateSearch from "../../methods/date-search";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());
  const [dayDistance, setDayDistance] = useState(0);
  const [taskFormId, setTaskFormId] = useState("");
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [open, setOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [dayInitialized, setDayInitialized] = useState(false);

  const [numberOfInactiveTasks, setNumberOfInactiveTasks] = useState(0);
  const [numberOfActiveTasks, setNumberOfActiveTasks] = useState(0);
  const [numberOfCompleteTasks, setNumberOfCompleteTasks] = useState(0);
  const [numberOfIncompleteTasks, setNumberOfIncompleteTasks] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterActive, setFilterActive] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  // state for task menu
  const [toggleState, setToggleState] = useState(1);

  // sets state value to the index of the clicked tab
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // state for task status menu
  const [secondToggleState, setSecondToggleState] = useState(1);

  const secondToggleTab = (index) => {
    setSecondToggleState(index);
  };

  // handles form closure
  const handleOnClose = () => {
    // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
    setShowCreateTask(false);
  };

  function handleFilterSelect(priority, active) {
    setFilterPriority(priority);
    setFilterActive(active);
  }

  async function getTasks() {
    //If first load / day change TODO clean this up binary serach etc

    if (!dayInitialized) {
      const taskReqInit = await axios.get("http://localhost:8282/task/");
      console.log(taskReqInit.data);
      //Loop through all tasks
      for (let i = 0; i < taskReqInit.data.length; i++) {
        //Add entry on current day if none exists
        if (dateSearch(currentDay, taskReqInit.data[i].entries) == -1) {
          let tempEntries = taskReqInit.data[i].entries;
          let defaults = taskReqInit.data[i].defaults;

          let entryToAdd = {
            date: currentDay,
            duration: defaults.duration,
            priority: defaults.priority,
            isActive: false,
            completed: false,
            time: defaults.time,
          };

          tempEntries.push(entryToAdd);
          tempEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

          //Patch the updated task
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

      setDayInitialized(true);
    }

    const taskReq = await axios.get("http://localhost:8282/task/");
    setTasks(taskReq.data);

    let inactiveIterator = 0;
    let activeIterator = 0;

    // complete and incomplete iterators
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

      // set state values of inactive and active counters to the corresponding iterators
      setNumberOfInactiveTasks(inactiveIterator);
      setNumberOfActiveTasks(activeIterator);

      // set state values of incomplete and complete counters to the corresponding iterators
      setNumberOfCompleteTasks(completeIterator);
      setNumberOfIncompleteTasks(incompleteIterator);
    });
  }

  //renders tasks based on active bool
  function renderTasks(active) {
    return tasks
      .filter((task) => {
        const nameMatch = task.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const priorityMatch = filterPriority
          ? task.entries.some((entry) => entry.priority === filterPriority)
          : true;
        const activeMatch = filterActive
          ? task.entries.some(
              (entry) => entry.isActive.toString() === filterActive
            )
          : true;
        return nameMatch && priorityMatch && activeMatch;
      })
      .map((task, i) => {
        //find today's entry
        //console.log(task)
        let index = dateSearch(currentDay, task.entries);

        if (index > -1) {
          let t = task.entries[index];

          if (t.isActive === active) {
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
        }
      });
  }

  /* renders tasks based on completed bool TODO: is this still being used?
  function renderCompletedTasks(isComplete) {
    return tasks.map((task, i) => {
      if (task.completed === isComplete && task.isActive === true) {
        return (
          <CompletedTask key={i} task={task} getTasks={getTasks}>
            {task.name}
          </CompletedTask>
        );
      }
    });
  }*/

  return (
    <>
      {/* Tasks menu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold pt-1">Library</h1>
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
              <Menu.Items className="origin-top-right absolute right-0 mt-12 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <span>No Filter</span>
                        {filterPriority === "" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("high", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>High Priority</span>
                        {filterPriority === "high" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("medium", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Medium Priority</span>
                        {filterPriority === "medium" && filterActive === "" && (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterSelect("low", "")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                  flex justify-between w-full px-4 py-2 text-sm font-normal`}
                      >
                        <span>Low Priority</span>
                        {filterPriority === "low" && filterActive === "" && (
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
                        <span>Active Tasks</span>
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
                        <span>Inactive Tasks</span>
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
        </div>
      </div>

      {/* library */}
      <div className="border border-gray-200 bg-slate-50 rounded-md p-6 grid grid-cols-4 gap-3">
        {renderTasks(false)}
        {renderTasks(true)}
      </div>

      <div className="space-y-6 flex flex-col hidden">
        {/* Inactive tasks field */}
        <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
          {/* Title and add button inline */}
          <div className=" p-5 sticky top-0 z-10 bg-white">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-2xl">Library</h1>

              {/* blue add task button */}
              <span
                className="rounded-md text-blue-600 border bg-sky-100 border-blue-600 hover:text-white hover:bg-blue-500 font-normal pl-4 pr-4 text-xs pt-2 pb-2"
                onClick={() => setOpen(true)}
              >
                Add Task
              </span>
            </div>
          </div>
          {numberOfInactiveTasks === 0 ? (
            <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
              No inactive tasks <br /> Click add task to start
            </p>
          ) : (
            <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div>
          )}
        </div>

        {/* arrows */}
        <div className="flex justify-center">
          <ArrowsDownUp size={25} weight="fill" className="text-gray-700" />
        </div>

        {/* inactive tasks section */}
        <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
          {/* Title and add button inline */}
          <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
            <h1 className="font-semibold text-2xl">Active Tasks</h1>

            {/* add task button */}
            <span
              className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2 invisible"
              onClick={() => setOpen(true)}
            >
              Add Task
            </span>
          </div>
          {numberOfActiveTasks === 0 ? (
            <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
              No active tasks
            </p>
          ) : (
            <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div>
          )}
        </div>
      </div>

      {/* <DashboardFooter></DashboardFooter> */}

      <CreateTaskSlideover
        open={open}
        setOpen={setOpen}
        getTasks={getTasks}
      ></CreateTaskSlideover>
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import DashboardFooter from "../layout/DashboardFooter";
import CreateTaskSlideover from "./CreateTaskSlideover";
import CompletedTask from "./CompletedTask";
import { MagnifyingGlass, ArrowsDownUp } from "phosphor-react";
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
    return tasks.map((task, i) => {
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
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold pt-1">Library</h1>
      </div>
      

      <div className="space-y-6 flex flex-col">
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

    // <>
    //   {/* Tasks menu */}
    //   <div className="flex justify-between items-center mb-5">
    //     <h1 className="text-3xl font-normal">My Tasks</h1>
    //     <ul className="flex text-gray-500">
    //       <li
    //         className={
    //           toggleState === 1
    //             ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 text-gray-900 hover:bg-gray-300 font-normal text-xs rounded-l-md border"
    //             : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs rounded-l-md border"
    //         }
    //         onClick={() => toggleTab(1)}
    //       >
    //         All
    //       </li>
    //       <li
    //         className={
    //           toggleState === 2
    //             ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 text-gray-900 font-normal text-xs border-t border-b"
    //             : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs border-t border-b"
    //         }
    //         onClick={() => toggleTab(2)}
    //       >
    //         Inactive
    //       </li>
    //       <li
    //         className={
    //           toggleState === 3
    //             ? "bg-gray-300 pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 text-gray-900 font-normal text-xs rounded-r-md border"
    //             : "pt-2 pb-2 pr-4 pl-4 hover:bg-gray-300 hover:text-gray-900 font-normal text-xs rounded-r-md border"
    //         }
    //         onClick={() => toggleTab(3)}
    //       >
    //         Active
    //       </li>
    //     </ul>
    //   </div>

    //   {/* both fields are visible if all tab is clicked */}
    //   <div className={toggleState === 1 ? "active-content content" : "content"}>
    //     <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg:space-y-0 lg:space-x-4">
    //       {/* Inactive tasks field */}
    //       <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
    //         {/* Title and add button inline */}
    //         <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
    //           <h1 className="font-normal text-lg">Inactive Tasks</h1>
    //           {/* add task button */}
    //           {/* grey add task button */}
    //           {/* <span
    //             className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2"
    //             // onClick={() => setShowCreateTask(true)}
    //             onClick={() => setOpen(true)}
    //           >
    //             Add Task
    //           </span> */}

    //           {/* blue add task button */}
    //           <span
    //             className="rounded-md text-blue-600 border bg-sky-100 border-blue-600 hover:text-white hover:bg-blue-500 font-normal pl-4 pr-4 text-xs pt-2 pb-2"
    //             // onClick={() => setShowCreateTask(true)}
    //             onClick={() => setOpen(true)}
    //           >
    //             Add Task
    //           </span>
    //         </div>
    //         {numberOfInactiveTasks === 0 ? (
    //           <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //             No inactive tasks <br /> Click add task to start
    //           </p>
    //         ) : (
    //           <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div>
    //         )}
    //         {/* <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div> */}
    //       </div>

    //       {/* active tasks field */}
    //       <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
    //         {/* Title and add button inline */}
    //         <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
    //           <h1 className="font-normal text-lg">Active Tasks</h1>

    //           {/* add task button */}
    //           <span
    //             className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2 invisible"
    //             // onClick={() => setShowCreateTask(true)}
    //             onClick={() => setOpen(true)}
    //           >
    //             Add Task
    //           </span>
    //         </div>
    //         {numberOfActiveTasks === 0 ? (
    //           <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //             No active tasks
    //           </p>
    //         ) : (
    //           <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div>
    //         )}
    //         {/* <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div> */}
    //       </div>
    //     </div>
    //   </div>

    //   {/* inactive tasks field is only visible if inactive tab is clicked */}
    //   <div className={toggleState === 2 ? "active-content content" : "content"}>
    //     <div className="grid grid-cols-1">
    //       <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
    //         {/* Title and add button inline */}
    //         <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
    //           <h1 className="font-normal text-lg">Inactive Tasks</h1>

    //           {/* blue add task button */}
    //           <span
    //             className="rounded-md text-blue-600 border bg-sky-100 border-blue-600 hover:text-white hover:bg-blue-500 font-normal pl-4 pr-4 text-xs pt-2 pb-2"
    //             // onClick={() => setShowCreateTask(true)}
    //             onClick={() => setOpen(true)}
    //           >
    //             Add Task
    //           </span>
    //         </div>
    //         {numberOfInactiveTasks === 0 ? (
    //           <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //             No inactive tasks <br /> Click add task to start
    //           </p>
    //         ) : (
    //           <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div>
    //         )}
    //         {/* <div className="space-y-3 p-5 pt-0">{renderTasks(false)}</div> */}
    //       </div>
    //     </div>
    //   </div>

    //   {/* active tasks field only visible if visible tab is clicked */}
    //   <div className={toggleState === 3 ? "active-content content" : "content"}>
    //     <div className="grid grid-cols-1">
    //       <div className="rounded-md text-center border remove-scrollbar overflow-scroll h-[28rem]">
    //         {/* Title and add button inline */}
    //         <div className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white">
    //           <h1 className="font-normal text-lg">Active Tasks</h1>

    //           {/* add task button */}
    //           <span
    //             className="rounded-md text-gray-500 border hover:text-gray-900 hover:bg-sidebarColor font-normal pl-4 pr-4 text-xs pt-2 pb-2 invisible"
    //             // onClick={() => setShowCreateTask(true)}
    //             onClick={() => setOpen(true)}
    //           >
    //             Add Task
    //           </span>
    //         </div>
    //         {numberOfActiveTasks === 0 ? (
    //           <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //             No active tasks
    //           </p>
    //         ) : (
    //           <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div>
    //         )}
    //         {/* <div className="space-y-3 p-5 pt-0">{renderTasks(true)}</div> */}
    //       </div>
    //     </div>
    //   </div>

    //   <h1 className="text-3xl font-normal mt-8 mb-5">Active Task Status</h1>

    //   <div className="rounded-md text-center border overflow-scroll h-[28rem] remove-scrollbar">
    //     <div class="text-sm px-5 bg-white pt-5 text-center text-gray-500 border-b border-gray-400 sticky top-0 z-10">
    //       <ul class="flex flex-wrap -mb-px">
    //         <li>
    //           <span
    //             className={
    //               secondToggleState === 1
    //                 ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
    //                 : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
    //             }
    //             onClick={() => secondToggleTab(1)}
    //           >
    //             Incomplete
    //           </span>
    //         </li>
    //         <li>
    //           <span
    //             className={
    //               secondToggleState === 2
    //                 ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
    //                 : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
    //             }
    //             onClick={() => secondToggleTab(2)}
    //           >
    //             Complete
    //           </span>
    //         </li>
    //       </ul>
    //     </div>

    //     <div
    //       className={
    //         secondToggleState === 1 ? "active-content content" : "content"
    //       }
    //     >
    //       {numberOfIncompleteTasks === 0 ? (
    //         <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //           No incomplete tasks
    //         </p>
    //       ) : (
    //         <div className="space-y-3 p-5">{renderCompletedTasks(false)}</div>
    //       )}
    //       {/* <div className="space-y-3 p-5">{renderCompletedTasks(false)}</div> */}
    //     </div>

    //     <div
    //       className={
    //         secondToggleState === 2 ? "active-content content" : "content"
    //       }
    //     >
    //       {numberOfCompleteTasks === 0 ? (
    //         <p className="font-light h-[19rem] flex items-center text-sm justify-center text-gray-500">
    //           No complete tasks
    //         </p>
    //       ) : (
    //         <div className="space-y-3 p-5">{renderCompletedTasks(true)}</div>
    //       )}
    //       {/* <div className="space-y-3 p-5">{renderCompletedTasks(true)}</div> */}
    //     </div>
    //   </div>

    //   <DashboardFooter></DashboardFooter>

    //   <CreateTaskSlideover
    //     open={open}
    //     setOpen={setOpen}
    //     getTasks={getTasks}
    //   ></CreateTaskSlideover>

    //   {/* <TaskForm
    //     getTasks={getTasks}
    //     visible={showCreateTask}
    //     onClose={handleOnClose}
    //   />
    //   {taskFormId === "" && newTask && (
    //     <TaskForm
    //       getTasks={getTasks}
    //       visible={showCreateTask}
    //       onClose={handleOnClose}
    //     />
    //   )} */}
    // </>
  );
}

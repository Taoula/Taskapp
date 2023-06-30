import React, { useState, useEffect } from "react";
import axios from "axios";
import useToggle from "../../hooks/use-toggle";
import useGlobalStore from "../../context/useGlobalStore";
import Task from "./Task";
import "tw-elements";
import DashboardFooter from "../layout/DashboardFooter";
import CreateTaskSlideover from "./CreateTaskSlideover";
import CompletedTask from "./CompletedTask";
import { MagnifyingGlass, ArrowsDownUp } from "phosphor-react";
import sameDate from "../../methods/same-date";
import dateSearch from "../../methods/date-search";

export default function TaskDisplay() {
  
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [open, setOpen] = useState(false);

  
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

  const currentDay = useGlobalStore((state) => state.currentDay);
  const currentDayString = currentDay.toString()

  useEffect(() => {
    console.log("useeffect")
    getTasks();
  }, [currentDayString]);



/*
  async function getTasks() {
    //If first load / day change TODO clean this up binary serach etc

    //if (!dayInitialized) {
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
          console.log(tempEntries)
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

    //}

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
  }*/

  async function getTasks() {
    console.log("getting tasks")
    // Get all tasks
    const taskReqInit = await axios.get("http://localhost:8282/task/");
    console.log(taskReqInit.data);
  
    // Loop through all tasks
    for (let i = 0; i < taskReqInit.data.length; i++) {
      // Add entry on current day if none exists
      if (dateSearch(currentDay, taskReqInit.data[i].entries) == -1) {
        console.log("no")
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
          next: defaults.next
        };
  
        tempEntries.push(entryToAdd);
        tempEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        console.log(tempEntries)
  
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
      console.log("new task")
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

  //renders tasks based on active bool
  function renderTasks(active) {
    console.log("rendering tasks")
    return taskState.tasks.map((task, i) => {
      console.log("mapping " + i)
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



  return (
    <>
      {/* Tasks menu */}
      {/* <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold pt-1">My Tasks</h1>
      </div> */}

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
          {taskState.numberOfInactiveTasks === 0 ? (
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
          {taskState.numberOfActiveTasks === 0 ? (
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

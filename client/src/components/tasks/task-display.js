import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./task-form";
import UpdateTaskForm from "./update-task-form";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";
import Sidebar from "../layout/sidebar";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [updateFormScale, setUpdateFormScale] = useState(0);
  const [createFormScale, setCreateFormScale] = useState(0);
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // handles form closure
  const handleOnClose = () => {
    // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
    setShowCreateTask(false);
  };

  async function getTasks() {
    const taskReq = await axios.get("http://localhost:8282/task/");
    setTasks(taskReq.data);
  }

  function enableTaskForm(type, id) {
    if (type === "update") {
      setUpdateFormScale(0);
      setTaskFormId(id);
      setTimeout(() => {
        setUpdateFormScale(1);
      }, 1);
    } else {
      setCreateFormScale(0);
      toggle();
      setTimeout(() => {
        setCreateFormScale(1);
      }, 1);
    }
  }

  function disableTaskForm(type) {
    if (type === "update") {
      setUpdateFormScale(0);
      setTimeout(() => {
        setTaskFormId("");
      }, 400);
    } else {
      setCreateFormScale(0);
      setTimeout(() => {
        toggle();
      }, 400);
    }
  }

  //renders tasks based on active bool
  function renderTasks(active) {
    return tasks.map((task, i) => {
      if (task.isActive === active) {
        return (
          <Task key={i} task={task} getTasks={getTasks}>
            {task.name}
          </Task>
        );
      }
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Sidebar />
  );
}

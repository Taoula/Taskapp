// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TaskForm from "./TaskForm";
// import UpdateTaskForm from "./UpdateTaskForm";
// import useToggle from "../../hooks/use-toggle";
// import Task from "./Task";

// export default function TaskDisplay() {
//   const [tasks, setTasks] = useState([]);
//   const [taskFormId, setTaskFormId] = useState("");
//   const [updateFormScale, setUpdateFormScale] = useState(0);
//   const [createFormScale, setCreateFormScale] = useState(0);
//   const [newTask, toggle] = useToggle(false);
//   const [showCreateTask, setShowCreateTask] = useState(false);

//   // handles form closure
//   const handleOnClose = () => {
//     // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
//     setShowCreateTask(false);
//   };

//   async function getTasks() {
//     const taskReq = await axios.get("http://localhost:8282/task/");
//     setTasks(taskReq.data);
//   }

//   function enableTaskForm(type, id) {
//     if (type === "update") {
//       setUpdateFormScale(0);
//       setTaskFormId(id);
//       setTimeout(() => {
//         setUpdateFormScale(1);
//       }, 1);
//     } else {
//       setCreateFormScale(0);
//       toggle();
//       setTimeout(() => {
//         setCreateFormScale(1);
//       }, 1);
//     }
//   }

//   function disableTaskForm(type) {
//     if (type === "update") {
//       setUpdateFormScale(0);
//       setTimeout(() => {
//         setTaskFormId("");
//       }, 400);
//     } else {
//       setCreateFormScale(0);
//       setTimeout(() => {
//         toggle();
//       }, 400);
//     }
//   }

//   //renders tasks based on active bool
//   function renderTasks(active) {
//     return tasks.map((task, i) => {
//       if (task.isActive === active) {
//         return (
//           <Task key={i} task={task} getTasks={getTasks}>
//             {task.name}
//           </Task>
//         );
//       }
//     });
//   }

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <div>
//       <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 sm:mt-3">
//         <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 sm:mt-2 sm:ml-2 sm:mr-1 text-center border-solid border-2 border-stone-200">
//           <h1 className="p-2">Inactive Tasks</h1>

//           <button
//             onClick={() => {
//               newTask ? disableTaskForm("create") : enableTaskForm("create");
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="h-6 w-6 hover:fill-neutral-900 hover:stroke-neutral-50"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               stroke-width="1"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </button>
//           {renderTasks(true)}
//         </div>

//         <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 mt-2 sm:mt-2 sm:ml-1 sm:mr-2 text-center border-solid border-2 border-stone-200">
//           <h1 className="p-2">Active Tasks</h1>
//           {renderTasks(false)}
//         </div>
//       </div>

//       {taskFormId === "" && newTask && (
//         <TaskForm
//           getTasks={getTasks}
//           disableTaskForm={disableTaskForm}
//           scale={createFormScale}
//         />
//       )}
//       {!newTask && taskFormId !== "" && (
//         <UpdateTaskForm
//           getTasks={getTasks}
//           disableTaskForm={disableTaskForm}
//           _id={taskFormId}
//           scale={updateFormScale}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import useToggle from "../../hooks/use-toggle";
import Task from "./Task";
import "tw-elements";

export default function TaskDisplay() {
  const [tasks, setTasks] = useState([]);
  const [taskFormId, setTaskFormId] = useState("");
  const [updateFormScale, setUpdateFormScale] = useState(0);
  const [createFormScale, setCreateFormScale] = useState(0);
  const [newTask, toggle] = useToggle(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  // const [showUpdateTask, setShowUpdateTask] = useState(false);

  // handles form closure
  const handleOnClose = () => {
    // sets showCreateTask value to false which is passed to the visible prop in task and disables the create task form
    setShowCreateTask(false);
  };

  // const handleUpdateOnClose = () => {

  //   setShowUpdateTask(false);
  // }

  async function getTasks() {
    const taskReq = await axios.get("http://localhost:8282/task/");
    setTasks(taskReq.data);
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
    <div>
      <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 sm:mt-3">
        <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 sm:mt-2 sm:ml-2 sm:mr-1 text-center border-solid border-2 border-stone-200">
          <h1 className="p-2">Inactive Tasks</h1>

          <button
            onClick={() => setShowCreateTask(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:fill-neutral-900 hover:stroke-neutral-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {renderTasks(false)}
        </div>

        <div className="bg-stone-100 rounded-lg shadow-lg ml-1 mr-1 mt-2 sm:mt-2 sm:ml-1 sm:mr-2 text-center border-solid border-2 border-stone-200">
          <h1 className="p-2">Active Tasks</h1>
          {renderTasks(true)}
        </div>
      </div>

      <TaskForm
        getTasks={getTasks}
        visible={showCreateTask}
        onClose={handleOnClose}
      />
      {taskFormId === "" && newTask && (
        <TaskForm
          getTasks={getTasks}
          visible={showCreateTask}
          onClose={handleOnClose}
        />
      )}
      {/* <button className="bg-red-500 p-3" onClick={() => setShowUpdateTask(true)}>Edit task</button>
      <UpdateTaskForm visible={showUpdateTask} onClose={handleUpdateOnClose}/> */}
    </div>
  );
}
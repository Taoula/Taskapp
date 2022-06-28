// import React, { useEffect } from "react"
// import { Pencil, Trash, Square, CheckSquare } from "phosphor-react"
// import useToggle from "../../hooks/use-toggle"
// import styled from "styled-components"
// import axios from 'axios'

// const TaskContainer = styled.div`
// background-color: ${props => props.color || "pink"};
// padding:1em 1em;
// box-sizing:border-box;
// border-radius:1em;
// transition:0.2s;
// &:hover {
//     transform: scale(1.025);
//     cursor: pointer;
// };
// `
// const TaskHeader = styled.div`
// display:flex;
// align-items:center;
// justify-content:space-between;
// text-transform:capitalize;
// `

// const TaskDescription = styled.p`
// margin:0.1em 0;
// font-size:.75rem;
// `

// function Task({task, getTasks, enableTaskForm, disableTaskForm}) {

//     const {name, priority, duration, _id, isActive, completed} = task
//     const [isExpanded, toggle] = useToggle(false)
//     const colors = ["#76a371", "#f5c540", "#e67839"]

//     async function deleteTask(){
//         if(isExpanded){
//             disableTaskForm("update");
//         }
//         const url = `http://localhost:8282/task/${_id}/`
//         await axios.delete(url)
//         getTasks()
//     }

//     async function toggleActive(){
//         await axios.patch(`http://localhost:8282/task/${_id}`, {name, priority, duration, isActive: !isActive, completed})
//         getTasks()
//     }

//     useEffect(()=> {
//         if (isExpanded){
//             enableTaskForm("update", _id)
//         } else {
//             disableTaskForm("update")
//         }
//     }, [isExpanded])

//     return (
//         <TaskContainer color={colors[priority-1]} onClick={toggle}>
//             <TaskHeader>
//                 <h3>{name}</h3>
//                 <Trash size={20} onClick={deleteTask}/>
//                 {isActive ? <CheckSquare size={20} onClick={toggleActive}/> : <Square size={20} onClick={toggleActive}/>}
//             </TaskHeader>

//             <TaskDescription>
//                 {duration} minutes
//             </TaskDescription>
//         </TaskContainer>
//     )
// }

// export default Task

import React, { useEffect } from "react";
import { Pencil, Trash, Square, CheckSquare } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
import styled from "styled-components";
import axios from "axios";

const TaskContainer = styled.div`
  background-color: ${(props) => props.color || "pink"};
  transition: 0.2s;
  &:hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
`;

const TaskDescription = styled.p`
  margin: 0.1em 0;
  font-size: 0.75rem;
`;

export default function Task({
  task,
  getTasks,
  enableTaskForm,
  disableTaskForm,
}) {
  const { name, priority, duration, _id, isActive, completed } = task;
  const [isExpanded, toggle] = useToggle(false);
  const colors = ["#f87171", "#fcd34d", "#4ade80"];

  async function deleteTask() {
    if (isExpanded) {
      disableTaskForm("update");
    }
    const url = `http://localhost:8282/task/${_id}/`;
    await axios.delete(url);
    getTasks();
  }

  async function toggleActive() {
    await axios.patch(`http://localhost:8282/task/${_id}`, {
      name,
      priority,
      duration,
      isActive: !isActive,
      completed,
    });
    getTasks();
  }

  useEffect(() => {
    if (isExpanded) {
      enableTaskForm("update", _id);
    } else {
      disableTaskForm("update");
    }
  }, [isExpanded]);

  return (
    <div>
      <TaskContainer
        color={colors[priority - 1]}
        onClick={toggle}
        className="text-left mt-1 mb-2 ml-2 mr-2 rounded-lg p-2"
      >
        <div className="grid grid-cols-3">
          <p className="capitalize font-medium text-md">
            {name}:{" "}
            <span className="text-md font-light">{duration} minutes</span>
          </p>

          <div className="inline flex">
            <p>Delete:</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:fill-black hover:stroke-neutral-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
              onClick={deleteTask}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          {isActive ? (
            <CheckSquare size={20} onClick={toggleActive} />
          ) : (
            <Square size={20} onClick={toggleActive} />
          )}
        </div>
      </TaskContainer>
    </div>
  );
}

{
  /* <TaskContainer color={colors[priority-1]} onClick={toggle}>
<TaskHeader>
    <h3>{name}</h3>
    <Trash size={20} onClick={deleteTask}/>
    {isActive ? <CheckSquare size={20} onClick={toggleActive}/> : <Square size={20} onClick={toggleActive}/>}
</TaskHeader>

<TaskDescription>
    {duration} minutes
</TaskDescription>
</TaskContainer> */
}

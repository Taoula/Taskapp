// import React, { useState } from "react"
// import styled from "styled-components"
// import axios from 'axios'
// import StylizedInput from "../forms/stylized-input"
// import StylizedButton from "../forms/stylized-button"
// import StylizedForm from "../forms/stylized-form"

// const ExpandableContainer = styled.div`
//   position: fixed;
//   width:30%;
//   height:45%;
//   background-color: #f0f0f0;
//   border: 1px solid gray;
//   padding: 3em;
//   box-sizing: border-box;
//   left:35%;
//   top:30%;
//   border-radius:2em;
//   transition: 0.4s;
//   transform: scale(${props => props.scale});
//   text-transform: Capitalize;
// `

// function TaskForm({ getTasks, disableTaskForm, scale}){
//     const [name, setName] = useState("")
//     const [duration, setDuration] = useState("")
//     const [priority, setPriority] = useState("")

//     async function onSubmit (e) {
//         disableTaskForm("create")
//         e.preventDefault();
//         const taskData = {
//             name, duration, priority,
//             isActive: false,
//             completed: false
//         }

//         await axios.post("http://localhost:8282/task/", taskData)
//         getTasks()
//     }

//     return (
//         <ExpandableContainer scale={scale}>
//             <p>New Task</p>
//             <StylizedForm onSubmit={(e) => onSubmit(e)}>
//                 <StylizedInput type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
//                 <StylizedInput type="number" placeholder="Duration (minutes)" min="5" value={duration} onChange={(e) => setDuration(e.target.value)}/>
//                 <StylizedInput type="number" placeholder="Priority (1-3)" min="1" max="5" value={priority} onChange={(e) => setPriority(e.target.value)}/>
//                 <StylizedButton input={true} type="submit" value="submit"/>
//             </StylizedForm>
//         </ExpandableContainer>
//     )
// }

// export default TaskForm

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ExpandableContainer = styled.div`
  position: absolute;
  transition: 0.4s;
  transform: scale(${(props) => props.scale});
  text-transform: Capitalize;
`;

export default function TaskForm({ getTasks, disableTaskForm, scale }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");

  async function onSubmit(e) {
    disableTaskForm("create");
    e.preventDefault();
    const taskData = {
      name,
      duration,
      priority,
      isActive: false,
      completed: false,
    };

    await axios.post("http://localhost:8282/task/", taskData);
    getTasks();
  }

  return (
    <ExpandableContainer scale={scale}>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto"></div>
        <form
          action=""
          class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          onSubmit={(e) => onSubmit(e)}
        >
          <p class="text-lg font-medium text-center">Create a new task</p>

          <div>
            <label class="text-sm font-medium">Task Name</label>

            <div class="relative mt-1">
              <input
                type="text"
                id=""
                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label class="text-sm font-medium">Duration</label>

            <div class="relative mt-1">
              <input
                type="number"
                id=""
                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Duration (minutes)"
                min="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label class="text-sm font-medium">Priority</label>

            <div class="relative mt-1">
              <input
                type="number"
                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Priority (1 - 3)"
                min="1"
                max="5"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            input={+true}
            value="submit"
          >
            Create
          </button>
        </form>
      </div>
    </ExpandableContainer>
  );
}

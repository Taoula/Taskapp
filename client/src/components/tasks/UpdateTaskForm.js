// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import StylizedInput from "../forms/stylized-input";
// import StylizedButton from "../forms/stylized-button";
// import StylizedForm from "../forms/stylized-form";

// const ExpandableContainer = styled.div`
//   position: fixed;
//   width: 30%;
//   height: 45%;
//   background-color: #f0f0f0;
//   border: 1px solid gray;
//   padding: 3em;
//   box-sizing: border-box;
//   left: 35%;
//   top: 30%;
//   border-radius: 2em;
//   transition: 0.4s;
//   transform: scale(${(props) => props.scale});
//   text-transform: Capitalize;
// `;

// export default function UpdateTaskForm({ getTasks, _id, disableTaskForm, visible, onClose }) {
//   const [name, setName] = useState("");
//   const [duration, setDuration] = useState("");
//   const [priority, setPriority] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   async function loadData() {
//     const task = await axios.get(`http://localhost:8282/task/${_id}/`);
//     const {
//       name: loadName,
//       duration: loadDuration,
//       priority: loadPriority,
//       isActive: loadIsActive,
//     } = task.data;
//     setName(loadName);
//     setDuration(loadDuration);
//     setPriority(loadPriority);
//     setIsActive(loadIsActive);
//   }

//   useEffect(() => {
//     loadData();
//   }, []);

//   async function onSubmit(e) {
//     e.preventDefault();
//     disableTaskForm("update");
//     const taskData = {
//       name,
//       duration,
//       priority,
//       isActive,
//     };

//     await axios.patch(`http://localhost:8282/task/${_id}/`, taskData);
//     getTasks();
//   }

//   const handleUpdateOnClose = (e) => {

//     if (e.target.id === "updateFormBackground") {
//       onClose();
//     }

//     else if (e.target.id === "cancelButton") {

//       onClose();
//     }
//   }

//   if (!visible) return null;

//   return (
//     // <ExpandableContainer scale={scale}>
//     //   <p>Updating {name}</p>
//     //   <StylizedForm width={80} onSubmit={(e) => onSubmit(e)}>
//     //     <StylizedInput
//     //       type="text"
//     //       placeholder="Task Name"
//     //       value={name}
//     //       onChange={(e) => setName(e.target.value)}
//     //     />
//     //     <StylizedInput
//     //       type="number"
//     //       placeholder="Duration (minutes)"
//     //       min="5"
//     //       value={duration}
//     //       onChange={(e) => setDuration(e.target.value)}
//     //     />
//     //     <StylizedInput
//     //       type="number"
//     //       placeholder="Priority (1-3)"
//     //       min="1"
//     //       max="3"
//     //       value={priority}
//     //       onChange={(e) => setPriority(e.target.value)}
//     //     />
//     //     <StylizedButton input={true} type="submit" value="submit" />
//     //   </StylizedForm>
//     // </ExpandableContainer>
//     <div
//       className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
//       id="updateFormBackground"
//       onClick={handleUpdateOnClose}
//     >
//       <div className="max-w-md px-4 py-16 mx-auto">
//         <form
//           action=""
//           class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white"
//           onSubmit={(e) => onSubmit(e)}
//         >
//           <div>
//           <p class="text-lg font-medium text-center">Update task</p>
//           <p className="mt-2 text-center text-gray-600">Enter new values for this task</p>
//           </div>
//           <div>
//             <label class="text-sm font-medium">Task Name</label>

//             <div class="relative mt-1">
//               <input
//                 type="text"
//                 class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
//                 placeholder="Task Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label class="text-sm font-medium">Duration</label>

//             <div class="relative mt-1">
//               <input
//                 type="number"
//                 class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
//                 placeholder="Duration (minutes)"
//                 min="5"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label class="text-sm font-medium">Priority</label>

//             <div class="relative mt-1">
//               <input
//                 type="number"
//                 class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
//                 placeholder="Priority (1 - 3)"
//                 min="1"
//                 max="5"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
//             input={+true}
//             value="submit"
//           >
//             Create
//           </button>
//           <button
//             class="block w-full px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-lg"
//             id="cancelButton"
//             onClick={handleUpdateOnClose}
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StylizedInput from "../forms/stylized-input";
import StylizedButton from "../forms/stylized-button";
import StylizedForm from "../forms/stylized-form";

const ExpandableContainer = styled.div`
  position: fixed;
  width: 30%;
  height: 45%;
  background-color: #f0f0f0;
  border: 1px solid gray;
  padding: 3em;
  box-sizing: border-box;
  left: 35%;
  top: 30%;
  border-radius: 2em;
  transition: 0.4s;
  transform: scale(${(props) => props.scale});
  text-transform: Capitalize;
`;

export default function UpdateTaskForm({ getTasks, _id, disableTaskForm, visible, onClose }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function loadData() {
    const task = await axios.get(`http://localhost:8282/task/${_id}/`);
    const {
      name: loadName,
      duration: loadDuration,
      priority: loadPriority,
      isActive: loadIsActive,
    } = task.data;
    setName(loadName);
    setDuration(loadDuration);
    setPriority(loadPriority);
    setIsActive(loadIsActive);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    disableTaskForm("update");
    const taskData = {
      name,
      duration,
      priority,
      isActive,
    };

    await axios.patch(`http://localhost:8282/task/${_id}/`, taskData);
    getTasks();
  }

  const handleUpdateOnClose = (e) => {

    if (e.target.id === "updateFormBackground") {
      onClose();
    }

    else if (e.target.id === "cancelButton") {

      onClose();
    }
  }

  if (!visible) return null;

  return (
    // <ExpandableContainer scale={scale}>
    //   <p>Updating {name}</p>
    //   <StylizedForm width={80} onSubmit={(e) => onSubmit(e)}>
    //     <StylizedInput
    //       type="text"
    //       placeholder="Task Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <StylizedInput
    //       type="number"
    //       placeholder="Duration (minutes)"
    //       min="5"
    //       value={duration}
    //       onChange={(e) => setDuration(e.target.value)}
    //     />
    //     <StylizedInput
    //       type="number"
    //       placeholder="Priority (1-3)"
    //       min="1"
    //       max="3"
    //       value={priority}
    //       onChange={(e) => setPriority(e.target.value)}
    //     />
    //     <StylizedButton input={true} type="submit" value="submit" />
    //   </StylizedForm>
    // </ExpandableContainer>
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
      id="updateFormBackground"
      onClick={handleUpdateOnClose}
    >
      <div className="max-w-md px-4 py-16 mx-auto">
        <form
          action=""
          class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white"
          onSubmit={(e) => onSubmit(e)}
        >
          <div>
          <p class="text-lg font-medium text-center">Update task</p>
          <p className="mt-2 text-center text-gray-600">Enter new values for this task</p>
          </div>
          <div>
            <label class="text-sm font-medium">Task Name</label>

            <div class="relative mt-1">
              <input
                type="text"
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
          <button
            class="block w-full px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-lg"
            id="cancelButton"
            onClick={handleUpdateOnClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
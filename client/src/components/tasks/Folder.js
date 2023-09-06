import React, { useEffect, useState } from "react";
import { FolderSimple } from "phosphor-react";
import useGlobalStore from "../../context/useGlobalStore";


export default function Folder({ folder }) {
  console.log("rendering task?");
  const {
    color,
    _id,
    name
  } = folder;

  const [open2, setOpen2] = useState(false);
  const { changeFolder, taskLayout} = useGlobalStore(
    (state) => ({
      changeFolder: state.changeFolder,
      taskLayout: state.taskLayout
    })
  );

  return (
    <>
    <div onClick={changeFolder(_id)}>
      {/* full size tiles */}
      {taskLayout === 1 && (
        <div
          className={`w-full overflow-hidden rounded-md border hover:shadow-xl duration-300 bg-opacity-70 shadow-sm hover:cursor-pointer justify-between group square-container aspect-w-1 aspect-h-1 border-green-600 bg-green-500/10 dark:border-green-400 dark:bg-green-500/90"`}
        >
          <div className="p-5">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  </div>
                </div>
                <p className="capitalize text-2xl pt-4 dark:text-white">
                  {name}
                </p>
                <FolderSimple size={30}/>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* collapsed tiles */}
      {taskLayout === 2 && (
        <div
          className={`w-full rounded-md border hover:shadow-xl duration-300 bg-opacity-70 py-3 pl-4 pr-4 shadow-sm hover:cursor-pointer flex items-center justify-between group border-green-600 bg-green-500/10 dark:border-green-400 dark:bg-green-500/90`}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <p className="text-xl capitalize dark:text-white">{name}</p>
            </div>
          </div>
        </div>
      )}

      {/* table row layout */}
      {taskLayout === 3 && (
        <tr
          className={`bg-white hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-700`}
        >
          <td class="w-4 p-4 text-sm font-medium">
            <div class="flex items-center">
              
            </div>
          </td>
          <th
            scope="row"
            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize whitespace-nowrap dark:text-gray-200"
          >
            {name}
          </th>
          <td class="px-6 py-4 text-sm font-normal text-gray-800 dark:text-gray-200">
    
          </td>
          <td class="px-6 py-4">
            <div
              class={`inline px-2 py-1 border text-sm font-normal rounded-full text-green-500 border-green-500 bg-green-100/60 dark:bg-green-500/50 dark:text-white dark:border-green-400`}
            >
            </div>
          </td>
          <td class="px-6 py-4 text-sm font-normal text-gray-800 dark:text-gray-200">
          </td>
          <td class="flex items-center px-6 py-4 space-x-3">

          </td>
        </tr>
      )}
      </div>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  const history = useNavigate();
  return (
    <Navbar />
    // <div>
    //   <header className="shadow-sm">
    //     <div className="max-w-screen p-4 mx-auto">
    //       <div className="flex items-center justify-between space-x-4 lg:space-x-10">
    //         <div className="flex lg:w-0 lg:flex-1">
    //           <a href="/" className="text-indigo-600 font-semibold text-lg" id="title">Task App</a>
    //         </div>

    //         <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              // <button
              //   className="px-5 py-2 text-sm font-medium text-gray-500 border border-gray-200 bg-gray-100 rounded active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring" onClick={() => history("/login")}
              // >
              //   Log in
              // </button>

              // <button
              //   className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring" onClick={() => history("/register")}
              // >
              //   Sign up
              // </button>
    //         </div>
    //       </div>
    //     </div>
    //   </header>
    // </div>
  );
}

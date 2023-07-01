import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import {
  Calendar,
  ListNumbers,
  ChartLineUp,
  List,
  Gear,
  SignOut,
  ArrowSquareLeft,
  ArrowSquareRight,
  ArrowLeft,
  ArrowRight,
  CaretDown,
  ArrowDown,
  CaretRight,
  PuzzlePiece,
} from "phosphor-react";
import LogoutDialogue from "./LogoutDialogue";
import { faN } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";

export default function Sidebar() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const [logoutDialogue, setLogoutDialogue] = useState(false);
  const [open, setOpen] = useState(true);
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setfName(userReq.data.fName);
    setlName(userReq.data.lName);
    setEmail(userReq.data.email);
  }

  // capitalizes user's name
  const capitalizeName = (str) => {
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
  };

  // verify logout function launches an alert if user wants to log out
  function verifyLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("logging out...");
      logOut();
    } else {
      console.log("Canceled log out.");
    }
  }

  // logout function is called if user confirms they want to logout
  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  const tabs = [
    { name: "Tasks", link: "/dashboard/tasks", icon: ListNumbers },
    { name: "Schedule", link: "/dashboard/schedule", icon: Calendar },
    { name: "Performance", link: "/dashboard/overview", icon: ChartLineUp },
  ];

  return (
    // <>
    //   <div className="flex max-h-screen flex-col justify-between bg-white border-r w-72">
    //     <div className="px-5 pt-5 pb-8">
    //       {/* <span className="px-6 py-4 mr-40 rounded-lg bg-tabHighlightColor text-xs text-gray-600 flex items-center gap-4">
    //         <PuzzlePiece size={25} weight="duotone" />
    //         <p className="text-lg">Jigsaw</p>
    //       </span> */}

    //       {/* logo and menu toggle */}
    //       <span className="text-xs text-gray-600 flex items-center justify-between">
    //         <p className="text-2xl font-semibold border-2 border-gray-600 rounded-md p-2">
    //           <PuzzlePiece size={30} />
    //         </p>
    //         <span className="bg-white border p-1 rounded">
    //           <ArrowLeft size={20} className="text-gray-400" />
    //         </span>
    //       </span>

    //       <nav
    //         aria-label="dashboard sidebar"
    //         className="mt-14 flex flex-col space-y-1"
    //       >
    //         {/* <p className="pb-2 px-4 text-gray-500 text-sm">MENU</p> */}

    //         {tabs.map((tab, i) => (
    //           <NavLink
    //             to={tab?.link}
    // className={({ isActive }) =>
    //   isActive
    //     ? "flex items-center gap-3 font-normal rounded-md bg-slate-200 px-4 py-2 text-gray-700"
    //     : "flex items-center gap-3 font-normal rounded-md px-4 py-2 text-gray-500 hover:bg-slate-200 hover:text-gray-700 duration-100"
    // }
    //           >
    //             {React.createElement(tab?.icon, {
    //               size: "25",
    //               weight: "fill",
    //             })}

    //             <span className="text-md">{tab?.name}</span>
    //           </NavLink>
    //         ))}
    //       </nav>
    //     </div>

    //     {/* profile picture */}
    //     <div className="px-5 pb-8">
    //       {/* <p className="pb-2 px-4 text-gray-500 text-sm">PROFILE</p> */}
    //       <div className="flex items-center justify-between bg-tabHighlightColor p-4 rounded-md hover:bg-gray-300 duration-150">
    //         <div className="flex items-center gap-3">
    //           <img
    //             alt="Man"
    //             src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    //             className="h-11 w-11 rounded object-cover"
    //           />
    //           <p>
    //             <p className="block text-sm text-gray-700 font-semibold">
    //               {capitalizeName(fName)} {capitalizeName(lName)}
    //             </p>
    //             <span className="text-gray-500 text-sm">{email}</span>
    //           </p>
    //         </div>
    //         <CaretRight size={15} />
    //       </div>
    //       {/* <button onClick={logOut}>logout</button> */}
    //       <ProfileDropdown />
    //     </div>
    //   </div>
    // </>
    <>
      <div className="max-h-screen bg-slate-50 border-r border-slate-200 w-20 justify-between flex flex-col pt-6 pb-6">
        <h1 className="italic font-semibold text-xl mx-auto">V</h1>
        <div className="flex flex-col space-y-2 mx-auto">
          {tabs.map((tab, i) => (
            <NavLink
              to={tab?.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-200 rounded-md p-2 text-slate-900"
                  : "hover:bg-slate-200 rounded-md p-2 text-slate-900"
              }
            >
              {React.createElement(tab?.icon, {
                size: "25",
                weight: "light",
              })}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col space-y-2 mx-auto">
          {/* <ProfileDropdown /> */}
          <img
            alt="profile"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="rounded-md object-cover"
          />
          <NavLink
            to="/dashboard/accountsettings"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-200 rounded-md p-2 text-slate-900"
                : "hover:bg-slate-200 rounded-md p-2 text-slate-900"
            }
          >
            <Gear size={25} weight="light" />
          </NavLink>
          <button
            onClick={logOut}
            className={({ isActive }) =>
              isActive
                ? "bg-slate-200 rounded-md p-2 text-slate-900"
                : "hover:bg-slate-200 rounded-md p-2 text-slate-900"
            }
          >
            <SignOut size={25} weight="light" />
          </button>
        </div>

        {/* <div className="mx-auto"> */}
        {/* <img
            alt="profile"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-md object-cover"
          /> */}
        {/* <ProfileDropdown /> */}
        {/* </div> */}
      </div>
    </>
  );
}

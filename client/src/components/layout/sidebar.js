import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import axios from "axios";
import {
  Calendar,
  ListNumbers,
  Question,
  GearSix,
  SignOut,
  SquareLogo,
  House,
} from "phosphor-react";

export default function Sidebar() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  // state for task menu
  const [toggleState, setToggleState] = useState(1);

  // sets state value to the index of the clicked tab
  const toggleTab = (index) => {
    setToggleState(index);
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

  return (
    <>
      {/* collapsed navbar */}
      <aside className="text-white bg-navbarBackgroundColor hidden sm:flex flex-col justify-between p-5 m-2.5 rounded-xl">
        <div>
          {/* Logo */}
          <Link
            to="/dashboard/overview"
            class="flex items-center mt-5 p-2 mb-5 rounded-md text-base font-normal border-2 border-navbarBackgroundColor"
          >
            {/* Header Title */}
            <SquareLogo size={25} weight="duotone" />
          </Link>

          {/* Navbar Tabs */}
          <ul class="space-y-2">
            {/* Overview Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/overview"
                className={
                  toggleState === 1
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-500 hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                }
                onClick={() => toggleTab(1)}
              >
                <House size={25} weight="duotone" />
              </Link>
            </li>

            {/* Schedule Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/schedule"
                className={
                  toggleState === 2
                  ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-500 hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                }
                onClick={() => toggleTab(2)}
              >
                <Calendar size={25} weight="duotone" />
              </Link>
            </li>

            {/* Tasks Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/tasks"
                className={
                  toggleState === 3
                  ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-500 hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                }
                onClick={() => toggleTab(3)}
              >
                <ListNumbers size={25} weight="duotone" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Tabs separated by a divider */}
        <div>
          <ul class="pt-5 space-y-2 border-t border-tabHoverColor">
            {/* Account Settings Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/accountSettings"
                className={
                  toggleState === 4
                  ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-500 hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                }
                onClick={() => toggleTab(4)}
              >
                <GearSix size={25} weight="duotone" />
              </Link>
            </li>

            {/* Help Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/help"
                className={
                  toggleState === 5
                  ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-500 hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-500 hover:border-2"
                }
                onClick={() => toggleTab(5)}
              >
                <Question size={25} weight="duotone" />
              </Link>
            </li>

            {/* Log out tab */}
            <li class="navbarTab">
              <span
                class="flex items-center rounded-md p-2 text-base font-normal text-white border-2 border-navbarBackgroundColor hover:bg-rose-100 hover:border-2 hover:border-rose-100 hover:text-red-500"
                onClick={verifyLogout}
              >
                <SignOut size={25} weight="duotone" />
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>

    // <>
    // {/* Full size sidebar */}
    // <aside className="text-white bg-navbarBackgroundColor hidden lg:flex flex-col justify-between p-4 w-64 m-2.5 rounded-xl">
    //     <div>
    //       {/* Throw alert if user wants to return to landing page and exit dashboard */}
    //       <Link to="/" class="flex items-center ml-4 mt-5 mb-5">
    //         {/* Header Logo */}
    //         {/* Replace image src with task app logo */}
    //         {/* <img
    //           src="https://flowbite.com/docs/images/logo.svg"
    //           class="mr-3 h-6 sm:h-7"
    //           alt="Task App Logo"
    //         /> */}

    //         {/* Header Title */}
    //         <span class="self-center whitespace-nowrap text-xl font-semibold text-white">
    //           Task App
    //         </span>
    //       </Link>

    //       {/* Navbar Tabs */}
    //       <ul class="space-y-2">
    //         <li class="navbarTab">
    //           <Link
    //             to="/dashboard/schedule"
    //             class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
    //           >
    //             <Calendar size={25} weight="duotone" />
    //             <span class="ml-3 flex-1 whitespace-nowrap">Schedule</span>
    //           </Link>
    //         </li>

    //         <li class="navbarTab">
    //           <Link
    //             to="/dashboard/tasks"
    //             class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
    //           >
    //             <ListNumbers size={25} weight="duotone" />
    //             <span class="ml-3 flex-1 whitespace-nowrap">Tasks</span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Tabs separated by a divider */}
    //     <div>
    //       <ul class="pt-5 space-y-2 border-t border-tabHoverColor">
    //         <li class="navbarTab">
    //           <a
    //             href="/"
    //             class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
    //           >
    //             <GearSix size={25} weight="duotone" />
    //             <span class="ml-3 flex-1 whitespace-nowrap">
    //               Account Settings
    //             </span>
    //           </a>
    //         </li>

    //         <li class="navbarTab">
    //           <a
    //             href="/"
    //             class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
    //           >
    //             <Question size={25} weight="duotone" />
    //             <span class="ml-3 flex-1 whitespace-nowrap">Help</span>
    //           </a>
    //         </li>

    //         <li class="navbarTab">
    //           <span
    //             class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-rose-100 hover:text-red-500"
    //             onClick={logOut}
    //           >
    //             <SignOut size={25} weight="duotone" />
    //             <span class="ml-3 flex-1 whitespace-nowrap">Log out</span>
    //           </span>
    //         </li>
    //       </ul>
    //     </div>
    //   </aside></>
  );
}

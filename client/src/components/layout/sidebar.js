import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import axios from "axios";
import {
  Calendar,
  ListNumbers,
  Question,
  GearSix,
  SignOut,
} from "phosphor-react";

export default function Sidebar() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  return (

    <>
      {/* collapsed navbar */}
      <aside className="text-white bg-navbarBackgroundColor hidden lg:hidden sm:flex flex-col justify-between p-3 m-2.5 rounded-xl">
        <div>
          {/* Throw alert if user wants to return to landing page and exit dashboard */}
          <Link to="/" class="flex items-center p-2 mt-5 mb-5">

            {/* Header Title */}
            <Calendar size={25} weight="duotone" />
          </Link>

          {/* Navbar Tabs */}
          <ul class="space-y-2">
            <li class="navbarTab">
              <Link
                to="/dashboard/schedule"
                class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <Calendar size={25} weight="duotone" />
              </Link>
            </li>

            <li class="navbarTab">
              <Link
                to="/dashboard/tasks"
                class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <ListNumbers size={25} weight="duotone" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Tabs separated by a divider */}
        <div>
          <ul class="pt-5 space-y-2 border-t border-tabHoverColor">
            <li class="navbarTab">
              <a
                href="/"
                class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <GearSix size={25} weight="duotone" />
              </a>
            </li>

            <li class="navbarTab">
              <a
                href="/"
                class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <Question size={25} weight="duotone" />
              </a>
            </li>

            <li class="navbarTab">
              <span
                class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-rose-100 hover:text-red-500"
                onClick={logOut}
              >
                <SignOut size={25} weight="duotone" />
              </span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Full size sidebar */}
      <aside className="text-white bg-navbarBackgroundColor hidden lg:flex flex-col justify-between p-4 w-64 m-2.5 rounded-xl">
        <div>
          {/* Throw alert if user wants to return to landing page and exit dashboard */}
          <Link to="/" class="flex items-center ml-4 mt-5 mb-5">
            {/* Header Logo */}
            {/* Replace image src with task app logo */}
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-7"
              alt="Task App Logo"
            /> */}

            {/* Header Title */}
            <span class="self-center whitespace-nowrap text-xl font-semibold text-white">
              Task App
            </span>
          </Link>

          {/* Navbar Tabs */}
          <ul class="space-y-2">
            <li class="navbarTab">
              <Link
                to="/dashboard/schedule"
                class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <Calendar size={25} weight="duotone" />
                <span class="ml-3 flex-1 whitespace-nowrap">Schedule</span>
              </Link>
            </li>

            <li class="navbarTab">
              <Link
                to="/dashboard/tasks"
                class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <ListNumbers size={25} weight="duotone" />
                <span class="ml-3 flex-1 whitespace-nowrap">Tasks</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Tabs separated by a divider */}
        <div>
          <ul class="pt-5 space-y-2 border-t border-tabHoverColor">
            <li class="navbarTab">
              <a
                href="/"
                class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <GearSix size={25} weight="duotone" />
                <span class="ml-3 flex-1 whitespace-nowrap">
                  Account Settings
                </span>
              </a>
            </li>

            <li class="navbarTab">
              <a
                href="/"
                class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-tabHoverColor"
              >
                <Question size={25} weight="duotone" />
                <span class="ml-3 flex-1 whitespace-nowrap">Help</span>
              </a>
            </li>

            <li class="navbarTab">
              <span
                class="flex items-center rounded-md p-2 pl-3 text-base font-normal text-white hover:bg-rose-100 hover:text-red-500"
                onClick={logOut}
              >
                <SignOut size={25} weight="duotone" />
                <span class="ml-3 flex-1 whitespace-nowrap">Log out</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
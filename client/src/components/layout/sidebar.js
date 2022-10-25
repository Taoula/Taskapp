import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarDropdown from "./navbarDropdown";
import NavbarTab from "./navbarTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faList, faGear, faQuestion, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {

  // Icon components stored in variables
  const scheduleIcon = <FontAwesomeIcon icon={faCalendarWeek} class="ml-0.5 h-5 w-5 flex-shrink-0 transition duration-75 text-gray-400" />;
  const taskIcon = <FontAwesomeIcon icon={faList} class="ml-0.5 h-5 w-5 flex-shrink-0 transition duration-75 text-gray-400" />;
  const settingsIcon = <FontAwesomeIcon icon={faGear} class="ml-0.5 h-5 w-5 flex-shrink-0 transition duration-75 text-gray-400" />;
  const helpIcon = <FontAwesomeIcon icon={faQuestion} class="ml-0.5 h-5 w-5 flex-shrink-0 transition duration-75 text-gray-400" />;
  const signOutIcon = <FontAwesomeIcon icon={faRightToBracket} class="ml-0.5 h-5 w-5 flex-shrink-0 transition duration-75 text-gray-400" />;

  const { loggedIn } = useContext(AuthContext);
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);
  const [showNavbarDropdown, setShowNavbarDropdown] = useState(false);

  // function handles closure of navbar dropdown
  const handleNavbarDropdownClosure = () => {
    setShowNavbarDropdown(false);
  };

  // getUserData is called every time the page is rendered
  useEffect(() => {
    getUserData();
  }, []);

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setfName(userReq.data.fName);
    setlName(userReq.data.lName);
    setEmail(userReq.data.email);
  }

  return (
    <div>
    <header className="shadow-sm">
      <div className="flex items-center justify-between h-16 max-w-screen px-4 mx-auto">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="text-indigo-600 font-semibold text-lg"
            id="title"
          >
            Task App
          </a>
        </div>

        <div className="items-center space-x-4 lg:flex">
          {loggedIn === false && (
            <>
              <button
                className="px-5 py-2 text-sm font-medium text-gray-500 border border-gray-200 bg-gray-100 rounded-lg active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring"
                onClick={() => history("/login")}
              >
                Log in
              </button>

              <button
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-lg active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
                onClick={() => history("/register")}
              >
                Sign up
              </button>
            </>
          )}

          {loggedIn === true && (
            <span className="flex items-center transition rounded-lg group shrink-0">
              <img
                className="object-cover w-8 h-8 rounded-full hidden sm:block"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="profile"
              />
              <img
                className="object-cover w-8 h-8 rounded-full sm:hidden"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="profile"
                // onClick={myDropdown}
                onClick={() => setShowNavbarDropdown(true)}
                id="miniIcon"
              />

              <p className="hidden ml-2 text-xs text-left sm:block">
                <strong className="block font-medium">
                  {fName} {lName}
                </strong>

                <span className="text-gray-500">{email}</span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden w-5 h-5 ml-4 text-gray-500 transition sm:block hover:text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
                // onClick={myDropdown}
                onClick={() => setShowNavbarDropdown(true)}
                style={{ cursor: "pointer" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>
      </div>

      <NavbarDropdown visible={showNavbarDropdown} onClose={handleNavbarDropdownClosure} />

      {/* user action nav */}
      {loggedIn === true && (
        <div className="border-t border-gray-100">
          <nav className="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
            {loggedIn === true && (
              <a
                className="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/schedule"
              >
                Schedule
              </a>
            )}
            {loggedIn === true && (
              <a
                className="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/tasks"
              >
                Tasks
              </a>
            )}
          </nav>
        </div>
      )}
      {/* end of user action nav */}
    </header>

    <aside class="w-64" aria-label="Sidebar">
      <div class="rounded-xl m-2.5 h-screen py-4 px-3 bg-navbarBackgroundColor">
        {/* Navbar Header */}
        {/* Replace href link to homepage */}
        <a href="#" class="mb-5 flex items-center pl-2.5">

          {/* Header Logo */}
          {/* Replace image src with task app logo */}
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-7"
            alt="Task App Logo"
          />

          {/* Header Title */}
          <span class="self-center whitespace-nowrap text-xl font-semibold text-white">
            Task App
          </span>
        </a>

        {/* Navbar Tabs */}
        <ul class="space-y-2">
          {/* Icon variables are passed as props to the navbarTab.js component */}
          <NavbarTab tabName="Schedule" tabIcon={scheduleIcon} />
          <NavbarTab tabName="Tasks" tabIcon={taskIcon}/>
        </ul>

        {/* Tabs separated by a divider */}
        <ul class="pt-4 mt-4 space-y-2 border-t border-tabHoverColor">
          <NavbarTab tabName="Settings" tabIcon={settingsIcon} />
          <NavbarTab tabName="Help" tabIcon={helpIcon} />
          <NavbarTab tabName="Sign Out" tabIcon={signOutIcon}/>
        </ul>
      </div>
    </aside>
    </div>
  );
}

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
      <aside className="text-sidebarIconColor bg-navbarBackgroundColor hidden sm:flex flex-col justify-between p-4 m-2.5 rounded-xl">
        <div>
          {/* Logo */}
          <Link
            to="/dashboard/overview"
            class="flex items-center mt-5 p-2 mb-5 rounded-md text-base font-normal border-2 border-navbarBackgroundColor"
          >
            {/* Header Title */}
            <SquareLogo size={25} />
          </Link>

          {/* Navbar Tabs */}
          <ul class="space-y-2">
            {/* Overview Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/overview"
                className={
                  toggleState === 1
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-900 hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                }
                onClick={() => toggleTab(1)}
              >
                <House size={25} />
              </Link>
            </li>

            {/* Schedule Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/schedule"
                className={
                  toggleState === 2
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-900 hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                }
                onClick={() => toggleTab(2)}
              >
                <Calendar size={25} />
              </Link>
            </li>

            {/* Tasks Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/tasks"
                className={
                  toggleState === 3
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-900 hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                }
                onClick={() => toggleTab(3)}
              >
                <ListNumbers size={25} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Tabs separated by a divider */}
        <div>
          <ul class="pt-5 space-y-2 border-t border-sidebarIconColor">
            {/* Account Settings Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/accountSettings"
                className={
                  toggleState === 4
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-900 hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                }
                onClick={() => toggleTab(4)}
              >
                <GearSix size={25} />
              </Link>
            </li>

            {/* Help Tab */}
            <li class="navbarTab">
              <Link
                to="/dashboard/help"
                className={
                  toggleState === 5
                    ? "flex items-center rounded-md p-2 text-base font-normal text-white bg-tabHoverColor border-2 border-gray-900 hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                    : "flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-tabHoverColor hover:border-gray-900 hover:border-2"
                }
                onClick={() => toggleTab(5)}
              >
                <Question size={25} />
              </Link>
            </li>

            {/* Log out tab */}
            <li class="navbarTab">
              <span
                class="flex items-center rounded-md p-2 text-base font-normal border-2 border-navbarBackgroundColor hover:bg-rose-100 hover:border-2 hover:border-rose-100 hover:text-red-500"
                onClick={verifyLogout}
              >
                <SignOut size={25} />
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

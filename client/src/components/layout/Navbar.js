import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  function myDropdown() {
    let dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden");
  }

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
    <>
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
                  onClick={myDropdown}
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
                  onClick={myDropdown}
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

        {/* dropdown */}
        {loggedIn === true && (
          <div
            className="absolute right-4 w-56 bg-white border border-gray-100 rounded-lg shadow-xl hidden"
            role="menu"
            id="dropdown"
          >
            <div className="py-2">
              <div className="-my-2 divide-y divide-gray-100">
                <div className="p-2">
                  <a
                    href="#"
                    className="flex gap-1.5 w-full items-center px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Account Settings
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                </div>

                <div className="p-2">
                  <span
                    className="flex items-center w-full gap-1 px-4 py-2 text-sm text-red-700 rounded-lg hover:bg-red-50 active:text-red-900 active:bg-red-300"
                    role="menuitem"
                    onClick={logOut}
                    style={{ cursor: "pointer" }}
                  >
                    Log out
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* end of dropdown */}

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
              {loggedIn === false && (
                <a
                  className="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                  href="/login"
                >
                  Log In
                </a>
              )}
              {loggedIn === false && (
                <a
                  className="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                  href="/register"
                >
                  Sign Up
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
      </header>
    </>
  );
}

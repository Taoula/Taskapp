import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);

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

  return (
    <>
      <header class="shadow-sm">
        <div class="flex items-center justify-between h-16 max-w-screen px-4 mx-auto">
          <div class="flex items-center space-x-4">
            <a
              href="/"
              className="text-indigo-600 font-semibold text-lg"
              id="title"
            >
              Task App
            </a>
          </div>

          <div class="items-center space-x-4 lg:flex">
            <span
              class="flex items-center transition rounded-lg group shrink-0"
            >
              <img
                class="object-cover w-8 h-8 rounded-full"
                src="https://www.hyperui.dev/photos/man-4.jpeg"
                alt="Simon Lewis"
              />

              <p class="hidden ml-2 text-xs text-left sm:block">
                <strong class="block font-medium">John Doe</strong>

                <span class="text-gray-500"> johndoe@fakemail.com </span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="hidden w-5 h-5 ml-4 text-gray-500 transition sm:block hover:text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={myDropdown}
                style={{cursor: "pointer"}}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* dropdown */}
        <div
          class="absolute right-4 w-56 bg-white border border-gray-100 rounded-lg shadow-xl hidden"
          role="menu"
          id="dropdown"
        >
          <div class="py-2">
            <div class="-my-2 divide-y divide-gray-100">
              <div class="p-2">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  Account Settings
                </a>
              </div>

              <div class="p-2">
                {loggedIn === true && (
                  <span
                    class="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 rounded-lg hover:bg-red-50 active:text-red-900 active:bg-red-300"
                    role="menuitem"
                    onClick={logOut}
                    style={{cursor: "pointer"}}
                  >
                    Log out
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* end of dropdown */}

        <div class="border-t border-gray-100">
          <nav class="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
            {loggedIn === true && (
              <a
                class="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/schedule"
              >
                Schedule
              </a>
            )}
            {loggedIn === false && (
              <a
                class="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/login"
              >
                Log In
              </a>
            )}
            {loggedIn === false && (
              <a
                class="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/register"
              >
                Sign Up
              </a>
            )}
            {loggedIn === true && (
              <a
                class="flex-shrink-0 pl-4 text-gray-900 hover:underline"
                href="/tasks"
              >
                Tasks
              </a>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import axios from "axios";

export default function NavbarDropdown({ visible, onClose }) {
  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  // function handles closure of dropdown
  const handleNavbarDropdownClosure = (e) => {
    // calls the close function if the id of the clicked object equals dropdownBackground
    if (e.target.id === "dropdownBackground") {
      onClose();
    }
  };

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  // if visible prop is false then nothing will be returned
  if (!visible) return null;

  return (
    <>
    {/* will only render the dropdown if the user is logged in */}
    {loggedIn === true && (
        <div
        className="inset-0 fixed bg-black bg-opacity-20"
        id="dropdownBackground"
        onClick={handleNavbarDropdownClosure}
      >
        <div
          className="absolute top-12 right-4 w-56 bg-white border border-gray-100 rounded-lg shadow-xl"
          role="menu"
        >
          <div className="py-2">
            <div className="-my-2 divide-y divide-gray-100">
              <div className="p-2">
                <a
                  href="#"
                  className="flex gap-1 w-full items-center px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  Account settings
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

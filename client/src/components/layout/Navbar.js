import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();
  const [navColor, setNavColor] = useState(false);

  const changeNavColor = () => {
    if (window.scrollY >= 88) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  window.addEventListener("scroll", changeNavColor);

  return (
    <>
      <nav className="text-gray-900 mt-8 items-center rounded-lg flex justify-between max-w-screen-2xl mx-auto">
        <h1 className="text-3xl">Jigsaw</h1>
        <div className="space-x-8 text-lg">
          <a>About</a>
          <a>Features</a>
        </div>
        <div className="space-x-8 text-lg">
          <a>Login</a>
          <a className="border rounded border-gray-900 px-8 py-3 bg-green-500">
            Sign up
          </a>
        </div>
      </nav>

      {/* <nav
        className={
          navColor
            ? "sticky-top navbar-scroll transition ease-in duration-200 shadow-sm"
            : "sticky-top bg-white transition ease-in duration-200"
        }
      >
        <div className="max-w-screen-2xl py-6 px-4 flex mx-auto justify-between items-center">
          <a href="/">
            <p
              className={
                navColor
                  ? "text-2xl font-semibold text-white"
                  : "text-2xl font-semibold"
              }
            >
              Jigsaw
            </p>
          </a>
          <ul className="flex space-x-5 items-center">
            <a href="/">
              <li
                className={
                  navColor
                    ? "text-white hover:text-gray-500 font-normal font-sans text-md"
                    : "text-gray-500 hover:text-gray-900 font-normal font-sans text-md"
                }
              >
                About
              </li>
            </a>
            <a href="/">
              <li
                className={
                  navColor
                    ? "text-white hover:text-gray-500 font-normal font-sans text-md"
                    : "text-gray-500 hover:text-gray-900 font-normal font-sans text-md"
                }
              >
                Features
              </li>
            </a>
          </ul>
          <div className="space-x-5 text-md flex items-center">
            <span
              type="button"
              class="text-gray-500 hover:text-gray-900 font-normal font-sans"
              onClick={() => history("/login")}
            >
              Sign in
            </span>
            <span
              type="button"
              class="text-white rounded-md bg-gray-900 hover:bg-gray-700 font-normal px-6 py-2 font-sans"
              onClick={() => history("/register")}
            >
              Sign up
            </span>
          </div>
        </div>
      </nav> */}
    </>
  );
}

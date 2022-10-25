import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const history = useNavigate();

  return (
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between max-w-4xl p-3 xs:px-4 xs:pt-3 sm:p-4 mx-auto transparent text-white">
        {/* logo */}
        <a className="rounded-lg font-semibold font-lora italic" href="/">
          Task App
        </a>

        {/* login button */}
        <ul className="flex space-x-4 md:space-x-6 text-sm font-light">
          <li>
            <p className="py-2 text-gray-400 tracking-tight">
              <a
                className="hover:text-white"
                onClick={() => history("/login")}
              >
                Sign in
              </a>
            </p>
          </li>
          <li>
            <button
              className="px-3.5 py-1.5 tracking-tight text-white bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
              onClick={() => history("/register")}
            >
              Get Started
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

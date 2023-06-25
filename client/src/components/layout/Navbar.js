import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();

  return (
    <>
      <nav className="fixed py-3 border-b backdrop-blur-md border-gray-200 w-full bg-white/80 z-50">
        <div className="flex items-center px-4 xl:px-0 xl:max-w-screen-xl mx-auto justify-between">
          <p className="italic text-gray-800 text-3xl font-semibold">
            Velocity
          </p>
          <div className="space-x-2 sm:space-x-4">
            <button
              onClick={() => history("/register")}
              className="px-5 py-2.5 text-lg font-medium tracking-wide bg-slate-800 rounded-md text-white hover:shadow-xl hover:duration-300 duration-300"
            >
              Register
            </button>
            <button
              onClick={() => history("/login")}
              className="px-6 py-2.5 text-lg border border-solid border-gray-200 font-medium tracking-wide hover:border-slate-900 rounded-md text-slate-800 hover:duration-300 duration-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function BetaHeroSection() {
  const history = useNavigate();

  return (
    <>
      <div className="bg-gray-100 shadow-md">
        <Navbar />
        <div class="text-slate-900 h-[32rem] flex items-center">
          <div class="flex flex-col mx-auto text-center max-w-sm xs:max-w-md sm:max-w-xl">
            <p class="font-lexend font-semibold text-4xl xs:text-5xl sm:text-6xl">
              A powerful tool to organize your day
            </p>
            <div class="mt-8 flex flex-col xs:flex-row mx-auto space-y-3 xs:space-y-0 xs:space-x-3 font-light text-sm font-white">
              <button
                class="bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600 px-20 xs:px-5 py-2 text-white"
                onClick={() => history("/register")}
              >
                Create an account
              </button>
              <button
                class="px-20 xs:px-5 py-2 bg-gray-600 border border-gray-500 rounded-sm hover:bg-gray-500 text-gray-300"
                onClick={() => history("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function BetaHeroSection() {
  const history = useNavigate();

  return (
    <>
      {/* <div className="bg-gray-100 shadow-md">
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
      </div> */}
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-gray-100 flex items-center text-center justify-center">
          <div>
            <div className="flex space-x-2 items-center justify-center mb-8">
              <h1 className="text-4xl font-medium text-slate-900">JIGSAW</h1>
              <p className="text-xs italic border border-rose-500 text-rose-500 px-2 rounded-md py-1">
                BETA
              </p>
            </div>
            <h1 className="text-4xl font-light pb-3 text-slate-900">
              A powerful tool to <br /> organize your day
            </h1>
            <p className="text-gray-500 text-lg font-light pb-8">
              join the beta program
            </p>
            <div className="space-x-2">
              <button
                class="bg-rose-500 font-light border px-4 py-2 border-rose-500 rounded-sm hover:bg-rose-600 hover:border-rose-600 text-white"
                onClick={() => history("/register")}
              >
                Create an account
              </button>
              <button
                class="bg-gray-600 border border-gray-600 font-light px-4 py-2 rounded-sm hover:bg-gray-700 hover:border-gray-700 text-gray-300"
                onClick={() => history("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <div className="remove-scrollbar overflow-scroll space-y-10 py-10">
          <div
            className="h-[20rem] w-[30rem] bg-white items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-md mx-auto"
            style={{
              backgroundImage: "url(" + "https://i.imgur.com/ZWQy92u.png" + ")",
            }}
          ></div>
          <div
            className="h-[20rem] w-[30rem] bg-white items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-md mx-auto"
            style={{
              backgroundImage: "url(" + "https://i.imgur.com/ZWQy92u.png" + ")",
            }}
          ></div>
          <div
            className="h-[20rem] w-[30rem] bg-white items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-md mx-auto"
            style={{
              backgroundImage: "url(" + "https://i.imgur.com/ZWQy92u.png" + ")",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

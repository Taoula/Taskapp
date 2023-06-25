import { Check } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Pricing() {
  const history = useNavigate();

  return (
    <>
      <section className="mt-32 sm:mt-48 md:mt-64 text-center">
        <h1 className="font-semibold text-5xl md:mb-24 sm:max-w-md sm:mx-auto md:max-w-none md:mx-0">
          No-strings-attached subscription
        </h1>
        <div className="md:flex justify-center max-w-sm md:max-w-screen-xl mx-auto space-y-8 md:space-y-0 gap-x-8">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-white font-medium text-xl pb-2">
              placeholder to maintain spacing
            </p>
            <div className="border border-gray-200 rounded-lg bg-white px-12 py-10 shadow-xl">
              <h1 className="text-2xl">Monthly</h1>
              <div className="inline-flex items-center pt-4 gap-x-1">
                <p className="text-4xl font-semibold">$3</p>
                <p className="text-2xl text-gray-400">/month</p>
              </div>
              <ul className="space-y-2 mt-6 text-lg">
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  Todo list & tasking
                </li>
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  AI-powered scheduling
                </li>
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  Synchronized calendars
                </li>
              </ul>
              <button
                onClick={() => history("/register")}
                className="border border-solid border-gray-200 w-full rounded-md mt-6 py-3 hover:border-slate-900 hover:bg-slate-900 hover:text-white font-medium text-slate-900 hover:duration-200 duration-200 text-lg"
              >
                Choose plan
              </button>
            </div>
          </div>
          <div className="bg-blue-600 p-4 rounded-lg">
            <p className="text-white font-medium text-xl pb-2">
              2 months free!
            </p>
            <div className="border border-gray-200 rounded-lg bg-white px-12 py-10 shadow-xl">
              <h1 className="text-2xl">Yearly</h1>
              <div className="inline-flex items-center pt-4 gap-x-1">
                <p className="text-4xl font-semibold">$30</p>
                <p className="text-2xl text-gray-400">/year</p>
              </div>
              <ul className="space-y-2 mt-6 text-lg">
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  Todo list & tasking
                </li>
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  AI-powered scheduling
                </li>
                <li className="flex gap-x-3">
                  <Check size={20} className="text-green-600" weight="bold" />
                  Synchronized calendars
                </li>
              </ul>
              <button
                onClick={() => history("/register")}
                className="border border-solid border-gray-200 w-full rounded-md mt-6 py-3 hover:border-slate-900 hover:bg-slate-900 hover:text-white font-medium text-slate-900 hover:duration-200 duration-200 text-lg"
              >
                Choose plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

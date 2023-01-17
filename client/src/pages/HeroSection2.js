import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function HeroSection2() {
  const history = useNavigate();

  return (
    <>
      <Navbar />
      <section className="h-screen">
        <div className="flex items-center h-full">
          {/* text */}
          <div className="grid max-w-screen-2xl px-4 mx-auto lg:grid-cols-11">
            <div className="mr-auto place-self-center col-span-7">
              <h1 className="max-w-3xl mb-4 text-7xl leading-none text-gray-900">
                A powerful scheduling tool to{" "}
                <span className="highlight">avoid burnout</span>
              </h1>
              <p className="max-w-2xl font-light font-sans text-gray-500 mb-8 text-3xl">
                Take control of your day with a dynamic schedule and tasks that
                adapt to your progress
              </p>
              <div className="space-x-5 max-w-sm flex text-center">
                <span
                  className="bg-white border w-full text-lg font-sans py-4 border-gray-600 hover:text-gray-900 text-gray-600 rounded-md hover:bg-sidebarColor hover:border-gray-900"
                >
                  Learn how
                </span>
                <span
                  className="bg-gray-900 border border-gray-900 w-full py-4 text-lg font-sans text-white rounded-md hover:bg-gray-700 hover:border-gray-700 hover:text-white-900 items-center get-started custom-box-shadow"
                  onClick={() => history("/register")}
                >
                  Get started
                </span>
              </div>
            </div>

            {/* image */}
            <div className="lg:col-span-4 hidden lg:flex">
              <img src="https://i.imgur.com/IB5yOgR.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

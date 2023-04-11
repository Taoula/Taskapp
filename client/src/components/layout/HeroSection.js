import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const history = useNavigate();

  return (
    <>
      {/* Hero section */}
      <section className="text-gray-900 h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-4xl xl:max-w-4xl lg:text-left">
            <h1 className="xl:text-7xl lg:text-6xl leading-none md:text-6xl sm:text-5xl text-4xl">
              A powerful scheduling tool to{" "}
              <span className="highlight">avoid burnout</span>
            </h1>
            <p className="mt-6 mb-8 sm:text-2xl text-lg md:text-2xl lg:max-w-xl xl:text-3xl md:mb-10 xl:mb-12 font-light text-gray-400 font-sans xl:max-w-3xl">
              Take control of your day with a dynamic schedule and tasks that
              adapt to your progress
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                className="hover:cursor-pointer py-3 sm:px-8 sm:py-3 md:px-8 md:py-3 xl:px-9 xl:py-4 md:text-lg xl:text-xl font-medium rounded bg-green-500 border border-gray-900"
                onClick={() => history("/register")}
              >
                Get started
              </a>
              <a
                className="hover:cursor-pointer py-3 sm:px-8 sm:py-3 md:px-8 md:py-3 xl:px-9 xl:py-4 md:text-lg xl:text-xl font-medium border rounded border-gray-900"
                onClick={() => history("/login")}
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-12 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="https://i.imgur.com/IB5yOgR.png"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
    </>
  );
}

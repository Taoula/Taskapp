import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();

  const about = useRef(null);
  const features = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <nav class=" bg-white">
        <div className="max-w-screen-2xl flex mx-auto justify-between py-6">
          <a href="/">
            <h1 className="text-2xl font-semibold">Jigsaw</h1>
          </a>

          <ul className="flex space-x-5 items-center h-full">
            <li className="font-sans text-gray-500 hover:text-gray-900">
              About
            </li>
            <li className="font-sans text-gray-500 hover:text-gray-900">
              Features
            </li>
          </ul>
          <div class="space-x-5 text-xl">
            <button
              type="button"
              class="text-gray-500 hover:text-gray-900 font-normal font-sans"
              onClick={() => history("/login")}
            >
              Sign in
            </button>
            <button
              type="button"
              class="text-white rounded-md bg-gray-900 hover:bg-gray-700 font-normal px-6 py-2 font-sans"
              onClick={() => history("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav> */}

      <nav className="sticky-top bg-white">
        <div className="max-w-screen-2xl py-6 px-4 flex mx-auto justify-between items-center">
          <a href="/">
            <p className="text-2xl font-semibold">Jigsaw</p>
          </a>
          <ul className="flex space-x-5 items-center">
            <a href="/">
              <li
                className="text-gray-500 hover:text-gray-900 font-normal font-sans text-md"
                onClick={() => scrollToSection(about)}
              >
                About
              </li>
            </a>
            <a href="/">
              <li
                className="text-gray-500 hover:text-gray-900 font-normal font-sans text-md"
                onClick={() => scrollToSection(features)}
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
      </nav>

      {/* <nav class="max-w-4xl flex items-center mx-auto p-3 xs:px-4 xs:pt-3 sm:p-4 justify-between">
        <a href="/" class="inline-flex items-center space-x-3">
          <img alt="logo" src="https://flowbite.com/docs/images/logo.svg" />
          <span className="text-lg font-semibold hidden xs:block">
            Jigsaw
          </span>
          <h1>BETA</h1>
        </a>
        <div className="flex items-center space-x-2">
          <a href="/" class="">
            <span className="text-xl font-medium">Jigsaw</span>
          </a>
          <h1 className="italic border border-blue-500 px-3 py-1 text-blue-500 rounded-md text-xs">
            BETA
          </h1>
        </div>
        <div class="space-x-4 md:space-x-5 font-light text-sm">
          <button
            class="tracking-tight text-gray-500 hover:text-gray-900"
            onClick={() => history("/login")}
          >
            Sign in
          </button>
          <button
            class="px-3.5 py-1.5 tracking-tight bg-indigo-500 border text-white border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
            onClick={() => history("/register")}
          >
            Get Started
          </button>
        </div>
      </nav> */}
    </>
  );
}

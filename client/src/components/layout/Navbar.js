import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();

  return (
    <>
      <nav class="max-w-4xl flex items-center mx-auto p-3 xs:px-4 xs:pt-3 sm:p-4 justify-between xs:mb-10">
        <a href="/" class="inline-flex items-center space-x-3">
          <img alt="logo" src="https://flowbite.com/docs/images/logo.svg" />
          <span className="font-lora italic font-semibold hidden xs:block">
            Jigsaw
          </span>
        </a>
        <div class="space-x-4 md:space-x-5 font-light text-sm">
          <button class="tracking-tight text-gray-400 hover:text-white" onClick={() => history("/login")}>Sign in</button>
          <button class="px-3.5 py-1.5 tracking-tight bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600" onClick={() => history("/register")}>Get Started</button>
        </div>
      </nav>
    </>
  );
}

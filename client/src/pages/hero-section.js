import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";

export default function HeroSection() {
  const history = useNavigate();

  return (
    <>
      <section id="hero-section" class="bg-blue-500 text-white">
        <Navbar />
        <div class="flex flex-col mx-auto text-center max-w-sm xs:max-w-md sm:max-w-xl pt-10 pb-20 sm:pb-40">
          <p class="font-montserrat font-semibold text-4xl xs:text-5xl sm:text-6xl">
            A powerful tool to organize your day
          </p>
          <p class="pt-6 font-lora italic text-gray-400 text-md xs:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            facilis aut nobis amet vitae.
          </p>
          <div class="mt-8 flex flex-col xs:flex-row mx-auto space-y-3 xs:space-y-0 xs:space-x-3 font-light text-sm font-white">
            <button
              class="bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600 px-20 xs:px-5 py-2"
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
        <div class="curve">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}

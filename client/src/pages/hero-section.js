import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";

export default function HeroSection() {
  const history = useNavigate();

  return (
    <>
      <section id="hero-section" class="bg-blue-500 text-white">
        <Navbar />
        <div class="flex flex-col mx-auto text-center max-w-sm xs:max-w-md sm:max-w-xl pt-20 pb-10">
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
      </section>
    </>
  );
}

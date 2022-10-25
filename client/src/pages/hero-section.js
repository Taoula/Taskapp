import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";

export default function HeroSection() {
  const history = useNavigate();

  return (
    <>
      <section id="hero-section" class="bg-blue-100 text-white relative min-w-0">
        <div>
          <Navbar />
          <div class="flex flex-col mx-auto max-w-sm xs:max-w-md sm:max-w-xl mt-20 sm:mt-30 text-center">
            <p class="sm:text-6xl font-semibold mb-6 xs:text-5xl text-4xl leading-none font-montserrat">
              A powerful tool to organize your day
            </p>
            <p class="text-gray-400 font-lora text-md xs:text-lg font-thin italic">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              facilis aut nobis amet vitae.
            </p>
            <div class="xs:space-x-3 space-y-3 xs:space-y-0 pt-8 flex flex-col mx-auto xs:flex-row font-light text-sm text-white">
              <button
                className="px-20 xs:px-5 py-2 bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
                onClick={() => history("/register")}
              >
                Create an account
              </button>
              <button
                className="xs:px-5 py-2 bg-gray-600 border border-gray-500 rounded-sm hover:bg-gray-500 text-gray-300"
                onClick={() => history("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <div class="pt-60">
        {/* Curve SVG */}
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
      </div>
      </section>
    </>
  );
}

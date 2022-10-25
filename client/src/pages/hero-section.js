import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";

export default function HeroSection() {
  const history = useNavigate();

  return (
    <>
    <div class="min-w-min">
      <section id="hero-section" class="bg-blue-100 text-white relative">
        <div>
          <Navbar />
          <div class="sm:max-w-xl max-w-md flex flex-col mx-auto text-center mt-10 sm:mt-20">
            <p class="sm:text-6xl font-semibold mb-5 text-5xl tracking-tight leading-none font-montserrat">
              A powerful tool to organize your day
            </p>
            <p class="text-gray-400 font-lora font-normal italic">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              facilis aut nobis amet vitae.
            </p>
            <div class="space-x-3 pt-7">
              <button
                className="inline-flex px-5 py-2 text-sm text-white bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
                onClick={() => history("/register")}
              >
                Create an account
              </button>
              <button
                className="inline-flex px-4 py-2 text-sm text-white bg-gray-600 border border-gray-500 rounded-sm hover:bg-gray-500 text-gray-300"
                onClick={() => history("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <div class="pt-40 sm:pt-60">
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
      </div>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";

export default function HeroSection() {

  return (
    <section id="hero-section" class="bg-blue-100 text-white">
      <div>
        <Navbar />
        <div class="sm:max-w-xl max-w-md flex flex-col mx-auto text-center mt-10">
          <p class="sm:text-6xl font-semibold mb-5 text-5xl tracking-tight leading-none">
            A powerful tool to organize your day
          </p>
          <p class="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            facilis aut nobis amet vitae.
          </p>
          <div class="space-x-3 pb-10 pt-7">
            <button
              className="inline-flex px-5 py-2 text-sm text-white bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
            //   onClick={() => history("/login")}
            >
              Create an account
            </button>
            <button
              className="inline-flex px-4 py-2 text-sm text-white bg-gray-600 border border-gray-500 rounded-sm hover:bg-gray-500 text-gray-300"
            //   onClick={() => history("/register")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

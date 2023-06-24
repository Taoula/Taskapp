import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreakpointLabel from "../BreakpointLabel";
import ProfileDropdown from "./ProfileDropdown";
import { ArrowRight, CaretRight } from "phosphor-react";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Features from "./Features";
import { Icon } from "phosphor-react";

export default function Hero() {
  const history = useNavigate();

  return (
    <>
      <BreakpointLabel></BreakpointLabel>
      {/* Hero section */}
      <section className="flex-col">
        <div className="mx-auto my-auto space-y-10 text-center max-w-screen-md pt-52">
          <h1 className="text-7xl font-black text-gray-800">
            Get sh*t done faster than ever before
          </h1>

          <div className="text-2xl space-x-4">
            <button
              onClick={() => history("/register")}
              className="rounded-md tracking-wide inline-flex items-center bg-gray-800 px-8 py-3 font-medium text-white hover:shadow-2xl hover:duration-300 duration-300"
            >
              Register
              <ArrowRight size={20} weight="bold" className="ml-3" />
            </button>
            <button
              onClick={() => history("/login")}
              className="rounded-md inline-flex items-center hover:border-slate-900 tracking-wide px-8 py-3 font-medium text-slate-900 bg-white border border-solid border-gray-200 hover:duration-300 duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
        <img
          className="rounded-xl mt-10 scale-75"
          alt="dashboard"
          src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3116&q=80"
        />
      </section>
    </>
  );
}

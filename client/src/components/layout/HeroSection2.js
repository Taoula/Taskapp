import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BreakpointLabel from "../BreakpointLabel";

export default function HeroSection2() {
  const history = useNavigate();

  return (
    <>
      <BreakpointLabel />

      {/* navbar component */}

      {/* Hero section */}
      <section className="text-gray-900 min-h-screen flex flex-col justify-center items-center">
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
                className="py-3 sm:px-8 sm:py-3 md:px-8 md:py-3 xl:px-9 xl:py-4 md:text-lg xl:text-xl font-medium rounded bg-green-500 border border-gray-900"
                onClick={() => history("/register")}
              >
                Get started
              </a>
              <a
                className="py-3 sm:px-8 sm:py-3 md:px-8 md:py-3 xl:px-9 xl:py-4 md:text-lg xl:text-xl font-medium border rounded border-gray-900"
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

      {/* about section */}
      <section className="grid grid-cols-2 h-[75vh] bg-red-100 about">
        <div className="place-self-center max-w-xl">
          <img src="https://i.imgur.com/mnbxD36.png" alt="" />
        </div>
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-5">
            <span className="highlight">How Jigsaw works</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light leading-2">
            Using our custom sorting algorithms, Jigsaw builds an adaptive
            schedule from a list of tasks you create. The schedule reorganizes
            itself based on the progress of your tasks throughout the day so
            that you can focus on the work at hand and avoid feeling overwhelmed
            by your busy life.
            <br />
            <br />
            Continue scrolling to see Jigsaw's{" "}
            <a
              href="/"
              className="font-sans underline text-green-500 hover:text-gray-900"
            >
              features
            </a>
            .
          </p>
        </div>
      </section>

      <section className="text-center pt-40">
        <h1 className="text-5xl font-semibold">
          <span className="">Features to streamline productivity</span>
        </h1>
      </section>

      {/* tasks section */}
      <section className="grid grid-cols-2 h-[75vh] features">
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-5">
            <span className="highlight">01. Tasks</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light leading-2">
            Using Jigsaw starts with the task library. You can create tasks to
            add to your library and easily add and remove from your schedule.
            Jigsaw's powerful scheduling is derived from a few key metrics you
            provide when creating task including priority, time-of-day, and
            length of time to complete the task.
          </p>
        </div>
        <div className="place-self-center max-w-2xl">
          <img
            src="https://i.imgur.com/2n1Fq9t.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
      </section>

      {/* schedule section */}
      <section className="grid grid-cols-2 h-[75vh] bg-neutral-50">
        <div className="place-self-center max-w-2xl">
          <img
            src="https://i.imgur.com/uUCeVH3.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-5">
            <span className="highlight">02. Schedule</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light leading-2">
            Once tasks are added from your library to the schedule, Jigsaw uses
            the metrics you provided to organize your day for you. You no longer
            need to decide which tasks need to be completed at which times.
            Jigsaw takes care of all the planning so you can focus on the work
            at hand.
          </p>
        </div>
      </section>

      {/* analysis section */}
      <section className="grid grid-cols-2 h-[75vh]">
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-5">
            <span className="highlight">03. Analysis</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light leading-2">
            Jigsaw analysis a variety of metrics regarding your task completion
            progress and presents them to you in a simple and understandable
            way. You can get an idea of your efficiency for the current day and
            ways to improve the next.
          </p>
        </div>
        <div className="place-self-center max-w-2xl">
          <img
            src="https://i.imgur.com/40FihzM.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
      </section>

      {/* footer */}
      <footer className="py-5 text-center bg-neutral-50">
        <h1 className="text-gray-500">Copyright @ Jigsaw 2023</h1>
      </footer>
    </>
  );
}

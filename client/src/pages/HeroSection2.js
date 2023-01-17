import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function HeroSection2() {
  const history = useNavigate();

  return (
    <>
      <Navbar />
      <section className="h-screen">
        <div className="flex items-center h-full">
          {/* text */}
          <div className="grid max-w-screen-2xl px-4 mx-auto lg:grid-cols-11">
            <div className="mr-auto place-self-center col-span-7">
              <h1 className="max-w-3xl mb-4 text-7xl leading-none text-gray-900">
                A powerful scheduling tool to{" "}
                <span className="highlight">avoid burnout</span>
              </h1>
              <p className="max-w-2xl font-light font-sans text-gray-500 mb-8 text-3xl">
                Take control of your day with a dynamic schedule and tasks that
                adapt to your progress
              </p>
              <div className="space-x-5 max-w-sm flex text-center">
                <span className="bg-white border w-full text-lg font-sans py-4 border-gray-600 hover:text-gray-900 text-gray-600 rounded-md hover:bg-sidebarColor hover:border-gray-900">
                  Learn how
                </span>
                <span
                  className="bg-gray-900 border border-gray-900 w-full py-4 text-lg font-sans text-white rounded-md hover:bg-gray-700 hover:border-gray-700 hover:text-white-900 items-center get-started custom-box-shadow"
                  onClick={() => history("/register")}
                >
                  Get started
                </span>
              </div>
            </div>

            {/* image */}
            <div className="lg:col-span-4 hidden lg:flex">
              <img src="https://i.imgur.com/IB5yOgR.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 py-20 bg-neutral-50">
        <div className="place-self-center max-w-xl">
          <img src="https://i.imgur.com/mnbxD36.png" alt="" />
        </div>
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-4">
            <span className="highlight">How Jigsaw works</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light">
            Using our custom sorting algorithms, Jigsaw builds an adaptive
            schedule from a list of tasks you create. The schedule reorganizes
            itself based on the progress of your tasks throughout the day so
            that you can focus on the work at hand and avoid feeling overwhelmed
            by your busy life.
          </p>
        </div>
      </section>

      <div className="py-10">
      <section className="grid grid-cols-2 py-20">
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-4">
            <span className="highlight">Tasks</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light">
            Using Jigsaw starts with the task library. You can create tasks to add to your library and easily add and remove from your schedule. Jigsaw's powerful scheduling is derived from a few key metrics you provide when creating task including priority, time-of-day, and length of time to complete the task.
          </p>
        </div>
        <div className="place-self-center max-w-xl">
          <img
            src="https://i.imgur.com/2n1Fq9t.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
      </section>

      <section className="grid grid-cols-2 py-20">
        <div className="place-self-center max-w-xl">
          <img
            src="https://i.imgur.com/uUCeVH3.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-4">
            <span className="highlight">Schedule</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light">
            Once tasks are added from your library to the schedule, Jigsaw uses the metrics you provided to organize your day for you. You no longer need to decide which tasks need to be completed at which times. Jigsaw takes care of all the planning so you can focus on the work at hand.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 py-20">
        <div className="place-self-center max-w-xl">
          <h1 className="text-5xl text-gray-900 pb-4">
            <span className="highlight">Analysis</span>
          </h1>
          <p className="text-2xl text-gray-500 font-sans font-light">
            Jigsaw analysis a variety of metrics regarding your task completion progress and presents them to you in a simple and understandable way. You can get an idea of your efficiency for the current day and ways to improve the next.
          </p>
        </div>
        <div className="place-self-center max-w-xl">
          <img
            src="https://i.imgur.com/40FihzM.png"
            alt=""
            className="border border-gray-900 rounded-lg custom-image-box-shadow"
          />
        </div>
      </section>
      </div>

      <footer className="py-20 bg-neutral-50">

      </footer>
    </>
  );
}

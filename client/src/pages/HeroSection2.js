// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";

// export default function HeroSection2() {
//   const history = useNavigate();

//   return (
//     <>
//       {/* navbar component */}
//       <Navbar />

//       {/* hero section */}
//       <section className="h-[calc(100vh-88px)] hero">
//         <div className="flex items-center h-full">
//           {/* text */}
//           <div className="grid max-w-screen-2xl px-4 mx-auto lg:grid-cols-11">
//             <div className="mr-auto place-self-center col-span-7">
//               <h1 className="max-w-3xl mb-4 text-7xl leading-none text-gray-900">
//                 A powerful scheduling tool to{" "}
//                 <span className="highlight">avoid burnout</span>
//               </h1>
//               <p className="max-w-2xl font-light font-sans text-gray-500 mb-8 text-3xl">
//                 Take control of your day with a dynamic schedule and tasks that
//                 adapt to your progress
//               </p>
//               <div className="space-x-5 max-w-sm flex text-center">
//                 <span className="bg-white border w-full text-lg font-sans py-4 border-gray-600 hover:text-gray-900 text-gray-600 rounded-md hover:bg-sidebarColor hover:border-gray-900">
//                   Learn how
//                 </span>
//                 <span
//                   className="bg-gray-900 border border-gray-900 w-full py-4 text-lg font-sans text-white rounded-md hover:bg-gray-700 hover:border-gray-700 hover:text-white-900 items-center get-started custom-box-shadow"
//                   onClick={() => history("/register")}
//                 >
//                   Get started
//                 </span>
//               </div>
//             </div>

//             {/* image */}
//             <div className="lg:col-span-4 hidden lg:flex">
//               <img src="https://i.imgur.com/IB5yOgR.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* about section */}
//       <section className="grid grid-cols-2 h-[75vh] bg-neutral-50 about">
//         <div className="place-self-center max-w-xl">
//           <img src="https://i.imgur.com/mnbxD36.png" alt="" />
//         </div>
//         <div className="place-self-center max-w-xl">
//           <h1 className="text-5xl text-gray-900 pb-5">
//             <span className="highlight">How Jigsaw works</span>
//           </h1>
//           <p className="text-2xl text-gray-500 font-sans font-light leading-2">
//             Using our custom sorting algorithms, Jigsaw builds an adaptive
//             schedule from a list of tasks you create. The schedule reorganizes
//             itself based on the progress of your tasks throughout the day so
//             that you can focus on the work at hand and avoid feeling overwhelmed
//             by your busy life.
//             <br />
//             <br />
//             Continue scrolling to see Jigsaw's{" "}
//             <a
//               href="/"
//               className="font-sans underline text-green-500 hover:text-gray-900"
//             >
//               features
//             </a>
//             .
//           </p>
//         </div>
//       </section>

//       <section className="text-center pt-40">
//         <h1 className="text-5xl font-semibold">
//           <span className="">Features to streamline productivity</span>
//         </h1>
//       </section>

//       {/* tasks section */}
//       <section className="grid grid-cols-2 h-[75vh] features">
//         <div className="place-self-center max-w-xl">
//           <h1 className="text-5xl text-gray-900 pb-5">
//             <span className="highlight">01. Tasks</span>
//           </h1>
//           <p className="text-2xl text-gray-500 font-sans font-light leading-2">
//             Using Jigsaw starts with the task library. You can create tasks to
//             add to your library and easily add and remove from your schedule.
//             Jigsaw's powerful scheduling is derived from a few key metrics you
//             provide when creating task including priority, time-of-day, and
//             length of time to complete the task.
//           </p>
//         </div>
//         <div className="place-self-center max-w-2xl">
//           <img
//             src="https://i.imgur.com/2n1Fq9t.png"
//             alt=""
//             className="border border-gray-900 rounded-lg custom-image-box-shadow"
//           />
//         </div>
//       </section>

//       {/* schedule section */}
//       <section className="grid grid-cols-2 h-[75vh] bg-neutral-50">
//         <div className="place-self-center max-w-2xl">
//           <img
//             src="https://i.imgur.com/uUCeVH3.png"
//             alt=""
//             className="border border-gray-900 rounded-lg custom-image-box-shadow"
//           />
//         </div>
//         <div className="place-self-center max-w-xl">
//           <h1 className="text-5xl text-gray-900 pb-5">
//             <span className="highlight">02. Schedule</span>
//           </h1>
//           <p className="text-2xl text-gray-500 font-sans font-light leading-2">
//             Once tasks are added from your library to the schedule, Jigsaw uses
//             the metrics you provided to organize your day for you. You no longer
//             need to decide which tasks need to be completed at which times.
//             Jigsaw takes care of all the planning so you can focus on the work
//             at hand.
//           </p>
//         </div>
//       </section>

//       {/* analysis section */}
//       <section className="grid grid-cols-2 h-[75vh]">
//         <div className="place-self-center max-w-xl">
//           <h1 className="text-5xl text-gray-900 pb-5">
//             <span className="highlight">03. Analysis</span>
//           </h1>
//           <p className="text-2xl text-gray-500 font-sans font-light leading-2">
//             Jigsaw analysis a variety of metrics regarding your task completion
//             progress and presents them to you in a simple and understandable
//             way. You can get an idea of your efficiency for the current day and
//             ways to improve the next.
//           </p>
//         </div>
//         <div className="place-self-center max-w-2xl">
//           <img
//             src="https://i.imgur.com/40FihzM.png"
//             alt=""
//             className="border border-gray-900 rounded-lg custom-image-box-shadow"
//           />
//         </div>
//       </section>

//       {/* footer */}
//       <footer className="py-5 text-center bg-neutral-50">
//         <h1 className="text-gray-500">Copyright @ Jigsaw 2023</h1>
//       </footer>
//     </>
//   );
// }

// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";

// export default function HeroSection2() {
//   const history = useNavigate();

//   return (
//     <>
//       {/* navbar component */}
//       {/* <Navbar /> */}

//       {/* hero section */}
//       <section class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div class="container flex flex-col-reverse items-center px-5 py-10 mx-auto lg:flex-row bg-red-500">
//           <div class="flex flex-col items-center justify-left max-w-3xl w-full text-center lg:w-2/3 lg:text-left">
//             <h1 class="mb-4 text-3xl text-gray-900 lg:text-7xl title-font">
//               A powerful scheduling tool to{" "}
//               <span className="highlight">avoid burnout</span>
//             </h1>
//             <p class="mb-8 text-base font-sans text-gray-500 leading-relaxed lg:text-3xl font-light">
//               Take control of your day with a dynamic schedule and tasks that
//               adapt to your progress{" "}
//             </p>
//             {/* <button class="inline-flex items-center px-6 py-2 mt-auto font-medium text-white transition duration-500 ease-in-out transform bg-green-500 rounded-md hover:bg-green-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
//               Get Started
//             </button> */}
//           </div>
//           <div class="w-full hidden lg:block lg:w-1/3">
//             <img
//               class="object-cover object-center rounded-lg"
//               alt="hero"
//               src="https://i.imgur.com/IB5yOgR.png"
//             ></img>
//           </div>
//         </div>
//       </section>

//       <section className="min-h-screen flex flex-col items-center justify-center bg-red-100">
//         <div className="lg:flex-row bg-red-200">
//           {/* text */}
//           <div className="grid max-w-screen-2xl px-4 mx-auto lg:grid-cols-11">
//             <div className="mr-auto place-self-center col-span-7">
//               <h1 className="max-w-3xl mb-4 text-7xl leading-none text-gray-900">
//                 A powerful scheduling tool to{" "}
//                 <span className="highlight">avoid burnout</span>
//               </h1>
//               <p className="max-w-2xl font-light font-sans text-gray-500 mb-8 text-3xl">
//                 Take control of your day with a dynamic schedule and tasks that
//                 adapt to your progress
//               </p>
//               <div className="space-x-5 max-w-sm flex text-center">
//                 <span className="bg-white border w-full text-lg font-sans py-4 border-gray-600 hover:text-gray-900 text-gray-600 rounded-md hover:bg-sidebarColor hover:border-gray-900">
//                   Learn how
//                 </span>
//                 <span
//                   className="bg-gray-900 border border-gray-900 w-full py-4 text-lg font-sans text-white rounded-md hover:bg-gray-700 hover:border-gray-700 hover:text-white-900 items-center get-started custom-box-shadow"
//                   onClick={() => history("/register")}
//                 >
//                   Get started
//                 </span>
//               </div>
//             </div>

//             {/* image */}
//             <div className="lg:col-span-4 hidden lg:flex">
//               <img src="https://i.imgur.com/IB5yOgR.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="h-screen flex flex-col items-center justify-center bg-blue-100">
//         <div className="flex flex-col md:justify-center lg:flex-row items-center max-w-screen-xl px-4 bg-blue-200">
//           <div>
//             <h1 className="text-5xl lg:text-7xl mb-4">
//               A powerful scheduling tool to{" "}
//               <span className="highlight">avoid burnout</span>
//             </h1>
//             <p className="text-xl lg:text-3xl text-gray-500 font-sans font-light">
//               Take control of your day with a dynamic schedule and tasks that
//               adapt to your progress
//             </p>
//           </div>
//           <div className="hidden lg:block w-1/3">
//             <img src="https://i.imgur.com/IB5yOgR.png" alt="hero"></img>
//           </div>
//           <div className="lg:hidden mt-8">
//             <img
//               src="https://i.imgur.com/uUCeVH3.png"
//               alt="dashboard screenshot"
//             ></img>
//           </div>
//         </div>
//       </section>

//       <div className="bg-black">
//         <section className="container items-center px-4 pb-12 mx-auto mt-20 lg:flex md:px-40">
//           <div className="flex-1 space-y-4 sm:text-center lg:text-left">
//             <h1 className="text-4xl font-bold text-yellow-500">
//               Happy halloween
//             </h1>
//             <p className="max-w-xl leading-relaxed text-gray-300 sm:mx-auto lg:ml-0">
//               It is a long established fact that a reader will be distracted by
//               the readable content of a page when looking at its layout.
//             </p>
//             <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
//               <a
//                 href="google.com"
//                 className="block px-6 py-2 text-center text-white bg-yellow-600 rounded-md"
//               >
//                 Buy Now
//               </a>
//               <a
//                 href="google.com"
//                 className="block px-6 py-2 text-center text-gray-500 bg-white rounded-md"
//               >
//                 See More
//               </a>
//             </div>
//           </div>
//           <div>
//             <img
//               src="https://i.imgur.com/IB5yOgR.png"
//               className="w-full mx-auto mt-6 sm:w-10/12 lg:w-full"
//               alt="poop"
//             />
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import BreakpointLabel from "../components/BreakpointLabel";

export default function HeroSection2() {
  const history = useNavigate();

  return (
    <>
      {/* navbar component */}
      {/* <Navbar /> */}
      <BreakpointLabel />

      {/* hero section */}
      {/* <section className="h-[calc(100vh-88px)] bg-landingBackground hero">
        <div className="flex items-center h-full px-4">
          <div className="grid md:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:grid-cols-11 bg-red-100">
            <div className="mr-auto place-self-center col-span-7 bg-blue-200">
              <h1 className="max-w-3xl mb-4 text-5xl md:text-6xl xl:text-7xl leading-none text-gray-900">
                A powerful scheduling tool to{" "}
                <span className="highlight">avoid burnout</span>
              </h1>
              <p className="max-w-2xl font-light font-sans text-gray-500 mb-8 text-xl md:text-2xl xl:text-3xl">
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

            <div className="hidden lg:flex lg:col-span-4 bg-red-300">
              <img src="https://i.imgur.com/IB5yOgR.png" alt="" />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section class="bg-landingBackground h-screen">
        <div className="flex items-center h-full">
          <div class="grid md:max-w-screen-lg xl:max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7 bg-blue-100">
              <h1 class="max-w-2xl mb-4 text-5xl md:text-6xl xl:text-7xl leading-none text-gray-900">
                A powerful scheduling tool to{" "}
                <span className="highlight">avoid burnout</span>{" "}
              </h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 text-xl md:text-2xl xl:text-3xl font-sans">
                Take control of your day with a dynamic schedule and tasks that
                adapt to your progress
              </p>
              <a
                href="www.google.com"
                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="www.google.com"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border rounded-md hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-100 text-gray-900 border-gray-900"
              >
                Learn more
              </a>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex bg-red-100 xl:scale-75">
              <img
                className=""
                src="https://i.imgur.com/IB5yOgR.png"
                alt="mockup"
              ></img>
            </div>
          </div>
        </div>
      </section> */}

      <section className="text-gray-900 min-h-screen flex flex-col justify-center items-center">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-2xl xl:max-w-4xl lg:text-left">
            <h1 className="text-7xl leading-none sm:text-7xl">
              A powerful scheduling tool to{" "}
              <span className="highlight">avoid burnout</span>
            </h1>
            <p className="mt-6 mb-8 text-lg xl:text-3xl sm:mb-12 font-light text-gray-400 font-sans xl:max-w-3xl">
              Take control of your day with a dynamic schedule and tasks that
              adapt to your progress
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                href="/"
                className="px-9 py-4 text-xl font-medium rounded dark:bg-green-500 border-green-700"
              >
                Get started
              </a>
              <a
                href="/"
                className="px-9 py-4 text-xl font-medium border rounded border-gray-900"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="https://i.imgur.com/IB5yOgR.png"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="grid grid-cols-2 h-[75vh] bg-neutral-50 about">
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

import React from "react";

export default function Features() {
  return (
    <>
      {/* features section */}
      <section className="mt-36 flex-col text-center">
        <h1 className="font-bold text-5xl">All-in-one toolkit</h1>
        <div className="max-w-screen-xl mx-auto mt-32 grid grid-cols-2 gap-32">
          <div className="flex items-center">
            <div className="text-left space-y-4">
              {/* <h1 className="text-4xl font-semibold">
                Advanced task management
              </h1> */}
              <h1 className="text-4xl font-semibold">
                Stay organized with a powerful todo list
              </h1>
              <p className="font-light text-gray-700 text-xl tracking-wide">
                Easily track task priority, duration, and time of day with our
                advanced todo list. Never miss an important task or struggle
                with time management again. Stay in control of your day.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="rounded-md h-96 w-auto"
              alt="dashboard"
              src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3116&q=80"
            />
          </div>
          <div className="flex items-center">
            <div className="space-y-4 text-left">
              {/* <h1 className="text-4xl font-semibold">
                Dynamic Task Scheduling
              </h1> */}
              <h1 className="text-4xl font-semibold">
                Optimize Your Productivity with Smart Scheduling
              </h1>
              <p className="font-light text-gray-700 text-xl tracking-wide">
                Our smart scheduler organizes tasks based on priorities,
                durations, and time constraints. It adapts and reorganizes as
                you progress, ensuring you stay on track and make the most of
                your time.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="rounded-md h-96 w-auto"
              alt="dashboard"
              src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3116&q=80"
            />
          </div>
          <div className="flex items-center">
            <div className="text-left space-y-4">
              {/* <h1 className="text-4xl font-semibold">
                Sync and Streamline Your Schedule Effortlessly
              </h1> */}
              <h1 className="text-4xl font-semibold">
                Sync and Streamline Your Schedule Effortlessly
              </h1>
              <p className="font-light text-gray-700 text-xl tracking-wide">
                Our integrated calendar syncs with all your calendars,
                displaying your dynamic schedule. Say goodbye to overlaps and
                tedious planning. Enjoy a well-structured day with ease.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="rounded-md h-96 w-auto"
              alt="dashboard"
              src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3116&q=80"
            />
          </div>
        </div>
      </section>
    </>
  );
}

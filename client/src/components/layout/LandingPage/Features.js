import React, { useEffect } from "react";

export default function Features({ scrollToFeatures, featuresRef }) {
  useEffect(() => {
    if (scrollToFeatures && featuresRef.current) {
      const scrollOptions = {
        behavior: "smooth",
        block: "start",
      };

      const yOffset = -54; // Adjust the offset value as desired
      const targetPosition =
        featuresRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: targetPosition,
        ...scrollOptions,
      });
    }
  }, [scrollToFeatures]);

  return (
    <>
      <section
        className="pt-32 flex-col text-center bg-lightGrid1 bg-cover"
        ref={featuresRef}
      >
        <h1 className="font-bold text-5xl mb-16 md:mb-24">
          All-in-one toolkit
        </h1>
        <div className="xl:max-w-screen-xl mx-auto lg:max-w-5xl md:max-w-3xl sm:max-w-xl max-w-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-y-32 lg:gap-x-32">
            <div className="flex items-center mb-10 lg:mb-0">
              <div className="text-left space-y-4">
                <h1 className="text-3xl xl:text-4xl font-semibold">
                  Stay organized with a powerful todo list
                </h1>
                <p className="font-light text-gray-700 text-lg xl:text-xl tracking-wide">
                  Easily track task priority, duration, and time of day with our
                  advanced todo list. Never miss an important task or struggle
                  with time management again. Stay in control of your day.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="rounded-md"
                alt="dashboard"
                src="https://images.ctfassets.net/wfutmusr1t3h/6JwTqSB7kwOBWQyV5QuDtE/8c41a554e2bd9e8576b9429b01290429/Innovation.png?w=1280&q=75"
              />
            </div>
            <div className="flex items-center mb-10 lg:mb-0 mt-28 sm:mt-32 lg:mt-0">
              <div className="space-y-4 text-left">
                <h1 className="text-3xl xl:text-4xl font-semibold">
                  Optimize your productivity with smart scheduling
                </h1>
                <p className="font-light text-gray-700 text-lg xl:text-xl tracking-wide">
                  Our smart scheduler organizes tasks based on priorities,
                  durations, and time constraints. It adapts and reorganizes as
                  you progress, ensuring you stay on track and make the most of
                  your time.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="rounded-md"
                alt="dashboard"
                src="https://images.ctfassets.net/wfutmusr1t3h/5aWEAcOsYcfnlDBNSiEaOY/1eb1e50fca584d4b88b7be514b7f5da1/Stats.png?w=1280&q=75"
              />
            </div>
            <div className="flex items-center mb-10 lg:mb-0 mt-28 sm:mt-32 lg:mt-0">
              <div className="text-left space-y-4">
                <h1 className="text-3xl xl:text-4xl font-semibold">
                  Sync and streamline your schedule effortlessly
                </h1>
                <p className="font-light text-gray-700 text-lg xl:text-xl tracking-wide">
                  Our integrated calendar syncs with all your calendars,
                  displaying your dynamic schedule. Say goodbye to overlaps and
                  tedious planning. Enjoy a well-structured day with ease.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="rounded-md"
                alt="dashboard"
                src="https://images.ctfassets.net/wfutmusr1t3h/1Yf6QdevKh4d2gtcqwrl8D/b19561dbc8d5ff325432b81982c997ae/IDEs.png?w=1280&q=75"
              />
            </div>
          </div>
        </div>
      </section>
    </>
    // <>
    //   {/* features section */}
    //   <section className="mt-32 flex-col text-center" ref={featuresRef}>
    //     <h1 className="font-bold text-5xl mb-32">All-in-one toolkit</h1>
    //     <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-y-32 gap-x-32">
    //       <div className="flex items-center">
    //         <div className="text-left space-y-4">
    //           {/* <h1 className="text-4xl font-semibold">
    //             Advanced task management
    //           </h1> */}
    //           <h1 className="text-4xl font-semibold">
    //             Stay organized with a powerful todo list
    //           </h1>
    //           <p className="font-light text-gray-700 text-xl tracking-wide">
    //             Easily track task priority, duration, and time of day with our
    //             advanced todo list. Never miss an important task or struggle
    //             with time management again. Stay in control of your day.
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <img
    //           className="rounded-md"
    //           alt="dashboard"
    //           src="https://images.ctfassets.net/wfutmusr1t3h/6JwTqSB7kwOBWQyV5QuDtE/8c41a554e2bd9e8576b9429b01290429/Innovation.png?w=1280&q=75"
    //         />
    //       </div>
    //       <div className="flex items-center">
    //         <div className="space-y-4 text-left">
    //           {/* <h1 className="text-4xl font-semibold">
    //             Dynamic Task Scheduling
    //           </h1> */}
    //           <h1 className="text-4xl font-semibold">
    //             Optimize your productivity with smart scheduling
    //           </h1>
    //           <p className="font-light text-gray-700 text-xl tracking-wide">
    //             Our smart scheduler organizes tasks based on priorities,
    //             durations, and time constraints. It adapts and reorganizes as
    //             you progress, ensuring you stay on track and make the most of
    //             your time.
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <img
    //           className="rounded-md"
    //           alt="dashboard"
    //           src="https://images.ctfassets.net/wfutmusr1t3h/5aWEAcOsYcfnlDBNSiEaOY/1eb1e50fca584d4b88b7be514b7f5da1/Stats.png?w=1280&q=75"
    //         />
    //       </div>
    //       <div className="flex items-center">
    //         <div className="text-left space-y-4">
    //           {/* <h1 className="text-4xl font-semibold">
    //             Sync and Streamline Your Schedule Effortlessly
    //           </h1> */}
    //           <h1 className="text-4xl font-semibold">
    //             Sync and streamline your schedule effortlessly
    //           </h1>
    //           <p className="font-light text-gray-700 text-xl tracking-wide">
    //             Our integrated calendar syncs with all your calendars,
    //             displaying your dynamic schedule. Say goodbye to overlaps and
    //             tedious planning. Enjoy a well-structured day with ease.
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <img
    //           className="rounded-md"
    //           alt="dashboard"
    //           src="https://images.ctfassets.net/wfutmusr1t3h/1Yf6QdevKh4d2gtcqwrl8D/b19561dbc8d5ff325432b81982c997ae/IDEs.png?w=1280&q=75"
    //         />
    //       </div>
    //     </div>
    //   </section>
    // </>
  );
}

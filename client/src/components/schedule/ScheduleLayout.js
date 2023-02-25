import React, { useRef, useEffect, useState } from "react";

export default function ScheduleLayout() {
  const [timeSlotHeight, setTimeSlotHeight] = useState(0);
  const timeSlotRef = useRef();

  useEffect(() => {
    setTimeSlotHeight(timeSlotRef.current.getBoundingClientRect().height);
  }, []);

  // Create an array of time slots for the calendar
  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    const time = new Date(0, 0, 0, i)
      .toLocaleTimeString([], {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
      })
      .replace(/^0+/, ""); // Remove leading zeros
    timeSlots.push(time);
  }

  return (
    <>
      <div className="bg-white border-2 flex rounded-md">
        <div className="bg-gray-200 border-r-2">
          {timeSlots.map((time, index) => (
            <div
              key={time}
              className="flex items-center py-10 bg-gray-100 px-8"
              ref={index === 0 ? timeSlotRef : undefined}
            >
              <div className="w-full text-center">{time}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
        </div>
      </div>
      {/* <ScheduleDisplay /> */}
    </>
  );
}

import React from "react";
import ScheduleDisplay from "../components/schedule/schedule-display";
import FocusDisplay from "../components/schedule/focus-display";
import ScheduleLayout from "../components/schedule/ScheduleLayout";

export default function SchedulePage() {
  return (
    <>
      <div className="mx-10 my-10">
        <ScheduleDisplay />
      </div>
      {/* <ScheduleLayout /> */}
    </>
  );
}

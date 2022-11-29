import React, { useState, useEffect } from "react";
import TaskStatGraph from "../statistics/TaskStatGraph";
import "tw-elements";

export default function Overview() {
  return (
    <>
      {" "}
      <h1 className="text-3xl font-normal">Overview</h1>
      <TaskStatGraph></TaskStatGraph>
    </>
  );
}

import React from "react";
import TaskDisplay from "../components/tasks/TaskDisplay";
import { Link } from "react-router-dom";

export default function TaskPage() {
  return (
    <>
      {/* <div>
        This is the task page{" "}
        <Link to="/dashboard/schedule">go to schedule page</Link>
      </div> */}
      
      <TaskDisplay />
    </>
  );
}

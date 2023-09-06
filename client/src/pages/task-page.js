import React, {useEffect, useContext} from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import TaskDisplay from "../components/tasks/TaskDisplay";
import { Link } from "react-router-dom";

export default function TaskPage() {

  const history = useNavigate();
  const {loggedIn, getLoggedIn} = useContext(AuthContext)
  useEffect(()=> {

  }, [])

  return (
    <>
      {/* <div>
        This is the task page{" "}
        <Link to="/dashboard/schedule">go to schedule page</Link>
      </div> */}
      <div className="mx-10 my-10">
        <TaskDisplay />
      </div>
    </>
  );
}

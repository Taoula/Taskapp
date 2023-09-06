import React, { useEffect, useContext } from "react";
import ScheduleDisplay from "../components/schedule/schedule-display";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import FocusDisplay from "../components/schedule/focus-display";
import ScheduleLayout from "../components/schedule/ScheduleLayout";

export default function SchedulePage() {

  const history = useNavigate();
  const {loggedIn, getLoggedIn} = useContext(AuthContext)
  useEffect(()=> {

  }, [])
  return (
    <>
      <div className="mx-10 my-10">
        <ScheduleDisplay />
      </div>
      {/* <ScheduleLayout /> */}
    </>
  );
}

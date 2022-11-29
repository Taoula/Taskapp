import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-row h-screen bg-dashboardBackgroundColor">
        <Sidebar />
        <div className="flex-1 overflow-scroll remove-scrollbar">
          <Header />
          <div className="m-5">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-row bg-dashboardBackgroundColor h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="p-2.5 flex-1">
          <Header />
          <div>{<Outlet />}</div>
        </div>
      </div>
    </>
  );
}

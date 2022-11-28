import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Dashboard() {
  return (
    <>
    <div className="p-5 bg-slate-900 h-screen">
      <div className="flex flex-row rounded-md h-full bg-slate-50 p-5 shadow-lg">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div>{<Outlet />}</div>
        </div>
      </div>
      </div>
    </>
  );
}

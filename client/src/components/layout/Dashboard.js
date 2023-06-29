import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-row h-screen bg-white">
        <Sidebar />
        <div className="flex-1 overflow-scroll remove-scrollbar">
          <Header />
          {/* <div className="ml-8 mr-8 mt-5 mb-5">{<Outlet />}</div> */}
          <div className="ml-6 mr-6 mt-6 mb-6">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
}

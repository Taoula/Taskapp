import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/login-form";
import RegisterForm from "./components/auth/register-form";
import TaskPage from "./pages/task-page";
import SchedulePage from "./pages/schedule-page";
import Dashboard from "./components/layout/Dashboard/Dashboard";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import Help from "./components/Help/Help";
import Overview from "./components/Overview/Overview";
import Landing from "./pages/Landing";
import ResetPassword from "./components/auth/ResetPassword";

export default function Router(...restParams) {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page route */}
        <Route exact path="/" element={<Landing />} />

        {/* <Route exact path="/schedule" element={<SchedulePage/>} /> */}
        {/* <Route path="/tasks" element={<TaskPage/>} /> */}

        {/* login & register page routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Dashboard routes */}
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="accountSettings" element={<AccountSettings />} />
          <Route path="help" element={<Help />} />
          <Route path="overview" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

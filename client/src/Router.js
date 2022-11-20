import React from "react"
import  {BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from "./components/auth/login-form"
import RegisterForm from "./components/auth/register-form"
import TaskPage from "./pages/task-page"
import SchedulePage from "./pages/schedule-page"
import HomePage from "./pages/home-page"
import Dashboard from "./components/layout/Dashboard"
import AccountSettings from "./components/AccountSettings/AccountSettings"
import Help from "./components/Help/Help"

export default function Router(...restParams){
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing page route */}
                <Route exact path ="/" element={<HomePage />} />
                
                {/* <Route exact path="/schedule" element={<SchedulePage/>} /> */}
                {/* <Route path="/tasks" element={<TaskPage/>} /> */}

                {/* login & register page routes */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm/>} />

                {/* Dashboard routes */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="tasks" element={<TaskPage />} />
                    <Route path="accountSettings" element={<AccountSettings />} />
                    <Route path="help" element={<Help />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )  
}
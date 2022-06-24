import React from "react"
import  {BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from "./components/auth/login-form"
import RegisterForm from "./components/auth/register-form"
import Navbar from "./components/layout/navbar"
import TaskPage from "./pages/task-page"
import SchedulePage from "./pages/schedule-page"
import HomePage from "./pages/home-page"

function Router(...restParams){
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route exact path ="/" element={<HomePage />} />
                <Route exact path="/schedule" element={<SchedulePage/>} />
                <Route path="/tasks" element={<TaskPage/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm/>} />
            </Routes>
        </BrowserRouter>
    )  
}

export default Router
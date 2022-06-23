import React from "react"
import  {BrowserRouter, Switch, Route } from "react-router-dom"
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/RegisterForm"
import Navbar from "./components/layout/Navbar"
import TaskPage from "./pages/TaskPage"
import SchedulePage from "./pages/SchedulePage"
import HomePage from "./pages/HomePage"

function Router(...restParams){
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path ="/">
                    <HomePage />
                </Route>
                <Route exact path="/schedule">
                    <SchedulePage/>
                </Route>
                <Route path="/tasks">
                    <TaskPage/>
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/register">
                    <RegisterForm/>
                </Route>
            </Switch>
        </BrowserRouter>
    )  
}

export default Router
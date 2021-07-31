import React from "react"
import  {BrowserRouter, Switch, Route } from "react-router-dom"
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/RegisterForm"
import Navbar from "./components/layout/Navbar"
import TaskPage from "./pages/TaskPage"
import SchedulePage from "./pages/SchedulePage"

function Router(...restParams){
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <SchedulePage/>
                </Route>
                <Route path="/tasks">
                    <TaskPage/>
                </Route>
                <Route path="/login">
                    <h1>Login</h1>
                    <LoginForm />
                </Route>
                <Route path="/register">
                    <h1>Register</h1>
                    <RegisterForm/>
                </Route>
            </Switch>
        </BrowserRouter>
    )  
}

export default Router
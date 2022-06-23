import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/AuthContext"
import styled from "styled-components"
import StylizedInput from "../forms/StylizedInput"
import StylizedForm from "../forms/StylizedForm"
import StylizedButton from "../forms/StylizedButton"
import StylizedHeading from "../generic/StylizedHeading"

function RegisterForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()
    
    async function registerUser(e) {
        try {
            e.preventDefault()
            const userData = {
                email, password, passwordVerify
            }

            const schedule = []
            
            await axios.post("http://localhost:8282/auth/", userData, {})
            await axios.post("http://localhost:8282/schedule/", {schedule, start: null, end: null}, {})
            getLoggedIn()
            history.push("/schedule")
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <StylizedHeading>Register for TaskApp</StylizedHeading>
            <StylizedForm onSubmit={(e) => registerUser(e)}>
                <StylizedInput 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}} 
                />

                <StylizedInput 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />

                <StylizedInput 
                    type="password" 
                    placeholder="re-enter password"
                    value={passwordVerify}
                    onChange={(e) => {setPasswordVerify(e.target.value)}}
                />

                <StylizedButton input={true} type="submit" value="register"></StylizedButton>
            </StylizedForm>
        </div>
    )
}

export default RegisterForm
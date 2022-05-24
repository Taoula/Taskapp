import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/AuthContext"
import styled from "styled-components"

const StylizedForm = styled.form`
    width:30%;
    margin:auto;
`

const StylizedInput = styled.input` 
    width:100%;
    padding: 1em;
    margin:0px 0px 0.5rem 0px;
`

const StylizedButton = styled.input`
    background-color: rgb(48, 128, 242);
    border: none;
    border-radius: 10px;
    display:block;
    margin:auto;
    padding:1em 5em 1em 5em;
    color:white;
`

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
            
            await axios.post("http://localhost:5000/auth/", userData, {})
            await axios.post("http://localhost:5000/schedule/", {schedule, start: null, end: null}, {})
            getLoggedIn()
            history.push("/")
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <StylizedForm onSubmit={(e) => registerUser(e)}>
                <StylizedInput 
                    type="email" 
                    placeholder="email" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                ></StylizedInput>

                <StylizedInput 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                ></StylizedInput>

                <StylizedInput 
                    type="password" 
                    placeholder="re-enter password"
                    value={passwordVerify}
                    onChange={(e) => {setPasswordVerify(e.target.value)}}
                ></StylizedInput>

                <StylizedButton type="submit" value="register"></StylizedButton>
            </StylizedForm>
        </div>
    )
}

export default RegisterForm
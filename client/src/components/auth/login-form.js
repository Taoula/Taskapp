import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/auth-context"
import StylizedInput from "../forms/stylized-input"
import StylizedForm from "../forms/stylized-form"
import StylizedButton from "../forms/stylized-button"
import StylizedHeading from "../generic/stylized-heading"

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {getLoggedIn} = useContext(AuthContext)

    const history = useNavigate()

    async function loginUser(e) {
        try {
            e.preventDefault()
            const userData = {
                email, password
            }
        
            await axios.post("http://localhost:8282/auth/login", userData, {})
            getLoggedIn()
            history("/schedule")
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <StylizedHeading>Login To TaskApp</StylizedHeading>
            <StylizedForm onSubmit={(e) => loginUser(e)}>
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

                <StylizedButton input = {true} type="submit" value="submit"></StylizedButton>
            </StylizedForm>
        </div>
    )
}

export default LoginForm
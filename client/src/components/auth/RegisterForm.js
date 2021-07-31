import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/AuthContext"

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
            await axios.post("http://localhost:5000/schedule/", {schedule}, {})
            getLoggedIn()
            history.push("/")
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <form onSubmit={(e) => registerUser(e)}>
                <input 
                    type="email" 
                    placeholder="email" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                ></input>

                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                ></input>

                <input 
                    type="password" 
                    placeholder="re-enter password"
                    value={passwordVerify}
                    onChange={(e) => {setPasswordVerify(e.target.value)}}
                ></input>

                <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}

export default RegisterForm
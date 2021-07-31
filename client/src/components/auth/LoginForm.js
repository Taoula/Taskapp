import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/AuthContext"

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {getLoggedIn} = useContext(AuthContext)

    const history = useHistory()

    async function loginUser(e) {
        try {
            e.preventDefault()
            const userData = {
                email, password
            }
        
            await axios.post("http://localhost:5000/auth/login", userData, {})
            getLoggedIn()
            history.push("/")
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <form onSubmit={(e) => loginUser(e)}>
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

                <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}

export default LoginForm
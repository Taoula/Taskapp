import React, { useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import AuthContext from "../../context/auth-context"

export default function LogoutBtn() {
    const { getLoggedIn } = useContext(AuthContext)
    const history = useNavigate()

    async function logOut(){
        await axios.get("http://localhost:8282/auth/logout")
        getLoggedIn()
        history("/")
    }

    // return <a class="flex-shrink-0 pl-4 text-gray-900 hover:underline" onClick={logOut}>Log Out</a>
    return <a onClick={logOut}>Log Out</a>
}
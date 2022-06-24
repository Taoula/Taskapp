import React, { useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import AuthContext from "../../context/auth-context"

function LogoutBtn() {
    const { getLoggedIn } = useContext(AuthContext)
    const history = useNavigate()

    async function logOut(){
        await axios.get("http://localhost:8282/auth/logout")
        getLoggedIn()
        history("/")
    }

    return <button onClick={logOut}>
                Log Out
            </button>
}

export default LogoutBtn
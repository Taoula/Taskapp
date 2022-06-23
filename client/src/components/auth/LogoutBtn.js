import React, { useContext} from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import AuthContext from "../../context/AuthContext"

function LogoutBtn() {
    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()

    async function logOut(){
        await axios.get("http://localhost:8282/auth/logout")
        getLoggedIn()
        history.push("/")
    }

    return <button onClick={logOut}>
                Log Out
            </button>
}

export default LogoutBtn
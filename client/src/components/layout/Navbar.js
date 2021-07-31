import React, { useContext } from "react"
import styled from 'styled-components'
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import LogoutBtn from "../auth/LogoutBtn"

const NavContainer = styled.div`
    width:100%;
    background-color:#4a4a4a;
    display:flex;
    flex-direction:row;
`
const NavLink = styled(Link)`
    text-decoration:none;
    padding:.5em 0;
`

const NavItem = styled.h3`
    color: white;
    margin: 0 1em;
    text-decoration:none;
`

function Navbar(){
    const {loggedIn} = useContext(AuthContext)

    return(
        <NavContainer>
            <NavLink to="/"><NavItem>Schedule</NavItem></NavLink>
            { loggedIn === false && <NavLink to="/login"><NavItem>Login</NavItem></NavLink>}
            { loggedIn === false && <NavLink to="/register"><NavItem>Register</NavItem></NavLink>}
            { loggedIn === true && (<NavLink to="/tasks"><NavItem>Tasks</NavItem></NavLink>)}
            { loggedIn === true && <LogoutBtn/>}
        </NavContainer>
    )
}

export default Navbar
// import React, { useContext } from "react"
// import styled from 'styled-components'
// import {Link} from "react-router-dom"
// import AuthContext from "../../context/auth-context"
// import LogoutBtn from "../auth/logout-button"

// const NavContainer = styled.div`
//     width:100%;
//     background-color:#6c584c;
//     display:flex;
//     flex-direction:row;
// `
// const NavLink = styled(Link)`
//     text-decoration:none;
//     padding:.5em 0;
// `

// const NavItem = styled.h3`
//     color: white;
//     margin: 0 1em;
//     text-decoration:none;
// `

// function Navbar(){
//     const {loggedIn} = useContext(AuthContext)

//     return(
//         <NavContainer>
//             { loggedIn === true && <NavLink to="/schedule"><NavItem>Schedule</NavItem></NavLink>}
//             { loggedIn === false && <NavLink to="/login"><NavItem>Login</NavItem></NavLink>}
//             { loggedIn === false && <NavLink to="/register"><NavItem>Register</NavItem></NavLink>}
//             { loggedIn === true && (<NavLink to="/tasks"><NavItem>Tasks</NavItem></NavLink>)}
//             { loggedIn === true && <LogoutBtn/>}
//         </NavContainer>
//     )
// }

// export default Navbar

import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import LogoutBtn from "../auth/logout-button";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header class="shadow-sm">
      <div class="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
        <div class="flex items-center space-x-4">
          <a
            href="/"
            className="text-indigo-600 font-semibold text-lg"
            id="title"
          >
            Task App
          </a>
        </div>

        <div class="items-center space-x-4 lg:flex">
          <button
            type="button"
            class="flex items-center transition rounded-lg group shrink-0"
          >
            <img
              class="object-cover w-8 h-8 rounded-full"
              src="https://www.hyperui.dev/photos/man-4.jpeg"
              alt="Simon Lewis"
            />

            <p class="hidden ml-2 text-xs text-left sm:block">
              <strong class="block font-medium">John Doe</strong>

              <span class="text-gray-500"> johndoe@fakemail.com </span>
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="hidden w-5 h-5 ml-4 text-gray-500 transition sm:block group-hover:text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="border-t border-gray-100">
        <nav class="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
            {loggedIn == true && <a class="flex-shrink-0 pl-4 text-gray-900 hover:underline" href="/schedule">Schedule</a>}
            {loggedIn == false && <a class="flex-shrink-0 pl-4 text-gray-900 hover:underline" href="/login">Log In</a>}
            {loggedIn == false && <a class="flex-shrink-0 pl-4 text-gray-900 hover:underline" href="/register">Sign Up</a>}
            {loggedIn == true && <a class="flex-shrink-0 pl-4 text-gray-900 hover:underline" href="/tasks">Tasks</a>}
            {loggedIn == true && <LogoutBtn />}
        </nav>
      </div>
    </header>
  );
}

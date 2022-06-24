// import React, { useState, useContext } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import AuthContext from "../../context/auth-context"
// import StylizedInput from "../forms/stylized-input"
// import StylizedForm from "../forms/stylized-form"
// import StylizedButton from "../forms/stylized-button"
// import StylizedHeading from "../generic/stylized-heading"

// export default function LoginForm(){
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const {getLoggedIn} = useContext(AuthContext)

//     const history = useNavigate()

//     async function loginUser(e) {
//         try {
//             e.preventDefault()
//             const userData = {
//                 email, password
//             }
        
//             await axios.post("http://localhost:8282/auth/login", userData, {})
//             getLoggedIn()
//             history("/schedule")
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return(
//         <div>
//             <StylizedHeading>Login To TaskApp</StylizedHeading>
//             <StylizedForm onSubmit={(e) => loginUser(e)}>
//                 <StylizedInput 
//                     type="email" 
//                     placeholder="email" 
//                     value={email}
//                     onChange={(e) => {setEmail(e.target.value)}}
//                 ></StylizedInput>

//                 <StylizedInput 
//                     type="password" 
//                     placeholder="password"
//                     value={password}
//                     onChange={(e) => {setPassword(e.target.value)}}
//                 ></StylizedInput>

//                 <StylizedButton input = {true} type="submit" value="submit"></StylizedButton>
//             </StylizedForm>
//         </div>
//     )
// }

import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AuthContext from "../../context/auth-context"

export default function LoginForm() {

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
        
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl" id="title">Task App</h1>

                <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Planning your day, made easy.</p>

                <div className="shadow-2xl rounded-lg">
                    <form action="" className="p-10 mt-6 mb-0 space-y-4 rounded-t-lg" onSubmit={(e) => loginUser(e)}>
                        <p className="text-2xl font-light text-center pb-10">Log in to your account</p>

                        <div className="pb-2">
                            <label htmlFor="email" className="text-sm font-medium">Email address</label>

                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-gray-400" fill="none" viewBox="0 0 25 25" stroke-width="1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" id="email" className="w-full pl-11 p-4 pr-12 text-sm border-gray-200 rounded-lg border-2 border-gray-200" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </div>
                        </div>

                        <div className="pb-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>

                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-gray-400" fill="none" viewBox="0 0 25 25" stroke-width="1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </span>

                                <input type="password" id="password" className="w-full pl-11 p-4 pr-12 text-sm border-gray-200 rounded-lg border-2 border-gray-200" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </div>
                        </div>

                        <button type="submit" input={+true} value="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"><span className="text-xl font-light">Log In</span></button>
                    </form>
                    <div className="p-6 bg-gray-100 rounded-b-lg border-t-2 border-gray-200">
                        <p className="text-md text-light text-center text-gray-500">New to Task App? <a className="underline text-indigo-600" href="">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
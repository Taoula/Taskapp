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

                <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl" onSubmit={(e) => loginUser(e)}>
                    <p className="text-lg font-medium">Log into your accout</p>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium">Email</label>

                        <div className="relative mt-1">
                            <input type="email" id="email" className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium">Password</label>

                        <div className="relative mt-1">
                            <input type="password" id="password" className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm" placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                    </div>

                    <button type="submit" input={+true} value="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">Sign in</button>

                    <p className="text-sm text-center text-gray-500">No Account? <a className="underline" href="">Sign Up</a></p>
                </form>
            </div>
        </div>
    )
}
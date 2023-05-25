import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeClosed, Envelope, Lock } from "phosphor-react";
import BreakpointLabel from "../BreakpointLabel";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const history = useNavigate();

  async function loginUser(e) {
    try {
      e.preventDefault();

      const userData = {
        email,
        password,
      };

      await axios.post("http://localhost:8282/auth/login", userData, {});
      getLoggedIn();
      history("/dashboard/overview");
    } catch (err) {
      console.error(err);
    }
  }

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // const [usernameValue, setUsernameValue] = useState("");
  // const [passwordValue, setPasswordValue] = useState("");
  // const [isUsernameValid, setIsUsernameValid] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(false);

  // const handleUsernameChange = (e) => {
  //   const value = e.target.value;
  //   setUsernameValue(value);
  //   setIsUsernameValid(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value));
  // };

  // const handlePasswordChange = (e) => {
  //   const value = e.target.value;
  //   setPasswordValue(value);
  //   setIsPasswordValid(value.length >= 6);
  // };

  // const usernameClasses = `border-2 rounded-md p-2 focus:outline-none ${
  //   isUsernameValid
  //     ? "border-green-500"
  //     : usernameValue
  //     ? "border-red-500"
  //     : "border-gray-500"
  // }`;

  // const passwordClasses = `border-2 rounded-md p-2 focus:outline-none ${
  //   isPasswordValid
  //     ? "border-green-500"
  //     : passwordValue
  //     ? "border-red-500"
  //     : "border-gray-500"
  // }`;

  return (
    <>
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 my-auto">
          <div className="max-w-md mx-auto">
            <a href="/" className="text-xl font-semibold italic text-blue-600">
              Velocity
            </a>
            <h1 className="text-3xl text-gray-800 font-semibold pt-10">
              Log in to your account
            </h1>

            {/* login with google button */}
            <div className="flex flex-row gap-4 py-8">
              <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                <FcGoogle size={25} />
                <p className="text-gray-700 font-semibold text-sm">Google</p>
              </span>

              {/* login with apple button */}
              <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                <FaApple size={25} />
                <p className="text-gray-700 font-semibold text-sm">Apple</p>
              </span>
            </div>

            {/* divider */}
            <div className="flex items-center w-full">
              <hr className="w-full text-gray-300" />
              <p className="px-4 text-gray-300 font-light">or</p>
              <hr className="w-full text-gray-300" />
            </div>

            <form className="pt-8" onSubmit={(e) => loginUser(e)}>
              {/*  */}
              <div className="relative rounded-md">
                <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                  <Envelope size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
                />
              </div>
              <div>
                <div className="relative rounded-md mt-4">
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {passwordShown ? (
                      <EyeClosed
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    )}
                  </div>
                </div>
                <span className="flex pt-4 justify-end">
                  <p class="tracking-wide text-blue-500 text-sm hover:text-blue-600 hover:underline">
                    Forgot password?
                  </p>
                </span>
              </div>
              <button
                type="submit"
                input={+true}
                value="submit"
                className="mt-8 mb-10 text-sm font-normal bg-blue-600 w-full text-white py-3.5 rounded-md hover:bg-blue-700 duration-75 tracking-wider"
              >
                Log in
              </button>
              <p className="text-gray-700 text-sm text-center">
                Don't have an account?{" "}
                <a
                  className="text-blue-500 hover:text-blue-600 hover:underline"
                  onClick={() => history("/register")}
                >
                  Sign up now
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 hidden lg:block">
          <div className="bg-stone-200 flex h-full items-center">
            <img
              alt="drawing"
              src="https://i.imgur.com/s4HIX7A.png"
              className="object-cover scale-75 mx-auto"
            />
          </div>
        </div>
      </div>
    </>
    // <>
    //   <form>
    //     <div className="mb-4">
    //       <label htmlFor="username">Username:</label>
    //       <input
    //         id="username"
    //         type="text"
    //         value={usernameValue}
    //         onChange={handleUsernameChange}
    //         className={usernameClasses}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         id="password"
    //         type="password"
    //         value={passwordValue}
    //         onChange={handlePasswordChange}
    //         className={passwordClasses}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    //       disabled={!isUsernameValid || !isPasswordValid}
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </>
  );
}

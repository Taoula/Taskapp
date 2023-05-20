import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import Navbar from "../layout/Navbar";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeClosed } from "phosphor-react";
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
        <div>
          <a href="/" className="text-lg p-5 absolute font-semibold italic">
            Velocity
          </a>
        </div>
        <div className="w-full lg:w-1/2 my-auto">
          <div className="max-w-md mx-auto">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl text-gray-800">Log in</h1>
                <p className="text-gray-600 font-light text-sm">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* login with google button */}
              <div className="space-y-3">
                <span className="flex items-center bg-white w-full justify-center py-2 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                  <FcGoogle size={25} />
                  <p className="text-gray-600 text-sm">Log in with Google</p>
                </span>

                {/* login with apple button */}
                <span className="flex items-center bg-white w-full justify-center py-2 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                  <FaApple size={25} />
                  <p className="text-gray-600 text-sm">Log in with Apple</p>
                </span>
              </div>

              {/* divider */}
              <div className="flex items-center w-full">
                <hr className="w-full text-gray-300" />
                <p className="px-4 text-gray-300 font-light">or</p>
                <hr className="w-full text-gray-300" />
              </div>

              <form className="space-y-8" onSubmit={(e) => loginUser(e)}>
                <div>
                  <p
                    htmlFor="email"
                    class="tracking-wide text-gray-700 text-sm pb-3"
                  >
                    Email address
                  </p>
                  <input
                    className="w-full bg-white py-3 px-4 rounded-md border border-gray-200 focus:outline-none focus:bg-white"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <span className="flex pb-3 justify-between">
                    <p
                      htmlFor="password"
                      class="tracking-wide text-gray-700 text-sm"
                    >
                      Password
                    </p>
                    <p class="tracking-wide text-blue-500 text-sm hover:text-blue-600 hover:underline">
                      Forgot password?
                    </p>
                  </span>
                  <div className="relative flex items-center">
                    <input
                      className="w-full bg-white py-3 px-4 rounded-md border border-gray-200 focus:outline-none focus:bg-white"
                      placeholder="placeholder"
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span className="z-10 absolute right-0 pr-3">
                      {passwordShown ? (
                        <EyeClosed
                          size={22}
                          className="text-gray-500"
                          onClick={togglePassword}
                          type="button"
                        />
                      ) : (
                        <Eye
                          size={22}
                          className="text-gray-500"
                          onClick={togglePassword}
                          type="button"
                        />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  input={+true}
                  value="submit"
                  className="font-light text-sm bg-blue-500 w-full text-white py-3 rounded-md hover:bg-blue-600 duration-75"
                >
                  Login
                </button>
                <p className="text-gray-700 text-sm">
                  Not a member?{" "}
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
        </div>

        {/* Right Section */}
        <div className="w-1/2 relative bg-gradient-to-b from-indigo-100 via-violet-100 to-orange-100 pl-20 space-y-16 overflow-hidden pt-24 hidden lg:block">
          <div className="space-y-2 pl-3">
            <p className="text-2xl text-gray-600 font-semibold">
              "The secret of getting ahead is getting started."
            </p>
            <p className="text-lg text-gray-500 font-medium">
              &#8213; Mark Twain
            </p>
          </div>
          <img
            // src="https://i.imgur.com/OhtT384.png"
            src="https://i.imgur.com/YCI0cMJ.png"
            alt="Screen"
            className="absolute object-cover w-full h-full"
            style={{ objectPosition: "bottom left" }}
          />
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

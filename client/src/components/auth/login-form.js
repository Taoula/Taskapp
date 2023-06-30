import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {
  Eye,
  EyeClosed,
  Envelope,
  Lock,
  Circle,
  CheckCircle,
  X,
} from "phosphor-react";
import BreakpointLabel from "../BreakpointLabel";

export default function LoginForm() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  // email
  const [email, setEmail] = useState("");
  const [emailTypingStarted, setEmailTypingStarted] = useState(false);

  // password
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  // email regex
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // axios errors
  const [error, setError] = useState("");

  // handles login
  async function loginUser(e) {
    try {
      e.preventDefault();

      if (isLoginDisabled()) {
        return;
      }

      const userData = {
        email,
        password,
      };

      await axios.post("http://localhost:8282/auth/login", userData, {});
      getLoggedIn();
      history("/dashboard/overview");
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status === 401) {
          // error message for 401
          setError("Incorrect email or password!");
          console.error(err.response.data)
        } else if (err.response.status === 500) {
          // internal server error
          setError("Server error, please try again later!");
        } else {
          // generic error
          setError("Error occured, please try again later!");
        }
      }
    }
  }

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // is login disabled
  const isLoginDisabled = () => {
    return !isEmailValid(email) || isPasswordEmpty;
  };

  // Clear error message
  const clearError = () => {
    setError("");
  };

  return (
    <>
      <div className="flex h-screen bg-lightGrid1 bg-cover">
        <div className="w-full my-auto">
          <div className="max-w-xl px-16 sm:px-20 py-14 mx-8 sm:mx-auto border border-gray-200 shadow-2xl rounded-lg bg-white">
            <a href="/" className="text-xl font-semibold italic text-slate-900">
              Velocity
            </a>
            <h1 className="text-3xl text-gray-800 font-semibold pt-10">
              Log in to your account
            </h1>

            {/* login with google button */}
            <div className="flex flex-row gap-4 py-8">
              <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
                <FcGoogle size={25} />
                <p className="text-gray-700 font-semibold text-sm">Google</p>
              </span>

              {/* login with apple button */}
              <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
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
              {/* Error message */}
              {error && (
                <div
                  className={`mb-4 inline-flex w-full items-center justify-between ${
                    error.includes("401")
                      ? "bg-yellow-200 bg-opacity-60 border border-yellow-600 text-yellow-700 px-4 py-3 rounded-md font-light"
                      : "bg-red-200 text-red-600 font-light px-4 py-3 rounded-md bg-opacity-60 border border-red-600"
                  }`}
                >
                  <p>{error}</p>
                  <X size={15} onClick={clearError} />
                </div>
              )}

              <div className="relative rounded-md">
                <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                  <Envelope size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTypingStarted(true);
                  }}
                  id="email"
                  className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
                />
              </div>

              {/* email validation */}
              {emailTypingStarted && (
                <ul className="mt-4 list-none list-inside">
                  <li
                    className={`text-sm flex items-center ${
                      isEmailValid(email) ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isEmailValid(email) ? (
                      <CheckCircle
                        size={16}
                        weight="bold"
                        color="#34D399"
                        className="mr-2"
                      />
                    ) : (
                      <Circle
                        size={16}
                        weight="bold"
                        className="mr-2 text-red-400"
                      />
                    )}
                    Email must be a valid format
                  </li>
                </ul>
              )}

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
                      setIsPasswordEmpty(e.target.value === "");
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

                {/* forgot password link */}
                <span className="flex pt-4 justify-end">
                  <p
                    onClick={() => history("/resetpassword")}
                    className="tracking-wide text-blue-500 text-sm hover:text-blue-600 cursor-pointer hover:underline"
                  >
                    Forgot password?
                  </p>
                </span>
              </div>

              {/* login button */}
              <button
                type="submit"
                disabled={isLoginDisabled()}
                input={+true}
                value="submit"
                className={`${
                  isLoginDisabled()
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white"
                } mt-8 mb-10 text-sm font-medium w-full py-3.5 rounded-md tracking-wide`}
              >
                Log in
              </button>

              {/* Sign up link */}
              <p className="text-gray-700 text-sm text-center">
                Don't have an account?{" "}
                <a
                  className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                  onClick={() => history("/register")}
                >
                  Sign up now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";

export default function RegisterForm() {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function registerUser(e) {
    try {
      e.preventDefault();

      const userData = {
        fName,
        lName,
        userRole,
        email,
        password,
        passwordVerify,
      };

      const schedule = [];

      await axios.post("http://localhost:8282/auth/", userData, {});
      await axios.post(
        "http://localhost:8282/schedule/",
        { schedule, start: null, end: null },
        {}
      );
      getLoggedIn();
      history("/schedule");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {/* navbar */}
      <nav className="flex items-center justify-between max-w-3xl p-4 mx-auto">
        {/* logo */}
        <a
          className="inline-flex items-center justify-center rounded-lg text-indigo-600 font-semibold"
          id="title"
          href="/"
        >
          Task App
        </a>

        {/* login button */}
        <ul className="flex items-center space-x-2 font-light text-gray-500">
          <li>
            <p className="inline-flex items-center text-xs px-3 py-2 rounded-lg">
              Already have an account?
            </p>
            <button
              className="inline-flex px-2 py-1 text-xs font-xs text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
              onClick={() => history("/login")}
            >
              Log in
            </button>
          </li>
        </ul>
      </nav>

      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {/* header */}
          <p className="max-w-xs mx-auto text-center text-gray-500 text-2xl font-light">
            Sign up and experience Task App today
          </p>

          {/* form */}
          <form
            action=""
            className="p-10 mt-6 mb-0 space-y-4 rounded-t-lg shadow-2xl rounded-lg"
            onSubmit={(e) => registerUser(e)}
          >
            {/* first name */}
            <div className="pb-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First name <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  placeholder="First name"
                  value={fName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* last name */}
            <div className="pb-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  placeholder="Last name"
                  value={lName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* role */}
            <div className="pb-2">
              <label htmlFor="userRole" className="text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <select
                  id="userRole"
                  className="w-full p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  value={userRole}
                  onChange={(e) => {
                    setUserRole(e.target.value);
                  }}
                >
                  <option defaultValue>Your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager">Manager</option>
                  <option value="business owner">Business Owner</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
            </div>

            {/* email */}
            <div className="pb-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-400"
                    fill="none"
                    viewBox="0 0 25 25"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  id="email"
                  className="w-full pl-11 p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* password */}
            <div className="pb-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-400"
                    fill="none"
                    viewBox="0 0 25 25"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  id="password"
                  className="w-full pl-11 p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* confirm password */}
            <div className="pb-2">
              <label htmlFor="password" className="text-sm font-medium">
                Confirm password <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-400"
                    fill="none"
                    viewBox="0 0 25 25"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  id="password"
                  className="w-full pl-11 p-4 pr-12 text-sm rounded-lg border-2 border-gray-200"
                  placeholder="Confirm password"
                  value={passwordVerify}
                  onChange={(e) => {
                    setPasswordVerify(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* create account button */}
            <button
              type="submit"
              input={+true}
              value="register"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              <span className="text-xl font-light">Create Account</span>
            </button>

            <p className="text-xs font-light">
              Signing up signifies that you have read and agree to the{" "}
              <a className="underline text-indigo-600" href="">
                Terms of Service
              </a>{" "}
              and our{" "}
              <a className="underline text-indigo-600" href="">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>

      {/* copyright footer */}
      <div className="text-center pb-5">
        <span className="text-light text-xs">© 2022 Copyright Task App</span>
      </div>
    </div>
  );
}

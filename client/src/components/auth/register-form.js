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

      await axios.post("http://localhost:8282/userStat/", {});
      getLoggedIn();
      history("/dashboard/schedule");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <nav className="max-w-screen-2xl flex items-center pt-6 px-6 xl:px-4 justify-between mx-auto fixed-top">
        <a href="/" className="text-gray-900">
          <h1 className="text-2xl font-semibold">Jigsaw</h1>
        </a>
        <div className="space-x-5 text-md lg:text-xl">
          <p className="text-gray-500">
            Already have an account?{" "}
            <span
              className="underline hover:text-gray-900 text-green-500"
              onClick={() => history("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </nav>

      <div className="h-screen items-center flex">
        <div className="max-w-md md:max-w-xl grid grid-cols-1 mx-auto">
        <h1 className="mb-16 text-center text-5xl"><span className="highlight">Register</span></h1>
          <form
            action=""
            className="space-y-4 md:space-y-5 text-gray-900"
            onSubmit={(e) => registerUser(e)}
          >
            <div className="flex flex-row space-x-4 md:space-x-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-xl font-normal text-gray-900"
                >
                  First name
                </label>

                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-md font-sans border border-gray-900 font-light bg-white py-3 px-4 text-lg"
                    value={fName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-xl font-normal text-gray-900"
                >
                  Last name
                </label>

                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-md font-sans border border-gray-900 font-light bg-white py-3 px-4 text-lg"
                    value={lName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="userRole"
                className="text-xl font-normal text-gray-900"
              >
                Role
              </label>

              <div className="mt-1">
                <select
                  id="userRole"
                  className="w-full rounded-md border border-gray-900 font-sans font-light bg-white py-3 px-4 text-lg"
                  value={userRole}
                  onChange={(e) => {
                    setUserRole(e.target.value);
                  }}
                >
                  <option defaultValue>Your role</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Manager">Manager</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xl font-normal text-gray-900"
              >
                Email
              </label>

              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border font-sans border-gray-900 font-light bg-white py-3 px-4 text-lg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xl font-normal text-gray-900"
              >
                Password
              </label>

              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-md border border-gray-900 font-light bg-white py-3 px-4 text-lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="password"
                className="text-xl font-normal text-gray-900"
              >
                Confirm password
              </label>

              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-md border border-gray-900 font-light bg-white py-3 px-4 text-lg"
                  value={passwordVerify}
                  onChange={(e) => {
                    setPasswordVerify(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              input={+true}
              value="register"
              className="block w-full rounded-md bg-gray-900 hover:bg-gray-700 py-4 text-xl font-sans font-normal text-white custom-box-shadow"
            >
              Create my account
            </button>
          </form>
        </div>
      </div>
      {/* <div className="bg-gray-900">
        <nav className="max-w-4xl flex items-center mx-auto p-3 xs:px-4 xs:pt-3 sm:p-4 justify-between fixed-top">
          <a href="/" className="inline-flex items-center space-x-3 text-white">
            <img alt="logo" src="https://flowbite.com/docs/images/logo.svg" />
            <span className="font-lora italic font-semibold hidden xs:block">
              Task App
            </span>
          </a>
          <div className="space-x-4 md:space-x-5 font-light text-sm">
            <p className="text-center text-xs pt-2 font-light text-gray-400">
              Already have an account?{" "}
              <button
                className="underline hover:text-white text-indigo-500"
                onClick={() => history("/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </nav>

        <div className="min-h-screen flex items-center">
          <div className="mx-auto p-8 max-w-sm w-full flex flex-col">
            <form
              action=""
              className="space-y-4 text-white"
              onSubmit={(e) => registerUser(e)}
            >
              <div className="flex flex-row space-x-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-light text-white"
                  >
                    First name
                  </label>

                  <div className="mt-1">
                    <input
                      type="text"
                      className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                      value={fName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-light text-white"
                  >
                    Last name
                  </label>

                  <div className="mt-1">
                    <input
                      type="text"
                      className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                      value={lName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="userRole"
                  className="text-sm font-light text-white"
                >
                  Role
                </label>

                <div className="mt-1">
                  <select
                    id="userRole"
                    className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                    value={userRole}
                    onChange={(e) => {
                      setUserRole(e.target.value);
                    }}
                  >
                    <option defaultValue>Your role</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Manager">Manager</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-light text-white"
                >
                  Email
                </label>

                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-light text-white"
                >
                  Password
                </label>

                <div className="mt-1">
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="pb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-light text-white"
                >
                  Confirm password
                </label>

                <div className="mt-1">
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                    value={passwordVerify}
                    onChange={(e) => {
                      setPasswordVerify(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                input={+true}
                value="register"
                className="block w-full rounded-sm bg-indigo-500 hover:bg-indigo-600 py-3 text-sm font-light text-white"
              >
                Create My Account
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
}

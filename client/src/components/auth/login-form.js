import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import Navbar from "../layout/Navbar";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

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

  return (
    <>
      <nav className="max-w-screen-2xl flex items-center pt-6 justify-left mx-auto fixed-top">
        <a href="/" className="text-gray-900">
          <h1 className="text-2xl font-semibold">Jigsaw</h1>
        </a>
      </nav>

      <div className="h-screen items-center flex">
        <div className="max-w-md grid grid-cols-1 mx-auto w-full">
          <h1 className="mb-16 text-center text-5xl">
            <span className="highlight">Log in</span>
          </h1>
          <form
            action=""
            className="space-y-5 text-gray-900"
            onSubmit={(e) => loginUser(e)}
          >
            <div>
              <label htmlFor="email" className="text-xl font-normal text-gray-900">
                Email
              </label>

              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-900 font-light bg-white font-sans py-3 px-4 text-lg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="pb-2">
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
                  className="w-full rounded-md border border-gray-900 font-light bg-white font-sans py-3 px-4 text-lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              input={+true}
              value="submit"
              className="block w-full text-center rounded-md bg-gray-900 hover:bg-gray-700 py-4 text-xl font-sans font-normal text-white custom-box-shadow"
            >
              Sign in
            </button>
            <p className="text-center text-xl pt-5 font-normal text-gray-500">
              Don't have an account?{" "}
              <span
                className="underline hover:text-gray-900 text-green-500"
                onClick={() => history("/register")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* <div className="bg-gray-900">
        <nav className="transparent w-full max-w-4xl mx-auto fixed-top p-3 xs:px-4 xs:pt-3 sm:p-4">
          <a href="/" className="inline-flex items-center space-x-3 text-white">
            <img alt="logo" src="https://flowbite.com/docs/images/logo.svg" />{" "}
            <span className="font-lora italic font-semibold hidden xs:block">
              Task App
            </span>
          </a>
        </nav>

        <div className="min-h-screen flex items-center">
          <div className="mx-auto p-8 max-w-sm w-full flex flex-col">
            <h1 className="text-center text-4xl font-semibold text-white">
              Welcome back!
            </h1>
            <p className="mt-4 mb-4 text-center text-gray-400 font-lora italic">
              Sign into your account
            </p>
            <form
              action=""
              className="space-y-4 text-white"
              onSubmit={(e) => loginUser(e)}
            >
              <div>
                <label htmlFor="email" className="text-sm font-light text-white">
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

              <div className="pb-2">
                <label htmlFor="password" className="text-sm font-light text-white">
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
              <button
                type="submit"
                input={+true}
                value="submit"
                className="block w-full rounded-sm bg-indigo-500 hover:bg-indigo-600 py-3 text-sm font-light text-white"
              >
                Sign in
              </button>
              <p className="text-center text-xs pt-2 font-light text-gray-400">
                Don't have an account?{" "}
                <button
                  className="underline hover:text-white text-indigo-500"
                  onClick={() => history("/register")}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
}

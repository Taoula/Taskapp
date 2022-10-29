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
      history("/dashboard/schedule");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="bg-gray-900">
        <nav className="transparent w-full max-w-4xl mx-auto fixed-top p-3 xs:px-4 xs:pt-3 sm:p-4">
          <a href="/" className="inline-flex items-center space-x-3 text-white">
            <img alt="logo" src="https://flowbite.com/docs/images/logo.svg" />{" "}
            <span className="font-lora italic font-semibold hidden xs:block">
              Task App
            </span>
          </a>
        </nav>

        <div class="min-h-screen flex items-center">
          <div class="mx-auto p-8 max-w-sm w-full flex flex-col">
            <h1 class="text-center text-4xl font-semibold text-white">
              Welcome back!
            </h1>
            <p class="mt-4 mb-4 text-center text-gray-400 font-lora italic">
              Sign into your account
            </p>
            <form
              action=""
              class="space-y-4 text-white"
              onSubmit={(e) => loginUser(e)}
            >
              <div>
                <label for="email" class="text-sm font-light text-white">
                  Email
                </label>

                <div class="mt-1">
                  <input
                    type="email"
                    id="email"
                    class="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="pb-2">
                <label for="password" class="text-sm font-light text-white">
                  Password
                </label>

                <div class="mt-1">
                  <input
                    type="password"
                    id="password"
                    class="w-full rounded-sm border-gray-400 font-light bg-gray-800 py-3 px-4 text-sm"
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
                class="block w-full rounded-sm bg-indigo-500 hover:bg-indigo-600 py-3 text-sm font-light text-white"
              >
                Sign in
              </button>
              <p class="text-center text-xs pt-2 font-light text-gray-400">
                Don't have an account?{" "}
                <button
                  class="underline hover:text-white text-indigo-500"
                  onClick={() => history("/register")}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
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
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between max-w-4xl p-4 mx-auto transparent text-white">
        {/* logo */}
        <a className="rounded-lg font-semibold" id="title" href="/">
          Task App
        </a>

        {/* login button */}
        <ul className="flex space-x-5">
          <li>
            <p className="text-sm py-2 rounded-lg text-gray-400 font-normal tracking-tight">
              <a
                href=""
                className="hover:text-white"
                onClick={() => history("/login")}
              >
                Sign in
              </a>
            </p>
          </li>
          <li>
            <button
              className="px-3.5 py-1.5 text-sm font-normal tracking-tight text-white bg-indigo-500 border border-indigo-500 rounded-sm hover:bg-indigo-600 hover:border-indigo-600"
              onClick={() => history("/register")}
            >
              Get Started
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

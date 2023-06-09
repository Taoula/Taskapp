import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeClosed } from "phosphor-react";

export default function RegisterForm() {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
        {},
        {} // Two empty brackets necessary TODO ?
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
      {/* <nav className="max-w-screen-2xl flex items-center pt-6 px-6 xl:px-4 justify-between mx-auto fixed-top">
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
              Create account
            </button>
          </form>
        </div>
      </div> */}

      <>
        <div className="flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 relative bg-gradient-to-b from-indigo-100 via-violet-100 to-orange-100 overflow-hidden pt-24 hidden lg:block">
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
              style={{ objectPosition: "bottom right" }}
            />
          </div>

          {/* Right Section */}
          <div>
            <a href="/" className="text-lg p-5 absolute font-semibold italic">
              Velocity
            </a>
          </div>
          <div className="w-full lg:w-1/2 my-auto">
            <div className="max-w-md mx-auto">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="text-3xl text-gray-800">Sign up</h1>
                  <p className="text-gray-600 font-light text-sm">
                    Enter the following information to get started
                  </p>
                </div>

                {/* login with google button */}
                <div className="space-y-3">
                  <span className="flex items-center bg-white w-full justify-center py-2 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                    <FcGoogle size={25} />
                    <p className="text-gray-600 text-sm">Sign up with Google</p>
                  </span>

                  {/* login with apple button */}
                  <span className="flex items-center bg-white w-full justify-center py-2 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                    <FaApple size={25} />
                    <p className="text-gray-600 text-sm">Sign up with Apple</p>
                  </span>
                </div>

                {/* divider */}
                <div className="flex items-center w-full">
                  <hr className="w-full text-gray-300" />
                  <p className="px-4 text-gray-300 font-light">or</p>
                  <hr className="w-full text-gray-300" />
                </div>

                <form className="space-y-8">
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
                    <p
                      htmlFor="password"
                      class="tracking-wide text-gray-700 text-sm pb-3"
                    >
                      Password
                    </p>
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
                    onClick={registerUser}
                    className="font-light text-sm bg-blue-500 w-full text-white py-3 rounded-md hover:bg-blue-600 duration-75"
                  >
                    Sign up
                  </button>
                  <p className="text-gray-700 text-sm">
                    Already have an account?{" "}
                    <a
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                      onClick={() => history("/login")}
                    >
                      Log in now
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

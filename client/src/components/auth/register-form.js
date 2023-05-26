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
  Square,
  CheckCircle,
  Circle,
  CheckSquare,
} from "phosphor-react";

export default function RegisterForm() {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  // first, last, role
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [userRole, setUserRole] = useState("");

  // email
  const [email, setEmail] = useState("");
  const [emailTypingStarted, setEmailTypingStarted] = useState(false);

  // pass
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  // verify pass
  const [passwordVerify, setPasswordVerify] = useState("");
  const [verifyTypingStarted, setVerifyTypingStarted] = useState(false);

  // terms of agreement
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsTermsChecked((prevChecked) => !prevChecked);
  };

  // assword regex
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters length" },
    // { regex: /[0-9]/, text: "At least 1 number (0...9)" },
    // { regex: /[a-z]/, text: "At least 1 lowercase letter (a...z)" },
    // { regex: /[^A-Za-z0-9]/, text: "At least 1 special symbol (!...$)" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter (A...Z)" },
  ];

  const isRequirementMet = (regex) => regex.test(password);

  // checks if verify pass matches
  const isPasswordMatching = (password, passwordVerify) => {
    if (password === "" || passwordVerify === "") {
      return false;
    }
    return password === passwordVerify;
  };

  // checks email regex
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // checks if all requirements are met to enable button
  const isSubmitDisabled = () => {
    return !(
      requirements.every((requirement) =>
        isRequirementMet(requirement.regex, password)
      ) &&
      isPasswordMatching(password, passwordVerify) &&
      isEmailValid(email) &&
      isTermsChecked
    );
  };

  // handles form submission
  async function registerUser(e) {
    try {
      e.preventDefault();

      if (isSubmitDisabled()) {
        return;
      }

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
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 hidden lg:block">
          <div className="bg-stone-200 flex h-full items-center">
            <img
              alt="drawing"
              src="https://i.imgur.com/QDLKdiA.png"
              className="object-cover scale-75 mx-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 my-auto">
          <div className="max-w-md mx-auto">
            <a href="/" className="text-xl font-semibold italic text-blue-600">
              Velocity
            </a>
            <h1 className="text-3xl text-gray-800 font-semibold pt-10">
              Create an account
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

            <form className="pt-8" onSubmit={(e) => registerUser(e)}>
              {/* email */}
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
                    Email must be valid
                  </li>
                </ul>
              )}
              <div>
                {/* password */}
                <div className={`relative rounded-md mt-4`}>
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setTypingStarted(true);
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

                {/* password validation */}
                {typingStarted && (
                  <ul className="mt-4 list-inside list-none space-y-2">
                    {requirements.map((requirement, index) => (
                      <li
                        key={index}
                        className={`text-sm flex items-center ${
                          isRequirementMet(requirement.regex)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {isRequirementMet(requirement.regex) ? (
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
                        {requirement.text}
                      </li>
                    ))}
                  </ul>
                )}

                {/* verify password */}
                <div className="relative rounded-md mt-4">
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Verify password"
                    value={passwordVerify}
                    onChange={(e) => {
                      setPasswordVerify(e.target.value);
                      setVerifyTypingStarted(true);
                    }}
                    id="password"
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />

                  {/* password visibility */}
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

                {/* verify password validation */}
                {verifyTypingStarted && (
                  <ul className="mt-4 list-none list-inside">
                    <li
                      className={`text-sm flex items-center ${
                        isPasswordMatching(password, passwordVerify)
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {isPasswordMatching(password, passwordVerify) ? (
                        <CheckCircle
                          size={16}
                          weight="bold"
                          color="#34D399"
                          className="mr-2 text-red-400"
                        />
                      ) : (
                        <Circle size={16} weight="bold" className="mr-2" />
                      )}
                      Passwords must match
                    </li>
                  </ul>
                )}

                {/* terms of agreement */}
                <span className="flex pt-4 items-center gap-2 justify-end">
                  {isTermsChecked ? (
                    <CheckSquare size={18} onClick={handleCheckboxChange} />
                  ) : (
                    <Square size={18} onClick={handleCheckboxChange} />
                  )}
                  <p class="tracking-wide text-gray-900 text-sm">
                    I agree to the{" "}
                    <a href="/" className="hover:underline text-blue-500">
                      Terms of agreement
                    </a>
                  </p>
                </span>
              </div>

              {/* continue button */}
              <button
                type="submit"
                input={+true}
                disabled={isSubmitDisabled()}
                value="register"
                className={`${
                  isSubmitDisabled()
                    ? "cursor-not-allowed bg-gray-300 text-gray-900"
                    : "bg-blue-600 hover:bg-blue-700 duration-75 text-white"
                } mt-8 mb-10 text-sm font-normal w-full py-3.5 rounded-md tracking-wider `}
              >
                Continue
              </button>

              {/* redirect to login */}
              <p className="text-gray-700 text-sm text-center">
                Have an account?{" "}
                <a
                  className="text-blue-500 hover:text-blue-600 hover:underline"
                  onClick={() => history("/login")}
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* <input
        type="text"
        value={fName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />

      <input
        type="text"
        value={lName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <select
        id="userRole"
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
      </select> */}
    </>
  );
}

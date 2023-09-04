import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import useSettingStore from "../../context/useSettingStore";
import axios from "axios";
import {
  CheckCircle,
  CheckSquare,
  Circle,
  Envelope,
  Eye,
  EyeClosed,
  Lock,
  Square,
} from "phosphor-react";
import Sitemap from "../layout/sitemap";

export default function RegisterForm() {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  // registration steps
  const [step, setStep] = useState(1);

  // plan
  const [plan, setPlan] = useState("default");

  // first name
  const [fName, setFirstName] = useState("");
  const [firstNameTypingStarted, setFirstNameTypingStarted] = useState(false);

  // last name
  const [lName, setLastName] = useState("");
  const [lastNameTypingStarted, setLastNameTypingStarted] = useState(false);

  // user role
  const [userRole, setUserRole] = useState("default");

  // email
  const [email, setEmail] = useState("");
  const [emailTypingStarted, setEmailTypingStarted] = useState(false);

  // pass
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  // verify pass
  const [passwordVerify, setPasswordVerify] = useState("");
  const [verifyPasswordShown, setVerifyPasswordShown] = useState(false);
  const [verifyTypingStarted, setVerifyTypingStarted] = useState(false);

  const isPasswordRegexMet = (regex) => regex.test(password);

  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  // terms of agreement
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsTermsChecked((prevChecked) => !prevChecked);
  };

  // password regex
  const passRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters length" },
    // { regex: /[0-9]/, text: "At least 1 number (0...9)" },
    // { regex: /[a-z]/, text: "At least 1 lowercase letter (a...z)" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special symbol (!...$)" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter (A...Z)" },
  ];

  // checks if verify pass matches
  const isPasswordMatching = (password, passwordVerify) => {
    if (password === "" || passwordVerify === "") {
      return false;
    }
    return password === passwordVerify;
  };

  // email regex
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // first name regex
  const isFirstNameValid = (fName) => {
    const fNameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z\s]{2,}$/;
    return fNameRegex.test(fName);
  };

  // last name regex
  const isLastNameValid = (lName) => {
    const lNameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z\s]{2,}$/;
    return lNameRegex.test(lName);
  };

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleVerifyPassword = () => {
    setVerifyPasswordShown(!verifyPasswordShown);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return plan !== "default";
      case 2:
        return isEmailValid(email);
      case 3:
        return (
          passRequirements.every((requirement) =>
            isPasswordRegexMet(requirement.regex)
          ) && isPasswordMatching(password, passwordVerify)
        );
      case 4:
        return (
          isFirstNameValid(fName) &&
          isLastNameValid(lName) &&
          userRole !== "default"
        );
      default:
        return false;
    }
  };

  // handles form submission
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

      console.log(userData);

      await axios
        .post("http://localhost:8282/auth/", userData, {})
        .then((res) => res.data)
        .then(async (res) => {
          await axios
            .post(
              "http://localhost:8282/schedule/",
              {},
              {} /* Two empty brackets necessary TODO ?*/
            )
            .then((res) => res.data)
            .then(async (res) => {
              await axios
                .post("http://localhost:8282/userStat/", {})
                .then((res) => res.data)
                .then(async (res) => {
                  await axios
                    .post("http://localhost:8282/settings/", {})
                    .then((res) => res.data)
                    .then(async (res) => {
                      getLoggedIn();
                      refreshSettings();
                      history("/dashboard/schedule");
                    });
                });
            });
        });
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <>
      {/* navbar */}
      <nav className="sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-200 backdrop-blur-md bg-white">
        {/* logo */}
        <a href="/" className="text-xl font-semibold italic text-ultramarine">
          Velocity
        </a>
        {/* redirect to login */}
        <p className="text-sm">
          Already have an account?{" "}
          <a
            className="hover:underline cursor-pointer text-ultramarine"
            onClick={() => history("/login")}
          >
            Log in
          </a>
        </p>
      </nav>

      {/* content */}
      <section className="max-w-7xl mx-auto">
        <div className="flex gap-16 mt-20 mb-20">
          <div className="w-3/5">
            <h1 className="text-4xl font-semibold pb-12">Create an account</h1>
            <ol>
              {/* choose a plan */}
              <li className="border-t py-8 text-lg text-gray-400">
                <p>1. Your plan</p>
                {step === 1 && (
                  <>
                    <div className="flex gap-4 pt-4">
                      <select
                        id="plan"
                        value={plan}
                        onChange={(e) => {
                          setPlan(e.target.value);
                        }}
                        className="w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                      >
                        <option value="default" disabled>
                          Choose a plan
                        </option>
                        <option value="monthly">Monthly - $3.00</option>
                        <option value="yearly">
                          Yearly - $30.00 (2 months free!)
                        </option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (isStepValid()) {
                            setStep((prevStep) => prevStep + 1);
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid()
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </li>

              {/* enter email */}
              <li className="border-t py-8 text-lg text-gray-400">
                <p>2. What's your email?</p>
                {step === 2 && (
                  <>
                    {/* email */}
                    <div className="relative rounded-md mt-4">
                      <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                        <Envelope size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your email address"
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
                            isEmailValid(email)
                              ? "text-green-600"
                              : "text-red-500"
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
                          Valid email
                        </li>
                      </ul>
                    )}

                    {/* next button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (isStepValid()) {
                            setStep((prevStep) => prevStep + 1);
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid()
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </li>

              {/* enter password */}
              <li className="border-t py-8 text-lg text-gray-400">
                <p>3. Choose a password</p>
                {step === 3 && (
                  <>
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
                        {passRequirements.map((requirement, index) => (
                          <li
                            key={index}
                            className={`text-sm flex items-center ${
                              isPasswordRegexMet(requirement.regex)
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {isPasswordRegexMet(requirement.regex) ? (
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
                        type={verifyPasswordShown ? "text" : "password"}
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
                        {verifyPasswordShown ? (
                          <EyeClosed
                            size={20}
                            className="text-gray-400"
                            onClick={toggleVerifyPassword}
                            type="button"
                          />
                        ) : (
                          <Eye
                            size={20}
                            className="text-gray-400"
                            onClick={toggleVerifyPassword}
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

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (isStepValid()) {
                            setStep((prevStep) => prevStep + 1);
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid()
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </li>

              {/* personal information */}
              <li className="border-t py-8 text-lg text-gray-400">
                <p>4. Tell us about yourself</p>
                {step === 4 && (
                  <>
                    {/* first name */}
                    <div className="relative rounded-md mt-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={fName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          setFirstNameTypingStarted(true);
                        }}
                        className="block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
                      />
                    </div>

                    {/* first name validation */}
                    {firstNameTypingStarted && (
                      <ul className="mt-4 list-none list-inside">
                        <li
                          className={`text-sm flex items-center ${
                            isFirstNameValid(fName)
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {isFirstNameValid(fName) ? (
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
                          Valid first name
                        </li>
                      </ul>
                    )}

                    {/* last name */}
                    <div className={`relative rounded-md mt-4`}>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setLastNameTypingStarted(true);
                        }}
                        className="block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                      />
                    </div>

                    {/* last name validation */}
                    {lastNameTypingStarted && (
                      <ul className="mt-4 list-none list-inside">
                        <li
                          className={`text-sm flex items-center ${
                            isLastNameValid(lName)
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {isLastNameValid(lName) ? (
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
                          Valid last name
                        </li>
                      </ul>
                    )}

                    {/* user role */}
                    <div className="rounded-md mt-4">
                      <select
                        id="userRole"
                        value={userRole}
                        onChange={(e) => {
                          setUserRole(e.target.value);
                        }}
                        className="w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                      >
                        <option value="default" disabled>
                          What do you do?
                        </option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Manager">Manager</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                      </select>
                    </div>

                    {/* next button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (isStepValid()) {
                            setStep((prevStep) => prevStep + 1);
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid()
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </li>

              {/* TODO - replace inputs with stripe elements */}
              {/* payment details */}
              {/* <li className="border-t py-8 text-lg text-gray-400">
                <p>5. Billing</p>
                <div className="flex mt-4 gap-4">
                  <input
                    placeholder="credit card"
                    className="w-3/5 block rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                  <input
                    placeholder="expiration date"
                    className="block w-1/5 rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                  <input
                    placeholder="security code"
                    className="block w-1/5 rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                </div>
                <input
                  placeholder="cardholder name"
                  className="block mt-4 w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                />
                <div className="flex gap-4">
                  <input
                    placeholder="zip code"
                    className="block mt-4 w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                  <input
                    placeholder="country"
                    className="block mt-4 w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                </div>
              </li> */}
            </ol>
          </div>

          {/* plan summary and submission */}
          <div className="rounded-md border mt-20 w-2/5 px-12 py-10 h-fit">
            <h1 className="text-center text-gray-900 text-3xl pb-10">
              Order summary
            </h1>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-md font-light">
                <p>Plan</p>
                <p>
                  {plan === "monthly"
                    ? "Monthly"
                    : plan === "yearly"
                    ? "Yearly"
                    : ""}
                </p>
              </div>
              <div className="flex items-center justify-between text-md font-light">
                <p>Email</p>
                <p>{email}</p>
              </div>
              <div className="flex items-center justify-between text-md font-light">
                <p>Name</p>
                <p>
                  {fName} {lName}
                </p>
              </div>
              <div className="flex items-center justify-between text-md font-light">
                <p>Role</p>
                <p>{userRole === "default" ? "" : userRole}</p>
              </div>
            </div>
            <p className="text-sm pt-10">Enter a promo code</p>
            <div className="flex gap-4 items-center mt-2">
              <input className="block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm" />
              <button className="bg-ultramarineLightest rounded-md px-4 py-3 text-ultramarine hover:bg-ultramarine hover:text-white duration-100">
                Apply
              </button>
            </div>
            <div className="flex justify-between mb-10 mt-6 border-t pt-4">
              <p className="text-2xl">Total</p>
              <p className="text-2xl">
                {plan === "monthly"
                  ? "$3.00"
                  : plan === "yearly"
                  ? "$30.00"
                  : ""}
              </p>
            </div>
            <div className="flex items-center mb-6 gap-2">
              {isTermsChecked ? (
                <CheckSquare
                  size={18}
                  weight="bold"
                  onClick={handleCheckboxChange}
                  className="text-ultramarine"
                />
              ) : (
                <Square
                  size={18}
                  weight="bold"
                  onClick={handleCheckboxChange}
                />
              )}{" "}
              <p className="tracking-wide text-gray-900 text-sm">
                I agree to Velocity's{" "}
                <a href="/" className="hover:underline text-ultramarine">
                  Terms of Agreement
                </a>{" "}
                &{" "}
                <a href="/" className="hover:underline text-ultramarine">
                  Privacy Policy
                </a>
              </p>
            </div>

            <button
              onClick={(e) => {
                registerUser(e);
              }}
              className="bg-ultramarineLightest w-full py-4 rounded-md text-lg text-ultramarine font-medium mb-6 hover:bg-ultramarine hover:text-white duration-100"
            >
              Create my account
            </button>
            <p className="italic text-xs text-center">
              Renews automatically. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <Sitemap />
    </>
  );
}

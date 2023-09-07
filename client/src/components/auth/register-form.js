import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
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
import useSettingStore from "../../context/useSettingStore";
import Sitemap from "../layout/sitemap";

export default function RegisterForm() {
  const googleAuth = () => {
    console.log("GOOGLEAUTH");
    window.open(`http://localhost:8282/auth/google/callback`, "_self");
  };

  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  const initialFormData = {
    step: 1,
    plan: "default",
    fName: "",
    lName: "",
    userRole: "default",
    email: "",
    password: "",
    passwordVerify: "",
  };

  const [formData, setFormData] = useState(
    JSON.parse(sessionStorage.getItem("formData")) || initialFormData
  );

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const {
    step,
    plan,
    fName,
    lName,
    userRole,
    email,
    password,
    passwordVerify,
  } = formData;

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // registration steps
  // const [step, setStep] = useState(1);

  // first name
  // const [fName, setFirstName] = useState("");
  const [firstNameTypingStarted, setFirstNameTypingStarted] = useState(false);

  // last name
  // const [lName, setLastName] = useState("");
  const [lastNameTypingStarted, setLastNameTypingStarted] = useState(false);

  // user role
  // const [userRole, setUserRole] = useState("default");

  // email
  // const [email, setEmail] = useState("");
  const [emailTypingStarted, setEmailTypingStarted] = useState(false);

  // pass
  // const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  // verify pass
  // const [passwordVerify, setPasswordVerify] = useState("");
  const [verifyPasswordShown, setVerifyPasswordShown] = useState(false);
  const [verifyTypingStarted, setVerifyTypingStarted] = useState(false);

  // terms of agreement
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsTermsChecked((prevChecked) => !prevChecked);
  };

  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  // password regex
  const passRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters length" },
    // { regex: /[0-9]/, text: "At least 1 number (0...9)" },
    // { regex: /[a-z]/, text: "At least 1 lowercase letter (a...z)" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special symbol (!...$)" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter (A...Z)" },
  ];

  const isPasswordRegexMet = (regex) => regex.test(password);

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

  // verifies inputs on step 2
  const isSubmitDisabled = () => {
    return true;
  };

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleVerifyPassword = () => {
    setVerifyPasswordShown(!verifyPasswordShown);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return isEmailValid(email);
      case 2:
        return (
          passRequirements.every((requirement) =>
            isPasswordRegexMet(requirement.regex)
          ) && isPasswordMatching(password, passwordVerify)
        );
      case 3:
        return (
          isFirstNameValid(fName) &&
          isLastNameValid(lName) &&
          userRole !== "default"
        );
      case 4:
        return plan !== "default";
      default:
        return false;
    }
  };

  const arePreviousStepsComplete = () => {
    console.log("Step 1 valid:", isStepValid(1));
    console.log("Step 2 valid:", isStepValid(2));
    console.log("Step 3 valid:", isStepValid(3));
    console.log("Step 4 valid:", isStepValid(4));
    console.log("Is Terms Checked:", isTermsChecked);

    return (
      isStepValid(1) && isStepValid(2) && isStepValid(3) && isStepValid(4)
      // &&
      // isTermsChecked
    );
  };

  const moveToNextStep = () => {
    const nextStep = step + 1;

    handleFieldChange("step", nextStep);
  };

  const moveBackAStep = () => {
    const backStep = step - 1;

    handleFieldChange("step", backStep);
  };

  const handleStepClick = (step) => {
    handleFieldChange("step", step);
  };

  // checks if all requirements are met to enable button
  const isNextDisabled = () => {
    if (step === 1) {
      return !(
        isFirstNameValid(fName) &&
        isLastNameValid(lName) &&
        isEmailValid(email) &&
        // isTermsChecked &&
        userRole !== "default"
      );
    } else if (step === 2) {
      return !(
        passRequirements.every((requirement) =>
          isPasswordRegexMet(requirement.regex, password)
        ) &&
        isTermsChecked &&
        isPasswordMatching(password, passwordVerify)
      );
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

      await axios
        .post("http://localhost:8282/auth/", userData, {})
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.clear();
          }
          return res.data;
        })
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

  // const inputDisplay = () => {
  //   // renders first step of sign up
  //   if (step === 1) {
  //     return (
  //       <Step1
  //         history={history}
  //         email={email}
  //         lName={lName}
  //         fName={fName}
  //         setFirstName={setFirstName}
  //         setLastName={setLastName}
  //         setEmail={setEmail}
  //         emailTypingStarted={emailTypingStarted}
  //         setEmailTypingStarted={setEmailTypingStarted}
  //         password={password}
  //         setPassword={setPassword}
  //         passwordShown={passwordShown}
  //         typingStarted={typingStarted}
  //         setTypingStarted={setTypingStarted}
  //         setUserRole={setUserRole}
  //         passwordVerify={passwordVerify}
  //         setPasswordVerify={setPasswordVerify}
  //         verifyTypingStarted={verifyTypingStarted}
  //         setVerifyTypingStarted={setVerifyTypingStarted}
  //         setStep={setStep}
  //         passRequirements={passRequirements}
  //         isPasswordRegexMet={isPasswordRegexMet}
  //         isPasswordMatching={isPasswordMatching}
  //         isEmailValid={isEmailValid}
  //         userRole={userRole}
  //         togglePassword={togglePassword}
  //         isNextDisabled={isNextDisabled}
  //         isFirstNameValid={isFirstNameValid}
  //         isLastNameValid={isLastNameValid}
  //         firstNameTypingStarted={firstNameTypingStarted}
  //         setFirstNameTypingStarted={setFirstNameTypingStarted}
  //         lastNameTypingStarted={lastNameTypingStarted}
  //         setLastNameTypingStarted={setLastNameTypingStarted}
  //       />
  //     );
  //   }

  //   // renders second step of sign up
  //   else if (step === 2) {
  //     return (
  //       <Step2
  //         history={history}
  //         email={email}
  //         handleCheckboxChange={handleCheckboxChange}
  //         setEmail={setEmail}
  //         isTermsChecked={isTermsChecked}
  //         emailTypingStarted={emailTypingStarted}
  //         setEmailTypingStarted={setEmailTypingStarted}
  //         password={password}
  //         setPassword={setPassword}
  //         passwordShown={passwordShown}
  //         typingStarted={typingStarted}
  //         setTypingStarted={setTypingStarted}
  //         passwordVerify={passwordVerify}
  //         setPasswordVerify={setPasswordVerify}
  //         verifyTypingStarted={verifyTypingStarted}
  //         setVerifyTypingStarted={setVerifyTypingStarted}
  //         setStep={setStep}
  //         passRequirements={passRequirements}
  //         isPasswordRegexMet={isPasswordRegexMet}
  //         isPasswordMatching={isPasswordMatching}
  //         isEmailValid={isEmailValid}
  //         togglePassword={togglePassword}
  //         isNextDisabled={isNextDisabled}
  //       />
  //     );
  //   } else if (step === 3) {
  //     return <Step3 setStep={setStep} />;
  //   } else if (step === 4) {
  //     return (
  //       <Step4
  //         setStep={setStep}
  //         fName={fName}
  //         lName={lName}
  //         email={email}
  //         userRole={userRole}
  //         password={password}
  //         passwordVerify={passwordVerify}
  //         registerUser={registerUser}
  //       />
  //     );
  //   }
  // };

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
      <section className="max-w-4xl mx-auto">
        <h1 className="mt-20 mb-10 text-3xl">Create an account</h1>
        <div className="flex gap-16 pace-between mb-20">
          {/* step tracker */}
          <div className="rounded-md border w-2/5 h-fit px-4 py-4">
            <ol className="space-y-2">
              <li>
                <p
                  className={`${
                    step === 1
                      ? "text-ultramarine bg-ultramarineLightest px-4 py-2 rounded-md"
                      : "px-4 py-2 hover:bg-ultramarineLightest rounded-md hover:text-ultramarine duration-100"
                  } cursor-pointer`}
                  onClick={() => {
                    handleStepClick(1);
                  }}
                >
                  1. What's your email?
                </p>
              </li>
              <li>
                <p
                  className={`${
                    step === 2
                      ? "text-ultramarine bg-ultramarineLightest px-4 py-2 rounded-md"
                      : "px-4 py-2 hover:bg-ultramarineLightest rounded-md hover:text-ultramarine duration-100"
                  } cursor-pointer`}
                  onClick={() => {
                    handleStepClick(2);
                  }}
                >
                  2. Choose a password
                </p>
              </li>
              <li>
                <p
                  className={`${
                    step === 3
                      ? "text-ultramarine bg-ultramarineLightest px-4 py-2 rounded-md"
                      : "px-4 py-2 hover:bg-ultramarineLightest rounded-md hover:text-ultramarine duration-100"
                  } cursor-pointer`}
                  onClick={() => {
                    handleStepClick(3);
                  }}
                >
                  3. Tell us about yourself
                </p>
              </li>
              <li>
                <p
                  className={`${
                    step === 4
                      ? "text-ultramarine bg-ultramarineLightest px-4 py-2 rounded-md"
                      : "px-4 py-2 hover:bg-ultramarineLightest rounded-md hover:text-ultramarine duration-100"
                  } cursor-pointer`}
                  onClick={() => {
                    handleStepClick(4);
                  }}
                >
                  4. Your plan
                </p>
              </li>
            </ol>
            {/* <div className="flex items-center mb-6 gap-2">
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
                  if (arePreviousStepsComplete()) {
                    registerUser(e);
                  }
                }}
                className={`bg-ultramarineLightest w-full py-4 rounded-md text-lg text-ultramarine font-medium mb-6 duration-100 ${
                  arePreviousStepsComplete()
                    ? "hover:bg-ultramarine hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Create my account
              </button> */}
          </div>
          <div className="w-2/4">
            <ol>
              {/* enter email */}
              <li className="text-lg text-gray-400">
                {step === 1 && (
                  <>
                    <button
                      onClick={googleAuth}
                      className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300 mb-8"
                    >
                      <FcGoogle size={25} />
                      <p className="text-gray-700 font-semibold text-sm">
                        Google
                      </p>
                    </button>

                    {/* divider */}
                    <div className="flex items-center w-full mb-8">
                      <hr className="w-full text-gray-300" />
                      <p className="px-4 text-gray-300 font-light">or</p>
                      <hr className="w-full text-gray-300" />
                    </div>

                    {/* email */}
                    <div className="relative rounded-md">
                      <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                        <Envelope size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          handleFieldChange("email", e.target.value);
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
                          {isEmailValid(email)
                            ? `Looking good 👍🏾`
                            : "That's not an email 🫤"}
                        </li>
                      </ul>
                    )}

                    {/* next button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (isStepValid(1)) {
                            moveToNextStep();
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid(1)
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
              <li className="text-lg text-gray-400">
                {step === 2 && (
                  <>
                    {/* password */}
                    <div className={`relative rounded-md`}>
                      <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                        <Lock size={20} />
                      </div>
                      <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          handleFieldChange("password", e.target.value);
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
                          handleFieldChange("passwordVerify", e.target.value);
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

                    <div className="flex justify-end gap-2">
                      {/* back button */}
                      <button
                        onClick={() => {
                          moveBackAStep();
                        }}
                        className={`rounded-md font-medium px-4 py-2 mt-8 duration-100 bg-gray-200 text-gray-400 hover:bg-gray-400 hover:text-white`}
                      >
                        Back
                      </button>

                      {/* next button */}
                      <button
                        onClick={() => {
                          if (isStepValid(2)) {
                            moveToNextStep();
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid(2)
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
              <li className="text-lg text-gray-400">
                {step === 3 && (
                  <>
                    {/* first name */}
                    <div className="relative rounded-md">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={fName}
                        onChange={(e) => {
                          handleFieldChange("fName", e.target.value);
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
                          {isFirstNameValid(fName)
                            ? `Nice to meet you ${fName}`
                            : "What's your name?!"}
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
                          handleFieldChange("lName", e.target.value);
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
                          {isLastNameValid(lName)
                            ? `Cool last name 😎`
                            : "What's your name?!"}
                        </li>
                      </ul>
                    )}

                    {/* user role */}
                    <div className="rounded-md mt-4">
                      <select
                        id="userRole"
                        value={userRole}
                        onChange={(e) => {
                          handleFieldChange("userRole", e.target.value);
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
                    <div className="flex justify-end gap-2">
                      {/* back button */}
                      <button
                        onClick={() => {
                          moveBackAStep();
                        }}
                        className={`rounded-md font-medium px-4 py-2 mt-8 duration-100 bg-gray-200 text-gray-400 hover:bg-gray-400 hover:text-white`}
                      >
                        Back
                      </button>

                      <button
                        onClick={() => {
                          if (isStepValid(3)) {
                            moveToNextStep();
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid(3)
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

              {/* choose a plan */}
              <li className="text-lg text-gray-400">
                {step === 4 && (
                  <>
                    <select
                      id="plan"
                      value={plan}
                      onChange={(e) => {
                        handleFieldChange("plan", e.target.value);
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

                    <div className="flex justify-end gap-2">
                      {/* <button
                        onClick={() => {
                          if (isStepValid(4)) {
                            moveToNextStep();
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          isStepValid(4)
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button> */}
                      {/* back button */}
                      <button
                        onClick={() => {
                          moveBackAStep();
                        }}
                        className={`rounded-md font-medium px-4 py-2 mt-8 duration-100 bg-gray-200 text-gray-400 hover:bg-gray-400 hover:text-white`}
                      >
                        Back
                      </button>

                      <button
                        onClick={(e) => {
                          if (arePreviousStepsComplete()) {
                            // replace with function to checkout
                            registerUser(e);
                          }
                        }}
                        className={`rounded-md bg-ultramarineLightest text-ultramarine font-medium px-4 py-2 mt-8 duration-100 ${
                          arePreviousStepsComplete()
                            ? "hover:bg-ultramarine hover:text-white"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Continue to billing
                      </button>
                    </div>
                  </>
                )}
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* footer */}
      <Sitemap />
    </>
    // <>
    //   <nav className="sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-200 backdrop-blur-md bg-white/30">
    //     <a href="/" className="text-xl font-semibold italic text-slate-900">
    //       Velocity
    //     </a>
    //     <p className="text-sm">
    //       Already have an account?{" "}
    //       <a
    //         className="hover:underline cursor-pointer text-blue-600"
    //         onClick={() => history("/login")}
    //       >
    //         Log in
    //       </a>
    //     </p>
    //   </nav>
    //   <div className="flex flex-row">
    //     {/* Left Section */}
    //     <div className="hidden lg:block mt-16 fixed left-0">
    //       <div className="h-full px-14">
    //         <ul className="space-y-6">
    //           {step === 1 && (
    //             <>
    //               <li className="flex items-center gap-2 text-blue-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium text-md">Step 1</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 2</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 3</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 4</p>
    //               </li>
    //             </>
    //           )}
    //           {step === 2 && (
    //             <>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium text-md">Step 1</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-blue-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 2</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 3</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 4</p>
    //               </li>
    //             </>
    //           )}
    //           {step === 3 && (
    //             <>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium text-md">Step 1</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 2</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-blue-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 3</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-gray-400">
    //                 <Circle size={22} weight="bold" />
    //                 <p className="font-medium">Step 4</p>
    //               </li>
    //             </>
    //           )}
    //           {step === 4 && (
    //             <>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium text-md">Step 1</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 2</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-green-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 3</p>
    //               </li>
    //               <li className="flex items-center gap-2 text-blue-600">
    //                 <CheckCircle size={22} weight="bold" />
    //                 <p className="font-medium">Step 4</p>
    //               </li>
    //             </>
    //           )}
    //         </ul>
    //       </div>
    //     </div>

    //     {/* Right Section */}
    //     <div className="flex-1">
    //       <div
    //         className={`mx-auto mt-16 ${step === 3 ? "max-w-2xl" : "max-w-md"}`}
    //       >
    //         {/* step titles */}
    //         {step === 1 && (
    //           <h1 className="text-3xl text-slate-900">Your information</h1>
    //         )}

    //         {step === 2 && (
    //           <h1 className="text-3xl text-slate-900">
    //             Enter a secure password
    //           </h1>
    //         )}

    //         {step === 3 && (
    //           <h1 className="text-3xl text-slate-900">
    //             Select a subscription plan
    //           </h1>
    //         )}

    //         {step === 4 && (
    //           <h1 className="text-3xl text-slate-900">
    //             Enter your billing information
    //           </h1>
    //         )}

    //         {step === 1 && (
    //           <>
    //             {/* login with google button */}
    //             <div className={`flex flex-row gap-4 pb-8 pt-8`}>
    //               <button onClick={googleAuth} className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
    //                 <FcGoogle size={25} />
    //                 <p className="text-gray-700 font-semibold text-sm">
    //                   Google
    //                 </p>
    //               </button>

    //               {/* login with apple button */}
    //               <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
    //                 <FaApple size={25} />
    //                 <p className="text-gray-700 font-semibold text-sm">Apple</p>
    //               </span>
    //             </div>

    //             {/* divider */}
    //             <div className="flex items-center w-full">
    //               <hr className="w-full text-gray-300" />
    //               <p className="px-4 text-gray-300 font-light">or</p>
    //               <hr className="w-full text-gray-300" />
    //             </div>
    //           </>
    //         )}
    //         <form className="pt-8">{inputDisplay()}</form>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

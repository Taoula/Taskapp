import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { CheckCircle, Circle } from "phosphor-react";

export default function RegisterForm() {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  // registration steps
  const [step, setStep] = useState(1);

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
  const [verifyTypingStarted, setVerifyTypingStarted] = useState(false);

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

  // checks if all requirements are met to enable button
  const isNextDisabled = () => {
    return !(
      isFirstNameValid(fName) &&
      isLastNameValid(lName) &&
      isEmailValid(email) &&
      isTermsChecked &&
      userRole !== "default"
    );
  };

  // handles form submission
  async function registerUser(e) {
    try {
      e.preventDefault();

      if (isNextDisabled()) {
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

  const inputDisplay = () => {
    // renders first step of sign up
    if (step === 1) {
      return (
        <Step1
          history={history}
          email={email}
          lName={lName}
          fName={fName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          emailTypingStarted={emailTypingStarted}
          setEmailTypingStarted={setEmailTypingStarted}
          password={password}
          setPassword={setPassword}
          passwordShown={passwordShown}
          typingStarted={typingStarted}
          setTypingStarted={setTypingStarted}
          setUserRole={setUserRole}
          passwordVerify={passwordVerify}
          setPasswordVerify={setPasswordVerify}
          verifyTypingStarted={verifyTypingStarted}
          setVerifyTypingStarted={setVerifyTypingStarted}
          isTermsChecked={isTermsChecked}
          setStep={setStep}
          handleCheckboxChange={handleCheckboxChange}
          passRequirements={passRequirements}
          isPasswordRegexMet={isPasswordRegexMet}
          isPasswordMatching={isPasswordMatching}
          isEmailValid={isEmailValid}
          userRole={userRole}
          togglePassword={togglePassword}
          isNextDisabled={isNextDisabled}
          isFirstNameValid={isFirstNameValid}
          isLastNameValid={isLastNameValid}
          firstNameTypingStarted={firstNameTypingStarted}
          setFirstNameTypingStarted={setFirstNameTypingStarted}
          lastNameTypingStarted={lastNameTypingStarted}
          setLastNameTypingStarted={setLastNameTypingStarted}
        />
      );
    }

    // renders second step of sign up
    else if (step === 2) {
      return (
        <Step2
          history={history}
          email={email}
          setEmail={setEmail}
          emailTypingStarted={emailTypingStarted}
          setEmailTypingStarted={setEmailTypingStarted}
          password={password}
          setPassword={setPassword}
          passwordShown={passwordShown}
          typingStarted={typingStarted}
          setTypingStarted={setTypingStarted}
          passwordVerify={passwordVerify}
          setPasswordVerify={setPasswordVerify}
          verifyTypingStarted={verifyTypingStarted}
          setVerifyTypingStarted={setVerifyTypingStarted}
          isTermsChecked={isTermsChecked}
          setStep={setStep}
          handleCheckboxChange={handleCheckboxChange}
          passRequirements={passRequirements}
          isPasswordRegexMet={isPasswordRegexMet}
          isPasswordMatching={isPasswordMatching}
          isEmailValid={isEmailValid}
          togglePassword={togglePassword}
          isNextDisabled={isNextDisabled}
        />
      );
    } else if (step === 3) {
      return <Step3 setStep={setStep} />;
    } else if (step === 4) {
      return <Step4 />;
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/4 hidden lg:block">
          <div className="bg-slate-50 flex flex-col justify-between h-full pt-10 px-10">
            <div>
              <a
                href="/"
                className="text-xl font-semibold italic text-blue-600"
              >
                Velocity
              </a>
              <div className="flex flex-col space-y-10 pt-16">
                <div className="flex gap-3">
                  <CheckCircle
                    size={22}
                    className="text-blue-600"
                    weight="bold"
                  />
                  <div className="space-y-1">
                    <h1 className="text-sm font-semibold">Your details</h1>
                    <p className="text-xs text-gray-600">In progress</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle
                    size={22}
                    className="text-gray-400"
                    weight="bold"
                  />
                  <div className="space-y-1">
                    <h1 className="text-sm text-gray-600">Choose a password</h1>
                    <p className="text-xs text-gray-400">Incomplete</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle
                    size={22}
                    className="text-gray-400"
                    weight="bold"
                  />
                  <div className="space-y-1">
                    <h1 className="text-sm text-gray-600">Select a plan</h1>
                    <p className="text-xs text-gray-400">Incomplete</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle
                    size={22}
                    className="text-gray-400"
                    weight="bold"
                  />
                  <div className="space-y-1">
                    <h1 className="text-sm text-gray-600">Payment</h1>
                    <p className="text-xs text-gray-400">Incomplete</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mb-10 border border-gray-300 rounded-md py-3.5 bg-white text-gray-700 text-sm text-center cursor-pointer hover:bg-gray-100 duration-75"
              onClick={() => history("/login")}
            >
              <p className="cursor-pointer">Already have an account?</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/4 my-auto">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl text-gray-800 font-semibold">
              {/* {step === 1 ? "Your details" : "Choose a password"} */}
              Create an account
            </h1>

            {step === 1 && (
              <>
                {/* login with google button */}
                <div className="flex flex-row gap-4 py-8">
                  <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md duration-100">
                    <FcGoogle size={25} />
                    <p className="text-gray-700 font-semibold text-sm">
                      Google
                    </p>
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
              </>
            )}

            <form className="pt-8">{inputDisplay()}</form>
          </div>
        </div>
      </div>
    </>
  );
}

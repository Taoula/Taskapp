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

      // if (isNextDisabled()) {
      //   return;
      // }

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
          setStep={setStep}
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
          handleCheckboxChange={handleCheckboxChange}
          setEmail={setEmail}
          isTermsChecked={isTermsChecked}
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
          setStep={setStep}
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
      return <Step4 setStep={setStep} />;
    }
  };

  return (
    <>
      <nav className="sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-200 backdrop-blur-md bg-white/30">
        <a href="/" className="text-xl font-semibold italic text-slate-900">
          Velocity
        </a>
        <p className="text-sm">
          Already have an account?{" "}
          <a
            className="hover:underline cursor-pointer text-blue-600"
            onClick={() => history("/login")}
          >
            Log in
          </a>
        </p>
      </nav>
      <div className="flex flex-row">
        {/* Left Section */}
        <div className="hidden lg:block mt-16 fixed left-0">
          <div className="h-full px-14">
            <ul className="space-y-6">
              {step === 1 && (
                <>
                  <li className="flex items-center gap-2 text-blue-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium text-md">Step 1</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 2</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 3</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 4</p>
                  </li>
                </>
              )}
              {step === 2 && (
                <>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium text-md">Step 1</p>
                  </li>
                  <li className="flex items-center gap-2 text-blue-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 2</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 3</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 4</p>
                  </li>
                </>
              )}
              {step === 3 && (
                <>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium text-md">Step 1</p>
                  </li>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 2</p>
                  </li>
                  <li className="flex items-center gap-2 text-blue-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 3</p>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Circle size={22} weight="bold" />
                    <p className="font-medium">Step 4</p>
                  </li>
                </>
              )}
              {step === 4 && (
                <>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium text-md">Step 1</p>
                  </li>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 2</p>
                  </li>
                  <li className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 3</p>
                  </li>
                  <li className="flex items-center gap-2 text-blue-600">
                    <CheckCircle size={22} weight="bold" />
                    <p className="font-medium">Step 4</p>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <div
            className={`mx-auto mt-16 ${step === 3 ? "max-w-2xl" : "max-w-md"}`}
          >
            {/* step titles */}
            {step === 1 && (
              <h1 className="text-3xl text-slate-900">Your information</h1>
            )}

            {step === 2 && (
              <h1 className="text-3xl text-slate-900">
                Enter a secure password
              </h1>
            )}

            {step === 3 && (
              <h1 className="text-3xl text-slate-900">
                Select a subscription plan
              </h1>
            )}

            {step === 4 && (
              <h1 className="text-3xl text-slate-900">
                Enter your billing information
              </h1>
            )}

            {step === 1 && (
              <>
                {/* login with google button */}
                <div className={`flex flex-row gap-4 pb-8 pt-8`}>
                  <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
                    <FcGoogle size={25} />
                    <p className="text-gray-700 font-semibold text-sm">
                      Google
                    </p>
                  </span>

                  {/* login with apple button */}
                  <span className="flex items-center bg-white w-full justify-center py-4 gap-2 rounded-md border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md hover:duration-300 duration-300">
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
<<<<<<< HEAD

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
=======
              </>
            )}
            <form className="pt-8">{inputDisplay()}</form>
>>>>>>> Placeholder
          </div>
        </div>
      </div>
    </>
  );
}

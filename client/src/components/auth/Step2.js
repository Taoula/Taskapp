import React from "react";
import {
  Eye,
  EyeClosed,
  Lock,
  CheckCircle,
  Circle,
  Square,
  CheckSquare,
} from "phosphor-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Step2({
  password,
  setPassword,
  passwordShown,
  typingStarted,
  setTypingStarted,
  passwordVerify,
  setPasswordVerify,
  verifyTypingStarted,
  setVerifyTypingStarted,
  setStep,
  passRequirements,
  isPasswordRegexMet,
  isPasswordMatching,
  togglePassword,
  isNextDisabled,
  handleCheckboxChange,
  isTermsChecked,
}) {
  return (
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
                <Circle size={16} weight="bold" className="mr-2 text-red-400" />
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

      {/* recaptcha */}
      <ReCAPTCHA sitekey="YOUR_ID" className="pt-4 flex justify-end" />

      {/* terms of agreement */}
      <span className="flex pt-4 items-center gap-2 justify-end">
        {isTermsChecked ? (
          <CheckSquare
            size={18}
            weight="bold"
            onClick={handleCheckboxChange}
            className="text-blue-500"
          />
        ) : (
          <Square size={18} weight="bold" onClick={handleCheckboxChange} />
        )}
        <p className="tracking-wide text-gray-900 text-sm">
          I agree to the{" "}
          <a href="/" className="hover:underline text-blue-500">
            Terms of agreement
          </a>
        </p>
      </span>

      {/* <div className="flex mt-8 mb-10 gap-4">
        <button
          type="button"
          onClick={() => {
            setStep((currentStep) => currentStep - 1);
          }}
          className="text-sm w-full font-normal hover:bg-red-200 duration-75 py-3.5 rounded-md tracking-wider hover:text-red-700 bg-red-100 text-red-600"
        >
          Previous
        </button>

        <button
          type="submit"
          input={+true}
          value="register"
          disabled={isButtonDisabled}
          onClick={registerUser}
          className={`text-sm font-normal w-full py-3.5 rounded-md tracking-wider text-white ${
            isButtonDisabled
              ? "bg-gray-300 text-gray-900"
              : "bg-blue-600 hover:bg-blue-700 duration-75"
          }`}
        >
          Submit
        </button>
      </div> */}
      {/* buttons */}
      <div className="flex gap-4">
        {/* back button */}
        <button
          type="button"
          onClick={() => {
            setStep((currentStep) => currentStep - 1);
          }}
          className="bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white mt-8 text-sm font-medium w-full py-3.5 rounded-md tracking-wide"
        >
          Back
        </button>
        {/* next button */}
        <button
          type="button"
          disabled={isNextDisabled()}
          onClick={() => {
            setStep((currentStep) => currentStep + 1);
          }}
          className={`${
            isNextDisabled()
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white"
          } mt-8 text-sm font-medium w-full py-3.5 rounded-md tracking-wide`}
        >
          Next
        </button>
      </div>
    </>
  );
}

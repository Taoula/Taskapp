import React from "react";
import {
  Envelope,
  Square,
  CheckCircle,
  Circle,
  CheckSquare,
  PersonSimple,
} from "phosphor-react";

export default function Step1({
  fName,
  setFirstName,
  lName,
  setLastName,
  userRole,
  setUserRole,
  email,
  setEmail,
  emailTypingStarted,
  setEmailTypingStarted,
  isTermsChecked,
  setStep,
  handleCheckboxChange,
  isEmailValid,
  isNextDisabled,
  setLastNameTypingStarted,
  setFirstNameTypingStarted,
  firstNameTypingStarted,
  lastNameTypingStarted,
  isFirstNameValid,
  isLastNameValid,
}) {
  return (
    <>
      {/* first name */}
      <div className="relative rounded-md">
        <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
          <PersonSimple size={20} />
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={fName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameTypingStarted(true);
          }}
          className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
        />
      </div>

      {/* first name validation */}
      {firstNameTypingStarted && (
        <ul className="mt-4 list-none list-inside">
          <li
            className={`text-sm flex items-center ${
              isFirstNameValid(fName) ? "text-green-600" : "text-red-500"
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
              <Circle size={16} weight="bold" className="mr-2 text-red-400" />
            )}
            Valid first name
          </li>
        </ul>
      )}

      {/* last name */}
      <div className={`relative rounded-md mt-4`}>
        <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
          <PersonSimple size={20} />
        </div>
        <input
          type="text"
          placeholder="Last name"
          value={lName}
          onChange={(e) => {
            setLastName(e.target.value);
            setLastNameTypingStarted(true);
          }}
          className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
        />
      </div>

      {/* last name validation */}
      {lastNameTypingStarted && (
        <ul className="mt-4 list-none list-inside">
          <li
            className={`text-sm flex items-center ${
              isLastNameValid(lName) ? "text-green-600" : "text-red-500"
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
              <Circle size={16} weight="bold" className="mr-2 text-red-400" />
            )}
            Valid last name
          </li>
        </ul>
      )}

      {/* email */}
      <div className="relative rounded-md mt-4">
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
              <Circle size={16} weight="bold" className="mr-2 text-red-400" />
            )}
            Email must be a valid format
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
            Select your role
          </option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Manager">Manager</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select>
      </div>

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
        <p class="tracking-wide text-gray-900 text-sm">
          I agree to the{" "}
          <a href="/" className="hover:underline text-blue-500">
            Terms of agreement
          </a>
        </p>
      </span>

      {/* continue button */}
      <button
        type="button"
        disabled={isNextDisabled()}
        onClick={() => {
          setStep((currentStep) => currentStep + 1);
        }}
        className={`${
          isNextDisabled()
            ? "cursor-not-allowed bg-gray-300 text-gray-900"
            : "bg-blue-600 hover:bg-blue-700 duration-75 text-white"
        } mt-8 text-sm font-normal w-full py-3.5 rounded-md tracking-wider `}
      >
        Continue
      </button>
    </>
  );
}

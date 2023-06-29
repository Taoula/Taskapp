import React, { useState } from "react";
import { Envelope, Circle, CheckCircle } from "phosphor-react";

export default function ResetPassword() {
  // email
  const [email, setEmail] = useState("");
  const [emailTypingStarted, setEmailTypingStarted] = useState(false);

  // email regex
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // is submit disabled
  const isSubmitDisabled = () => {
    return !isEmailValid(email);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex h-screen bg-lightGrid1 bg-cover">
        <div className="w-full my-auto">
          <div className="max-w-xl px-16 sm:px-20 py-14 mx-8 sm:mx-auto border border-gray-200 shadow-2xl rounded-lg bg-white">
            <a href="/" className="text-xl font-semibold italic text-slate-900">
              Velocity
            </a>
            <h1 className="text-3xl text-gray-800 font-semibold pt-10">
              Reset your password
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                  className="block mt-8 w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
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
                    Email must be a valid format
                  </li>
                </ul>
              )}
              {/* submit */}
              <button
                type="submit"
                input={+true}
                disabled={isSubmitDisabled()}
                value="submit"
                className={`${
                  isSubmitDisabled()
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white"
                } w-full py-3.5 font-medium tracking-wide rounded-md mt-8`}
              >
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

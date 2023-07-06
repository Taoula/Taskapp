import { Envelope, Person, PersonSimple } from "phosphor-react";
import React from "react";

export default function UpdateProfile({
  fName,
  lName,
  email,
  userRole,
  setFirstName,
  setLastName,
  setEmail,
  setUserRole,
}) {
  return (
    <>
      <form className="space-y-4 max-w-screen-md">
        <div className="flex gap-4">
          {/* first name */}
          <div className="relative rounded-md w-full">
            <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
              <PersonSimple size={20} />
            </div>
            <input
              type="text"
              placeholder="First"
              value={fName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
            />
          </div>

          {/* last name */}
          <div className="relative rounded-md w-full">
            <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
              <PersonSimple size={20} />
            </div>
            <input
              type="text"
              placeholder="Last"
              value={lName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
            />
          </div>
        </div>

        {/* email */}

        <div className="relative rounded-md">
          <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
            <Envelope size={20} />
          </div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
          />
        </div>

        <div className="flex justify-between w-full border-b border-slate-200 pb-6">
          <p className="text-sm font-medium text-slate-900">Your photo</p>
          <img src="/" className="h-20 w-20 rounded-full object-cover" />
        </div>
      </form>
    </>
  );
}
